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
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EventSchema } from "@/lib/validations";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { createEvent } from "@/lib/actions/event.action";

interface Props {
  closeModal: () => void;
  eventArg: {
    date: string;
  };
}

const EventForm = ({ closeModal, eventArg }: Props) => {
  const type = "edit";
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      start: eventArg.date,
    },
  });

  const pathname = usePathname();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EventSchema>) {
    setIsSubmitting(true);
    try {
      await createEvent({
        title: values.title,
        start: values.start,
        path: pathname,
      });
      closeModal();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
    console.log(values);
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" mt-5 flex w-full flex-col gap-10"
      >
        {" "}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark-400">
                Event Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter event title
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark-400">
                Event Date <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter event date
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
            <>{type === "edit" ? "Saving..." : "Adding"}</>
          ) : (
            <>{type === "edit" ? "Save" : "Add a Member"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
