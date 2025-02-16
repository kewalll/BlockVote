import blockchainUrl from "../assets/blockchain-2.jpg";
import Tag from "./Tag";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hero-section text-center mt-20 flex flex-col">
      <Tag>
        <div className="flex items-center cursor-pointer">
          <span>BlockVote v1.0</span>
          <ChevronRight className="w-6 h-6 ml-1 text-indigo-300 overflow-visible" />
        </div>
      </Tag>
      <h1 className="text-4xl font-extrabold leading-[1.15] text-black sm:text-6xl ">
        Secure Your Vote
        <br />
        <span className="bg-gradient-to-r from-pink-500 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
          In Seconds, Not Hours
        </span>
      </h1>
      <h2 className="mt-5 text-gray -600 sm:text-xl">
        Secure, transparent, tamper-proof blockchain voting for trust and
        privacy.
      </h2>
      <div className="mx-auto mt-5 flex mat-w-fit space-x-4">
        <a
          href="#get-started"
          className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm border-black bg-black text-white hover:ring-gray-400 hover:ring-2"
        >
          Get Started
        </a>
        <a
          href="#features"
          className="rounded-full mx-auto max-w-fit border px-5 py-2 text-sm font-medium shadow-sm border-gray-200 bg-white text-black hover:ring-gray-300 hover:ring-2"
        >
          Learn More
        </a>
      </div>
      <div className="mt-5 flex items-center justify-center relative">
      <img
        src={blockchainUrl}
        alt="Blockchain Voting"
        className="mx-auto max-h-[300px] sm:max-h-[500px] relative z-10 rounded-2xl"
      />


        
        
      </div>


    </section>
  );
};

export default HeroSection;
