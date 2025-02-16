import React from "react";

const teamMembers = [
  {
    name: "Dhairya A Mehra",
    bio: "Passionate about software development, AI, and DevOps. Skilled in Docker, Jenkins, Databases, and cloud deployment.",
    image: "/dhairya.jpg", // Replace with actual image path
    portfolio: "https://dhairyaamehra.vercel.app/#Education", // Replace with actual link
  },
  {
    name: "Kewal B Nanavati",
    bio: "Enthusiastic about Web Application Development, Blockchain, and AI. Experienced with MERN, Cloud Deployment, and Databases.",
    image: "/kewal.jpg", // Replace with actual image path
    portfolio: "https://kewalnanavati.vercel.app/", // Replace with actual link
  },
];

const AboutUs = () => {
  return (
    <section id="aboutus" className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
        About Us
      </h2>
      <p className="text-lg text-center mb-10 text-gray-600">
        We are passionate developers committed to building scalable and
        efficient software solutions.
      </p>

      {/* Team Members */}
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 w-80 text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-2xl font-semibold">{member.name}</h3>

            <p className="mt-2 text-gray-700">{member.bio}</p>
            <a
              href={member.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Portfolio
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
