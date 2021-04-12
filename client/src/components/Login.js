import {useState} from 'react';
import axios from 'axios';

const passwordHash = require('password-hash');

const Login = () => {

    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [hash, setPasswordHash] = useState("");
    
    const handleUsernameChange = (e) =>{
        setUsernameInput(e.target.value);
    }
    
    const handlePasswordChange = (e) =>{
        setPasswordInput(e.target.value);
    }
    
    const getHashedPassword = (username) => {
        
        axios.get("/users/" + username).then(res => setPasswordHash(res.data[0].passwordHash));
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        getHashedPassword(usernameInput);
        
        //If hash is not null -> verify 
        if(hash !== null){
            //let passwordVerified = passwordHash.verify(passwordInput, hash);
            //if pass verified -> login
            //if not -> display "Wrong credentials" error message
        }    
    }

    return <form onSubmit = {handleSubmit}>
            <input onChange = {handleUsernameChange} type = "text" placeholder = "username" />
            <input onChange = {handlePasswordChange} type = "password" placeholder = "password" />
            <input type = "submit" value = "Login" /> 
        </form>
}

export default Login;