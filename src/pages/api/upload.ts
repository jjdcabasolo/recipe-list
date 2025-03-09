import fs from "fs";
import path from "path";
import { File } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export type FormidableParseReturn = {
  fields: formidable.Fields;
  files: formidable.Files;
};

export type UploadResponse = {
  message: string;
  path?: string;
  filename?: string;
};

export async function parseFormAsync(
  req: NextApiRequest,
  formidableOptions?: formidable.Options
): Promise<FormidableParseReturn> {
  const form = formidable(formidableOptions);

  return await new Promise<FormidableParseReturn>((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err);
      }

      resolve({ fields, files });
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { files } = await parseFormAsync(req);
    const image = (files["image"] as unknown as File[])[0];

    const fileExt = path.extname(image.originalFilename || "");
    const newPath = `${"./public/images"}/${image.newFilename}${fileExt}`;

    if (!fs.existsSync("./public/images")) {
      fs.mkdirSync("./public/images", { recursive: true });
    }

    const data = fs.readFileSync(image.filepath);

    fs.writeFileSync(newPath, data);
    fs.unlinkSync(image.filepath);

    res.status(200).json({
      message: "File uploaded successfully",
      path: `${"/images"}/${image.newFilename}${fileExt}`,
      filename: `${image.newFilename}${fileExt}`,
    });
  } catch (_) {
    return res.status(500).json({ message: "Failed to save file" });
  }
}
