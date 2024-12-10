import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type NavButtonProps = {
  icon: LucideIcon;
  label: string;
  href?: string;
};
const NavButton = ({ icon: Icon, label, href }: NavButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      className="rounded-full"
      asChild
    >
      {href ? (
        <Link href={href}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  );
};
export default NavButton;
