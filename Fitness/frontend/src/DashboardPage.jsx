import { useEffect, useState } from "react";
import api from './api/axios.js'
import { useNavigate } from "react-router-dom";

import './styles/DashboardPage.css'

const DashboardPage = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [selectedDay, setSelectedDay] = useState('Monday')

    const [username, setUsername] = useState('')
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

        fetchUser()
    }, [])

    const handleClick = (day) =>{
        setSelectedDay(day)
        navigate(`/dashboard/${day}`)
    }

    return(
        <div className="dashboard-title">
            <h2 style={{marginTop: '2rem'}}> Welcome back {username && username}</h2>
            <div className="day-container">
                {days.map(day => (
                    <div key={day}>
                        <button className="day-button" onClick={() => handleClick(day)}>{day}</button>
                    </div>
                ))}
            </div>
            
        </div>

    )


    
}

export default DashboardPage;