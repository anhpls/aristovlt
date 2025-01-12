import { motion } from "framer-motion";
// import { FaPaperPlane } from "react-icons/fa";
// import { SiMinutemailer } from "react-icons/si";
import { RiMailAiLine } from "react-icons/ri";

const SubscribeButton = () => {
  return (
    <motion.button
      type="submit"
      className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-800 transition duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* <span className="font-semibold">Sign Up</span> */}
      <motion.div
        className="flex"
        animate={{ x: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <RiMailAiLine size={18} />
      </motion.div>
    </motion.button>
  );
};

export default SubscribeButton;
