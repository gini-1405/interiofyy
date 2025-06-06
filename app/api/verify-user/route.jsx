import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  // extract data of user who's request is coming from client i.e. browser

  const { user } = await req.json();

  try {
    const userInfo = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress.emailAddress));

    console.log("UserInfo: ", userInfo);

    if (userInfo?.length === 0) {


      const saveResult = await db
        .insert(Users)
        .values({
          name: user?.fullName,
          email: user?.primaryEmailAddress.emailAddress,
          imageUrl: user?.imageUrl,
        })
        .returning({ Users });




      return NextResponse.json({ result: saveResult[0].Users });
    }


    return NextResponse.json({ result: userInfo[0] });
  } catch (e) {
    return NextResponse.json({ error: e });
  }

  return NextResponse.json({ result: user });
}
