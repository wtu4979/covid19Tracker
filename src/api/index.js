import axios from "axios";
import { Typography } from "@material-ui/core";

const url = "https://covid19.mathdro.id/api";

// Fetches the data from the api
export const fetchData = async (country) => {
  let changeableURL = url;

  if (country) {
    changeableURL = `${url}/countries/${country}`;
  }
  try {
    const {
      // Destructures the data
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableURL);

    // Object of modifiedData containing the confirmed, recovered, deaths, and lastUpdate data
    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };

    // Returns the object
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

// Fetches Daily Data from API to use for Charts
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    // Returns an array of data objects with confirmed, deaths, and date
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

// Fetches country data
export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
