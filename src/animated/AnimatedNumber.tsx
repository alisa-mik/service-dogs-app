import { useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { BROWN_DARK } from "../config/colors";

export default function AnimatedNumber({ target }: { target: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, target, { duration: 1 });
    return () => controls.stop();
  }, [target]);

  return (
    <motion.div
      style={{ fontSize: "45px", fontWeight: 600, color: BROWN_DARK }}
    >
      {rounded}
    </motion.div>
  );
}
