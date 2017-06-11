export default function sanatizeShortCode(input) {
  console.log(input);
  return input.replace(/-/g, '');
}
