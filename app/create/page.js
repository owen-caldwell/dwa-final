"use client";
import CreateUserForm from "@/app/components/createUserForm";
import { useAuth } from "@/app/context/AuthUserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) router.push("/");
  }, [authUser]);

  return (
    <div>
      <CreateUserForm />
    </div>
  );
}
