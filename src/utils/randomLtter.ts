/**
 *示例：生成一个10个字符的随机字母组合，包含大小写字母
 * generateRandomLetters(10, true);
 */
function generateRandomLetters(length: number, includeUpperCase = false) {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letters = includeUpperCase
    ? lowerCaseLetters + upperCaseLetters
    : lowerCaseLetters;
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    result += letters[randomIndex];
  }
  return result;
}
export default generateRandomLetters;
