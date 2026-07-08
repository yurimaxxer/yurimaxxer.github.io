'use client'

type GameCardProps = {
  role: string
  title: string
  time: string
  href: string
  lastPlayed: string
  image: string
  achievements: string | number
  progress: number
}

export default function GameCard({
  role,
  title,
  time,
  href,
  lastPlayed,
  image,
  achievements,
  progress,
}: GameCardProps) {
  return (
    <div className="overflow-hidden p-3">
      {/* Thumbnail + info row */}
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-48 sm:h-28 flex-shrink-0 bg-gray-900">
          <a href={href} target="_blank" rel="noopener noreferrer">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between p-4 flex-1">
          {/* Left */}
          <div>
            <p className="font-bold text-lg">{title}</p>
            <p className="text-sm text-gray-400">{role}</p>

            {/* Mobile only */}
            <div className="mt-3 text-sm text-gray-400 sm:hidden">
              <p>{time} on record</p>
              <p>Last played {lastPlayed}</p>
            </div>
          </div>

          {/* Desktop only */}
          <div className="hidden sm:flex flex-col items-end justify-end text-sm text-gray-400">
            <p>{time} on record</p>
            <p>Last played {lastPlayed}</p>
          </div>
        </div>
      </div>

      {/* Achievement bar */}
      <div className="mt-2 rounded bg-foreground/40 p-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-gray-400">
          <div className="flex justify-between sm:justify-start sm:gap-3">
            <p className="font-bold">Achievement progress</p>
            <p>{achievements}</p>
          </div>

          <div className="w-full sm:flex-1 h-2 bg-gray-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-highlight rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}