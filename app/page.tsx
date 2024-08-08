import { redirect } from "next/navigation";
import { isAuthenticated } from "./lib/auth/actions";

export default async function Home() {
  if(!await isAuthenticated()) redirect(process.env.LOGIN_PAGE ?? '')
  return redirect(process.env.HOME_PAGE ?? '')
}
