export const parseStyle = (styleString?: string): React.CSSProperties | undefined => {
  if (!styleString) {
    return undefined;
  }

  const styleObject =  styleString
    .split(";")
    .filter((style) => {
      const parts = style.split(":");
      return parts[0] && parts[1];
    })
    .reduce<React.CSSProperties>((styleObj, style) => {
      const [key, value] = style.split(":").map(part => part.trim());
      const camelCaseKey = key.split('-').map((part, index) => {
        return index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1);
      }).join('');
      (styleObj as any)[camelCaseKey] = value;
      return styleObj;

    }, {});

    return Object.keys(styleObject).length === 0 ? undefined : styleObject;

};
