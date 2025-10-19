import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src={"/images/under_construction.svg"}
        alt="Home"
        className="w-200 h-150"
      />
      <h1 className="text-primary text-3xl">الصفحة تحت الإنشاء</h1>
    </div>
  );
};

export default Home;
