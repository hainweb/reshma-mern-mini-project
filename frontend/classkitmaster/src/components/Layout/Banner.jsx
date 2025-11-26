import React, { useEffect, useState } from "react";

const slides = [
  "/banner-1.jpg",
  "/images (1).jpg",
  "/images (2).jpg",
  "/images.jpg",
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <img
        src={slides[index]}
        alt="banner"
        className="w-full h-full object-cover transition-all duration-700"
      />
    </div>
  );
}
