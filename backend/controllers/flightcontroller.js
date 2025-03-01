import Amadeus from "amadeus";

function formatFlightOffers(flightOffers) {
  let formattedResult = {};

  flightOffers.forEach((offer) => {
    let airlineCode = offer.validatingAirlineCodes[0];
    let price = parseFloat(offer.price.grandTotal);

    let airlineMap = {
      "6E": "indigo",
      I5: "airAsia",
      UK: "vistara",
      AI: "airIndia",
    };

    let airlineName = airlineMap[airlineCode] || airlineCode;

    if (!formattedResult[airlineName] || price < formattedResult[airlineName]) {
      formattedResult[airlineName] = price;
    }
  });

  for (let airline in formattedResult) {
    formattedResult[airline] = `₹${formattedResult[airline].toLocaleString(
      "en-IN"
    )}`;
  }

  return formattedResult;
}

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

const getFlights = async (req, res) => {
  try {
    const { origin, destination, date, returnDate, passengers, tripType } =
      req.body;

    if (!origin || !destination || !date || !passengers || !tripType) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    if (tripType === "round" && !returnDate) {
      return res
        .status(400)
        .json({ error: "Return date is required for round trips" });
    }

    const searchParams = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: passengers.toString(),
      currencyCode: "INR",
    };

    if (tripType === "round") {
      searchParams.returnDate = returnDate;
    }

    console.log(searchParams);

    const response = await amadeus.shopping.flightOffersSearch.get(
      searchParams
    );

    const result = formatFlightOffers(response.data);
    console.log(result);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getFlights };
