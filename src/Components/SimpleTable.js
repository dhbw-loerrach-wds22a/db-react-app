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
    Button, Grid, AppBar, Toolbar, Typography
} from '@mui/material';

function SimpleTable() {

    const [name, setName] = useState('');
    const [rows, setRows] = useState([]);
    const [reviews, showReviews] = useState([]);
    const [addressFilter, setAddressFilter] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAddressFilterChange = (event) => {
        setAddressFilter(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchData();
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost/business/${name}`);
            const data = await response.json();
            setRows(data); // assuming the API returns an array of arrays
            console.log("Updated Rows: ", rows);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    // Filter rows based on the address filter
    const filteredRows = rows.filter(row => row[2].toLowerCase().includes(addressFilter.toLowerCase()));


    return (
        <div>
            <Grid>
                <TextField
                    label="Name"
                    value={name}
                    onKeyDown={handleKeyDown}
                    onChange={handleNameChange}
                    style={{margin: '10px 10px'}}
                />
                <Button
                    onClick={fetchData}
                    style={{margin: '15px '}}>Load Data</Button>
            </Grid>

                <div style={{margin: '0'}}>
                    <TextField
                        fullWidth
                        id="full-width-text-field"
                        label="Filter by Address"
                        value={addressFilter}
                        onChange={handleAddressFilterChange}
                        style={{ maxWidth: 'calc(100% - 20px)', margin: '10px' }}
                    />
                </div>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TableContainer component={Paper} style={{ maxWidth: 'calc(100% - 20px)', margin: '10px' }}>


                <Table aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Zip</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row[1]}</TableCell>
                                <TableCell>{row[2]}</TableCell>
                                <TableCell>{row[3]}</TableCell>
                                <TableCell>{row[4]}</TableCell>
                                <TableCell>{row[5]}</TableCell>
                                <TableCell>
                                    <Button onClick={() => showReviews(row[0])}>Show Reviews</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </div>
    );
}

export default SimpleTable;
