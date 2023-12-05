import React, {useState} from 'react'; // Import useState here
import BusinessTable from './Components/BusinessTable';
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import ReviewInput from "./Components/ReviewInput";
import BusinessView from "./Views/BusinessView"; // Adjust the path as needed

function App() {
    const [currentView, setCurrentView] = useState('businessView'); // 'businessView' or 'input'

    // The function names should match the ones used in the onClick handlers
    const handleTableClick = () => {
        if (currentView !== 'businessView') {
            setCurrentView('businessView');
        }
    };

    const handleAddReviewClick = () => {
        if (currentView !== 'input') {
            setCurrentView('input');
        }
    };

    return (
        <div>
            <AppBar position="static" style={{marginTop: 0}}>
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        Yelp Reviews
                    </Typography>
                    <Button color="inherit" onClick={handleTableClick}>
                        Table
                    </Button>
                    <Button color="inherit" onClick={handleAddReviewClick}>
                        Add Review
                    </Button>
                </Toolbar>
            </AppBar>
            {currentView === 'businessView' && <BusinessView/>}
            {currentView === 'input' && <ReviewInput/>}
        </div>
    );
}

export default App;
