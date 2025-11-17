import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Rooms" },
    { to: "/booking", label: "Book Room" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Building2 className="h-6 w-6 text-primary" />
            <span>WorkSpace</span>
          </Link>
          
          <div className="flex gap-2">
            {links.map((link) => (
              <Button
                key={link.to}
                asChild
                variant={location.pathname === link.to ? "default" : "ghost"}
              >
                <Link to={link.to}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
