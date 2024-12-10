import { Home, File, UsersRound,LogOut } from "lucide-react";
import Link from 'next/link'
import { NavButton, ModeToggle } from "@/components/shared";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20 ">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/home" icon={Home} label="Home" />
          <Link
            href="/home"
            className="flex justify-center items-center gap-2 ml-0 "
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <NavButton icon={File} href="/tickets" label="Tickets" />
          <NavButton icon={UsersRound} href="/customers" label="Customers" />
          <ModeToggle />
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label="Logout"
            title="Logout"
            className="rounded-full"
          >
            <LogoutLink>
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Header;
