import React, {useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button, Grid, AppBar, Toolbar, Typography, Rating, Box
} from '@mui/material';

function ReviewInput() {

    const [businessId, setBusinessId] = useState('');
    const [stars, setStars] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate the input
        if (stars < 1 || stars > 5) {
            alert('Stars must be between 1 and 5.');
            return;
        }

        const reviewData = {
            business_id: businessId,
            stars: stars,
            text: reviewText,
        };

        try {
            const response = await fetch('http://localhost/review/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            // Reset form or handle success (e.g., display a success message)
        } catch (error) {
            console.error('Error posting review:', error);
            // Handle error (e.g., display an error message)
        }
    };


    return (
        <div style={{backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%'}}>
            <div style={{backgroundColor: '#f5f5f5', minHeight: '50px'}}></div>
            <div style={{
                backgroundColor: '#ffffff',
                maxWidth: 'calc(100% - 1200px)',
                margin: '20px',
                marginLeft: '600px',
                paddingTop: '60px',
                paddingBottom: '60px',
                marginBottom: '0px',
                marginTop: '0px',
                boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
            }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h6" style={{flexGrow: 1, display: "flex", justifyContent: "center"}}>
                        Add new Review
                    </Typography>

                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <TextField
                            required
                            id="business-id"
                            label="Business ID"
                            value={businessId}
                            onChange={(e) => setBusinessId(e.target.value)}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Rating
                            name="simple-controlled"
                            value={stars}
                            onChange={(event, newValue) => {
                                setStars(newValue);
                            }}
                            max={5}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <TextField
                            required
                            id="review-text"
                            label="Review Text"
                            multiline
                            rows={4}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit Review
                        </Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default ReviewInput;
