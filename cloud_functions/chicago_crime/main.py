import json
import googlemaps
from google.cloud import bigquery
from collections import namedtuple

GeoPoint = namedtuple('GeoPoint', 'lat lng')
# Construct a BigQuery client object.
client = bigquery.Client()
# Construct Google Maps object
gmaps = googlemaps.Client(key='[PRIVATE_KEY]')

def geocode_address(address):
    # Geocoding an address
    geocode_result = gmaps.geocode(address)

    location = geocode_result[0]["geometry"]["location"]
    formatted_address = geocode_result[0]["formatted_address"]
    
    return (GeoPoint(location["lat"], location["lng"]), formatted_address)

def query_bq(geo_point):
    # Construct a BigQuery client object.
    client = bigquery.Client()

    query = f"""
        SELECT * FROM (
        SELECT
            boundry.dist_num as district_num
        FROM
            `hackaubg3.chicago.district_boundaries` AS boundry
        WHERE ST_CONTAINS(boundry.geometry, ST_GEOGPOINT(@lng,@lat))
        LIMIT 1
        ) AS matched_district
        JOIN (
        SELECT district, risk_class
        FROM `hackaubg3.chicago.district_risk_class`
        ) AS district_risk
        ON CAST(matched_district.district_num AS INT64) = district_risk.district
        LIMIT 1
    """

    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("lng", "FLOAT64", geo_point.lng),
            bigquery.ScalarQueryParameter("lat", "FLOAT64", geo_point.lat),
        ]
    )

    query_job = client.query(query, job_config=job_config)  # Make an API request.

    output = []
    for row in query_job:
        output.append(row)
    
    row = output[0]
    query_result = {
        "district": row.district,
        "criminal_level": row.risk_class
    }
    
    return query_result

def bq_read_data(request):

    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
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

    if request_json and 'address' in request_json:
        address = request_json['address']
    elif request_args and 'address' in request_args:
        address = request_args['address']
    else:
        address = '7158 W Grand Ave, Chicago'

    (geo_point, formatted_address) = geocode_address(address)
    query_result = query_bq(geo_point)

    response = {
        "address": address,
        "formatted_address": formatted_address,
        "district_result": query_result
    }
    
    return json.dumps(response)