import { useState } from "react";
import ProfileView from "./profileView/profileView";
import ProfileForm from "./profileForm/profileForm";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <ProfileForm onCancel={() => setIsEditing(false)} />
      ) : (
        <ProfileView onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default Profile;
