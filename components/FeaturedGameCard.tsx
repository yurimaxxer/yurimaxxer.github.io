'use client'

import { useEffect, useState } from "react"

type FeaturedGameProps = {
  title: string
  image: string
  screenshots?: string[]
  tags?: string[]
  price: string
  href: string
}

export default function FeaturedGame({
  title,
  image,
  screenshots,
  tags,
  price,
  href,
}: FeaturedGameProps) {
  const [currentScreenshot, setCurrentScreenshot] = useState(0)

  useEffect(() => {
    if (!screenshots || screenshots.length <= 1) return

    const interval = setInterval(() => {
      setCurrentScreenshot((prev) =>
        prev === screenshots.length - 1 ? 0 : prev + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [screenshots])

  return (
    <a
      href={href}
      className="group relative block h-[420px] overflow-hidden"
    >
      {/* Main game image */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />

      {/* Hover background */}
      <div
        className="
          absolute inset-0
          bg-foreground/90
          opacity-0
          transition duration-300
          group-hover:opacity-100
        "
      />

      {/* Price */}
      <span
        className="
          absolute bottom-4 right-4
          bg-black
          px-4 py-2
          text-white
          font-bold
        "
      >
        {price}
      </span>

      {/* Hover content */}
      <div
        className="
          absolute inset-x-0 bottom-0
          translate-y-8
          opacity-0
          transition duration-300
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        {/* Screenshot slideshow */}
        {screenshots && screenshots.length > 0 && (
        <div className="mb-4 w-full aspect-video overflow-hidden">
        <img
            src={screenshots[currentScreenshot]}
            alt={`${title} screenshot`}
            className="h-full w-full object-cover"
        />
        </div>
        )}
        <div className="pb-6 pl-6 pr-6">
          {/* Title */}
          <h1 className="text-4xl font-bold text-white">
            {title}
          </h1>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded
                    border
                    border-white/30
                    bg-black
                    px-3 py-1
                    text-sm
                    text-white
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Button */}
          <div
            className="
              mt-6
              inline-block
              bg-[#a1cd44]
              px-6 py-3
              font-bold
              text-black
              transition
              hover:opacity-90
            "
          >
            View Project
          </div>
        </div>
      </div>
    </a>
  )
}