
import './styles/WorkoutDay.css'
import { useEffect, useState } from 'react'
import api from './api/axios.js'
import { useParams, useNavigate, data} from 'react-router-dom'

const WorkoutDisplay = () => {
    const [workouts, setWorkouts] = useState([])
    const [username, setUsername] = useState('')
    const [latestWorkout, setLatestWorkout] = useState([])
    const {id, day} = useParams()
    const [itemCheck, setItemCheck] = useState(false)
    const navigate = useNavigate()



    const intensityColor = {
        1: '#1D9E75',
        2: '#d1861d',
        3: '#ca0000', 
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        navigate('/')
    }

    const addWorkout = () => {
        navigate(`/workout-log/${day}`)
    }
    
    const handleDelete = async (id) => {
            try{
                await api.delete(`/api/tracker/workout/${id}/`)
                setWorkouts(workouts.filter(workout => workout.id !== id))
            }
            catch(err){
                console.log(err)
            }
        }

    
    useEffect(() =>{
        
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/')
            return
        }   
        
        const fetchUser = async() =>{
           const res = await api.get('/api/accounts/me/')
           setUsername(res.data.username)
        }

        

        const fetchWorkouts = async () => {
            try{
                const response = await api.get(`/api/tracker/workout/?day=${day}`)
                setWorkouts(response.data)
                
                if(response.data.length > 0){
                    setItemCheck(true)
                }
                const latest = response.data[response.data.length - 1]
                setLatestWorkout(latest)
            }
                catch(err){
                console.log(err)
            }

        }



        fetchWorkouts()
        fetchUser()
    }, [day])

    const redirectHome = () => {
            navigate('/home/')
        }

    if(!itemCheck){
        return(
            <div className="dashboard">
               <div className='dashboard-header'>
                     <button onClick={handleLogout} className='nw-logout'>logout</button>
                <button onClick={addWorkout} className='nw-add'>add workout</button>
               </div>
                <div>
                    <h1 className='no-workout'> It's {day}. Nothing logged yet.<br/> Start your first workout for today?</h1>
                </div>
                <div className='exit-container'>
                    <button className='exit-button' onClick={redirectHome}> R <br/> E <br/> T <br/> U <br/> R <br/> N</button>
                </div>
            </div>
        )
    }
            
    return(
    <div className="dashboard">
        <div className='dashboard-header'>
            <button onClick={handleLogout} className='header-left header-button top-button'>logout</button>
            <button onClick={addWorkout} className='header-right header-button top-button'>add workout</button>
        </div>
        

        <div className='exit-container'>
            <button className='exit-button' onClick={redirectHome}> R <br/> E <br/> T <br/> U <br/> R <br/> N</button>
        </div>

        <h1 className='dashboard-title day'>{day}</h1>
        <div className="workout-grid">
            {workouts.map(workout =>(
                <div key={workout.id} className="workout-card" style={{borderLeft: `6px solid ${intensityColor[workout.intensity]}`}}>
                    <h2 className="workout-exercise">{workout.exercise}</h2>
                    <div className="workout-stats">
                        <div className="stat">
                            <span className="stat-value">{workout.weight}</span>
                            <span className="stat-label">lbs</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{workout.sets}</span>
                            <span className="stat-label">sets</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{workout.reps}</span>
                            <span className="stat-label">reps</span>
                        </div>
                    </div>
                    <div className='lower-container'>
                        <button onClick={() => handleDelete(workout.id)} className='lower-button'> Delete </button>
                        <button onClick={() => navigate(`/edit-workout/${workout.id}/${day}`)} className='lower-button'>edit</button>
                    </div>
                </div>
            ))}

        </div>

             <div className='history-section'>
                {latestWorkout &&(
                    <>
                        <h2>Recently done:</h2>
                        <div className='workout-card' style={{borderBottom: `4px solid ${intensityColor[latestWorkout.intensity]}`}}>
                            <div className='workout-exercise'>{latestWorkout && <h1>{latestWorkout.exercise}</h1>}</div>
                            <div className='workout-stats'>
                                <div className='stat'>
                                    {latestWorkout && <span className='stat-value'>{latestWorkout.weight}</span>}
                                    <span className='stat-value'>LBS</span>
                                </div>
                                <div className='stat'>
                                    {latestWorkout && <span className='stat-value'>{latestWorkout.sets}</span>}
                                    <span className='stat-value'>SETS</span>
                                </div>
                                <div className='stat'>
                                    {latestWorkout && <span className='stat-value'>{latestWorkout.reps}</span>}
                                    <span className='stat-value'>REPS</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                
                
            </div>
       
    </div>
)


  
}
const EditWorkout = () =>{
    const [exercise, setExercise] = useState('')
    const [weight, setWeight] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [intensity, setIntensity] = useState('')
    const [error, setError] = useState('')

    const {id, day} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/login')
            return
        }
    }, [])

    const handleNav = () => {
        navigate(`/home/`)
    }

    const dayMap = {
        'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
        'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7,
    }

    const handleSubmit = async () => {
        try{
            const response = await api.put(`/api/tracker/workout/${id}/`, {
            exercise,
                weight: parseInt(weight),
                sets: parseInt(sets),
                reps: parseInt(reps),
                intensity: parseInt(intensity),
                days: dayMap[day]
        })
        }
        catch(err){
            console.log(err)
        }
        navigate(`/dashboard/${day}`)

    }
    

    return(
        <div className="login-whole">
            <input className="form-text"
                placeholder="enter exercise"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
            />

            <input className="form-text"
                placeholder="enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />

            <input className="form-text"
                placeholder="enter sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
            />

            <input className="form-text"
                placeholder="enter reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
            />

           <select value={intensity} className="form-text" onChange={(e) => setIntensity(e.target.value)}>
                <option value="">Select intensity</option>
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
            </select>
            {error && <p>{error}</p>}
            <button onClick={handleSubmit}className="form-text header-button hover-scale">Submit</button>
            <button onClick={handleNav} className="header-button hover-scale"> Go back </button>
        </div>
    )
}

export {WorkoutDisplay, EditWorkout}