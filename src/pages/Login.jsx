import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router";
import './login.css';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../utils/AuthContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext);
    
    const handleLogin = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword( auth, email, password )
            .then((userCredential) =>  {
                const user = userCredential.user;
                dispatch({type: "LOGIN", payload: user})
                navigate("/");
            })
            .catch((error) => {
                setError(true);
            });
        }


  return (
    <div className="login-page">
        <form class="login-form" onSubmit={handleLogin}>
            <h1>Login</h1>
            <div class="form-input-material">
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder=" " 
                    autocomplete="off" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    required 
                    class="form-control-material" 
                />
                <label for="email">Email ID</label>
            </div>
            <div class="form-input-material">
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder=" " 
                    autocomplete="off" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    required 
                    class="form-control-material" 
                />
                <label for="password">Password</label>
            </div>
            {error && <span>Wrong Credentials!</span>}
            <button class="btn btn-ghost" type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login;