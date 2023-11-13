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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";
import { MemberSchema } from "@/lib/validations";
import { createMember, editMember } from "@/lib/actions/member.action";
import { ministries, spiritualGifts, trainings } from "@/constants";
import { MemberNames } from "@/types";
import { DiscipleSelect } from "../ui/disciple-select";

// get member names for the disciples and discipler formfield
interface Props {
  memberNames: MemberNames[];
  type?: string;
  memberDetails?: string;
  memberId?: string;
}
interface Ministry {
  _id: string;
  name: string;
  leaders: string[];
  members: string[];
}
interface SpiritualGift {
  _id: string;
  name: string;
  members: string[];
}
interface Training {
  _id: string;
  name: string;
  members: string[];
}

const Member = ({ memberNames, type, memberDetails, memberId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const parsedMemberDetails = memberDetails
    ? JSON.parse(memberDetails || "")
    : null;

  // change the array of Ministries OBJ to array of ministry names
  const secondaryMinistriesArr: string[] =
    parsedMemberDetails?.secondaryMinistries?.map((obj: Ministry) => obj.name);

  // change the array of Spiritual Gifts OBJ to array of spiritualgift names
  const spiritualGiftsArr: string[] = parsedMemberDetails?.spiritualGifts?.map(
    (obj: SpiritualGift) => obj.name
  );
  // change the array of trainings OBJ to array of training names
  const trainingsArr: string[] = parsedMemberDetails?.trainings?.map(
    (obj: Training) => obj.name
  );
  // change the array of member OBJ to array of member names
  const disciplesArr: string[] = parsedMemberDetails?.disciples?.map(
    (obj: any) => `${obj.firstName} ${obj.lastName}`
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof MemberSchema>>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      lastName: parsedMemberDetails?.lastName || "",
      firstName: parsedMemberDetails?.firstName || "",
      // middleName: "",
      // suffix: "",
      emailAddress: parsedMemberDetails?.emailAddress || "",
      contactNumber: parsedMemberDetails?.contactNumber || "",
      homeAddress: parsedMemberDetails?.homeAddress || "",
      emergencyContactPerson: parsedMemberDetails?.emergencyContactPerson || "",
      emergencyContactNumber: parsedMemberDetails?.emergencyContactNumber || "",
      highestEducation: parsedMemberDetails?.highestEducation?.name || "",
      preferredLanguage: parsedMemberDetails?.preferredLanguage?.name || "",
      birthday: parsedMemberDetails?.birthday || "",
      gender: parsedMemberDetails?.gender?.name || "",
      memberType: parsedMemberDetails?.memberType?.name || "",
      primaryMinistry: parsedMemberDetails?.primaryMinistry?.name || "",
      lifeGearSeries: parsedMemberDetails?.lifeGearSeries?.name || "",
      followUpSeries: parsedMemberDetails?.followUpSeries?.name || "",
      spiritualGifts: spiritualGiftsArr || undefined,
      secondaryMinistries: secondaryMinistriesArr || undefined,
      status: parsedMemberDetails?.status?.name || "",
      trainings: trainingsArr || undefined,
      disciples: disciplesArr || undefined,
      // disciplerId: "",
      disciplerId: parsedMemberDetails?.discipler?._id || "none",
      waterBaptism: parsedMemberDetails?.waterBaptism || "",
      // memberPhoto: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof MemberSchema>) {
    setIsSubmitting(true);
    try {
      // change the names of disciples to their ids
      const selectedDisciples = values.disciples
        ? (values.disciples
            .map(
              (name) => memberNames.find((member) => member.name === name)?._id
            )
            .filter((id) => id !== undefined) as string[])
        : undefined;

      // Set disciplerId to undefined if "none" is selected
      const disciplerId =
        values.disciplerId === "none" ? undefined : values.disciplerId;

      if (type === "edit") {
        await editMember({
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
          preferredLanguage: values.preferredLanguage,
          birthday: values.birthday,
          gender: values.gender,
          memberType: values.memberType,
          waterBaptism: values.waterBaptism,
          primaryMinistry: values.primaryMinistry,
          followUpSeries: values.followUpSeries,
          lifeGearSeries: values.lifeGearSeries,
          status: values.status,
          spiritualGifts: values.spiritualGifts,
          secondaryMinistries: values.secondaryMinistries,
          trainings: values.trainings,
          // disciplerId: values.disciplerId,
          disciplerId,
          disciples: selectedDisciples,
          // status: values.status,
          // memberPhoto: values.memberPhoto,
          path: pathname,
          memberId,
        });
      } else {
        // creating
        await createMember({
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
          preferredLanguage: values.preferredLanguage,
          birthday: values.birthday,
          gender: values.gender,
          memberType: values.memberType,
          waterBaptism: values.waterBaptism,
          primaryMinistry: values.primaryMinistry,
          followUpSeries: values.followUpSeries,
          lifeGearSeries: values.lifeGearSeries,
          status: values.status,
          spiritualGifts: values.spiritualGifts,
          secondaryMinistries: values.secondaryMinistries,
          trainings: values.trainings,
          // disciplerId: values.disciplerId,
          disciplerId,
          disciples: selectedDisciples,
          // status: values.status,
          // memberPhoto: values.memberPhoto,
          path: pathname,
        });
      }

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
                  <SelectItem value="Elementary Student">
                    Elementary Student
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
        <FormField
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
                  <SelectItem value="Tagalog">Tagalog</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Tagalog-English">
                    Tagalog-English
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select your preferred language
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
        <FormField
          control={form.control}
          name="followUpSeries"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Follow Up Series <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="cursor-pointer bg-light-900">
                  <SelectItem value="Follow Up Session 1">
                    Follow Up Session 1
                  </SelectItem>
                  <SelectItem value="Follow Up Session 2">
                    Follow Up Session 2
                  </SelectItem>
                  <SelectItem value="Follow Up Session 3">
                    Follow Up Session 3
                  </SelectItem>
                  <SelectItem value="Follow Up Session 4">
                    Follow Up Session 4
                  </SelectItem>
                  <SelectItem value="Follow Up Session 5">
                    Follow Up Session 5
                  </SelectItem>
                  <SelectItem value="Follow Up Session 6">
                    Follow Up Session 6
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select last follow up series taken
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lifeGearSeries"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Life Gear Series <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="cursor-pointer bg-light-900">
                  <SelectItem value="Life Gear 101">Life Gear 101</SelectItem>
                  <SelectItem value="Life Gear 201">Life Gear 201</SelectItem>
                  <SelectItem value="Life Gear 301">Life Gear 301</SelectItem>
                  <SelectItem value="Life Gear 401">Life Gear 401</SelectItem>
                  <SelectItem value="Life Gear 501">Life Gear 501</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select last life gear series taken
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="waterBaptism"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Water Baptism MM/DD/YYYY{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your water baptism date
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="primaryMinistry"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Primary Ministry <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="cursor-pointer bg-light-900">
                  <SelectItem value="None" key="None">
                    None
                  </SelectItem>
                  {ministries.map((ministry) => (
                    <SelectItem value={ministry.value} key={ministry.value}>
                      {ministry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select your primary ministry.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secondaryMinistries"
          render={({ field: { ...field } }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Secondary Ministry
              </FormLabel>
              <MultiSelect
                selected={field.value}
                options={ministries}
                {...field}
                className="background-light900_dark300"
              />
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select your secondary ministry. Leave blank if none.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="spiritualGifts"
          render={({ field: { ...field } }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Spiritual Gifts
              </FormLabel>
              <MultiSelect
                selected={field.value}
                options={spiritualGifts}
                {...field}
                className="background-light900_dark300"
              />
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select your spiritual gifts. Leave blank if unknown.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trainings"
          render={({ field: { ...field } }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Trainings
              </FormLabel>
              <MultiSelect
                selected={field.value}
                options={trainings}
                {...field}
                className="background-light900_dark300"
              />
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select trainings attended. Leave blank if none
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disciplerId"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Discipler
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
                          form.setValue("disciplerId", "none"); // Set the value to "none" when selected
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
                            form.setValue("disciplerId", member._id);
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
                Select the name of your discipler or leader
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disciples"
          render={({ field: { ...field } }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Disciples
              </FormLabel>
              <DiscipleSelect
                selected={field.value}
                members={memberNames}
                {...field}
                className="background-light900_dark300"
              />
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select members in your discipleship group. Leave blank if none
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Status <span className="text-primary-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="cursor-pointer bg-light-900">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select member status
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
            <>{type === "edit" ? "Edit Member" : "Add a Member"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Member;
