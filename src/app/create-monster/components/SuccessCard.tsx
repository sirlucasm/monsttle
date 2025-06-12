import Button3D from "@/components/Button";
import { CheckIcon } from "lucide-react";

export default function SuccessCard() {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <CheckIcon size={48} className="text-success" />
      <h2 className="text-2xl font-bold text-success">Success</h2>
      <p className="text-white/80">Monster created successfully!</p>

      <Button3D href="/" variant="secondary" size="sm" className="mt-6">
        Go home
      </Button3D>
    </div>
  );
}
