"use server";

import AuthForm from "@/components/AuthForm";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return <AuthForm type="login" error={(await searchParams).error} />;
}
