import axios from "axios";
const baseUrl = import.meta.env.VITE_base_url;

export const fetchFlights = async (
  origin: string,
  destination: string,
  date: string,
  passengers: Number,
  tripType: boolean,
  returnDate: string
) => {
  console.log(origin, destination, date);

  try {
    const response = await axios.post(`${baseUrl}/api/flights`, {
      origin,
      destination,
      date,
      passengers,
      tripType,
      returnDate,
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching flights", error);
    return {};
  }
};
