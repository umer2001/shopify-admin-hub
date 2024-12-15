import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Step1Schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
});

const Step2Schema = z.object({
  storeName: z.string().min(2),
});

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<any>(null);
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();

  const step1Form = useForm<z.infer<typeof Step1Schema>>({
    resolver: zodResolver(Step1Schema),
  });

  const step2Form = useForm<z.infer<typeof Step2Schema>>({
    resolver: zodResolver(Step2Schema),
  });

  const onSubmitStep1 = (data: z.infer<typeof Step1Schema>) => {
    setStepOneData(data);
    setStep(2);
  };

  const onSubmitStep2 = async (data: z.infer<typeof Step2Schema>) => {
    try {
      await signUp(stepOneData.email, stepOneData.password, {
        full_name: stepOneData.fullName,
        store_name: data.storeName,
      });
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
      });
      navigate("/auth/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating account",
        description: error.message,
      });
    }
  };

  if (step === 1) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-muted-foreground">
              Enter your details to get started
            </p>
          </div>

          <Form {...step1Form}>
            <form
              onSubmit={step1Form.handleSubmit(onSubmitStep1)}
              className="space-y-4"
            >
              <FormField
                control={step1Form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step1Form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step1Form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Store Information</h1>
          <p className="text-muted-foreground">Tell us about your store</p>
        </div>

        <Form {...step2Form}>
          <form
            onSubmit={step2Form.handleSubmit(onSubmitStep2)}
            className="space-y-4"
          >
            <FormField
              control={step2Form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}