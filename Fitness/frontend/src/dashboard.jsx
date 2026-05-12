
import './styles/dashboard.css'
import { useEffect, useState } from 'react'
import api from './api/axios.js'
import { useParams, useNavigate} from 'react-router-dom'

const DashboardPage = () => {
    const [workouts, setWorkouts] = useState([])
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    const intensityColor = {
        1: '#1D9E75',
        2: '#d1861d',
        3: '#ca0000', 
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        navigate('/login')
    }

    const addWorkout = () => {
        navigate('/workout-log')
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
            navigate('/login')
            return
        }   
        
        const fetchUser = async() =>{
           const res = await api.get('/api/accounts/me/')
           setUsername(res.data.username)
        }

        

        const fetchWorkouts = async () => {
            try{
                const response = await api.get('/api/tracker/workout/')
                setWorkouts(response.data)
            }
                catch(err){
                console.log(err)
            }

        }
        fetchWorkouts()
        fetchUser()
    }, [])
    
    return(
    <div className="dashboard">
        <div className='dashboard-header'>
            <button onClick={handleLogout} className='header-left header-button hover-scale'>logout</button>
            <button onClick={addWorkout} className='header-right header-button hover-scale'>add workout</button>
        </div>
        
        <h1 className='dashboard-title'>Welcome back {username}</h1>
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="workout-grid">
            {workouts.map(workout =>(
                <div key={workout.id} className="workout-card" style={{borderLeft: `4px solid ${intensityColor[workout.intensity]}`}}>
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
                    <div>
                        <button onClick={() => handleDelete(workout.id)} className='lower-button'> Delete </button>
                        <button onClick={() => navigate(`/edit-workout/${workout.id}/`)} className='lower-button'>edit</button>
                    </div>
                </div>
            ))}

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

    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/login')
            return
        }
    }, [])


    const handleSubmit = async () => {
        try{
            const response = await api.put(`/api/tracker/workout/${id}/`, {
            exercise,
                weight: parseInt(weight),
                sets: parseInt(sets),
                reps: parseInt(reps),
                intensity: parseInt(intensity)
        })
        }
        catch(err){
            console.log(err)
        }
        navigate('/dashboard')

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
        </div>
    )
}

export {DashboardPage, EditWorkout}