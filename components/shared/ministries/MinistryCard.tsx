import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { name } from "apexcharts";

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
    <Link href={`/ministries/edit/${ministryId}`}>
      <div className="background-light900_dark300 flex w-[340px] cursor-pointer flex-col rounded-xl px-6  py-8 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <div className="flex flex-row items-center justify-between">
          <div className="text-dark200_light800 max-w-[200px]">
            <p className="base-bold mb-2 line-clamp-1">{name} Ministry</p>
            <p className="body-regular">Members</p>
            <p className="paragraph-semibold mb-2">{members.length}</p>
            <p className="body-regular">Ministry Head:</p>
            <p className="body-semibold mb-2">{ministryHead}</p>
          </div>
          <div className="min-w-[100px] ">
            <Image
              src={ministryPhoto}
              alt="prayer"
              width={100}
              height={100}
              className=""
            />
          </div>
        </div>
        <div className="text-dark200_light800">
          <p className="body-regular">Description</p>
          <p className="small-regular">
            Involves musicians, singers, and tech teams responsible for leading
            worship services through music, song, and audiovisual elements.
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MinistryCard;
