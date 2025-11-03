import "./PlayAgain.css";
import { IoReloadSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { useEffect } from "react";
export default function PlayAgain({ restartGame }) {
  useEffect(() => {
    console.log(restartGame);
  }, []);
  return (
    <motion.div
      className="play_again_container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ fontSize: "3rem" }}>PLAY AGAIN</p>
        <button onClick={restartGame}>
          <IoReloadSharp style={{ fontSize: "5rem" }} />
        </button>
      </div>
    </motion.div>
  );
}
