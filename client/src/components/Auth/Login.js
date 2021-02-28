import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import './Login.css';

export default function Login() {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        let data = { username, password };
        console.log(data);
        setUsername('');
        setPassword('');
        history.push('/home');
    };

    return (
        <div className="background">
            <section className="login contentContainer">
                <h2>Login</h2>
                <form className="formContainer">
                    <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} className="credentialField"></TextField>
                    <FormControl variant="outlined" className="credentialField">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <Button variant="contained" color="primary" className="margin-top" onClick={handleLogin}>Login</Button>
                    <Link to='/register' className="margin-top">You dont have an account? Register now!</Link>
                </form>
            </section>
        </div>
    );
}