import React, {useState, useEffect} from 'react';
import {apiHost} from "../apiConfig";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    TextField, Rating, Button, CircularProgress
} from '@mui/material';
import StarRatingBarChart from "../Components/StarRatingBarChart";

const ReviewsTable = ({businessId}) => {
    const [reviews, setReviews] = useState([]);
    const [metaData, setMetadata] = useState([]);
    const [avgStars, setAvgStars] = useState([]);
    const [loading, setLoading] = useState(false); // State to track loading

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${apiHost}/reviews/${businessId}`);
                const data = await response.json();
                setReviews(data);
                setAvgStars(Math.round(data.reduce((acc, review) => acc + review.stars, 0) / data.length));
                console.log(avgStars);
                setLoading(false);// Assuming the API returns an array of review objects
            } catch (error) {
                console.error('Error fetching reviews: ', error);
                setLoading(false);
            }
        };

        const fetchMetaData = async () => {
            try {
                const response = await fetch(`${apiHost}/business_id/${businessId}`);
                const data = await response.json();
                setMetadata(data); // Assuming the API returns an array of review objects
            } catch (error) {
                console.error('Error fetching reviews: ', error);
            }
        };

        if (businessId) {
            fetchReviews();
            fetchMetaData();
        }
    }, [businessId]); // The effect runs when businessId changes

    return (
        <div style={{backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%'}}>

            <div style={{backgroundColor: '#f5f5f5', minHeight: '50px'}}></div>
            <div style={{backgroundColor: '#f5f5f5', width: '100%', display:"grid",  gridTemplateColumns:"1fr 1fr"}}>
                <div style={{
                    backgroundColor: '#ffffff',
                    maxWidth: 'calc(100% - 320px)',
                    margin: '20px',
                    marginLeft: '200px',
                    paddingTop: '60px',
                    paddingBottom: '60px',
                    paddingLeft: '60px',
                    paddingRight: '60px',
                    marginBottom: '0px',
                    marginTop: '0px',
                    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
                }}>
                    {loading ? (
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <CircularProgress />
                            </Box>
                    ) : (
                    <div>
                        <Typography variant="h4" style={{flexGrow: 1, display: "flex", justifyContent: "left"}}>
                            {metaData[1]}
                        </Typography>
                        <Typography variant="h7" style={{flexGrow: 1, display: "flex", justifyContent: "left"}}>
                            id: {metaData[0]}
                        </Typography>
                        <Typography variant="h7" style={{flexGrow: 1, display: "flex", justifyContent: "left"}}>
                            Street: {metaData[2]}
                        </Typography>
                        <Typography variant="h7" style={{flexGrow: 1, display: "flex", justifyContent: "left"}}>
                            City: {metaData[3]}
                        </Typography>
                        <Typography variant="h7" style={{flexGrow: 1, display: "flex", justifyContent: "left"}}>
                            State: {metaData[4]}
                        </Typography>
                        <Typography variant="h7" style={{flexGrow: 1, display: "flex", justifyContent: "left"}}>
                            Zip: {metaData[5]}
                        </Typography>
                        <Typography variant="h7" style={{flexGrow: 1, display: "flex", justifyContent: "left", alignItems: "center"}}>
                            Rating ({reviews.length}):<Rating
                            name="simple-controlled"
                            value={avgStars}
                            max={5}
                            readOnly
                            style={{flexGrow: 1, display: "flex", justifyContent: "left", paddingLeft:"10px"}}
                        />
                        </Typography>

                    </div>
                    )}
                </div>
                <div style={{
                    backgroundColor: '#ffffff',
                    maxWidth: 'calc(100% - 320px)',
                    margin: '20px',
                    marginLeft: '0px',
                    paddingTop: '60px',
                    paddingBottom: '60px',
                    paddingLeft: '60px',
                    paddingRight: '60px',
                    marginBottom: '0px',
                    marginTop: '0px',
                    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
                }}>
                    {loading ? (
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : (
                    <div>
                        <StarRatingBarChart reviews={reviews} />
                    </div>
                    )}


                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {loading ? (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : (
                <TableContainer component={Paper}
                                style={{maxWidth: 'calc(100% - 20px)', margin: '200px', marginTop: '50px'}}>
                    <Table aria-label="reviews table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Stars</TableCell>
                                <TableCell>Useful</TableCell>
                                <TableCell>Funny</TableCell>
                                <TableCell>Cool</TableCell>
                                <TableCell>Text</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviews.map((review) => (
                                <TableRow key={review.review_id}>
                                    <TableCell>{review.stars}</TableCell>
                                    <TableCell>{review.useful}</TableCell>
                                    <TableCell>{review.funny}</TableCell>
                                    <TableCell>{review.cool}</TableCell>
                                    <TableCell>{review.text}</TableCell>
                                    <TableCell>{review.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    )}
            </div>
        </div>
    );
};

export default ReviewsTable;
