import React from 'react';
import SimpleTable from './Components/SimpleTable';
import {AppBar, Button, Toolbar, Typography} from "@mui/material"; // Adjust the path as needed

function App() {
  return (
      <div>
        <h1></h1>
          <AppBar position="static" style={{padding:'0px'}}>
              <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1 ,padding:'0px'}}>
                      Yelp Reviews
                  </Typography>
                  <Button color="inherit">Table</Button>
                  <Button color="inherit">Add Review</Button>
              </Toolbar>
          </AppBar>
        <SimpleTable />
      </div>
  );
}

export default App;