import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex bg-background min-h-screen items-center justify-center py-24">
      <SignIn />
    </div>
  );
}
