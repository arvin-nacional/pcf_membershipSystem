import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  name: string;
  ministryHead: string;
  members: any;
  ministryPhoto: string;
  description: string;
  ministryId: string;
}

const MinistryCard = ({
  name,
  members,
  ministryPhoto,
  description,
  ministryHead,
  ministryId,
}: Props) => {
  return (
    <div className="background-light900_dark300 flex w-[340px] flex-col rounded-xl px-6  py-8 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
      <div className="flex flex-row items-center justify-between">
        <div className="text-dark200_light800 max-w-[200px]">
          <p className="base-bold mb-2 line-clamp-1">{name} Ministry</p>
          <p className="body-regular">Members</p>
          <p className="paragraph-semibold mb-2">{members.length}</p>
          <p className="body-regular">Ministry Head:</p>
          <p className="body-semibold mb-2">{ministryHead}</p>
        </div>
        <div className="min-w-[100px] ">
          {ministryPhoto ? (
            <Image
              src={ministryPhoto}
              alt="prayer"
              width={100}
              height={100}
              className=""
            />
          ) : (
            <Image
              src="https://res.cloudinary.com/dey07xuvf/image/upload/v1701066296/ministry_gu9mvn.png"
              alt="prayer"
              width={100}
              height={100}
              className=""
            />
          )}
        </div>
      </div>
      <div className="text-dark200_light800">
        <p className="body-regular">Description:</p>
        <p className="small-regular">{description}</p>
      </div>
      <div className=" mt-5 flex justify-between">
        <Link href={`/ministries/${ministryId}`}>
          <Button className="bg-grey text-dark200_light800 gap-2 px-4 py-3 ">
            View Members
          </Button>
        </Link>
        <Link href={`/ministries/edit/${ministryId}`}>
          <Button className="primary-gradient gap-2 p-3 !text-light-900">
            <Image
              src="/assets/icons/write.svg"
              alt="write"
              width={15}
              height={15}
            />
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MinistryCard;
