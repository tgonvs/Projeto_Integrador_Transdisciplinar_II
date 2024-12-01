/* eslint-disable @next/next/no-img-element */
"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Carousel as ReactCarousel } from "react-responsive-carousel";

export type CarouselParams = {
  images: {
    src: string;
    href: string;
  }[];
  autoPlay?: boolean;
};

export default function Carousel({ images, autoPlay }: CarouselParams) {
  const router = useRouter();
  return (
    <ReactCarousel
      autoPlay={autoPlay}
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      onClickItem={(itemIndex) => {
        router.push(images[itemIndex].href);
      }}
    >
      {images.map(({ src }, index) => (
        <Image
          className="max-h-[50vh]"
          key={index}
          src={src}
          alt=""
          height={1536}
          width={2688}
        />
      ))}
    </ReactCarousel>
  );
}
