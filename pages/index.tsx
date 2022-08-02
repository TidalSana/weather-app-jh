import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Switch,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import Header from "../components/header";
import axios from "axios";
import type { NextPage } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";
import WeatherContainer from "../components/weather";

const Home: NextPage = () => {
  // whether or not we are using City or Coords
  const [checked, setChecked] = useState(true);
  const [coords, setCoords] = useState({ latitude: "", longitude: "" });
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  // used to get coords
  const [iso, setISO] = useState({ zip: "", code: "" });
  // catches data from iso call
  const [isoCoords, setIsoCoords] = useState({ latitude: "", longitude: "" });
  // error msg for iso inpus
  const [isoError, setIsoError] = useState(false);

  // checking if there is an error
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // valid GET request
  const [found, setFound] = useState(false);
  const [success, setSuccess] = useState(false);

  const formBackground = useColorModeValue("gray.100", "gray.700");

  // toggles weather result component
  const changeFound = () => {
    setFound(false);
  };
  const fetchWeather = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    let URL;
    // city setting is on
    if (checked) {
      URL = process.env.NEXT_PUBLIC_CITY_WEATHER_URL;
      console.log(URL);
      const response = await axios
        .get(`${URL}q=${city}`, {
          params: {
            appid: API_KEY,
          },
        })
        .then((res) => {
          console.log(res.status);
          console.log(res.data);
          setError(false);
          setFound(true);
          setWeather(res.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setError(true);
          setErrMsg(error.response.data.message);
        });
    } else {
      URL = process.env.NEXT_PUBLIC_COORD_WEATHER_URL;
      const response = await axios
        .get(`${URL}lat=${coords.latitude}&lon=${coords.longitude}`, {
          params: {
            appid: API_KEY,
          },
        })
        .then((res) => {
          console.log(res.status);
          console.log(res.data);
          setError(false);
          setFound(true);
          setWeather(res.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setErrMsg(error.response.data.message);
          setError(true);
        });
    }
  };
  // change event for zipcode/country code
  const handleISO = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setISO({
      ...iso,
      [e.target.placeholder]: e.target.value,
    });
  };
  // looks for zipcode/country code
  const fetchCoords = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    let URL = process.env.NEXT_PUBLIC_ZIP_WEATHER_URL;

    const response = await axios
      .get(`${URL}zip=${iso.zip},${iso.code}`, {
        params: {
          appid: API_KEY,
        },
      })
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        setIsoError(false);
        setSuccess(true);
        setIsoCoords({
          ...isoCoords,
          latitude: res.data.lat,
          longitude: res.data.lon,
        });
      })
      .catch((error) => {
        console.log(error.message);
        setIsoError(true);
        setSuccess(false);
        setErrMsg(error.message);
      });
  };
  // stores input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    checked
      ? setCity(e.target.value)
      : setCoords({
          ...coords,
          [e.target.placeholder]: e.target.value,
        });
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Header />
      {/* if data or weather is found display found data, if not show search component*/}
      {found ? (
        <WeatherContainer close={changeFound} data={weather} />
      ) : (
        // Search via City
        <Flex
          direction="column"
          alignItems="center"
          background={formBackground}
          p={12}
          rounded={6}
        >
          <Heading mb={6}>
            {checked ? "Search City" : "Search Coordinates"}
          </Heading>
          {checked ? (
            <FormControl isInvalid={error}>
              {error ? (
                <FormHelperText>{errMsg}</FormHelperText>
              ) : (
                <FormErrorMessage>City is required</FormErrorMessage>
              )}
              <Input
                placeholder="Los Angeles, New York,..."
                variant="filled"
                mb={6}
                type="text"
                onChange={handleChange}
              />
            </FormControl>
          ) : (
            // Search via Coords
            <Stack spacing={2}>
              <FormControl isInvalid={isoError}>
                {isoError ? (
                  <FormHelperText>{errMsg}</FormHelperText>
                ) : (
                  <FormErrorMessage>Codes are required</FormErrorMessage>
                )}
                <Input
                  placeholder="zip"
                  variant="filled"
                  mb={1}
                  type="text"
                  onChange={handleISO}
                />
                <Input
                  placeholder="code"
                  variant="filled"
                  mb={6}
                  type="text"
                  onChange={handleISO}
                />
                <Button onClick={fetchCoords} colorScheme="teal" mb={6}>
                  Find Coords
                </Button>
                {success ? (
                  <Text>
                    Lat: {isoCoords.latitude} & Lon: {isoCoords.longitude}
                  </Text>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl isInvalid={error}>
                {error ? (
                  <FormHelperText>{errMsg}</FormHelperText>
                ) : (
                  <FormErrorMessage>Coordinates are required</FormErrorMessage>
                )}
                <Input
                  placeholder="latitude"
                  variant="filled"
                  mb={6}
                  type="text"
                  onChange={handleChange}
                />
                <Input
                  placeholder="longitude"
                  variant="filled"
                  mb={6}
                  type="text"
                  onChange={handleChange}
                />
              </FormControl>
            </Stack>
          )}

          <FormControl
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FormLabel htmlFor="city" mr={3}>
              City
            </FormLabel>
            <Switch
              aria-label="switch"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setChecked(e.currentTarget.checked)
              }
              size="lg"
              mb={3}
              isChecked={checked}
            />
          </FormControl>

          <Button onClick={handleSubmit} colorScheme="teal" mb={6}>
            Search
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
