export default function srcIsImage(src) {
  return /^data:image\/([a-zA-Z]*);base64,([^\"]*)$/.test(src);
}
