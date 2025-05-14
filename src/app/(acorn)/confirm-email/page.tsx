import { LandingPage } from "@/components/landing-page";
import { ConfirmationForm } from "@/components/confirmation-form";

export default function CofirmEmail() {
  return <LandingPage form={<ConfirmationForm />} />;
}
