import { useEffect, useState } from "react";
import api from './api/axios.js'
import { useNavigate } from "react-router-dom";

import './styles/DashboardPage.css'

const DashboardPage = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [selectedDay, setSelectedDay] = useState('Monday')

    const [username, setUsername] = useState('')
    const [totalWorkouts, setTotalWorkouts] = useState(0)
    const [totalSets, setTotalSets] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        

        const token = localStorage.getItem('access_token')
        if(!token){
            navigate('/')
            return
            
        }

        const fetchUser = async() => {
            try
            {
                const res = await api.get('/api/accounts/me/')
                setUsername(res.data.username)
            }
            catch(err){
                console.error(err);
                
            }
           
        }

        const fetchWorkouts = async () => {
            try{
                const response = await api.get(`/api/tracker/workout/`)
                setTotalWorkouts(response.data.length)
                
                const total = response.data.reduce((sum, workout,) => {
                    return sum + workout.sets
                }, 0)

                setTotalSets(total)
            }
                catch(err){
                console.log(err)
            }

        }
        fetchWorkouts()
        fetchUser()
    }, [])

    const handleClick = (day) =>{
        setSelectedDay(day)
        navigate(`/dashboard/${day}`)
    }

    return(
        <div className="dashboard-whole">
            <h2 style={{marginTop: '2rem'}} className="dashboard-title title"> Welcome back {username && username}</h2>
            <div className="dashboard-left">
                <div>
                    <div className="day-container">
                        {days.map(day => (
                            <div key={day}>
                                <button className="day-button" onClick={() => handleClick(day)}>{day}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="dashboard-right">
                <h1 className="dr-header"> This weeks:</h1>
                <div className="workout-amount">
                        <h1>Total workouts:</h1>
                        {totalWorkouts && <h1 className="dr-stat">{totalWorkouts}</h1>}
                </div>
                <div className="workout-sets">
                    <h1>total sets:</h1>
                    {totalSets && <h1 className="dr-stat">{totalSets}</h1>}
                </div>
            </div>
        </div>
       

    )


    
}

export default DashboardPage;