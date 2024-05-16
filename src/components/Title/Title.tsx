import React from "react";

interface TitleProps {
  text: string;
  style?: React.CSSProperties;
}

const Title: React.FC<TitleProps> = ({ text, style }) => (
  <h2 style={style}>{text}</h2>
);

export default Title;
