import React from "react";
import { Icon } from "antd";

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p>
        {" "}
        Enjoy the Movies and Reviews <Icon type="smile" />
      </p>
    </div>
  );
}

export default Footer;
