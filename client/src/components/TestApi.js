import axios from 'axios';

export default function TestApi() {

    const getData = () => {
        axios.get('https://hackaubg3.ew.r.appspot.com/test1?address="Bolingbrook 137 N. Weber Road Bolingbrook IL 60440"')
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
    };

    return (
        <button onClick={getData}>Get data</button>
    );
};