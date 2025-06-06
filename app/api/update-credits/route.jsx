// import { db } from "@/config/db";
// import { Users } from "@/config/schema";
// import { eq } from "drizzle-orm";

// export async function POST(req) {
//   const { userEmail } = await req.json();

//   try {
//     await db.update(Users)
//       .set({ credits: sql`${Users.credits} - 1` })
//       .where(eq(Users.email, userEmail));

//     return Response.json({ success: true });
//   } catch (error) {
//     console.error("Error updating credits:", error);
//     return Response.json({ error: "Failed to update credits" }, { status: 500 });
//   }
// }

// import { db } from "@/config/db";
// import { Users } from "@/config/schema";
// import { eq, sql } from "drizzle-orm";

// export async function POST(req) {
//   const { userEmail } = await req.json();

//   try {
//     await db
//       .update(Users)
//       .set({
//         credits: sql`${Users.credits} - 1`,
//       })
//       .where(eq(Users.email, userEmail));

//     return Response.json({ success: true });
//   } catch (error) {
//     console.error("Error updating credits:", error);
//     return Response.json(
//       { error: "Failed to update credits" },
//       { status: 500 }
//     );
//   }
// }

import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req) {
  const { userEmail } = await req.json();

  if (!userEmail) {
    return Response.json({ error: "Missing userEmail" }, { status: 400 });
  }

  try {
    await db
      .update(Users)
      .set({
        // ✅ subtracting credits using SQL expression — this is correct
        credits: sql`${Users.credits} - 1`,
      })
      .where(eq(Users.email, userEmail));

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating credits:", error);
    return Response.json(
      { error: "Failed to update credits" },
      { status: 500 }
    );
  }
}
