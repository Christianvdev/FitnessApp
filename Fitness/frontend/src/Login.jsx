import { useEffect, useState } from "react";
import api from './api/axios.js'
import { useNavigate} from 'react-router-dom'

import './styles/Login.css'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    useEffect(() =>{
        const token = localStorage.getItem('access_token')
        if(token){
            navigate('/dashboard')
        }
    }, [])

    const transferRegister = () => {
        navigate('/')
    }


    const handleSubmit = async () => {
        try {
            const response = await api.post('/api/token/', {
                username,
                password
            })
            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
            navigate('/dashboard')
        }
        catch(err){
            setError('Invalid username or password')
        }

    }
    return(
        <div className="login-whole">
            <input className="form-text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input className="form-text"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p>{error}</p>}
            <button onClick={handleSubmit} className="form-text">Login</button>
            <button onClick={transferRegister} className="form-text">Dont have an account?</button>
        </div>
    )
}

export default LoginPage