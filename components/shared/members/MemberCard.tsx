import React from "react";
import Image from "next/image";

const MemberCard = () => {
  return (
    <div className="flex w-fit flex-row gap-6 rounded-xl p-8 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
      <Image
        src="/assets/images/default-user-square.svg"
        alt="default"
        width={135}
        height={135}
        className=" rounded object-cover"
      />
      <div className="flex flex-col">
        <div className="mb-2">
          <p className="paragraph-semibold text-dark400_light700">
            Michael Medalla
          </p>
          <p className="small-regular text-light400_light500">Leader</p>
        </div>
        <div className="text-light400_light500 flex flex-col">
          <div className="mb-2 flex flex-row gap-2">
            <Image
              src="/assets/icons/mail.svg"
              alt="default"
              width={18}
              height={18}
            />
            <p className="body-regular">kareneboyette@armyspy.com</p>
          </div>

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
                src="/assets/icons/pin.svg"
                alt="default"
                width={18}
                height={18}
              />
              <p className="body-regular">Quezon City Philippines</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image
                src="/assets/icons/disciples.svg"
                alt="default"
                width={18}
                height={18}
              />
              <p className="body-regular">2 Disciples</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
