import { LoginForm } from "@/components/login-form";
import { LandingPage } from "@/components/landing-page";

export default function Login() {
  return <LandingPage form={<LoginForm />} />;
}
