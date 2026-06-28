import Image from "next/image";
import StarBackground from "../../components/StarsBackground";
import GameCard from "@/components/GameCard";

export default function Projects() {
  const favouriteGames = [
    { appid: 413150, name: "Stardew Valley" },
    { appid: 753640, name: "Outer Wilds" },
    { appid: 105600, name: "Terraria" },
    { appid: 582010, name: "Monster Hunter: World" },
    { appid: 632360, name: "Risk of Rain 2" }
  ];

  return (
    <div className="min-h-screen flex justify-center relative">
      <StarBackground />

      {/* Main container */}
      <div className="bg-gray-600/20 border-x border-gray-300/10 p-6 w-full max-w-5xl min-h-screen overflow-y-auto">
        
        {/* Header */}
        <div className="flex p-3 gap-8">
          <div className="w-40 h-40 overflow-hidden border-4 rounded border-blue-500">
            <img
              src="/Screencast_20260207_203523-ezgif.com-video-to-gif-converter.gif"
              alt="Profile Picture"
              className="w-full h-full object-cover object-[35%]"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Yurimaxxer (Amelia Swainston)
            </h1>
            <h1>🇦🇺 Victoria, Australia</h1>
          </div>
        </div>

        {/* Favourite games */}
        <div className="bg-gray-700/20 pb-2 mb-6 rounded-lg border border-gray-300/10">
          
          <div className="bg-gray-200/20 rounded-t">
            <h1 className="text-xl font-bold p-2">Favourite Games</h1>
          </div>

          <div className="bg-gray-900/60 m-2 rounded">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
              {favouriteGames.map((game) => (
                <a
                  key={game.appid}
                  href={`https://store.steampowered.com/app/${game.appid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <img
                    src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/library_600x900_2x.jpg`}
                    alt={game.name}
                    className="rounded-lg w-full transition-transform duration-200 group-hover:scale-105"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-gray-700/20 pb-2 mb-6 rounded-lg border border-gray-300/10">
          
          <div className="bg-gray-200/20 rounded-t">
            <h1 className="text-xl font-bold p-2">Recent Activity</h1>
          </div>

          <div className="bg-gray-900/60 m-2 rounded">
            <div className="border border-gray-900/60 rounded">
              <GameCard
                title="Legora"
                role="Data Integration Analyst"
                time="3 months"
                href="https://legora.com/"
                lastPlayed="today"
                image="/23171_Legora Logo.avif"
                achievements="13 of 30"
                progress={(13 / 30) * 100}
              />
            </div>
          </div>

          <div className="bg-gray-900/60 m-2 rounded">
            <div className="border border-gray-900/60 rounded">
              <GameCard
                title="Monash University"
                role="Student - Bachelor of Engineering (Software)"
                time="3 years"
                href="https://www.monash.edu/"
                lastPlayed="today"
                image="/monash-univ.webp"
                achievements="43 of 50"
                progress={(43 / 50) * 100}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}