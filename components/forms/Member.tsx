"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";
import { MemberSchema } from "@/lib/validations";
import { createMember } from "@/lib/actions/member.action";

const type: any = "create";

const Member = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof MemberSchema>>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      // middleName: "",
      // suffix: "",
      emailAddress: "",
      contactNumber: "",
      homeAddress: "",
      emergencyContactPerson: "",
      emergencyContactNumber: "",
      highestEducation: "",
      // preferredLanguage: "",
      birthday: "",
      gender: "",
      memberType: "",
      // status: "",
      // memberPhoto: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof MemberSchema>) {
    console.log("test");
    setIsSubmitting(true);
    try {
      console.log("test");
      setIsSubmitting(true);

      const member = await createMember({
        lastName: values.lastName,
        firstName: values.firstName,
        // middleName: values.middleName,
        // suffix: values.suffix,
        emailAddress: values.emailAddress,
        contactNumber: values.contactNumber,
        homeAddress: values.homeAddress,
        emergencyContactPerson: values.emergencyContactPerson,
        emergencyContactNumber: values.emergencyContactNumber,
        highestEducation: values.highestEducation,
        // preferredLanguage: values.preferredLanguage,
        birthday: values.birthday,
        gender: values.gender,
        memberType: values.memberType,
        // status: values.status,
        // memberPhoto: values.memberPhoto,
        path: pathname,
      });
      console.log(member);

      router.push("/");
    } catch (error) {
      console.log(error);
      throw new Error();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Last Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your family name
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                First Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your first name
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Birthday MM/DD/YYYY <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your first name
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Email Address <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your email address
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
          name="homeAddress"
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
          name="emergencyContactPerson"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Emergency Contact Person{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your emergency contact person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emergencyContactNumber"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Emergency Contact Number{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your emergency contact number
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Middle Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your middle name
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="suffix"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Suffix <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your suffix
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Email Address <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your email address
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="highestEducation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Highest Educational Attainment{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="cursor-pointer bg-light-900">
                  <SelectItem value="Doctorate Degree">
                    Doctorate Degree
                  </SelectItem>
                  <SelectItem value="Masters Degree">Masters Degree</SelectItem>
                  <SelectItem value="College Graduate">
                    College Graduate
                  </SelectItem>
                  <SelectItem value="College Undergrad">
                    College Undergrad
                  </SelectItem>
                  <SelectItem value="High School Graduate">
                    High School Graduate
                  </SelectItem>
                  <SelectItem value="High School Undergraduate">
                    High School Undergraduate
                  </SelectItem>
                  <SelectItem value="Elementary Graduate">
                    Elementary Graduate
                  </SelectItem>
                  <SelectItem value="Elementary Undergraduate">
                    Elementary Undergraduate
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select your highest educational attainment
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="preferredLanguage"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Preferred Language <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="cursor-pointer bg-light-900">
                  <SelectItem value="tagalog">Tagalog</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="taglish">TagLish</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select your preferred language
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        /> */}
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
        <FormField
          control={form.control}
          name="memberType"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Member Type <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="cursor-pointer bg-light-900">
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Church Staff">Church Staff</SelectItem>
                  <SelectItem value="Leader">Leader</SelectItem>
                  <SelectItem value="Ministry Head">Ministry Head</SelectItem>
                  <SelectItem value="Board of Servant Leader">
                    Board of Servant Leader
                  </SelectItem>
                  <SelectItem value="Pastoral Staff">Pastoral Staff</SelectItem>
                  <SelectItem value="Pastor">Pastor</SelectItem>
                  <SelectItem value="Senior Pastor">Senior Pastor</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select Member Type
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Adding"}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Add a Member"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Member;
