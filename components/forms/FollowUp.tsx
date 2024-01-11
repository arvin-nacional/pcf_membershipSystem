"use client";
import { FollowUpSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
// import { editMinistry } from "@/lib/actions/ministry.action";
import { useRouter, usePathname } from "next/navigation";
// import { createAttendee, editAttendee } from "@/lib/actions/attendee.action";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { CommandInput, CommandEmpty, CommandGroup, CommandItem } from "cmdk";
import { ChevronsUpDown, Command, Check } from "lucide-react";
import { MemberNames } from "@/types";

interface Props {
  type?: string;
  attendeeDetails?: string;
  attendeeId?: string;
  memberNames: MemberNames[];
}
const FollowUpForm = ({
  type,
  attendeeDetails,
  attendeeId,
  memberNames,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  console.log(attendeeDetails);
  const parsedAttendeeDetails = attendeeDetails
    ? JSON.parse(attendeeDetails || "")
    : null;

  // 1. Define your form.
  const form = useForm<z.infer<typeof FollowUpSchema>>({
    resolver: zodResolver(FollowUpSchema),
    defaultValues: {
      distinction: "",
      name: "none",
      responsible: "none",
      type: "",
      status: "",
      remarks: "",
      action: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof FollowUpSchema>) {
    setIsSubmitting(true);
    try {
      //   if (type === "edit") {
      //     await editAttendee({
      //       fullName: values.name,
      //       gender: values.gender,
      //       contactNumber: values.contactNumber,
      //       address: values.address,
      //       status: values.status,
      //       path: pathname,
      //       attendeeId,
      //     });
      //   } else {
      //   await createAttendee({
      //     fullName: values.name,
      //     gender: values.gender,
      //     contactNumber: values.contactNumber,
      //     address: values.address,
      //     status: values.status,
      //     path: pathname,
      //   });
      //   }

      router.push("/attendees");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  console.log(parsedAttendeeDetails);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="distinction"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Type <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="cursor-pointer bg-light-900">
                  <SelectItem value="Active">Attendee</SelectItem>
                  <SelectItem value="Inactive">Member</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select group type
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Name to be followed-up
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border justify-between ",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value !== undefined && field.value !== "none" ? (
                        memberNames.find(
                          (memberName) => memberName._id === field.value
                        )?.value
                      ) : (
                        <span>No Discipler</span>
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="background-light900_dark300 text-dark400_light800 w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search member..." />
                    <CommandEmpty>No member found.</CommandEmpty>
                    <CommandGroup className="max-h-40 overflow-y-auto">
                      <CommandItem
                        value="none" // Use a value that represents "No Discipler"
                        onSelect={() => {
                          form.setValue("name", "none"); // Set the value to "none" when selected
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === undefined
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        No Discipler
                      </CommandItem>
                      {memberNames.map((member) => (
                        <CommandItem
                          value={member.name}
                          key={member._id}
                          onSelect={() => {
                            form.setValue("name", member._id);
                            // console.log(member._id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              member._id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {member.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select the name
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsible"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Name to be followed-up
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border justify-between ",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value !== undefined && field.value !== "none" ? (
                        memberNames.find(
                          (memberName) => memberName._id === field.value
                        )?.value
                      ) : (
                        <span>No Discipler</span>
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="background-light900_dark300 text-dark400_light800 w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search member..." />
                    <CommandEmpty>No member found.</CommandEmpty>
                    <CommandGroup className="max-h-40 overflow-y-auto">
                      <CommandItem
                        value="none" // Use a value that represents "No Discipler"
                        onSelect={() => {
                          form.setValue("name", "none"); // Set the value to "none" when selected
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === undefined
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        No Discipler
                      </CommandItem>
                      {memberNames.map((member) => (
                        <CommandItem
                          value={member.name}
                          key={member._id}
                          onSelect={() => {
                            form.setValue("name", member._id);
                            // console.log(member._id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              member._id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {member.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select the name
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Action <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="cursor-pointer bg-light-900">
                  <SelectItem value="male">Message</SelectItem>
                  <SelectItem value="female">Visitation</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select action
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {type === "edit" && (
          <>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col ">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Status <span className="text-primary-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="cursor-pointer bg-light-900">
                      <SelectItem value="pending">pending</SelectItem>
                      <SelectItem value="ongoing">on going</SelectItem>
                      <SelectItem value="done">done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Select follow up status
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col ">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Remarks <span className="text-primary-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="cursor-pointer bg-light-900">
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="unresponsive">Unresponsive</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Select follow up remarks
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </>
        )}

        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Saving..." : "Adding"}</>
          ) : (
            <>{type === "edit" ? "Save" : "Add an Attendee"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FollowUpForm;
