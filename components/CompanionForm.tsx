"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select } from "@radix-ui/react-select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
    name: z.string().min(1, "Companion is required"),
    subject: z.string().min(1, "Subject is required"),
    topic: z.string().min(1, "Topic is required"),
    voice: z.string().min(1, "Voice is required"),
    style: z.string().min(1, "Style is required"),
    duration: z.number().min(1, {message: "Duration is required."}),
})

const CompanionForm = () => {
    // Form definition
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15,
        },
    })

    // Form submission
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a companion name" {...field} 
                                className="input"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select a subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem key={subject} value={subject}
                                            className="capitalize">
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help with?</FormLabel>
                            <FormControl>
                                <Textarea placeholder="E.x Demand and supply theory" {...field}
                                className="input"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion sound like?</FormLabel>
                            <FormControl>
                                <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select a voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select a conversation style</FormLabel>
                            <FormControl>
                                <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select the style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="formal">Formal</SelectItem>
                                        <SelectItem value="casual">Casual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated session duration in minutes</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="15" {...field} 
                                className="input"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full cursor-pointer">Build your companion.</Button>
            </form>
        </Form>
    )
}

export default CompanionForm
