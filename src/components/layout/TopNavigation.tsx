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
  Menu
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-gradient-secondary shadow-sm backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-primary p-1.5 rounded-md shadow-sm">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h2 className="text-base font-semibold text-white">Question Bank</h2>
            <p className="text-xs text-white/70">Teacher Dashboard</p>
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
                      className="flex items-center px-2 py-1 text-sm text-white hover:bg-white/10"
                    >
                      <item.icon className="h-4 w-4 mr-1.5" />
                      {item.title}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border-border min-w-[160px]">
                    {item.subItems.map((subItem) => (
                      <DropdownMenuItem key={subItem.title} asChild>
                        <NavLink 
                          to={subItem.url}
                          className="w-full text-sm py-1.5 px-3"
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
                    `flex items-center px-2 py-1 text-sm text-white hover:bg-white/10 rounded-md ${
                      isActive ? 'bg-primary shadow-sm' : ''
                    }`
                  }
                >
                  <item.icon className="h-4 w-4 mr-1.5" />
                  {item.title}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block text-xs text-white/70">
            Welcome, <span className="font-medium text-white">Teacher</span>
          </div>
          
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8">
            <Bell className="h-4 w-4" />
            {/* <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span> */}
          </Button>
          
          <Avatar className="h-7 w-7">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10 h-8 w-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-secondary">
          <div className="px-3 py-3 space-y-1">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.subItems ? (
                  <div className="space-y-1">
                    <div className="text-white/70 text-xs font-medium px-2 py-1.5">
                      <item.icon className="h-4 w-4 inline mr-1.5" />
                      {item.title}
                    </div>
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.title}
                        to={subItem.url}
                        className="block px-4 py-1.5 text-xs text-white/80 hover:bg-white/10 rounded-md"
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
                      `flex items-center px-2 py-1.5 text-xs rounded-md ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'text-white/80 hover:bg-white/10'
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4 mr-1.5" />
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