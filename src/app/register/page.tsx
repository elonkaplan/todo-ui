"use server";

import AuthForm from "@/components/AuthForm";

export default async function Register({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return <AuthForm type="register" error={(await searchParams).error} />;
}
