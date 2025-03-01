import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="mx-auto w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mt-4"
    />
  );
};

export default LoadingSpinner;
