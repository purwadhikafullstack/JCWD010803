import React from "react";
import ProfileInformation from "./profile-information-component";
import ProfileAvatar from "./profile-avatar-component";

const FormChangeProfile = () => {
  return (
    <div className="xs:w-full">
      <ProfileAvatar />
      <ProfileInformation />
    </div>
  );
};

export default FormChangeProfile;
