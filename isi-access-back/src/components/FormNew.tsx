import * as z from "zod";
import { useToast } from "./ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreatePost } from "@/lib/react-query/QueriesAndMutations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";

const formSchema = z.object({
  Title: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(24, { message: "Maximum 24 caracters" }),
  image: z.custom<string>(),
  attachment: z.custom<string>(),
  description: z
    .string()
    .min(1, { message: "This field is required" })
    .max(1000, { message: "Maximum 1000 characters." }),
  category: z.string(),
});

const FormNews = () => {
  const { toast } = useToast();

  const { user } = useUserContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      image: "",
      attachment: "",
      description: "",
      category: "",
    },
  });

  const { mutateAsync: createPost, isPending } = useCreatePost();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const newPost = await createPost({
      ...values,
      creator: user.id,
      creatorname: user.username,
    });

    //@ts-ignore
    if (!newPost)
      toast({
        title: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    else {
      window.location.reload();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 w-full max-w-5xl"
      >
        <FormField
          disabled={isPending}
          control={form.control}
          name="Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isPending}
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isPending}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="attachment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachement Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={isPending}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="text-white bg-primary">
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default FormNews;
