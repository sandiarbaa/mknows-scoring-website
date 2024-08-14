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
      <div>
        <h4 className="font-semibold text-sm italic">Fatwa Nasution</h4>
        {/* Fikri */}
        <p className="text-xs italic">User</p>
      </div>
    </div>
  );
};

export default UserPhoto;
