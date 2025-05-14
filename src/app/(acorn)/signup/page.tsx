import { SignupForm } from "@/components/signup-form";
import { LandingPage } from "@/components/landing-page";

export default function Login() {
  return <LandingPage form={<SignupForm />} />;
}
