import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  memberId: string;
  name: string;
  contactNumber: string;
  role: string;
  email: string;
  address: string;
  disciples: number;
  image: string;
}
const MemberCard = ({
  memberId,
  name,
  contactNumber,
  role,
  email,
  address,
  disciples,
  image,
}: Props) => {
  return (
    <div className="flex w-[400px] flex-row gap-6 rounded-xl p-8 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
      <Link href={`/members/${memberId}`} className="h-[135px] w-[135px]">
        {" "}
        <Image
          src={image}
          alt="default"
          width={135}
          height={135}
          className="h-[135px] w-[135px] rounded object-cover"
        />
      </Link>

      <div className="flex flex-col">
        <div className="mb-2">
          <p className="paragraph-semibold text-dark400_light700">{name}</p>
          <p className="small-regular text-light400_light500">{role}</p>
        </div>
        <div className="text-light400_light500 flex   flex-col">
          <div className="mb-2  flex flex-row gap-2">
            <Image
              src="/assets/icons/mail.svg"
              alt="default"
              width={18}
              height={18}
            />
            <p className="body-regular truncate ">{email}</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Image
                src="/assets/icons/phone.svg"
                alt="default"
                width={18}
                height={18}
              />
              <p className="body-regular">{contactNumber}</p>
            </div>
            <div className="flex max-w-[250px] flex-row gap-2">
              <Image
                src="/assets/icons/pin.svg"
                alt="default"
                width={18}
                height={18}
              />
              <p className="body-regular truncate ">{address}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image
                src="/assets/icons/disciples.svg"
                alt="default"
                width={18}
                height={18}
              />
              <p className="body-regular">{disciples} Disciples</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
