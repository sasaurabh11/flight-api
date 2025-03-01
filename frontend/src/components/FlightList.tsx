import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fetchFlights } from "../service/api";
import FlightCard from "./FlightCard";
import LoadingSpinner from "./LoadingSpinner";

const FlightList = () => {
  const { register, handleSubmit, watch } = useForm();
  const [flights, setFlights] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const tripType = watch("tripType", "one-way");

  const searchFlights = async (data: any) => {
    setLoading(true);
    setFlights({});

    try {
      const response = await fetchFlights(
        data.origin,
        data.destination,
        data.date,
        data.passengers,
        data.tripType,
        data.returnDate
      );
      setFlights(response);
    } catch (error) {
      console.error("Error fetching flights", error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-blue-100 shadow-lg rounded-lg backdrop-blur-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
        ✈️ Find Your Perfect Flight
      </h2>

      <form onSubmit={handleSubmit(searchFlights)} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium">Trip Type</label>
          <select
            {...register("tripType")}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
          >
            <option value="one-way">One-Way</option>
            <option value="round">Round Trip</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 font-medium">
            Origin Airport
          </label>
          <input
            {...register("origin", { required: "Origin is required" })}
            placeholder="E.g., DEL"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">
            Destination Airport
          </label>
          <input
            {...register("destination", {
              required: "Destination is required",
            })}
            placeholder="E.g., BOM"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium">
            Departure Date
          </label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        {tripType === "round" && (
          <div>
            <label className="block text-gray-600 font-medium">
              Return Date
            </label>
            <input
              type="date"
              {...register("returnDate", {
                required: "Return date is required for round trip",
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
            />
          </div>
        )}

        <div>
          <label className="block text-gray-600 font-medium">Passengers</label>
          <input
            type="number"
            {...register("passengers", {
              required: "Passengers required",
              min: 1,
            })}
            defaultValue={1}
            min={1}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md font-semibold shadow-md hover:opacity-90 transition cursor-pointer"
        >
          {loading ? "Searching..." : "Search Flights"}
        </motion.button>
      </form>

      {loading && <LoadingSpinner />}

      <div className="mt-6">
        {Object.entries(flights).length > 0
          ? Object.entries(flights).map(([airline, price]) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={airline}
              >
                <FlightCard airline={airline} price={price} />
              </motion.div>
            ))
          : !loading && (
              <p className="text-center text-gray-500 mt-4">No flights found</p>
            )}
      </div>
    </div>
  );
};

export default FlightList;
