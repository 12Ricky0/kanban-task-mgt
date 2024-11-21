import LoginForm from "@/components/forms/login-form";
import { auth } from "@/auth";
export default async function Login() {
  const session = await auth();

  return (
    <main className=" flex justify-center items-center h-screen">
      <LoginForm token={session?.user?.email!} />
    </main>
  );
}
