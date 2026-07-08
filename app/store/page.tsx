import FeaturedGameCard from "@/components/FeaturedGameCard";

export default function StorePage() {
    type FeaturedGame = {
    title: string
    image: string
    screenshots?: string[]
    tags?: string[]
    price: string
    href: string
    }

    const featuredGames: FeaturedGame[] = [
    {
        title: "Extortioner Leftovers",
        image: "/extortioner_leftovers_banner.png",
        screenshots: [
            "/extortioner1.gif",
            "/extortioner2.gif",
        ],
        tags: [
            "Vampire Survivors-like",
            "Godot",
            "2D"
        ],
        price: "Free To Play",
        href: "https://github.com/yurimaxxer/Extortioner-Leftovers",
    },
    {
        title: "Sargent Roe Tate Saves The Day",
        image: "/Screenshot_20260627_182240.png",
        screenshots: [
            "/Screenshot_20260627_141118.png",
            "/Screenshot_20260627_141238.png",
        ],
        tags: [
            "Spin to win",
            "Game Jam Submission",
            "Art Designed by Amelia :o"
        ],
        price: "Free To Play",
        href: "https://yurimaxxerr.itch.io/sargent-roe-tate-saves-the-day",
    },
    ]
  return (
    <main className="p-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {featuredGames.map((game) => (
          <FeaturedGameCard
            key={game.title}
            {...game}
          />
        ))}
      </div>
    </main>
  )
}