"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";

const images = [
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
  "/pasteveimg/elysiumbg.JPG",
];

const Skiper30 = () => {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { width, height } = dimension;
  const isMobile = width < 768;

  // Parallax transforms
  // Mobile: Slower, controlled speeds (Row 1 vs Row 2)
  // Desktop: Original speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 1 : 2)]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 1.3 : 3.3)]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]); // Only desktop
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);    // Only desktop

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="w-full bg-[#E5E7EB] text-black">
      {/* INTRO */}
      {/* <div className="font-geist flex h-screen items-center justify-center">
        <span className="text-xs uppercase opacity-40">
          scroll down to see past events
        </span>
      </div> */}

      {/* GALLERY */}
      <div
        ref={gallery}
        className="relative flex h-auto md:h-[175vh] gap-[2vw] overflow-hidden bg-black p-[2vw] flex-wrap md:flex-nowrap justify-between items-start"
      >
        {isMobile ? (
          // Mobile: Only 2 Columns (images 0-2 and 3-5), starting from top (tp=0)
          <>
            <Column images={[images[0], images[1], images[2]]} y={y1} tp={0} isMobile={true} />
            <Column images={[images[3], images[4], images[5]]} y={y2} tp={0} isMobile={true} />
            {/* Columns 3 & 4 (images 6-11) are intentionally omitted on mobile */}
          </>
        ) : (
          // Desktop: All 4 Columns with offsets
          <>
            <Column images={[images[0], images[1], images[2]]} y={y1} tp={50} />
            <Column images={[images[3], images[4], images[5]]} y={y2} tp={100} />
            <Column images={[images[6], images[7], images[8]]} y={y3} tp={40} />
            <Column images={[images[9], images[10], images[11]]} y={y4} tp={80} />
          </>
        )}
      </div>
    </main>
  );
};

export default Skiper30;

/* ------------------ COLUMN ------------------ */
const Column = ({ images, y, tp = 0, isMobile = false }) => {
  return (
    <motion.div
      id="gallery"
      className={`relative flex h-auto md:h-full w-[48%] md:flex-1 min-w-[48%] md:min-w-0 flex-col gap-[2vw] ${isMobile ? "-mt-[10vh]" : ""}`}
      style={{ y, bottom: `${isMobile ? 0 : tp}%` }}
    >
      {images.map((src, i) => (
        <div key={i} className={`relative ${isMobile ? "-top-[45vh]" : ""} w-full overflow-hidden border border-primary/50 p-1 animate-glow-pulse`}>
          <img
            src={src}
            alt="gallery"
            className="w-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};
