
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "Profile Explorer" }: HeaderProps) => {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link to="/" className="text-xl font-semibold text-app-primary">
          {title}
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-app-primary">
            Home
          </Link>
          <Link to="/admin" className="text-gray-600 hover:text-app-primary">
            Admin
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link to="/admin">
              Admin Panel
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
