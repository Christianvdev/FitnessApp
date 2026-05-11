import { useEffect, useState } from "react";
import api from "./api/axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if(token){
            navigate('/dashboard')
            return
        }
    },[])
    
    const handleRegister = async () => {
        try{
            const response = await api.post('/api/accounts/users/',{
                username,
                password
            })
            alert('successful registration')
            navigate('/login')

        }catch(err){
            setError('Invalid credentials')
        }
    }
    const transferLogin = () => {
        navigate('/Login')
    }
 
    return(
        <div className="login-whole">
            <input className="form-text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input className="form-text"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p>{error}</p>}
            <button className="form-text" onClick={handleRegister}>Sign up</button>
            <button className="form-text" onClick={transferLogin}>Already have an account?</button>
        </div>
    )
}

export default RegisterPage