import React from "react";

type TitleProps = {
  text: string;
};

const Title: React.FC<TitleProps> = ({ text }) => {
  return <div className="text-xl font-bold mb-4 ">{text}</div>;
};

export default Title;
