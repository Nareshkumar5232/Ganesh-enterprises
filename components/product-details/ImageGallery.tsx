"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainError, setMainError] = useState(false);
  const [mainLoaded, setMainLoaded] = useState(false);

  const mainSrc = mainError ? "/file.svg" : images[activeIndex] ?? "/file.svg";

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative w-full aspect-square max-w-[600px] mx-auto overflow-hidden rounded-xl bg-[#1A1A1A]">
        {!mainLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
            <div className="w-24 h-24 rounded-md bg-gray-200 dark:bg-gray-700" />
          </div>
        )}
        <Image
          key={mainSrc}
          src={mainSrc}
          alt={productName}
          width={600}
          height={600}
          className={`object-contain w-full h-full hover:scale-110 transition-transform duration-300 ${mainLoaded ? '' : 'opacity-0'}`}
          onError={() => setMainError(true)}
          onLoad={() => setMainLoaded(true)}
          priority
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-3 justify-center flex-wrap">
          {images.map((src, index) => (
                <ThumbnailButton
              key={index}
              src={src}
              alt={`${productName} thumbnail ${index + 1}`}
              isActive={activeIndex === index}
                  onClick={() => {
                    setActiveIndex(index);
                    setMainError(false);
                    setMainLoaded(false);
                  }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ThumbnailButtonProps {
  src: string;
  alt: string;
  isActive: boolean;
  onClick: () => void;
}

function ThumbnailButton({ src, alt, isActive, onClick }: ThumbnailButtonProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "relative w-20 h-20 rounded-lg overflow-hidden bg-[#1A1A1A] border-2 transition-colors duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DC2626]",
        isActive
          ? "border-[#DC2626]"
          : "border-transparent hover:border-[#DC2626]/50"
      )}
      aria-label={alt}
      aria-current={isActive}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          <div className="w-10 h-10 rounded-sm bg-gray-200 dark:bg-gray-700" />
        </div>
      )}
      <Image
        src={error ? "/file.svg" : src}
        alt={alt}
        width={80}
        height={80}
        className={`object-contain w-full h-full ${loaded ? '' : 'opacity-0'}`}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
      />
    </button>
  );
}
