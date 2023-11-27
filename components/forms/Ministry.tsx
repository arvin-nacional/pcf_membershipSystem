"use client";
import { MinistrySchema } from "@/lib/validations";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { MemberNames } from "@/types";
import { DiscipleSelect } from "../ui/disciple-select";
import { editMinistry } from "@/lib/actions/ministry.action";

interface Props {
  memberNames: MemberNames[];
  type?: string;
  ministryDetails?: string;
  ministryId?: string;
}
const MinistryForm = ({
  memberNames,
  type,
  ministryDetails,
  ministryId,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   const [preview, setPreview] = useState({
  //     name: "default",
  //     url: `${
  //       parsedMemberDetails?.memberPhoto
  //         ? parsedMemberDetails.memberPhoto
  //         : "https://res.cloudinary.com/dey07xuvf/image/upload/v1700148763/default-user-square_fmd1az.svg"
  //     }`,
  //   });

  // convert memberDetails to object

  console.log(ministryDetails);
  const parsedMinistryDetails = ministryDetails
    ? JSON.parse(ministryDetails || "")
    : null;

  const [preview, setPreview] = useState({
    name: "default",
    url: `${
      parsedMinistryDetails?.photo
        ? parsedMinistryDetails.photo
        : "https://res.cloudinary.com/dey07xuvf/image/upload/v1701066296/ministry_gu9mvn.png"
    }`,
  });

  // change the array of member OBJ to array of member names
  const membersArr: string[] = parsedMinistryDetails?.members?.map(
    (obj: any) => `${obj.firstName} ${obj.lastName}`
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof MinistrySchema>>({
    resolver: zodResolver(MinistrySchema),
    defaultValues: {
      name: parsedMinistryDetails?.name || "",
      leader: parsedMinistryDetails?.leader?._id || "none",
      // middleName: "",
      // suffix: "",
      description: "",
      photo: parsedMinistryDetails?.photo || "",
      members: membersArr || undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof MinistrySchema>) {
    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        // change the names of disciples to their ids
        const selectedMembers = values.members
          ? (values.members
              .map(
                (name) =>
                  memberNames.find((member) => member.name === name)?._id
              )
              .filter((id) => id !== undefined) as string[])
          : undefined;

        const leaderId =
          values.leader === "none" ? undefined : values.disciplerId;

        await editMinistry({
          name: values.name,
          description: values.description,
          leader: leaderId,
          members: selectedMembers,
          photo: values.photo,
        });
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  // convert image to string
  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPreview({ name: file?.name, url: result })
    );
  };

  console.log(parsedMinistryDetails);
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
                Ministry Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter ministry name
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Description <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter your ministry description
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leader"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Ministry Head
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
                        <span>No Leader</span>
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
                      {memberNames.map((member) => (
                        <CommandItem
                          value={member.name}
                          key={member._id}
                          onSelect={() => {
                            form.setValue("leader", member._id);
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
                Select the name of the Ministry Head
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="members"
          render={({ field: { ...field } }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Members
              </FormLabel>
              <DiscipleSelect
                selected={field.value}
                members={memberNames}
                {...field}
                className="background-light900_dark300"
              />
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Select members in the ministry
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Avatar className="h-24 w-24">
          <AvatarImage src={preview.url} />
          <AvatarFallback>Your Photo</AvatarFallback>
        </Avatar>
        <FormField
          control={form.control}
          name="photo"
          render={({ field: { onChange, value, ...rest } }) => (
            <>
              <FormItem>
                <FormLabel>Member Photo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...rest}
                    onChange={(e) => {
                      // @ts-ignore
                      handleImageChange(e.target.files[0]);
                    }}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border align-baseline"
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Choose your image. We prefer square photo.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            </>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Saving..." : "Adding"}</>
          ) : (
            <>{type === "edit" ? "Save" : "Add a Member"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default MinistryForm;
