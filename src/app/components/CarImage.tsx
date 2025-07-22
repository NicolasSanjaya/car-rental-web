"use client";

import Image from "next/image";
import { useState } from "react";

export default function CarImage({ src }: { src?: string }) {
  const [imgSrc, setImgSrc] = useState(src || "/images/no-image.png");

  return (
    <Image
      src={imgSrc}
      onError={() => setImgSrc("/images/no-image.png")}
      alt="Car Image"
      width={640}
      height={384}
      className="w-full h-48 object-cover"
    />
  );
}
