import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { navbarOptions } from "../lib/navConstants";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="pt-20 w-72 shrink-0 border-r border-gray-200 bg-gray-50 py-4">
        <Header />
        <NavBar options={navbarOptions}/>  

      </div>
      
      <main className="p-4">{children}</main>
    </div>
  );
}
