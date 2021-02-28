import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HomePage from './components/HomePage/HomePage';
import Map from './components/Map';
import TestApi from './components/TestApi';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login}></Route>
      <Route path="/register" exact component={Register}></Route>
      <Route path="/home" exact component={HomePage}></Route>
      <Route path="/map" exact component={Map}></Route>
      <Route path="/test" exact component={TestApi}></Route>
    </Switch>
  );
}

export default App;
