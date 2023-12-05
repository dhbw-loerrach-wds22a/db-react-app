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
    Button, Grid, AppBar, Toolbar, Typography, Select, MenuItem
} from '@mui/material';

const BusinessTable = (props) => {
    // ... (other component logic)

    // Add a state for the dropdown selection
    const [filterType, setFilterType] = useState('name');

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
    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchData();
        }
    };

    // Use the onShowReviews prop by accessing it from props


    const fetchData = async () => {
        try {
            if (!name) {
                // If name is empty, reset rows to an empty array or keep the previous data
                setRows([]);
                return; // Exit the function early
            }
            const response = await fetch(`http://api/business/${name}`);
            const data = await response.json();
            setRows(data); // assuming the API returns an array of arrays
            console.log("Updated Rows: ", rows);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleShowReviewsClick = (rowId) => {
        // Assuming the rowId identifies which business's reviews to show
        props.onShowReviews(rowId);
    };

    // Adjust the filtering logic based on the selected filter type
    const filteredRows = rows.filter(row => {
        switch (filterType) {
            case 'name':
                return row[1].toLowerCase().includes(addressFilter.toLowerCase());
            case 'address':
                return row[2].toLowerCase().includes(addressFilter.toLowerCase());
            case 'city':
                return row[3].toLowerCase().includes(addressFilter.toLowerCase());
            case 'state':
                return row[4].toLowerCase().includes(addressFilter.toLowerCase());
            case 'zip':
                return row[5].toLowerCase().includes(addressFilter.toLowerCase());
            // Add cases for other filter types...
            default:
                return true;
        }
    });


    return (
        <div style={{backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%'}}>

            <div style={{backgroundColor: '#f5f5f5', minHeight: '50px'}}></div>
            <div style={{
                backgroundColor: '#ffffff',
                maxWidth: 'calc(100% - 20px)',
                margin: '200px',
                marginBottom: '0px',
                marginTop: '0px'
            }}>
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

                <div style={{margin: '0'}}>
                    <TextField
                        fullWidth
                        id="full-width-text-field"
                        label="Filter by Address"
                        value={addressFilter}
                        onChange={handleAddressFilterChange}
                        style={{maxWidth: 'calc(100% - 200px)', margin: '10px'}}
                    />
                    <Select
                        style={{maxWidth: '190px', margin: '10px'}}
                        value={filterType}
                        onChange={handleFilterTypeChange}
                        style={{margin: '10px 10px'}}>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="address">Address</MenuItem>
                        <MenuItem value="city">City</MenuItem>
                        <MenuItem value="state">State</MenuItem>
                        <MenuItem value="zip">Zip</MenuItem>
                    </Select>
                </div>
            </div>


            <div style={{display: 'flex', justifyContent: 'center'}}>
                <TableContainer component={Paper}
                                style={{maxWidth: 'calc(100% - 20px)', margin: '200px', marginTop: '0px'}}>


                    <Table aria-label="simple table">
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
                                        <Button onClick={() => handleShowReviewsClick(row[0])}>Show Reviews</Button>
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

export default BusinessTable;
