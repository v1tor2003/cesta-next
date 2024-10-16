import { Suspense } from "react";
import NavLayout from "../components/layout/NavLayout";
import ServerProfile from "../components/userui/ServerProfile";
import ProfileSkeleton from "../components/userui/ProfileSkeleton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="grid grid-cols-[18rem_1fr] grid-rows-[2rem_1fr_auto] min-h-screen">
      <NavLayout>{children}</NavLayout>
      <div className="row-start-3 max-sm:col-span-2">
        <Suspense fallback={<ProfileSkeleton />}>
          <ServerProfile  />
        </Suspense>
      </div>
    </div>
  );
}
