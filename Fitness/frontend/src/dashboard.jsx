
import './styles/dashboard.css'
import { useEffect, useState } from 'react'
import api from './api/axios.js'
import { useNavigate} from 'react-router-dom'

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
                        <button onClick={() => handleDelete(workout.id)} className='delete-button'> Delete </button>
                    </div>
                </div>
            ))}

        </div>
    </div>
)

}

export default DashboardPage