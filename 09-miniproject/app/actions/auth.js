"use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  deleteSession,
} from "@/lib/session";
import { safeRedirectPath } from "@/lib/redirect";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");
  const next = safeRedirectPath(
    String(formData.get("next") ?? "/")
  );

  if (!email || !password) {
    redirect("/sign-in?error=missing-fields");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await compare(password, user.passwordHash))) {
    redirect("/sign-in?error=invalid-credentials");
  }

  if (user.role !== "customer" && user.role !== "staff") {
    redirect("/sign-in?error=invalid-account");
  }

  await createSession({
    userId: user.id,
    role: user.role,
  });

  redirect(next);
}

export async function signOutAction() {
  await deleteSession();
  redirect("/sign-in");
}