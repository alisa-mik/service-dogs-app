import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedItemProps {
  children: ReactNode;
}

export const AnimatedItem = ({ children }: AnimatedItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}; 