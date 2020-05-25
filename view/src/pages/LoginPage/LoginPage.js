import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

import styles from './styles'

const LoginPage = ({classes, history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
   
    // useEffect(() => {
    //     console.log(props);
    //     setErrors(props.UI?.errors)
    // }, [props.UI?.errors])

    const changeEmail = event => {
		setEmail(event.target.value)
    };
    
    const changePassword = event => {
		setPassword(event.target.value)
    };

    const handleSubmit  = async event => {
		event.preventDefault();
		setLoading(true)
        const userData = { email, password };
        
        try {
            const response = await axios.post('/login', userData);
            localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
            setLoading(false);	
            history.push('/');
        } catch (error) {
            setErrors(error.response.data);
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        onChange={changeEmail}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        onChange={changePassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={loading || !email || !password}
                    >
                        Sign In
                        {loading && <CircularProgress size={30} className={classes.progess} />}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )}
                </form>
            </div>
        </Container>
    )
}

export default withStyles(styles)(LoginPage);