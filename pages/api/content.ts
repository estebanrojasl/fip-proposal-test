// api/content.ts

import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import contentData from "../../content.json";

const contentFilePath = "../../content.json";

interface ContentData {
  heading: string;
  img_1: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Read the content from the content.json file and send it as the response
    return res.status(200).json(contentData);
  } else if (req.method === "POST") {
    const updatedContent: ContentData = req.body;

    // Assuming you have validation and sanitization logic here to handle the data correctly

    // Write the updated content to the content.json file
    try {
      fs.writeFileSync(
        contentFilePath,
        JSON.stringify(updatedContent, null, 2)
      );
      res.status(200).json({ message: "Content updated successfully" });
    } catch (error) {
      console.error("Error writing to content.json", error);
      res.status(500).json({ error: "Failed to update content" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
