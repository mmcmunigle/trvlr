"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Activity, ActivityType } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import { Callout, Spinner } from "@radix-ui/themes";

const ActivityFormSchema = z.object({
  title: z.string().min(2, {
    message: "Activity must be at least 3 characters.",
  }),
  type: z.any(),
  location: z.string().optional(),
  description: z.string().optional(),
  allDay: z.boolean(),
});

type ActivityFormData = z.infer<typeof ActivityFormSchema>;

interface Props {
  activity: Partial<Activity>;
  onClose: () => void;
}
const ActivityForm = ({ activity, onClose }: Props) => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<ActivityFormData>({
    resolver: zodResolver(ActivityFormSchema),
    defaultValues: {
      title: activity?.title || "",
      type: activity?.type || ActivityType.ACTIVITY,
      location: activity?.description || "",
      description: activity?.description || "",
      allDay: activity?.allDay || false,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setError("");
      setSubmitting(true);
      if (activity.id) {
        await axios.patch("/api/activity/" + activity.id, data);
      } else {
        await axios.post("/api/activity", { ...activity, ...data });
      }
      onClose();
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      setError("An unexpected error occured.");
    }
  });

  return (
    <Form {...form}>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>{/* <InfoCircledIcon /> */}</Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Title</FormLabel>
              <FormControl>
                <Input placeholder="Visit the Eiffel Tower" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(ActivityType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location/Address</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Notes or description of the activity..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allDay"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>All day activity?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} type="submit">
          {activity.id ? "Update Activity" : "Submit New Activity"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Form>
  );
};

export default ActivityForm;
