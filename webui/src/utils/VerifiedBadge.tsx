import { BadgeCheck } from "lucide-react";

const VerifiedBadge = () => {
  return (
    <div className="flex flex-row gap-1 justify-center items-center">
      <BadgeCheck className="text-blue-600" size={20} />
      <p className="text-sm">Verified</p>
    </div>
  );
};

export default VerifiedBadge;
