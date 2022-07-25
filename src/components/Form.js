import React, { useEffect, useState } from 'react'
import './Form.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
// import { positions } from '@mui/system';
import axios from 'axios'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import GooleAutoComplete from './GooleAutoComplete.js';

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const Api_key = `4afbfd7af4f303355b1691a0302f2227`;

function Form() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [resData, setResdata] = useState('');

    // const date = new Date();
    let data = resData;
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        })
        let FnalApiEndPoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${Api_key}`
        axios.get(FnalApiEndPoint).then((response) => {
            setResdata(response.data.name);
            console.log(response.data);
        })
        // console.log(FnalApiEndPoint);
    }, [latitude, longitude])

    const [value, setValue] = React.useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="form-bg">
                <Stack spacing={2} direction="row">
                    <Button type="text" variant="outlined"><span style={{ color: '#ffff' }}>On Way</span></Button>
                    <Button ><span style={{ color: '#C99C55', marginTop: "28px" }}>By the Hour</span></Button>
                </Stack>
                <div style={{ marginLeft: "20px" }}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="on"
                    >
                        <TextField label="Pick Up" id="standard-basic" value={data} type="text" variant="standard" />

                        <TextField label="Dropoff" id="standard-basic" value={data} type="text" variant="standard" />
                        {/* <GooleAutoComplete /> */}
                        <Box md sx={{ width: 1 }}>
                            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                                <Box gridColumn="span 6">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            inputFormat="dd MMM yyyy"
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <Box gridColumn="span 6">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </div>
                <div style={{ textAlign: '', marginLeft: '25px' }}>
                    <Checkbox {...label} defaultChecked />
                    <small style={{ color: 'white' }}>I have read and agree to the privacy policy.</small>
                </div>
                <div className='search-btn' style={{ textAlign: 'left', marginLeft: '25px' }}>
                    <Button variant="outlined"><span style={{ color: '#ffff', borderRadius: '15px' }}>Search</span></Button>
                </div>
            </div>
        </>
    )
}

export default Form