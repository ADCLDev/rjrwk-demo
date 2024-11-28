// app/(auth)/forgot-password/page.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Icons } from "@/components/ui/icons"
import { CheckCircle2 } from "lucide-react"

const schema = z.object({
  email: z.string().email(),
})

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      setStatus("loading")
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      
      if (res.ok) {
        setStatus("success")
        setMessage("If an account exists, you will receive a reset link shortly.")
      } else {
        throw new Error()
      }
    } catch {
      setStatus("error")
      setMessage("Failed to send reset link. Please try again.")
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Reset Password</h1>
          <p className="text-sm text-muted-foreground">Enter your email to receive a reset link</p>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={status === "loading"}>
                {status === "loading" && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  )
}

