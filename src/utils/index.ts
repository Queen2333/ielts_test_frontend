// 计算当前题号之前的part一共有多少题
export const computedLength = (part: number, readingQuestionNumber: any[]) => {
  if (part === 0) return 0;
  let i = part,
    length = 0;
  while (i > 0) {
    length += readingQuestionNumber[i - 1].children.length;
    i--;
  }
  return length;
};
// 初始化obj
export const initializeObject = (obj: any) => {
  console.log(obj, "obj")
  return Object.keys(obj).reduce((acc: any, key) => {
    if (obj[key] !== null && obj[key] !== undefined) {
      // 添加检查以排除 null 或 undefined
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        acc[key] = initializeObject(obj[key]); // 递归处理对象类型的值
      } else {
        acc[key] = Array.isArray(obj[key]) ? [] : "";
      }
    } else {
      acc[key] = null;
    }
    return acc;
  }, {});
};