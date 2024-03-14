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
