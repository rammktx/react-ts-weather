import * as React from 'react';
import './style.css';
import { useState } from 'react';
import { Button, TextField, Box, Card } from '@mui/material';

export default function App() {
  const [zipcode, setZipCode] = useState('08831');
  const [weather, setWeather] = useState({});

  function getWeather() {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?zip=' +
        zipcode +
        ',us&appid=052f26926ae9784c2d677ca7bc5dec98'
    )
      .then((response) => response.json())
      .then((w) => {
        console.log(w);
        setWeather(w);
      })
      .catch((error) => console.log(error));
  }

  const handleSubmit = function handle(event) {
    event.preventDefault();
    getWeather();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card variant="outlined" >
      <p>City: {weather.name ? weather.name : 'Monroe Township'}</p>
      <p>
        Description:{' '}
        {weather.weather ? weather.weather[0].description : 'Rain Coming'}
      </p>
      <p>High Temp: {weather.main ? weather.main.temp_max : '55.0'}</p>
      <p>Low Temp: {weather.main ? weather.main.temp_min : '35.0'}</p>
      </Card>
      <form onSubmit={handleSubmit}>
        <TextField
          label="ZipCode"
          variant="outlined"
          type="text"
          name="name"
          value={zipcode}
          onChange={(event) => setZipCode(event.target.value)}
        />
        <Button type="submit" variant="contained">
          "Get My forecast"{' '}
        </Button>
      </form>
    </Box>
  );
}
