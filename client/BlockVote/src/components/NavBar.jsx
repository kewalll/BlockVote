import { useState } from "react";
import logoUrl from "../assets/BlockVote-1.png";
import { useMotionValueEvent, useScroll } from "framer-motion";

const NavBar = (props) => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest);
    if (latest > 0 && !scrolled) {
      setScrolled(true);
    } else if (latest === 0 && scrolled) {
      setScrolled(false);
    }
  });

  const defaultClasses = "transition-all absolute inset-0 -z-1";

  let navBarClasses = scrolled
    ? `${defaultClasses} border-b border-black/10 bg-white/75 backdrp-blur-lg`
    : `${defaultClasses} bg-transparent`;

  return (
    <div className="sticky inset-x-0 top-0 w-full z-30">
      <div className={navBarClasses}></div>
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-2 relative">
        <div className="flex items-center justify-between">
          <div>
            <img src={logoUrl} alt="logo" className="h-20 w-30 p-2" />
          </div>
          <nav className="hidden md:block">
            <ul className="flex flex-row space-x-4 p-4">
              <li>
                <a href="#aboutus" className="text-gray-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-gray-600">
                  Implementation Plan
                </a>
              </li>
              <li>
                <a href="#sdgs" className="text-gray-600">
                  SDG's Acheived
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:block" onClick={props.connectWallet}>
            <a className="bg-black px-4 py-2 rounded-md text-white cursor-pointer">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
