const Loader = () => {
  return (
    <div className="fixed inset-0 bg-spiritual-cream z-[99] flex items-center justify-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 p-2 border-orange-600 rounded-md animate-spin-slow"></div>
        <div className="absolute inset-2 border-4 border-t-transparent border-orange-600 rounded-md animate-spin-slow-reverse"></div>
      </div>
    </div>
  );
};

export default Loader;
