"use client";
import { AttendeeSchema } from "@/lib/validations";
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

import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { editMinistry } from "@/lib/actions/ministry.action";
import { useRouter, usePathname } from "next/navigation";
import { createAttendee, editAttendee } from "@/lib/actions/attendee.action";

interface Props {
  type?: string;
  attendeeDetails?: string;
  attendeeId?: string;
}
const AttendeeForm = ({ type, attendeeDetails, attendeeId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  console.log(attendeeDetails);
  const parsedAttendeeDetails = attendeeDetails
    ? JSON.parse(attendeeDetails || "")
    : null;

  // 1. Define your form.
  const form = useForm<z.infer<typeof AttendeeSchema>>({
    resolver: zodResolver(AttendeeSchema),
    defaultValues: {
      name: parsedAttendeeDetails?.fullName || "",
      status: parsedAttendeeDetails?.status || "active",
      gender: parsedAttendeeDetails?.gender || "",
      contactNumber: parsedAttendeeDetails?.contactNumber || "",
      address: parsedAttendeeDetails?.address || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AttendeeSchema>) {
    setIsSubmitting(true);
    try {
      if (type === "edit") {
        await editAttendee({
          fullName: values.name,
          gender: values.gender,
          contactNumber: values.contactNumber,
          address: values.address,
          status: values.status,
          path: pathname,
          attendeeId,
        });
      } else {
        await createAttendee({
          fullName: values.name,
          gender: values.gender,
          contactNumber: values.contactNumber,
          address: values.address,
          status: values.status,
          path: pathname,
        });
      }

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
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Full Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your full name
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                ContactNumber <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your contact number
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Home Address <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your home address
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Gender <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="cursor-pointer bg-light-900">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select your gender
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {type === "edit" && (
          <FormField
            control={form.control}
            name="status"
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Select member status
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
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

export default AttendeeForm;
