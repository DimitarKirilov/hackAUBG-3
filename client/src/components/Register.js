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
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleRegister = () => {
        const data = { username, password: repeatPassword};
        console.log(data);
        setUsername('');
        setPassword('');
        setRepeatPassword('');
        history.push('/');
    };

    return (
        <div className="background">
            <section className="login contentContainer">
                <h2>Register</h2>
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
                        />
                    </FormControl>
                    <FormControl variant="outlined" className="credentialField">
                        <InputLabel htmlFor="outlined-adornment-repeat-password">Repeat Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-repeat-password"
                            type={showRepeatPassword ? 'text' : 'password'}
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle reset password visibility"
                                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Reset Password"
                        />
                    </FormControl>
                    <Button variant="contained" color="primary" className="margin-top" onClick={handleRegister}>Register</Button>
                    <Link to='/' className="margin-top">Go to Login</Link>
                </form>
            </section>
        </div>
    );
}