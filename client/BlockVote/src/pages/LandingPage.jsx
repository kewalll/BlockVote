import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useVoting } from "../VotingContext";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import Mesh from "../assets/mesh.svg";
import Grid from "../assets/grid.svg";
import { sdgsLogo } from "../data/sdg";
import Slider from "../components/Slider";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import RoadMapSection from "../components/RoadMapSection";

function LandingPage() {
  const navigate = useNavigate();
  const { updateAccount } = useVoting();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          updateAccount(accounts[0]);
          navigate("/home");
        }
      } catch (error) {
        console.error("User denied account access or other error:", error);
      }
    } else {
      console.log("Please install MetaMask or another web3 provider");
    }
  };

  return (
    <>
      <div className="w-screen min-h-screen fixed z-0 flex justify-center px-6 py-40 pointer-events-none">
        <div
          style={{ backgroundImage: `url(${Grid})` }}
          className="absolute inset-0 opacity-25"
        ></div>
        <img
          src={Mesh}
          alt="Mesh Image"
          className="opacity-15 absolute bottom-1 h-[600px] z-10"
        />
        <div className="bg-gradient-to-c from-transparent via-transparent to-white absolute inset-0 z-20"></div>
      </div>
      <div className="relative z-20">
        <NavBar connectWallet={connectWallet}/>
        
        <div className="container mx-auto">
          <HeroSection />
          <div className="mt-10">
            <Slider images={sdgsLogo} />
          </div>
          <div className="mt-10">
            <RoadMapSection />
          </div>
          <div className="mt-10">
            <FeaturesSection />
          </div>
          <div className="mt-10">
            <AboutUs />
          </div>
          <Footer />
        </div>

      </div>
    </>
  );
}

export default LandingPage;
