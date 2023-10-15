import React from "react";
import ProfileInformation from "./profile-information-component";
import ProfileAvatar from "./profile-avatar-component";

const FormChangeProfile = ({setReload, reload}) => {
  return (
    <div className="xs:w-full">
      <ProfileAvatar reload={reload} setReload={setReload} />
      <ProfileInformation reload={reload} setReload={setReload}  />
    </div>
  );
};

export default FormChangeProfile;
