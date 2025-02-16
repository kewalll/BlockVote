const MileStone = ({ title, description, lastItem }) => {
  return (
    <div className="flex w-full items-start">
      {/* Timeline Indicator */}
      <div className="relative flex flex-col items-center">
        {/* Milestone Dot */}
        <div className="z-20 bg-gradient-to-b from-pink-500 to-indigo-500 h-4 w-4 rounded-full flex-shrink-0 relative">
          <div className="bg-gradient-to-b from-pink-500 to-indigo-500 h-6 w-6 rounded-full flex-shrink-0 absolute z-10 blur-md"></div>
        </div>

        {/* Connecting Line (only if not last item) */}
        {!lastItem && <div className="w-[2px] bg-gray-300 h-20 mt-2"></div>}
      </div>

      {/* Milestone Content */}
      <div className="ml-6">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default MileStone;
