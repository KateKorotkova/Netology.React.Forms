import logo from './logo.svg';
import './App.css';
import {ColorConverter} from "./firstTask/colorConverter";
import {Workouts} from "./secondTask/workouts";


function App() {
  let isColorConverter = true;
  return (
    <>
        {isColorConverter ? <ColorConverter/> : <Workouts/>}
    </>
  );
}

export default App;
