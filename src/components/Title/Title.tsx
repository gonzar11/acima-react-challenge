import React from "react";
import { parseStyle } from "@/utils/styleUtils";

interface TitleProps {
  text: string;
  style: string;
}

const Title: React.FC<TitleProps> = ({ text, style }) => (
  <h2 style={{ ...parseStyle(style) }}>{text}</h2>
);

export default Title;
