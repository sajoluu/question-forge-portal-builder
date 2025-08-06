import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  FileQuestion,
  Package,
  UserCog,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  GraduationCap,
  Bell,
  User,
  Menu,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Create Question",
    url: "/create-question",
    icon: PlusCircle,
    subItems: [
      { title: "Question Generator", url: "/create-question" },
      { title: "Saved Drafts", url: "/create-question/drafts" },
    ]
  },
  {
    title: "Books",
    url: "/books",
    icon: BookOpen,
  },
  {
    title: "Question Library",
    url: "/question-library",
    icon: FileQuestion,
  },
  {
    title: "Package Management",
    url: "/package-management",
    icon: Package,
  },
  {
    title: "Profile Management",
    url: "/profile-management",
    icon: UserCog,
  },
  {
    title: "Role & Permission",
    url: "/roles",
    icon: Shield,
    subItems: [
      { title: "Role List", url: "/roles" },
      { title: "Add Role", url: "/roles/add" },
      { title: "Permission Matrix", url: "/roles/permissions" },
    ],
  },
  {
    title: "Help Line",
    url: "/help-line",
    icon: HelpCircle,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: MessageSquare,
  },
];

export function TopNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-gradient-secondary shadow-soft backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h2 className="text-lg font-semibold text-white">EduPortal</h2>
            <p className="text-sm text-white/70">Teacher Dashboard</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {menuItems.map((item) => (
            <div key={item.title} className="relative">
              {item.subItems ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="nav-item text-white hover:bg-white/10 hover:text-white"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.title}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border-border">
                    {item.subItems.map((subItem) => (
                      <DropdownMenuItem key={subItem.title} asChild>
                        <NavLink 
                          to={subItem.url}
                          className="w-full cursor-pointer"
                        >
                          {subItem.title}
                        </NavLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavLink 
                  to={item.url}
                  className={({ isActive }) => 
                    `nav-item text-white hover:bg-white/10 hover:text-white ${
                      isActive ? 'bg-primary shadow-glow' : ''
                    }`
                  }
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-sm text-white/70">
            Welcome back, <span className="font-medium text-white">Teacher</span>
          </div>
          
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
          </Button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-secondary">
          <div className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.subItems ? (
                  <div className="space-y-1">
                    <div className="text-white/70 text-sm font-medium px-3 py-2">
                      <item.icon className="h-4 w-4 inline mr-2" />
                      {item.title}
                    </div>
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.title}
                        to={subItem.url}
                        className="block px-6 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.title}
                      </NavLink>
                    ))}
                  </div>
                ) : (
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 text-sm rounded-md ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-glow' 
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.title}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}