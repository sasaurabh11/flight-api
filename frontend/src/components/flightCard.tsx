import React from "react";
import { motion } from "framer-motion";

interface FlightCardProps {
  airline: string;
  price: string;
}

const FlightCard: React.FC<FlightCardProps> = ({ airline, price }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-4 rounded-md shadow-md mb-3 flex justify-between border border-gray-200"
    >
      <h3 className="font-semibold text-gray-800">{airline.toUpperCase()}</h3>
      <p className="text-green-600 font-semibold">{price}</p>
    </motion.div>
  );
};

export default FlightCard;
