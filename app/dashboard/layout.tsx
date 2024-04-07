import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { navbarOptions } from "../lib/navConstants";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-dvh">
      <Header className="px-14 py-2 flex w-full h-10 bg-red-300 justify-between"/>
      <div className="flex h-dvh w-full">
        <NavBar className="flex flex-col w-64 bg-red-300" options={navbarOptions}/>  
        <main className="grow">{children}</main>
      </div>
    </div>
  );
}
