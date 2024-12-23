import { Home, File, UsersRound,LogOut } from "lucide-react";
import Link from 'next/link'
import { NavButton } from "../buttons";
import { ModeToggle } from "../shared";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import NavMenu from '@/components/buttons/NavMenu'
import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20 ">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/tickets" icon={Home} label="Home" />
          <Link
            href="/tickets"
            className="flex justify-center items-center gap-2 ml-0 "
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          {/**Tickets */}
          <NavButton icon={File} href="/tickets" label="Tickets" />

          {/**Nav Menu starts */}
          <NavMenu
            icon={UsersRound}
            label="Customers Menu"
            choices={[
              {
                title: "Search Customers",
                href: "/customers",
              },
              {
                title: "New Customer",
                href: "/customers/form",
              },
            ]}
          />

          {/**Customers */}
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
