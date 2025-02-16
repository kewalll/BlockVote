import { features } from "../data/features";
import TagLine from "./TagLine";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="flex items-center p-10 justify-center flex-col"
    >
      <h2 className="font-extrabold text-3xl mb-8 pt-3 bg-gradient-to-r from-pink-500 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
        Features
      </h2>
      <TagLine>
        Empowering Elections with Security, Transparency, and Trust!
      </TagLine>
      <div className="mt-10 grid items-center grid-cols-1 gap-3 md:grid-cols-3 max-w-screen-xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white border border-indigo-400/30 rounded-lg shadow-lg p-6 h-full flex space-x-4"
          >
            <div>
              <h3 className="font-bold text-xl bg-gradient-to-r from-yellow-500 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
