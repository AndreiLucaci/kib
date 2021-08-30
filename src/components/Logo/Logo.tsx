import React, { FC } from "react";

import LogoSvg from "../../logo.svg";
import "./Logo.css";

export const Logo: FC = () => {
  return (
    <div className="no-drag">
      <img
        src={LogoSvg}
        alt="logo"
        style={{ height: "350px" }}
        draggable={false}
      />
    </div>
  );
};
