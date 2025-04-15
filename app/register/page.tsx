import RegisterForm from "./RegisterForm"

export const metadata = {
  title: "Register - SAMEH STORE",
  description: "Create a new account to start shopping with us",
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <RegisterForm />
      </div>
    </div>
  )
}
