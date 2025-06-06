import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";
import { eq } from "drizzle-orm";

// Define GET handler for App Router
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");

  if (!userEmail) {
    return Response.json({ error: "Missing userEmail" }, { status: 400 });
  }

  try {
    const result = await db
      .select()
      .from(AiGeneratedImage)
      .where(eq(AiGeneratedImage.userEmail, userEmail));

    return Response.json(result ?? []);
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
