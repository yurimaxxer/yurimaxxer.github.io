'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

    const linkClass = (path: string) =>
    `font-bold hover:underline ${pathname === path ? "text-highlight underline decoration-highlight decoration-3 underline-offset-4" : ""}`;

    return (
    <header className="w-full relative z-10">
        <div className="px-4 py-4 flex items-center justify-between bg-foreground">
        <nav>
            <ul className="flex gap-4">
            <li>
                <Link href="/store" className={linkClass("/store")}>STORE</Link>
            </li>
            <li>
                <Link href="/resume" className={linkClass("/resume")}>YURIMAXXER</Link>
            </li>
            </ul>
        </nav>
        </div>
    </header>
    );
}