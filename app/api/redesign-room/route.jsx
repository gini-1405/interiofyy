import { AiGeneratedImage } from "@/config/schema";
import { getDownloadURL, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { db } from "@/config/db";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req) {
  //   const { user } = useUser();
  const { imageUrl, roomType, designType, additionalReq, userEmail } =
    await req.json();
  // convert Image to AI Image
  try {
    const input = {
      image: imageUrl,
      prompt:
        "A " +
        roomType +
        " with a " +
        designType +
        " style interior ." +
        additionalReq,
    };
    // const output = await replicate.run(
    //   "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
    //   { input }
    // );
    // console.log(output);
    // return NextResponse.json({ result: output });

    // Convert Ouput Url to base64 Image
    const output = "something";
    const base64Image = await ConvertImageToBase64(output);
    // Save Base64 to Firebase
    const fileName = Date.now() + ".png";
    const storageRef = ref(storage, "room-redesign/" + fileName);
    await uploadString(storageRef, base64Image, "data_url");
    const downloadUrl = await getDownloadURL(storageRef);
    console.log(downloadUrl);
    const dbResult = await db
      .insert(AiGeneratedImage)
      .values({
        roomType: roomType,
        designType: designType,
        orgImage: imageUrl,
        aiImage: downloadUrl,
        userEmail: userEmail,
      })
      .returning({ id: AiGeneratedImage.id });
    console.log(dbResult);
    return NextResponse.json({ result: downloadUrl });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
async function ConvertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(resp.data).toString("base64");
  return "data:image/png;base64," + base64ImageRaw;
}
