import React from "react";
import classes from "./RightSideImages.module.css";
const RightSideImages = () => {
  return (
    <aside className={`min-h-[105vh] md:min-h-[80vh] ${classes.aside}`}>
      <div className={`left-20 -top-0 md:left-48 ${classes.top}`}></div>
      <div
        className={`-right-10 top-32  md:left-0 md:top-40 ${classes.lefttop}`}
      ></div>
      <div
        className={`-left-5 top-40 md:left-96 md:top-28 ${classes.righttop}`}
      ></div>
      <div
        className={`-left-5 bottom-[30rem] md:left-8 md:bottom-0.5 ${classes.leftbottom}`}
      ></div>
      <div
        className={`left-0 -bottom-5 md:left-64 md:-bottom-8 ${classes.rightbottom}`}
      ></div>
    </aside>
  );
};

export default RightSideImages;
