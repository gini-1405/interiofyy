// "use client";
// import React, { useContext, useState } from "react";
// import ImageSelection from "./_components/ImageSelection";
// import RoomType from "./_components/RoomType";
// import DesignType from "./_components/DesignType";
// import AdditionalReq from "./_components/AdditionalReq";
// import { Button } from "@/components/ui/button";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { storage } from "@/config/firebaseConfig";
// import { useUser } from "@clerk/nextjs";
// import CustomLoading from "./_components/CustomLoading";
// import AiOutputDialog from "../_components/AiOutputDialog";
// import { UserDetailContext } from "@/app/_context/UserDetailContext";
// import { Users } from "@/config/schema";
// import { db } from "@/config/db";
// import axios from "axios";
// function CreateNew() {
//   const { user } = useUser();
//   const [formData, setFormData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [aiOutputImage, setAiOutputImage] = useState();
//   const [openOutputDialog, setOpenOutputDialog] = useState(false);
//   const [orgImage, setOrgImage] = useState();
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   // const [outputResult, setOutputResult] = useState();
//   const onHandleInputChange = (value, fieldName) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: value,
//     }));
//     console.log(formData);
//   };
//   const GenerateAiImage = async () => {
//     setLoading(true);
//     const rawImageUrl = await SaveRawImageToFirebase();
//     const result = await axios.post("/api/redesign-room", {
//       imageUrl: rawImageUrl,
//       roomType: formData?.roomType,
//       designType: formData?.designType,
//       additionalReq: formData?.additionalReq,
//       userEmail: user?.primaryEmailAddress?.emailAddress,
//     });
//     console.log(result);
//     setAiOutputImage(result.data.result);
//     await updateUserCredits();
//     setOpenOutputDialog(true);
//     setLoading(false);
//   };

//   const SaveRawImageToFirebase = async () => {
//     const fileName = Date.now() + "_raw.png";
//     const imageRef = ref(storage, "interiofyy/" + fileName);
//     await uploadBytes(imageRef, formData.image).then((resp) => {
//       console.log("File Uploaded...");
//     });
//     const downloadUrl = await getDownloadURL(imageRef);
//     console.log(downloadUrl);
//     setOrgImage(downloadUrl);
//     return downloadUrl;
//   };
//   const updateUserCredits = async () => {
//     const result = db
//       .update(Users)
//       .set({
//         credits: userDetail?.credits - 1,
//       })
//       .returning({ id: Users.id });
//     if (result) {
//       setUserDetial((prev) => ({
//         ...prev,
//         credits: setUserDetail?.credits - 1,
//       }));
//       return result[0].id;
//     }
//   };
//   return (
//     <div>
//       <h2 className="font-bold text-4xl text-primary text-center">
//         Experience the Magic of AI Remodelling
//       </h2>
//       <p className="text-center text-gray-400">
//         Transform any room with a click. Select a space , choose a style , and
//         watch as AI instantly reimagines your environment.
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
//         {/* Image Selection */}
//         <ImageSelection
//           selectedImage={(value) => onHandleInputChange(value, "image")}
//         />
//         {/* Form Input Selection */}
//         <div>
//           {/* Room Type  */}
//           <RoomType
//             selectedRoomType={(value) => onHandleInputChange(value, "roomType")}
//           />
//           {/* Design Type */}
//           <DesignType
//             selectedDesignType={(value) =>
//               onHandleInputChange(value, "designType")
//             }
//           />
//           {/* Additional Requirement TextArea (optional)*/}
//           <AdditionalReq
//             additionalRequirementInput={(value) =>
//               onHandleInputChange(value, "additionalReq")
//             }
//           />
//           {/* Button to generate Image */}
//           <Button className="w-full mt-5" onClick={GenerateAiImage}>
//             Generate
//           </Button>
//           <p className="text-sm text-gray-400 mb-52">
//             Note: 1 credit will be used to redesign your room
//           </p>
//         </div>
//       </div>
//       <CustomLoading loading={loading} />
//       <AiOutputDialog
//         openDialog={openOutputDialog}
//         closeDialog={() => setOpenOutputDialog(false)}
//         orgImage={orgImage}
//         aiImage={aiOutputImage}
//       />
//     </div>
//   );
// }
// export default CreateNew;

"use client";

import React, { useContext, useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalReq";
import { Button } from "@/components/ui/button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import CustomLoading from "./_components/CustomLoading";
import AiOutputDialog from "../_components/AiOutputDialog";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import axios from "axios";

export default function CreateNewPage() {
  const { user } = useUser();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiOutputImage, setAiOutputImage] = useState(null);
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImage] = useState(null);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const GenerateAiImage = async () => {
    setLoading(true);

    try {
      // 1. Upload the original image to Firebase and get its URL
      const rawImageUrl = await SaveRawImageToFirebase();

      // 2. Call the redesign-room API to generate the AI image
      const response = await axios.post("/api/redesign-room", {
        imageUrl: rawImageUrl,
        roomType: formData.roomType,
        designType: formData.designType,
        additionalReq: formData.additionalReq,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

      setAiOutputImage(response.data.result);

      // 3. Deduct 1 credit by calling the update-credits API route
      await updateUserCredits();

      // 4. Open the dialog to show the AI-generated output
      setOpenOutputDialog(true);
    } catch (err) {
      console.error("Error during AI generation:", err);
    } finally {
      setLoading(false);
    }
  };

  const SaveRawImageToFirebase = async () => {
    const fileName = Date.now() + "_raw.png";
    const imageRef = ref(storage, "interiofyy/" + fileName);

    await uploadBytes(imageRef, formData.image);
    const downloadUrl = await getDownloadURL(imageRef);
    setOrgImage(downloadUrl);
    return downloadUrl;
  };

  const updateUserCredits = async () => {
    try {
      await axios.post("/api/update-credits", {
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

      // Update local context so UI reflects the new credit count
      setUserDetail((prev) => ({
        ...prev,
        credits: (prev?.credits || 0) - 1,
      }));
    } catch (err) {
      console.error("Failed to update credits:", err);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Remodelling
      </h2>
      <p className="text-center text-gray-400 mb-6">
        Transform any room with a click. Select a space, choose a style, and
        watch as AI instantly reimagines your environment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Image Selection */}
        <ImageSelection
          selectedImage={(value) => onHandleInputChange(value, "image")}
        />

        {/* Form Inputs */}
        <div className="space-y-4">
          <RoomType
            selectedRoomType={(value) => onHandleInputChange(value, "roomType")}
          />
          <DesignType
            selectedDesignType={(value) =>
              onHandleInputChange(value, "designType")
            }
          />
          <AdditionalReq
            additionalRequirementInput={(value) =>
              onHandleInputChange(value, "additionalReq")
            }
          />

          <Button
            className="w-full mt-5"
            onClick={GenerateAiImage}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>

          <p className="text-sm text-gray-400">
            Note: 1 credit will be used to redesign your room
          </p>
        </div>
      </div>

      <CustomLoading loading={loading} />

      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        aiImage={aiOutputImage}
      />
    </div>
  );
}
