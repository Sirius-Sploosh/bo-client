import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Workouts from './subcomponents/Workouts.jsx';

const Planner = () => {
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [workoutCount, setWorkoutCount] = useState(0);
  const [workoutType, setWorkoutType] = useState('SELECT WORKOUT TYPE');
  const exModalRef = useRef(null);

  const getExercises = () => {
    axios.get(`https://api.api-ninjas.com/v1/exercises?type=${workoutType}`, {
      headers: {
        'X-Api-Key': ""
      }
    })
    .then(response => {
      setExercises(response.data);
    })
    .catch(err => console.log(err));
  };

  const handleSelect = (e) => {
    setWorkoutType(e.target.value);
    getExercises();
  }

  useEffect(() => {
    getExercises();
  }, [workoutType]);

  const addWorkout = () => {
    console.log('Workout added!', workouts); // EDIT THIS TO SEND TO OTHER COMPONENT
    setWorkouts([]);
    setWorkoutCount(0);
  }

  const showExModal = () => {
    if (exModalRef.current) exModalRef.current.showModal();
  };

  return (
    <React.Fragment>
      <div className="flex items-center py-5">
        <div className="py-5">
            <select className="select select-bordered w-full max-w-xs" value={workoutType} onChange={handleSelect}>
              <option disabled>SELECT WORKOUT TYPE</option>
              <option value="cardio">CARDIO</option>
              <option value="olympic_weightlifting">OLYMPIC WEIGHTLIFTING</option>
              <option value="plyometrics">PLYOMETRICS</option>
              <option value="powerlifting">POWERLIFTING</option>
              <option value="strength">STRENGTH</option>
              <option value="stretching">STRETCHING</option>
              <option value="strongman">STRONGMAN</option>
            </select>
            <button className="btn" onClick={showExModal}>
              Exercises
              <div className="badge badge-secondary">{workoutCount}</div>
            </button>
            <dialog ref={exModalRef} className="modal">
              <form method="dialog" className="modal-box">
                <p className="py-4">Example</p>
                <div className="modal-action">
                  <button className="btn">Close</button>
                  <button className="btn" onClick={addWorkout}>Add Workout</button>
                </div>
              </form>
            </dialog>
            <div className="flex items-center py-5">
              <Workouts exercises={exercises} workouts={workouts} setWorkouts={setWorkouts} workoutCount={workoutCount} setWorkoutCount={setWorkoutCount}/>
            </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default Planner;

