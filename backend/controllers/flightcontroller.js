import Amadeus from "amadeus";

function formatFlightOffers(flightOffers) {
    let formattedResult = {};
    
    flightOffers.forEach(offer => {
        let airlineCode = offer.validatingAirlineCodes[0]; // Extract airline code
        let price = `₹${parseFloat(offer.price.total).toLocaleString("en-IN")}`; // Format price
        
        // Map airline codes to airline names
        let airlineMap = {
            "6E": "indigo",
            "I5": "airAsia",
            "UK": "vistara",
            "AI": "airIndia"
        };

        let airlineName = airlineMap[airlineCode] || airlineCode; // Default to code if name not found
        formattedResult[airlineName] = price;
    });

    return formattedResult;
}

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

const getFlights = async (req, res) => {
  try {
    const { origin, destination, date } = req.body;

    if (!origin || !destination || !date) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: "1",
      currencyCode: "INR",
    });

    const result = formatFlightOffers(response.data);
    console.log(result)

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getFlights };