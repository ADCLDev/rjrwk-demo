// app/(auth)/verify/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"

export default function VerifyPage() {
 const router = useRouter()
 const searchParams = useSearchParams()
 const token = searchParams.get("token")
 const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
 const [message, setMessage] = useState("")

 useEffect(() => {
   const verifyToken = async () => {
     if (!token) {
       setStatus("error")
       setMessage("No verification token provided")
       return
     }

     try {
       const response = await fetch("/api/auth/verify", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ token }),
       })

       const data = await response.json()

       if (response.ok) {
         setStatus("success")
         setMessage(data.message)
       } else {
         setStatus("error")
         setMessage(data.message)
       }
     } catch (error) {
       setStatus("error")
       setMessage("Failed to verify email")
     }
   }

   verifyToken()
 }, [token])

 return (
   <div className="container flex h-screen w-screen flex-col items-center justify-center">
     <Card className="w-full max-w-md">
       <CardHeader>
         <CardTitle className="text-center">Email Verification</CardTitle>
       </CardHeader>

       <CardContent className="space-y-4">
         {status === "loading" && (
           <div className="flex flex-col items-center space-y-4">
             <Icons.spinner className="h-8 w-8 animate-spin" />
             <p className="text-center text-muted-foreground">
               Verifying your email address...
             </p>
           </div>
         )}

         {status === "success" && (
           <>
             <div className="flex justify-center">
               <CheckCircle2 className="h-12 w-12 text-green-500" />
             </div>
             <Alert>
               <AlertDescription className="text-center">
                 {message}
               </AlertDescription>
             </Alert>
           </>
         )}

         {status === "error" && (
           <>
             <div className="flex justify-center">
               <XCircle className="h-12 w-12 text-destructive" />
             </div>
             <Alert variant="destructive">
               <AlertDescription className="text-center">
                 {message}
               </AlertDescription>
             </Alert>
           </>
         )}
       </CardContent>

       <CardFooter className="flex justify-center space-x-4">
         {status === "success" && (
           <Button asChild>
             <Link href="/login">Continue to Login</Link>
           </Button>
         )}
         
         {status === "error" && (
           <>
             <Button asChild variant="outline">
               <Link href="/login">Back to Login</Link>
             </Button>
             <Button asChild>
               <Link href="/auth/resend-verification">Resend Verification</Link>
             </Button>
           </>
         )}
       </CardFooter>
     </Card>
   </div>
 )
}