import './App.css';
// import axios from 'axios';
import {
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';

// const getData = () => {
//   axios.get('http://dev.stuk.help/hackathon/public/test?test=1')
//     .then((response) => console.log(response.data))
//     .catch((error) => console.log(error));
// };

function App() {
  return (
    // <div className="App">
    //   <button onClick={getData}>Get data</button>
    // </div>
    <Switch>
      <Route path="/" exact component={Login}></Route>
      <Route path="/register" exact component={Register}></Route>
      <Route path="/home" exact component={HomePage}></Route>
    </Switch>
  );
}

export default App;
