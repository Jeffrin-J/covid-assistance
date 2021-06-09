import React from 'react';
import Routes from './routes.js';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const App=()=>{
  return(
    <ThemeProvider theme={theme}>
        <CssBaseline />
     <>
     <div>
     <Routes/>
     </div>
     </>
     </ThemeProvider>
  );
  }
  
export default App;
