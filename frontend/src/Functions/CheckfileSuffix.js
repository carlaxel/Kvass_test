export default function checkSuffix(filename) {
  let [_file, suffix] = filename.split(".");
  suffix = suffix.toLowerCase();
  console.log(suffix);
  return suffix === "jpg" || suffix === "jpeg" || suffix === "png";
}
