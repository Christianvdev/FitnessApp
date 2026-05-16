import { useEffect, useState } from "react"
import { useNavigate, useParams} from 'react-router-dom'
import api from './api/axios.js'


const WorkoutLogging = () => {
    const [exercise, setExercise] = useState('')
    const [weight, setWeight] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [intensity, setIntensity] = useState('')
    const [error, setError] = useState('')

    const {day} =  useParams()

    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/login')
        }
    }, [])

    const dayMap = {
        'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
        'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7,
    }
    const handleSubmit = async () => {
        try{

            const response = await api.post('/api/tracker/workout/', {
                exercise,
                weight: parseInt(weight),
                sets: parseInt(sets),
                reps: parseInt(reps),
                intensity: parseInt(intensity),
                days: dayMap[day]
            })
            navigate('/home')
        }
        catch(err){
            console.log('Error status:', err.response.status)
            console.log('Error data:', err.response.data)
            setError('Invalid')
        }
    }
    const handleNav = () =>{
        navigate('/home')
    }

    return(
        <div className="login-whole">
            <input className="form-text" type="text"
                placeholder="enter exercise"
                value={exercise}
                onChange={(e) => {
                    const lettersOnly = e.target.value.replace(/[^a-zA-Z ]/g, '');
                    setExercise(lettersOnly)
                }}
            />

            <input className="form-text" type="number"
                placeholder="enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />

            <input className="form-text" type="number"
                placeholder="enter sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
            />

            <input className="form-text" type="number"
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




export default WorkoutLogging;