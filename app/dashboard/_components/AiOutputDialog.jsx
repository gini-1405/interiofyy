// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import ReactBeforeSliderComponent from "react-before-after-slider-component";
// import "react-before-after-slider-component/dist/build.css";
// function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
//   return (
//     <AlertDialog open={openDialog}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Result:</AlertDialogTitle>
//           <ReactBeforeSliderComponent
//             firstImage={{
//               imageUrl: aiImage,
//             }}
//             secondImage={{
//               imageUrl: orgImage,
//             }}
//           />
//           <Button onClick={() => closeDialog(false)}>Close</Button>
//         </AlertDialogHeader>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// export default AiOutputDialog;

import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent>
        {/* Accessible Header */}
        <AlertDialogHeader>
          <AlertDialogTitle>AI Redesign Preview</AlertDialogTitle>
          <AlertDialogDescription>
            Compare your original and AI-generated image below.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Slider Content */}
        <div className="mt-4">
          <ReactBeforeSliderComponent
            firstImage={{ imageUrl: orgImage }}
            secondImage={{ imageUrl: aiImage }}
          />
        </div>

        {/* Footer with Close Button */}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => closeDialog(false)}>
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AiOutputDialog;
