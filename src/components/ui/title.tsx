import React from "react";

type TitleProps = {
  text: string;
};

const Title: React.FC<TitleProps> = ({ text }) => {
  return <div className=" uppercase rounded-md text-sm lg:text-xl w-fit">{text}</div>;
};

export default Title;
