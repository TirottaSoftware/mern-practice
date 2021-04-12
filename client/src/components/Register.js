import {useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationSummary, setValidationSummary] = useState("");

    const handleUsernameInput = (e) =>{
        setUsername(e.target.value);
    }
    const handlePasswordInput =(e) =>{
        setPassword(e.target.value);
    }
    const handleConfirmPasswordInput =(e) =>{
        setConfirmPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setValidationSummary("Passwords do not match");
        }
        else{
            let user = {
                username,
                password
            }
             axios.post("/users", user).catch(err => console.log(err));
             setUsername("");
             setPassword("");
             setConfirmPassword("");
        }
    }

    return <div>
        <form method = "post" onSubmit = {handleSubmit}>
            <label className = "validation-summary">{validationSummary}</label>
            <input type = "text" onChange = {handleUsernameInput} value = {username} placeholder = "username"/>
            <input type = "password" onChange = {handlePasswordInput} value = {password} placeholder = "password"/>
            <input type = "password" onChange = {handleConfirmPasswordInput} value = {confirmPassword} placeholder = "password"/>
            <input type = "submit" />
        </form>
    </div>
}

export default Register;