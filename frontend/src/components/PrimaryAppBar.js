import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
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
import axios from 'axios';
import { red } from '@material-ui/core/colors';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DashBoard from './DashBoard.js';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  margin: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
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
  textField: {
    width: '51ch',
  },
  space:{
    marginBottom: "10px",
  },
  
}));



export default function PrimaryAppBar() {
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [username,setUserName]=React.useState(sessionStorage.getItem("username"));
  const [password,setPassword]=React.useState("");
  const [EmailError,setEmailerror]=React.useState("");
  const [RegisterUserName,setRegisterUserName]=React.useState("");
  const [RegisterPassword,setRegisterPassword]=React.useState("");
  const [NewRegisterPassword,setNewRegisterPassword]=React.useState("");
  const [PasswordError,setPasswordError]=React.useState("");
  const [register,setRegister]=React.useState(0);
  const [hospital_name,setHospital_name]=React.useState("");
  //console.log(sessionStorage.getItem("logged"));
  const [logged, setlogged]= React.useState(sessionStorage.getItem("logged") !== null ?  parseInt(sessionStorage.getItem("logged")) : 0);
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  
  // console.log(logged);
  // console.log(sessionStorage);
  // console.log("logged");

  const handleClickOpen = () => {
    setOpen(true);
    setRegister(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpens=()=>{

    setOpen(true);
    setRegister(1);

  }
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /* const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    event.preventDefault()
  }; */

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

  const handlelogout = () => {
    setlogged(0);
    axios
    .post("http://localhost:8000/api/logout",{})
    .then((res) => {
      if (res.data.message==="Success") {
        sessionStorage.setItem("logged",0);
        sessionStorage.setItem("username","");
        alert("successfully logged out")

      }
      else{
        alert(res.data.message);
      }

    });
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
      <MenuItem onClick={handlelogout} >LOGOUT</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  
  const renderMobileMenu = (
    <div>
      {
      (logged === 0) ?
        (
          <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            <MenuItem onClick={handleClickOpen}>
              <p>LOGIN</p>
            </MenuItem>
            <MenuItem onClick={handleClickOpen}>
            <p>REGISTER</p>
            </MenuItem>
          </Menu>
        )
        :
        (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem onClick={handlelogout}>
            LOGOUT
          </MenuItem>
        </Menu>
        )
      }
    </div>  
    
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
        if (res.data.message==="Logged in") {
          sessionStorage.setItem("logged",1);
          sessionStorage.setItem("username",username);
          handleClose();
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
    
    if(RegisterPassword!==NewRegisterPassword)
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
            
              { logged === 0 ?
                (
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="view in maps"  {...a11yProps(0)} />
                  <Tab label="Tables"  {...a11yProps(1)} />
                  </Tabs>
                )
                :
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Request"  {...a11yProps(0)} />
                </Tabs>
              }
            
          </div>

          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
      {logged === 0 ?
        <>
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
        </>
        :
        <div className={classes.spacing}>
            <Button variant="contained" color="secondary"  onClick={handlelogout}>
              LOGOUT
            </Button>
          </div>
      }
      

      {register===0 && (<Dialog
        fullWidth='unchecked'
        maxWidth='sm'
        open={open}
        onClose={handleClose}
        className = {classes.space}
      >
        
        
        <DialogContent>
        <DialogActions>
          <CloseIcon onClick={(e)=>handleClose(e)} color="secondary"/>
        </DialogActions>
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
          
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput onChange={(e)=>setPassword(e.target.value)}
            type={values.showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            value={password}
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

{EmailError!=="" &&(<p className={classes.error}><ErrorOutlineIcon color='error'/> {"  "+EmailError}</p>)}
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
      </Dialog>)}
      
      {register===1 &&(
      <Dialog
        fullWidth='checked'
        maxWidth='sm'
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
        <DialogActions>
          <CloseIcon onClick={(e)=>handleClose(e)} color="secondary"/>
        </DialogActions>
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
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput onChange={(e)=>setRegisterPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type={values.showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            id="password"
            value={RegisterPassword}
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            
          />
          </FormControl>

          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Renter Password</InputLabel>
          <OutlinedInput onChange={(e)=>setNewRegisterPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            type={values.showPassword ? 'text' : 'password'}
            name="password"
            label="Confirm Password"
            id="password"
            value={NewRegisterPassword}
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          </FormControl>

{PasswordError!=="" &&(<p className={classes.error}> <ErrorOutlineIcon color='error'/> {"  "+PasswordError}</p>)}


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
      {logged === 0 ?
        <>
          <div>
            <TabPanel value={value} index={0}>
              <MapContainer/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TableContainer/>
            </TabPanel>
          </div>
        </>
        :
        <div>
            <TabPanel value={value} index={0}>
              <DashBoard username = {username}/>
            </TabPanel>
        </div>
      }
      
      
      {renderMobileMenu}
      {renderMenu}

      
    </div>
  );
}