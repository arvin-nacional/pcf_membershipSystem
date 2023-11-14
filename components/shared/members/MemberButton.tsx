"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { memberButtons } from "@/constants";
import { useRouter, usePathname } from "next/navigation";
import { deleteMember } from "@/lib/actions/member.action";

interface Props {
  memberId: string;
}

const MemberButton = ({ memberId }: Props) => {
  const path = usePathname();
  const router = useRouter();
  const { mode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? (
            <Image
              src="/assets/icons/menu.svg"
              alt="btn"
              width={20}
              height={20}
              className="text-dark500_light700"
            />
          ) : (
            <Image
              src="/assets/icons/menu-dark.svg"
              alt="btn"
              width={20}
              height={20}
              className="text-dark500_light700"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] min-w-[120px] rounded border bg-light-900  dark:border-dark-400 dark:bg-dark-300">
          {memberButtons.map((item) => (
            <MenubarItem
              key={item.value}
              onClick={() => {
                item.value === "edit" &&
                  router.push(`/members/edit/${memberId}`);
                item.value === "view" && router.push(`/members/${memberId}`);
                item.value === "delete" && deleteMember({ path, memberId });
              }}
              className="text-dark100_light900 flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
            >
              <Image
                src={item.icon}
                alt={item.value}
                width={16}
                height={16}
                // className={ }
              />
              <p
              // className={`body-semibold text-light-500 ${
              //   mode === item.value
              //     ? "text-primary-500"
              //     : "text-dark100_light900"
              // }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MemberButton;
