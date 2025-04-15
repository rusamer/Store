"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

// List of countries
const countries = [
  { value: "eg", label: "Egypt" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
]

// Cities by country
const citiesByCountry = {
  eg: [
    { value: "cairo", label: "Cairo" },
    { value: "alexandria", label: "Alexandria" },
    { value: "giza", label: "Giza" },
    { value: "sharm", label: "Sharm El Sheikh" },
    { value: "luxor", label: "Luxor" },
    { value: "aswan", label: "Aswan" },
    { value: "hurghada", label: "Hurghada" },
  ],
  sa: [
    { value: "riyadh", label: "Riyadh" },
    { value: "jeddah", label: "Jeddah" },
    { value: "mecca", label: "Mecca" },
    { value: "medina", label: "Medina" },
  ],
  ae: [
    { value: "dubai", label: "Dubai" },
    { value: "abudhabi", label: "Abu Dhabi" },
    { value: "sharjah", label: "Sharjah" },
  ],
  us: [
    { value: "newyork", label: "New York" },
    { value: "losangeles", label: "Los Angeles" },
    { value: "chicago", label: "Chicago" },
    { value: "houston", label: "Houston" },
  ],
  gb: [
    { value: "london", label: "London" },
    { value: "manchester", label: "Manchester" },
    { value: "birmingham", label: "Birmingham" },
  ],
  fr: [
    { value: "paris", label: "Paris" },
    { value: "marseille", label: "Marseille" },
    { value: "lyon", label: "Lyon" },
  ],
  de: [
    { value: "berlin", label: "Berlin" },
    { value: "munich", label: "Munich" },
    { value: "hamburg", label: "Hamburg" },
  ],
}

// Security questions
const securityQuestions = [
  { value: "mother", label: "What is your mother's maiden name?" },
  { value: "pet", label: "What was the name of your first pet?" },
  { value: "school", label: "What was the name of your first school?" },
  { value: "city", label: "In what city were you born?" },
  { value: "car", label: "What was your first car?" },
]

// Registration form schema
const registerSchema = z
  .object({
    fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    mobileNumber: z.string().min(8, { message: "Please enter a valid mobile number" }),
    gender: z.enum(["male", "female", "other"], {
      required_error: "Please select your gender",
    }),
    country: z.string({
      required_error: "Please select your country",
    }),
    city: z.string({
      required_error: "Please select your city",
    }),
    address: z.string().min(5, { message: "Address must be at least 5 characters" }),
    postalCode: z.string().min(4, { message: "Postal code must be at least 4 characters" }),
    birthDate: z.string().refine(
      (val) => {
        const date = new Date(val)
        const today = new Date()
        const age = today.getFullYear() - date.getFullYear()
        return age >= 18
      },
      { message: "You must be at least 18 years old" },
    ),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
    receiveNewsletters: z.boolean().optional(),
    securityQuestion: z.string().min(1, { message: "Security question is required" }),
    securityAnswer: z.string().min(1, { message: "Security answer is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [actualVerificationCode, setActualVerificationCode] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("eg")
  const [cities, setCities] = useState(citiesByCountry.eg)

  // Initialize form
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      gender: "male",
      country: "eg",
      city: "",
      address: "",
      postalCode: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      receiveNewsletters: false,
      securityQuestion: "",
      securityAnswer: "",
    },
  })

  // Handle country change to update cities
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
    form.setValue("country", value)
    form.setValue("city", "") // Reset city when country changes

    // Update cities based on selected country
    setCities(citiesByCountry[value as keyof typeof citiesByCountry] || [])
  }

  // Handle profile picture upload
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileImage(result)
        // Store the image in localStorage
        localStorage.setItem("tempProfileImage", result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Load profile image from localStorage if available
  useEffect(() => {
    const savedImage = localStorage.getItem("tempProfileImage")
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [])

  // Send verification email
  const sendVerificationEmail = async (email: string) => {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setActualVerificationCode(code)

    // Save verification code to localStorage
    localStorage.setItem("verificationCode", code)
    localStorage.setItem("verificationEmail", email)

    // In a real app, this would send an email with the code
    // For demo purposes, we'll just show it in a toast
    toast({
      title: "Verification Code Sent",
      description: `A verification code has been sent to ${email}. For demo purposes, the code is: ${code}`,
    })

    // Save form data to localStorage
    const formData = form.getValues()
    localStorage.setItem("registrationFormData", JSON.stringify(formData))

    setVerificationSent(true)
  }

  // Load verification data from localStorage if available
  useEffect(() => {
    const savedCode = localStorage.getItem("verificationCode")
    const savedEmail = localStorage.getItem("verificationEmail")
    const savedFormData = localStorage.getItem("registrationFormData")

    if (savedCode && savedEmail) {
      setActualVerificationCode(savedCode)
      setVerificationSent(true)
    }

    if (savedFormData) {
      const formData = JSON.parse(savedFormData)
      Object.keys(formData).forEach((key) => {
        form.setValue(key as any, formData[key])
      })

      // Update country and cities
      if (formData.country) {
        setSelectedCountry(formData.country)
        setCities(citiesByCountry[formData.country as keyof typeof citiesByCountry] || [])
      }
    }
  }, [form])

  // Verify email code
  const verifyEmailCode = () => {
    if (verificationCode === actualVerificationCode) {
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified.",
      })

      // Complete registration
      completeRegistration()
    } else {
      toast({
        title: "Invalid Code",
        description: "The verification code you entered is incorrect. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Complete registration after verification
  const completeRegistration = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get form data from localStorage
      const formDataStr = localStorage.getItem("registrationFormData")
      if (!formDataStr) {
        throw new Error("Registration data not found")
      }

      const formData = JSON.parse(formDataStr)

      // Get existing users or create empty array
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")

      // Create new user object
      const newUser = {
        id: `user-${Date.now()}`,
        ...formData,
        profilePicture: profileImage,
        joinDate: new Date().toISOString(),
        isActive: true,
        orderCount: 0,
      }

      // Add new user to array
      existingUsers.push(newUser)

      // Save updated users array
      localStorage.setItem("users", JSON.stringify(existingUsers))

      // Clear temporary registration data
      localStorage.removeItem("tempProfileImage")
      localStorage.removeItem("verificationCode")
      localStorage.removeItem("verificationEmail")
      localStorage.removeItem("registrationFormData")

      toast({
        title: "Registration successful!",
        description: "Your account has been created. You can now log in.",
      })

      // Redirect to login page
      router.push("/login")
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setVerificationSent(false)
    }
  }

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true)

    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const emailExists = existingUsers.some((user: any) => user.email === values.email)

    if (emailExists) {
      toast({
        title: "Email already registered",
        description: "This email address is already registered. Please use a different email or log in.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Send verification email
    await sendVerificationEmail(values.email)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Fill in your details to create a new account and start shopping with us.</CardDescription>
      </CardHeader>
      <CardContent>
        {!verificationSent ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={profileImage || ""} alt="Profile" />
                  <AvatarFallback>
                    {form.watch("fullName") ? form.watch("fullName").charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="profile-picture" className="cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Upload className="h-4 w-4" />
                      Upload Profile Picture
                    </div>
                    <Input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">Optional: Upload a profile picture</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="01xxxxxxxxx" {...field} />
                      </FormControl>
                      <FormDescription>Enter your mobile number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>You must be at least 18 years old</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal">Male</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal">Female</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">Other</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={handleCountryChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, Apt 4B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Security Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="securityQuestion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Security Question</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a security question" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {securityQuestions.map((question) => (
                            <SelectItem key={question.value} value={question.value}>
                              {question.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="securityAnswer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Security Answer</FormLabel>
                      <FormControl>
                        <Input placeholder="Your answer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Must be at least 8 characters with uppercase, lowercase, number, and special character.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Terms and Preferences */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the{" "}
                          <a href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="receiveNewsletters"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I would like to receive newsletters and promotional emails</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Verification...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium">Email Verification</h3>
              <p className="text-muted-foreground mt-2">
                We've sent a verification code to your email address. Please enter the code below to verify your
                account.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button onClick={verifyEmailCode} className="w-full" disabled={verificationCode.length !== 6}>
                Verify Email
              </Button>

              <div className="text-center text-sm">
                <p>
                  Didn't receive the code?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => sendVerificationEmail(form.getValues("email"))}
                  >
                    Resend Code
                  </Button>
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={() => router.push("/login")}>
            Login
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}
