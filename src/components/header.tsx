import { Link } from "react-router-dom"
import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./city-search";

function Header({}){
   const { theme, setTheme } = useTheme();
   const isDark = theme === "dark";
  return (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <Link to={"/"}>
         <img src={isDark ? "././sky_dark__1.png" : "././sky_light.png"} alt="skyScope logo" className="h-16" />
      </Link>
      <div className="flex gap-4">
         <CitySearch />
         {/* theme toggle*/}
         <div onClick={() => setTheme(isDark ? "light" : "dark")} className={`flex items-center curson-pointer transition-transform duration-500
            ${isDark ? "rotate-180" : "rotate-0"}
            `}>
            {isDark? <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all"/>: <Moon className="h-6 w-6 text-blue rotate-0 transition-all"/>}
         </div>
      </div>
    </div>
  </header>
  );
}

export default Header

