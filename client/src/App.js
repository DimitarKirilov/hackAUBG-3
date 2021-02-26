import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';

// const getData = () => {
//   axios.get('https://jsonplaceholder.typicode.com/todos')
//     .then((response) => console.log(response.data))
//     .catch((error) => console.log(error));
// };

function App() {
  return (
    // <div className="App">
    //   <button onClick={getData}>Get data</button>
    // </div>
    <Switch>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/register" exact component={Register}></Route>
    </Switch>
  );
}

export default App;
