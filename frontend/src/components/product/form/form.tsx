/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Combobox from "@/components/ui/combobox";
import { createProduct } from "@/api-services/product";
import { useMutation } from 'react-query'
import { toast } from "@/hooks/use-toast";


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    price: z.coerce.number().min(0, {
        message: "Price must be a positive number.",
    }),
    image: z.string().url({
        message: "Image must be a valid URL.",
    }).optional(), // Marking the image field as optional
    categoryId: z.string().min(1, { message: "Category is required." }),

});

interface Category {
    id: string;
    name: string;
}
interface ProductFormProps {
    onClose?: () => void;
    categories: Category[];
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, categories }) => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            image: "",
            categoryId: "",
        },
    });

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            toast({
                title: 'Product created successfully!',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(form.getValues(), null, 2)}</code>
                    </pre>
                ),
            });
            if (onClose) {
                onClose();
            }
        },
        onError: (error: any) => {
            toast({
                title: 'Error creating product',
                description: `Something went wrong: ${error.message}`,
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutate(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                {/* Name Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Product name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name of the product.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Category Autocomplition Field */}
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Combobox
                                    options={categories?.map((category: any) => ({
                                        value: category.id,
                                        label: category.name,
                                    }))}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select Category"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description Field */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Product description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Price Field */}
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Product price"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Image Upload Field */}
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input type="url" placeholder="Product image URL" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                {/* Submit Button */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default ProductForm;
