import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
export default function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <div className="bg-white flex flex-col items-center my-10 justify-center">
          <Image src={"/loading.gif"} alt="loading" width={100} height={100} />
          <h2>Redesigning your room... Do not refresh </h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
