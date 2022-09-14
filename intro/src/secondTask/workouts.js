import {useState} from "react";
import {nanoid} from "nanoid";
import {AiOutlineDelete} from 'react-icons/ai';


function Workouts() {
    const[form, setForm] = useState({
        id: "",
        date: "",
        distance: ""
    });
    const[workouts, setWorkouts] = useState([]);


    function addWorkout(e) {
        e.preventDefault();
        if (!form.date && !form.distance)
            return;
            
        let newWorkout = {
            id: nanoid(),
            date: form.date,
            distance: form.distance
        };
        setWorkouts(prevWorkouts => add(prevWorkouts, newWorkout));
        setWorkouts(prevWorkouts => prevWorkouts.sort((x, y) => customSorting(x, y)));
    }


    const removeWorkout = (workoutId) => {
        setWorkouts(prevWorkouts => prevWorkouts.filter((w) => w.id != workoutId));
    }
    

    const handleFormChange = (e) => {
        let elementName = e.target.name;
        let elementValue = e.target.value;
        setForm(prevForm => ({...prevForm, [elementName]: elementValue}));
    }


    return (
        <>
        <form className="workouts-form" onSubmit={addWorkout}>
            <div className="workouts-header">
                <div className="workouts-header-block" style={{ marginRight: "70px"}}>
                    <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                    <br/>
                    <input type="text" id="date" name="date" value={form.date} onChange={handleFormChange}></input>
                </div>
                <div className="workouts-header-block" style={{ marginRight: "20px"}}>
                    <label htmlFor="distance">Пройдено км</label>
                    <br/>
                    <input type="text" id="distance" name="distance" value={form.distance} onChange={handleFormChange}></input>
                </div>
                <div className="workouts-header-block">
                    <button type="submit">OK</button>
                </div>
            </div>
            
            <div className="workouts-table">
                <table id="workoutsTable">
                    <thead className="workouts-table-header">
                        <tr>
                            <td>Дата (ДД.ММ.ГГ)</td>
                            <td>Пройдено км</td>
                            <td>Действия</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            workouts.map((w) => {
                                return (
                                    <tr key={w.id}>
                                        <td>{w.date}</td>
                                        <td>{w.distance}</td>
                                        <td><button onClick={() => removeWorkout(w.id)}> <AiOutlineDelete/> </button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </form>
        </>
    );
}


const add = (prevWorkouts, newWorkout) => {
    //useState works twice in Strict mode, need a pure function
    let workoutWithTheSameDateIndex = prevWorkouts.findIndex(x => x.date == newWorkout.date);
    if (workoutWithTheSameDateIndex != -1) {
        let localWorkouts = [...prevWorkouts];
        let item = {...localWorkouts[workoutWithTheSameDateIndex]};
        item.distance = Number(item.distance ?? 0) + Number(newWorkout.distance);
        localWorkouts[workoutWithTheSameDateIndex] = item;
        return localWorkouts;
    }
    
    return [...prevWorkouts, newWorkout];
}

const customSorting = (first, second) => {
    if (!first.date || !second.date)
        return -1;

    let firstDateParts = first.date.split('.');
    let firstDate = new Date(firstDateParts[2], firstDateParts[1], firstDateParts[0]);
    let secondDateParts = second.date.split('.');
    let secondDate = new Date(secondDateParts[2], secondDateParts[1], secondDateParts[0]);
    
    return secondDate - firstDate;
}




export {Workouts};