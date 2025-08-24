import React from "react";

type TitleProps = {
  text: string;
};

const Title: React.FC<TitleProps> = ({ text }) => {
  return <div className="text-xl font-bold mb-4 font-heading">{text}</div>;
};

export default Title;
