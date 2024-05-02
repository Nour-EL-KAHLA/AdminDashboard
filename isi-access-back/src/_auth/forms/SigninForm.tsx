import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useSignInAccount } from "@/lib/react-query/QueriesAndMutations";
import { useUserContext } from "../../context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
});

const SigninForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount, isError } = useSignInAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const session = await signInAccount(values);

    if (!session) {
      toast({
        title: "Login failed. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      toast({
        title: "Login failed. Please try again.",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-[420px] flex items-center justify-center flex-col ">
        <img src="/assets/images/logo.png" alt="logo-img" className="w-40" />
        <h2 className="text-xl font-semibold text-center  pt-8">
          Welcome back!
        </h2>
        <p className="text-violet-400 text-sm pb-8">
          Please sign in to your account to continue.
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full mt-4 px-6 2xl:px-52"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="h-12 bg-secondary-300 border-none placeholder:text-white focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-white"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  className="h-12 bg-secondary-300 border-none placeholder:text-white focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-white"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Password must be at least 6 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-pink hover:bg-pink/90 mt-10" type="submit">
          {isUserLoading ? "Loading..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
