import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const RESPONSES_FILE = path.join(DATA_DIR, "responses.json");

function readLocalResponses(): Record<string, unknown>[] {
  try {
    if (!fs.existsSync(RESPONSES_FILE)) return [];
    const raw = fs.readFileSync(RESPONSES_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

function writeLocalResponses(list: Record<string, unknown>[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(RESPONSES_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch {
    // Sunucusuz (read-only) ortamda sessizce geç
  }
}

export async function GET() {
  const list = readLocalResponses();
  return Response.json(list);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!payload || !payload.sessionId) {
      return Response.json({ error: "sessionId gerekli" }, { status: 400 });
    }

    const list = readLocalResponses();
    const idx = list.findIndex((item) => item.sessionId === payload.sessionId);

    if (idx >= 0) {
      list[idx] = {
        ...list[idx],
        ...payload,
        updatedAt: new Date().toISOString(),
      };
    } else {
      list.push({
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...payload,
      });
    }

    writeLocalResponses(list);
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: true });
  }
}

