import { exec } from "child_process";
import fs from "fs";

export const processLicense = (req, res) => {
  const base64Image = req.body.base64Image;
  const preparedBase64Image = base64Image.replace(
    /^data:image\/png;base64,/,
    ""
  );
  fs.writeFileSync(
    `${process.env.OCR_PATH_TO_SCRIPT}/cardNER/out.png`,
    preparedBase64Image,
    "base64"
  );

  const pythonScriptPath = `${process.env.OCR_PATH_TO_SCRIPT}/cardNER/prediction_file.py`;
  exec(
    `python ${pythonScriptPath} ${process.env.OCR_PATH_TO_SCRIPT}/cardNER/out.png`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      const result = JSON.parse(stdout.replace(/'/g, '"'));
      // console.log(typeof result, result);
      res.status(201).json(result);
    }
  );
};
