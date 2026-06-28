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
  progress
}: GameCardProps) {
  return (
    <div className="overflow-hidden p-3">
      {/* Thumbnail + info row */}
      <div className="flex">
        <div className="w-48 h-28 flex-shrink-0 bg-gray-900">
            <a href={href} target="_blank">
                <img src={image} alt="Game" className="w-full h-full object-cover" />
            </a>
        </div>

        <div className="flex justify-between p-4 flex-1">
          <div>
            <p className="font-bold text-m">{title}</p>
            <p className="text-s text-gray-400">{role}</p>
          </div>

          <div className="flex flex-col text-sm mt-15 items-end">
            <div>
              <p className="text-s text-gray-400">{time} on record</p>
            </div>
            <div>
              <p className="text-s text-gray-400">last played {lastPlayed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement bar */}
      <div className="p-3 bg-foreground/40 mt-1 rounded">
        <div className="flex items-center gap-3 text-s text-gray-400">
          <div className="flex items-center gap-3">
            <p className="font-bold text-sm">Achievement progress</p>
            <p className="text-s text-gray-400">{achievements}</p>
          </div>

          <div className="flex-1 h-2 bg-gray-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-highlight rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}