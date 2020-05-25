import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Account from '../../components/Account/Account';
import Todo from '../../components/Todo/Todo';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import Avatar from '@material-ui/core/avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './styles'

import { authMiddleWare } from '../../utils/auth'

const Home = ({history, classes}) => {
    const [render, setRender] = useState(false);

    const [firstName, seFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [uiLoading, setUiLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
	

	const loadAccountPage = event => {
		setRender(true);
	};

	const loadTodoPage = event => {
		setRender(false);
	};

	const logoutHandler = event => {
		localStorage.removeItem('AuthToken');
		history.push('/login');
    };

    // const getAuth = async () => {
    //     const authToken = localStorage.getItem('AuthToken');
    //     axios.defaults.headers.common = { Authorization: `${authToken}` };
    //     try {
    //         const response = await axios.get('/user');
    //         const { firstName,
    //             lastName,
    //             email,
    //             phoneNumber,
    //             country,
    //             username,
    //             imageUrl
    //          } = await response.data.userCredentials;
    //         seFirstName (firstName);
    //         setLastName(lastName);	
    //         setEmail(email);
    //         setPhoneNumber(phoneNumber);
    //         setCountry(country);
    //         setUsername(username);
    //         setUiLoading(false);
    //         setProfilePicture(imageUrl);
    //     } catch (error) {
    //         if(error.response.status === 403) {
    //             history.push('/login')
    //         }
    //         console.log(error);
    //         setErrorMsg('Error in retrieving the data');
    //     }
    // }

    useEffect(() => {
        authMiddleWare(history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
			.get('/user')
			.then((response) => {
				console.log(response.data);
				
                seFirstName (response.data.userCredentials.firstName);
                setLastName(response.data.userCredentials.lastName);	
                setEmail(response.data.userCredentials.email);
                setPhoneNumber(response.data.userCredentials.phoneNumber);
                setCountry(response.data.userCredentials.country);
                setUsername(response.data.userCredentials.username);
                setUiLoading(false);
                setProfilePicture(response.data.userCredentials.imageUrl);
				
			})
			.catch((error) => {
				if(error.response.status === 403) {
					history.push('/login')
				}
				// console.log(error);
				// setErrorMsg('Error in retrieving the data');
			});
    }, [history])

    const renderContent = () => {
        if (uiLoading) {
            return (
                <div className={classes.root}>
                    {uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
                </div>
            ) 
        } else {
            return (
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                TodoApp
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper
                        }}
                    >
                        <div className={classes.toolbar} />
                        <Divider />
                        <center>
                            <Avatar src={profilePicture} className={classes.avatar} />
                            <p>
                                {' '}
                                {firstName} {lastName}
                            </p>
                        </center>
                        <Divider />
                        <List>
                            <ListItem button key="Todo" onClick={loadTodoPage}>
                                <ListItemIcon>
                                    {' '}
                                    <NotesIcon />{' '}
                                </ListItemIcon>
                                <ListItemText primary="Todo" />
                            </ListItem>

                            <ListItem button key="Account" onClick={loadAccountPage}>
                                <ListItemIcon>
                                    {' '}
                                    <AccountBoxIcon />{' '}
                                </ListItemIcon>
                                <ListItemText primary="Account" />
                            </ListItem>

                            <ListItem button key="Logout" onClick={logoutHandler}>
                                <ListItemIcon>
                                    {' '}
                                    <ExitToAppIcon />{' '}
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </Drawer>

                    <div>{render ? <Account /> : <Todo />}</div>
                </div>
            )
        }
    }

	return (
        renderContent()
    )
		
}

export default withStyles(styles)(Home);