import React from "react";
import Image from "next/image";

interface Props {
  id: string;
  leader: string;
  contactNumber: string;
  role: string;
  disciples: { memberPhoto: string; _id: string }[];
  image: string;
}
const SmallGroupCard = ({
  id,
  leader,
  role,
  contactNumber,
  disciples,
  image,
}: Props) => {
  return (
    <div
      className="flex w-[400px] flex-row gap-6 rounded-xl p-8 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
      //   onClick={() => router.push(`/ministries/${label}`)}
    >
      <Image
        src={image}
        alt="default"
        width={135}
        height={135}
        className=" rounded object-cover"
      />
      <div className="flex flex-col justify-center gap-2">
        <div className="mb-2">
          <p className="paragraph-semibold text-dark400_light700">{leader}</p>
          <p className="body-regular text-light400_light500">{role}</p>
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
              <p className="body-regular">{contactNumber}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image
                src="/assets/icons/disciples.svg"
                alt="default"
                width={18}
                height={18}
              />
              <p className="body-regular">
                {disciples.length}{" "}
                {disciples.length > 1 ? "Disciples" : "Disciple"}
              </p>
            </div>
            <div className="flex flex-row flex-wrap gap-1">
              {disciples.map((disciple) => (
                <Image
                  src={disciple.memberPhoto}
                  key={disciple._id.toString()}
                  width={20}
                  height={20}
                  alt="memberPhoto"
                  className="rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallGroupCard;
