import React from "react";
import logo from "../../assets/images/general/logo-pure-white.svg";

const Logo = () => {
  return (
    <div className=" font-iransans flex items-center justify-center gap-2 mt-4 text-white text-xl font-bold">
      <p>deep-coding</p>
      <img className="w-[60px] h-[60px]  " src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
