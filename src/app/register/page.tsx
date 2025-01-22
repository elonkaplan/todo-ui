"use server";

import AuthForm from "@/components/AuthForm";

export default async function Register() {
  return <AuthForm type="register" />;
}
