// Adapted from React Bits Tilted Card (David Haz). See THIRD_PARTY_NOTICES.md.
import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

export default function TiltMount({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const spring = { damping: 28, stiffness: 180, mass: 0.7 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  function handlePointer(event: PointerEvent<HTMLDivElement>) {
    if (
      reducedMotion ||
      event.pointerType !== "mouse" ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches ||
      !ref.current
    )
      return;
    const rect = ref.current.getBoundingClientRect();
    rotateX.set(((event.clientY - rect.top) / rect.height - 0.5) * -7);
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
  }
  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }
  return (
    <motion.div
      ref={ref}
      className={`tilt-mount ${className}`}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
      }}
      onPointerMove={handlePointer}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.div>
  );
}
