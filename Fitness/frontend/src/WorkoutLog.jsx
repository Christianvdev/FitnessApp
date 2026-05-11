import { useEffect, useState } from "react"
import { useNavigate} from 'react-router-dom'
import api from './api/axios.js'

const WorkoutPage = () => {
    const [exercise, setExercise] = useState('')
    const [weight, setWeight] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [intensity, setIntensity] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/login')
        }
    }, [])

    const handleSubmit = async () => {
        try{
            const response = await api.post('/api/tracker/workout/', {
                exercise,
                weight: parseInt(weight),
                sets: parseInt(sets),
                reps: parseInt(reps),
                intensity: parseInt(intensity)
            })
            navigate('/dashboard')
        }
        catch(err){
             console.log('Error status:', err.response.status)
            console.log('Error data:', err.response.data)  // ← this shows exact Django error
            setError('Invalid')
        }
    }
    const handleNav = () =>{
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
            <button onClick={handleNav} className="header-button hover-scale"> Go back </button>
        </div>
        
    )
    
}

export default WorkoutPage