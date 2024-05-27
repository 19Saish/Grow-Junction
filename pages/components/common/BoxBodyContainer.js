import React from "react";
import { color } from "../../../public/theme/Color";
import useWindowDimensions from "../../../public/utils/useWindowDimensions";

const BoxBodyContainer = (props) => {
  const { body, styleOverride } = props;
  const { width, height } = useWindowDimensions();
  return (
    <div
      style={{
        display: "flex",
        // minHeight: "100%",
        // width: "100%",
        // position: "absolute",
        // bottom: "auto",
        flexDirection: "column",
        flex: 1,
        backgroundColor: color.white,
        padding: 100,
        // height: height,
        // alignItems: "stretch",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flex: 1,
          backgroundColor: color.headerColor,
          flexDirection: "column",
          //   maxWidth: 500,
          //   ...styleOverride,
        }}
      >
        {body}
      </div>
    </div>
  );
};
export default BoxBodyContainer;
