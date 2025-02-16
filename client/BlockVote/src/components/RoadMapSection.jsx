import MileStone from "./MileStone";
import TagLine from "./TagLine";

const roadmap = [
  {
    id: 1,
    name: "Smart Contract Development",
    description:
      "Develop VotingFactory and VotingPool contracts with voter ID validation and ZKP integration",
  },
  {
    id: 2,
    name: "Frontend Development",
    description:
      "Build an admin dashboard for election management and a voter interface for seamless participation",
  },
  {
    id: 3,
    name: "Testing",
    description:
      "Conduct mock elections with multiple users to ensure security and reliability",
  },
  {
    id: 4,
    name: "Deployment",
    description:
      "Deploy contracts on Volta, host the interface on AWS, Google Cloud, Azure, and collaborate with election authorities for a pilot test",
  },
];

const RoadMapSection = () => {
  return (
    <section id="roadmap" className="max-w-2xl mx-auto">
      {/* Section Title */}
      <h1 className="font-bold text-3xl text-center mb-8 bg-gradient-to-r from-red-500 via-black-600 to-pink-500 bg-clip-text text-transparent">
        Implementation Plan
      </h1>

      {/* Centered & Padded Tagline */}
      <div className="flex justify-center">
        <TagLine className="text-center py-4 px-8 w-full max-w-3xl">
          Strategic Execution for a Seamless and Secure Voting Experience!
        </TagLine>
      </div>

      {/* Roadmap Items */}
      <div className="mt-10 space-y-8">
        {roadmap.map((roadmapItem, index) => (
          <MileStone
            key={index}
            title={roadmapItem.name}
            description={roadmapItem.description}
            lastItem={index === roadmap.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default RoadMapSection;
