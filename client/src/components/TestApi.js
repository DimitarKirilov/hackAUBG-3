import axios from 'axios';

export default function TestApi() {

    const getData = () => {
        axios.get('https://hackaubg3.ew.r.appspot.com/test1', { address: '4854 W Irving Park Rd, Chicago'})
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
    };

    return (
        <button onClick={getData}>Get data</button>
    );
};