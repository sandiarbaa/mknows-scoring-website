import Image from "next/image";
import React from "react";

const UserPhoto = () => {
  return (
    <div className="flex mt-10 items-center">
      <Image
        src="/assets/dashboard/dashboard/profile.png"
        alt="profile"
        width={30}
        height={30}
        className="mr-3 border-2 rounded-full border-ijoToska"
      />
      <h4>Fatwa Nasution</h4>
    </div>
  );
};

export default UserPhoto;
