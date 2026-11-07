import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const RESPONSES_FILE = path.join(DATA_DIR, "responses.json");

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await context.params;
    if (fs.existsSync(RESPONSES_FILE)) {
      const raw = fs.readFileSync(RESPONSES_FILE, "utf-8");
      const list = JSON.parse(raw || "[]").filter(
        (item: { sessionId?: string }) => item.sessionId !== sessionId
      );
      fs.writeFileSync(RESPONSES_FILE, JSON.stringify(list, null, 2), "utf-8");
    }
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: true });
  }
}

