import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Weather.css";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

export default function Weather() {
  const [data, setdata] = React.useState("");
  const [Data2, setData2] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const handleChange = (e) => {
    setdata(e.target.value);
  };
  const handleClick = () => {
    let apiKey = `bcf71a78f2714a1c84e85029242402`;
    setLoading(true);
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${data}&aqi=no`
      )
      .then((res) => {
        setData2(res.data);
        setLoading(false);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <center>Weather Forecasting by Shivam Mehta</center>
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <TextField
          id="filled-size-normal"
          variant="filled"
          label="Search City"
          onChange={(e) => {
            handleChange(e, "Search City");
          }}
        />
        <div>
          {loading ? (
            <p>loading</p>
          ) : (
            <Box sx={{ minWidth: 275 }}>
              {Data2 && Data2.location && Data2.current && (
                <center>
                  <Card variant="outlined">
                    <CardMedia
                      sx={{ height: 140 }}
                      image="C:\Users\Shivam Mehta\Downloads\weather image.jpg"
                      title="weather image"
                    />
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Today's Weather
                      </Typography>
                      <Typography variant="h5" component="div">
                        City: {Data2.location.name}
                      </Typography>
                      <Typography>
                        Temperature: {Data2.current.temp_c}°C
                      </Typography>
                      <Typography>
                        Temperature: {Data2.current.temp_f}°F
                      </Typography>
                      <Typography>
                        Humidity: {Data2.current.humidity}%
                        <br />
                      </Typography>
                    </CardContent>
                  </Card>
                </center>
              )}
            </Box>
          )}
        </div>

        <Button
          variant="contained"
          onClick={() => {
            handleClick();
          }}
        >
          Search
        </Button>
      </div>
    </Box>
  );
}
