import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LayoutDashboard, BookOpen, Trophy, User, Flame, LogOut, LogIn } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { FontSizeControl } from "@/components/FontSizeControl";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["navbar-profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("streak")
        .eq("user_id", user!.id)
        .maybeSingle();
      return data;
    },
  });

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/problems", label: "Problems", icon: BookOpen },
    { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out");
      navigate("/");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoImg} alt="DSA Easy" className="h-9 w-9 rounded-lg" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            DSA <span className="text-gradient-hero">Easy</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                location.pathname === to
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <FontSizeControl />
          {user ? (
            <>
              <div className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5">
                <Flame className="h-4 w-4 text-medium" />
                <span className="text-sm font-semibold text-foreground">{profile?.streak ?? 0}</span>
              </div>
              <Link
                to="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
              >
                <User className="h-4 w-4" />
              </Link>
              <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="gradient-hero text-primary-foreground">
                <LogIn className="mr-1.5 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
