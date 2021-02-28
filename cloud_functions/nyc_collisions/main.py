import json
import googlemaps
import pandas as pd
from google.cloud import bigquery
from collections import namedtuple

GeoPoint = namedtuple('GeoPoint', 'lat lng')
# Construct a BigQuery client object.
client = bigquery.Client()
# Construct Google Maps object
gmaps = googlemaps.Client(key='[PRIVATE_KEY]')

def get_intersection_locations(origin, destination):
    # Geocoding an address
    directions_result = gmaps.directions(origin, destination)

    steps = directions_result[0]["legs"][0]["steps"]

    locations = []
    start_location = steps[0]["start_location"]
    locations.append(GeoPoint(start_location["lat"], start_location["lng"]))

    for step in steps:
        end_location = step["end_location"]
        locations.append(GeoPoint(end_location["lat"], end_location["lng"]))
    
    return (locations)

def query_bq(intersections):
    # Construct a BigQuery client object.
    client = bigquery.Client()

    points = []
    for i in intersections:
        points.append(f'ST_GEOGPOINT({i.lng}, {i.lat})')

    points_parsed = '[' + ', '.join(points) + ']'

    query = f"""
        WITH t2 AS (
        SELECT
            cluster_num,
            incidents,
            risk_cat,
            f0_ as geopoint
        FROM
            `hackaubg3.new_york.cluster_viz_risk`
        )

        SELECT
            t2.cluster_num as cluster_id,
            t2.geopoint as cluster_geopoint,
            t2.incidents as cluster_incidents,
            t2.risk_cat as cluster_risk,
            elements as location_geopoint
        FROM UNNEST([1]) as elements
        INNER JOIN t2 ON ST_DWITHIN(ST_MAKELINE({points_parsed}), t2.geopoint, 10)
    """

    # Make Request
    query_job = client.query(query)

    output = []
    for row in query_job:
        output.append(row)
    
    query_result = []
    for row in output:
        query_result.append({
            "id": row.cluster_id,
            "geopoint": row.cluster_geopoint,
            "incidents": row.cluster_incidents,
            "risk": row.cluster_risk
        })
    
    df = pd.DataFrame(query_result)

    result = {
        "risk_summary": json.loads(df.groupby(["risk"]).size().reset_index(name='counts').to_json(orient='records')),
        "total": len(query_result),
        "data": query_result
    }

    return result

def bq_collisions(request):

    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows POST requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    request_json = request.get_json(silent=True)
    request_args = request.args

    if request_json and ('origin' in request_json) and ('destination' in request_json):
        origin = request_json['origin']
        destination = request_json['destination']
    elif request_args and ('origin' in request_args) and ('destination' in request_args):
        origin = request_args['origin']
        destination = request_args['destination']
    else:
        origin = '149 W 14th St, New York'
        destination = '497 3rd Ave, New York'

    intersections = get_intersection_locations(origin, destination)
    query_result = query_bq(intersections)

    response = {
        "origin": origin,
        "destination": destination,
        "intersections": query_result
    }
    
    return json.dumps(response)