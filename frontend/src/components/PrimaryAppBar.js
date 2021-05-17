import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Link, Redirect } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TableContainer from './TableContainer.js';
import MapContainer from './Userlocation.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Container,CssBaseline,Avatar,Checkbox} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { red } from '@material-ui/core/colors';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  spacing: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputborder:{
    border:red 
  },
  error:{
    color: red,
    fontsize: 'small',
    fontweight: 'lighter!important', 
    textalign: 'center !important',
  },
  
  
}));



export default function PrimaryAppBar() {
  
    
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [username,setUserName]=React.useState("");
  const [password,setPassword]=React.useState("");
  const [EmailError,setEmailerror]=React.useState("");
  const [RegisterUserName,setRegisterUserName]=React.useState("");
  const [RegisterPassword,setRegisterPassword]=React.useState("");
  const [NewRegisterPassword,setNewRegisterPassword]=React.useState("");
  const [PasswordError,setPasswordError]=React.useState("");
  const [register,setRegister]=React.useState(0);
  const [hospital_name,setHospital_name]=React.useState("");
  const [logged, setlogged]=React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
    setRegister(0);
  };

  const handleClose = (e) => {
    setOpen(false);

    e.preventDefault();
  };

  const handleClickOpens=()=>{

    setOpen(true);
    setRegister(1);

  }
  


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    event.preventDefault()
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    event.preventDefault()
  };


  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/Logout">Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">e
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} component={Link} to="/Logout">
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
        </IconButton>
        <ExitToAppIcon />
        Logout
      </MenuItem>
    </Menu>
  );

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={0}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  
  const handlesubmit=(e)=>{
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/validateuser",{username:username,password:password})
      .then((res) => {
        console.log(res)
        if (res.data.message=="Logged in") {
          console.log(res.data.message);
          setlogged(1);
        }
        else 
        {
          setEmailerror(res.data.message)
        }
        
      });
  };


  const handleRegistersubmit=(e)=>{
    e.preventDefault();
    
    if(RegisterPassword!=NewRegisterPassword)
    {

      setPasswordError("check the password");

    }

    else{

    axios
      .post("http://localhost:8000/api/get",{username: RegisterUserName,password: RegisterPassword, hospital_name: hospital_name})
      .then((res) => {
        if (res.data.message==="user created successfully") {

        }
        else
        {
          setPasswordError(res.data.message);
        }
      });

    }
  };

  
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> 
          <Typography className={classes.title} variant="h6" noWrap>
            COVID ASSISTANCE
          </Typography>
          <div>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="view in maps"  {...a11yProps(0)} />
              <Tab label="Tables"  {...a11yProps(1)} />
            </Tabs>
          </div>

          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
      <div className={classes.spacing}>
      <Button variant="contained" color="secondary"  onClick={handleClickOpen}>
        LOGIN
      </Button>
      </div>

      <div className={classes.spacing}>
      <Button variant="contained" color="secondary" onClick={handleClickOpens}>
        REGISTER
      </Button>
      </div>

      {register==0 && (<Dialog
        fullWidth='checked'
        maxWidth='sm'
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>

        <form className={classes.form}  >


          <TextField onChange={(e)=>setUserName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="User Name"
            name="username"
            autoComplete="email"
            value={username}
            autoFocus
          />
          
          <TextField onChange={(e)=>setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

{EmailError!="" &&(<p className={classes.error}><ErrorOutlineIcon color='error'/> {"  "+EmailError}</p>)}
          <Button
            onClick = {handlesubmit}
            fullWidth
            variant="contained"
            color="primary"
            type='submit'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e)=>handleClose(e)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>)}
      
      {register==1 &&(
      <Dialog
        fullWidth='checked'
        maxWidth='sm'
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        
        <form className={classes.form} >
          <TextField onChange={(e)=>{setRegisterUserName(e.target.value)}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="User Name"
            name="email"
            autoComplete="email"
            value={RegisterUserName}
            autoFocus
          />

          <TextField onChange={(e)=>setHospital_name(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Hospital Name"
            name="username"
            autoComplete="email"
            value={hospital_name}
            
          />  

          <TextField onChange={(e)=>setRegisterPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={RegisterPassword}
            autoComplete="current-password"
          />

          <TextField onChange={(e)=>setNewRegisterPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            value={NewRegisterPassword}
            autoComplete="current-password"
          />

{PasswordError!="" &&(<p className={classes.error}> <ErrorOutlineIcon color='error'/> {"  "+PasswordError}</p>)}


          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegistersubmit}
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      )}


      </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <div>
        <TabPanel value={value} index={0}>
          <MapContainer/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableContainer/>
        </TabPanel>
      </div>

      {renderMobileMenu}
      {renderMenu}

      {logged==1 && (<Redirect to={`/dashboard/${username}`}  />)}
    </div>
  );
}