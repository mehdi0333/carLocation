import path from "path";
import { fileURLToPath } from "url";
import { unlink } from "fs/promises";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function deleteFile(filename) {
  // console.log(path.join(__dirname, filename));

  try {
    const filePath = path.join(__dirname, filename).replace("\\utils","");
    unlink(filePath);
    return true;
  } catch (error) {
    console.log(error);
    console.log("from remove file in file in utils");
    return false;
  }
}
