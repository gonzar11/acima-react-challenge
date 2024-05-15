export const parseStyle = (styleString: string): React.CSSProperties => {
  return styleString
    .split(";")
    .filter((style) => {
      const parts = style.split(":");
      return parts[0] && parts[1];
    })
    .reduce<React.CSSProperties>((styleObj, style) => {
      const [key, value] = style.split(":").map((part) => part.trim());
      // TODO: Fix this
      (styleObj as any)[key] = value;
      return styleObj;
    }, {});
};
