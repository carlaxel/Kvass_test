export default function checkSuffix(filename) {
  let fileArray = filename.split(".");
  let suffix = fileArray[fileArray.length - 1];
  suffix = suffix.toLowerCase();
  console.log(suffix);
  return suffix === "jpg" || suffix === "jpeg" || suffix === "png";
}
