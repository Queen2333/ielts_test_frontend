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
export const initializeObject = (
  obj: any,
  names?: string[],
  deepArray?: string[]
): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  const initializeValue = (
    value: any,
    prop: string,
    _deepArray?: string[]
  ): any => {
    if (value === null) {
      return null;
    } else if (Array.isArray(value)) {
      return value.length <= 0 || (_deepArray && _deepArray.includes(prop))
        ? []
        : [initializeValue(value[0], prop, _deepArray)];
    } else if (typeof value === "object") {
      return initializeObject(value, names, _deepArray);
    } else {
      return "";
    }
  };

  const initializedObj: any = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (names && names.includes(prop)) {
        initializedObj[prop] = obj[prop];
      } else if (deepArray && deepArray.includes(prop)) {
        initializedObj[prop] = [];
      } else {
        initializedObj[prop] = initializeValue(obj[prop], prop, deepArray);
      }
    }
  }

  return initializedObj;
};