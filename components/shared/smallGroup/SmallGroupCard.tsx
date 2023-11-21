import React from "react";
import Image from "next/image";

// interface Props {
//   memberId: string;
//   name: string;
//   contactNumber: string;
//   role: string;
//   email: string;
//   address: string;
//   disciples: number;
//   image: string;
// }
const SmallGroupCard = () => {
  return (
    <div className="flex w-[400px] flex-row gap-6 rounded-xl p-8 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
      <Image
        src="/assets/images/default-user-square.svg"
        alt="default"
        width={135}
        height={135}
        className=" rounded object-cover"
      />
      <div className="flex flex-col justify-center gap-2">
        <div className="mb-2">
          <p className="paragraph-semibold text-dark400_light700">Name</p>
          <p className="body-regular text-light400_light500">Role</p>
        </div>
        <div className="text-light400_light500 flex   flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Image
                src="/assets/icons/phone.svg"
                alt="default"
                width={18}
                height={18}
              />
              <p className="body-regular">09123456789</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image
                src="/assets/icons/disciples.svg"
                alt="default"
                width={18}
                height={18}
              />
              <p className="body-regular">0 Disciples</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallGroupCard;
