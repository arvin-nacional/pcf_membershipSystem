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
import { useRouter, usePathname } from "next/navigation";
import { deleteMember } from "@/lib/actions/member.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

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
        <MenubarTrigger className="w-[50px] cursor-pointer dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? (
            <Image
              src="assets/icons/menudots.svg"
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
        <MenubarContent className="absolute right-[-3rem] rounded border bg-light-900 dark:border-dark-400  dark:bg-dark-300 max-sm:w-[50px]">
          {/* item.value === "view" && router.push(`/members/${memberId}`);
                item.value === "delete" && deleteMember({ path, memberId }); */}
          <MenubarItem
            onClick={() => {
              router.push(`/members/edit/${memberId}`);
            }}
            className="text-dark100_light900 flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
          >
            <Image
              src="/assets/icons/edit-btn.svg"
              alt="edit"
              width={16}
              height={16}
            />
            <p>Edit</p>
          </MenubarItem>
          <MenubarItem
            onClick={() => {
              router.push(`/members/${memberId}`);
            }}
            className="text-dark100_light900 flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
          >
            <Image
              src="/assets/icons/view-btn.svg"
              alt="view"
              width={16}
              height={16}
            />
            <p>View</p>
          </MenubarItem>
          {/* <Dialog>
            <DialogTrigger>
              <div className="text-dark100_light900 flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400">
                <Image
                  src="/assets/icons/delete-btn.svg"
                  alt="delete"
                  width={16}
                  height={16}
                />
                Delete
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  member and remove the data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  className="bg-red text-light-800"
                  onClick={() => {
                    deleteMember({ path, memberId });
                  }}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="text-dark100_light900 flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400">
                <Image
                  src="/assets/icons/delete-btn.svg"
                  alt="delete"
                  width={16}
                  height={16}
                />
                Delete
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="background-light900_dark300 text-dark400_light700">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  member and remove its data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">
                  <Button
                    className="bg-red text-light-800"
                    onClick={() => {
                      deleteMember({ path, memberId });
                      return toast({
                        title: "Member Deleted",
                        variant: "default",
                      });
                    }}
                  >
                    Continue
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MemberButton;
