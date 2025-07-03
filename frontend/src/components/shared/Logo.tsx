import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";

const Logo = () => {
  return (
    <div className="flex mr-auto items-center gap-[8px]">
      <Link to="/" className="flex text-center items-center gap-3  text-[#fff]">
        <img className=" invert" src={logo} alt="Logo" width={30} height={30} />

        <Typography
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
            mr: "auto",
            fontWeight: "800",
            color: "#fff",
            textShadow: "2px 2px 20px #000",
          }}
        >
          <span style={{fontFamily: 'Bona Nova SC',fontSize: '2rem'}}>Chat-BOT</span>
        </Typography>
      </Link>
    </div>
  );
};

export default Logo;
