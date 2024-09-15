import React from 'react';
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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { loginUser } from "@/api-services/auth";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";


const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

function LoginForm() {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log("data :", data.token)
            localStorage.setItem('jwtToken', data.token)
            toast({
                title: 'Login successful!',
                description: 'You have been logged in successfully.',
            });
            navigate('/products');
        },
        onError: (error: unknown) => {
            toast({
                title: 'Login Failed',
                description: `Something went wrong: ${(error as Error).message}`,
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutate(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-700">Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    {...field}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </FormControl>
                            <FormDescription className="text-gray-500 text-sm">
                                We'll never share your email.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-700">Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    {...field}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </FormControl>
                            <FormDescription className="text-gray-500 text-sm">
                                Must be at least 6 characters.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-md hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
                >
                    Sign In
                </Button>
            </form>
        </Form>
    );
}

export default LoginForm;