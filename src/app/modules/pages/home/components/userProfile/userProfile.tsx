import type { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user?.user);
  return (
    <div className="flex items-center shadow-md bg-white rounded-2xl mt-4">
      <div className="w-24 h-24 rounded-full flex items-center justify-center">
        <img src={user?.image || "/images/empty-user.svg"} alt="صورة المشرف" />
      </div>
      <div>
        <p>المشرف</p>
        <p>{user?.name}</p>
      </div>
    </div>
  );
};

export default UserProfile;
