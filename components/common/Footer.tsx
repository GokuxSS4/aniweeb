import AniweebLogo from "@/public/icons/aniweeb-logo.png";
import Image from "next/image";

import { FaDiscord } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
import { FaCopyright } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full flex flex-col  text-white py-8">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="max-w-lg">
            <div className="w-32 mb-4">
              <Image
                src={AniweebLogo}
                alt="Aniweeb"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Aniweeb does not retain any files on its server. Rather, it solely
              provides links to media content hosted by third-party services.
            </p>
          </div>

          <div className="flex flex-row gap-4 md:flex-col md:gap-2 items-start justify-center">
            <button className="text-gray-400 hover:text-white transition-colors">
              Donate &lt;3
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              DMCA
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              Terms and Conditions
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-gray-700 mb-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FaCopyright className="text-gray-400" />
            <p>Aniweeb</p>
            <span className="mx-2">|</span>
            <p>
              Website Made by{" "}
              <span className="text-white font-semibold">GokuxSS4</span>
            </p>
          </div>

          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <FaDiscord className="w-6 h-6" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <FaReddit className="w-6 h-6" />
            </button>
            {/* <button className="text-gray-400 hover:text-white transition-colors">
              <FaXTwitter className="w-6 h-6" />
            </button> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
