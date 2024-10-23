const extractLanguageType = (codeString: string) => {
  // 找到第一个 ``` 的位置
  const startIndex = codeString.indexOf("```");

  if (startIndex === -1) {
    return null; // 如果没有找到 ```，返回 null
  }

  // 找到第一个换行符 \n 的位置
  const endIndex = codeString.indexOf("\n", startIndex);

  if (endIndex === -1) {
    return null; // 如果没有找到 \n，返回 null
  }

  // 截取语言类型
  const languageType = codeString.substring(startIndex + 3, endIndex).trim();

  return languageType;
};

const trimStartEndContent = (codeString: string) => {
  const langs = extractLanguageType(codeString);
  const match = codeString.replace(langs, "").match(/```(.*?)```/s);
  if (match) {
    return match[1].trim();
  } else {
    return null;
  }
};

export { extractLanguageType, trimStartEndContent };
