import { Plainte } from "../models/models.js";
import { deleteFile } from "../utils/files.js";
export async function goToPlaint(req, res) {
  try {
    const { user, userId } = req;

    res.render("aide-support", { userId });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function createPlaint(req, res) {
  try {
    const { user, userId } = req;
    const { type, description, priorite, sujet } = req.body;
    const file = req.file;
    const path = req.file.path.replace("public\\", "");
    if (!type || !description || !priorite || !sujet || !file) {
      deleteFile(file);
      return res.status(422).send();
    }
    const newPlaint = await new Plainte({
      type,
      imgPath: path,
      userId,
      description,
      sujet,
    }).save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}
