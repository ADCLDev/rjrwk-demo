// app/(auth)/resend-verification/page.tsx
"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

const resendSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type ResendValues = z.infer<typeof resendSchema>

export default function ResendVerificationPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const form = useForm<ResendValues>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: ResendValues) {
    try {
      setStatus("loading")
      
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("Verification email sent successfully. Please check your inbox.")
      } else {
        setStatus("error")
        setMessage(result.message || "Failed to send verification email")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An unexpected error occurred")
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Resend Verification Email</CardTitle>
          <CardDescription>
            Enter your email address to receive a new verification link
          </CardDescription>
        </CardHeader>
        
        <CardContent>
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
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {status === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={status === "loading"}>
                  {status === "loading" && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Resend Verification Email
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}