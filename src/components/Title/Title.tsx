import React from "react";

interface TitleProps {
  text: string;
  style?: React.CSSProperties;
}

const Title: React.FC<TitleProps> = ({ text, style }) => {
  const defaultClasses = "pl-2 text-lg font-bold leading-tight mb-2";
  return (
    <h2 className={!style ? defaultClasses : ""} style={style}>
      {text}
    </h2>
  );
};

export default Title;
