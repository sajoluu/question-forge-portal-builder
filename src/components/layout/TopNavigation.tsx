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
  Shield,
  Users,
  Settings,
  FileText,
  BarChart3,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";

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
    title: "Menu Management",
    url: "/menus",
    icon: Menu,
    subItems: [
      { title: "Menu List", url: "/menus" },
      { title: "Add Menu", url: "/menus/add" },
    ],
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
          {/* Mega Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="nav-item text-white hover:bg-white/10 hover:text-white">
                  Admin Management
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-card border-border p-6 w-[90vw] max-w-6xl">
                  <div className="grid gap-8 md:grid-cols-2">
                    {/* Left: Admin Management columns */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-semibold text-muted-foreground">Admin Management</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="mb-2 flex items-center gap-2 text-foreground/80 font-medium">
                            <Users className="h-4 w-4" />
                            User Management
                          </div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">View Users</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Add User</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Edit User</NavLink></li>
                            <li><NavLink to="/roles/permissions" className="hover:underline">User Permissions</NavLink></li>
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center gap-2 text-foreground/80 font-medium">
                            <FileText className="h-4 w-4" />
                            Content Management
                          </div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">Manage Pages</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Manage Posts</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Media Library</NavLink></li>
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center gap-2 text-foreground/80 font-medium">
                            <Settings className="h-4 w-4" />
                            System Settings
                          </div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">Site Settings</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Notifications</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Backup & Restore</NavLink></li>
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center gap-2 text-foreground/80 font-medium">
                            <BarChart3 className="h-4 w-4" />
                            Reporting & Analytics
                          </div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">View Reports</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Export Data</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Analytics Dashboard</NavLink></li>
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center gap-2 text-foreground/80 font-medium">
                            <ShieldCheck className="h-4 w-4" />
                            Security Management
                          </div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="/roles" className="hover:underline">Manage Roles</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Security Logs</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Audit Trail</NavLink></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Right: Other Sections columns */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-semibold text-muted-foreground">Other Sections</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="mb-2 font-medium text-foreground/80">Services</div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">Service 1</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Service 2</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Service 3</NavLink></li>
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 font-medium text-foreground/80">About</div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">Company Overview</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Team</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Career Opportunities</NavLink></li>
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 font-medium text-foreground/80">Contact</div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="/contact" className="hover:underline">Contact Form</NavLink></li>
                            <li><NavLink to="/help-line" className="hover:underline">Support</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Office Locations</NavLink></li>
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 font-medium text-foreground/80">Blog</div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">Latest Posts</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Categories</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Archive</NavLink></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="nav-item text-white hover:bg-white/10 hover:text-white">
                  Other Sections
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-card border-border p-6 w-[90vw] max-w-6xl">
                  {/* Reuse same content for simplicity */}
                  <div className="grid gap-8 md:grid-cols-2">
                    {/* Left: Admin Management (same as above) */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-semibold text-muted-foreground">Admin Management</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="mb-2 flex items-center gap-2 text-foreground/80 font-medium">
                            <Users className="h-4 w-4" />
                            User Management
                          </div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">View Users</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Add User</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Edit User</NavLink></li>
                            <li><NavLink to="/roles/permissions" className="hover:underline">User Permissions</NavLink></li>
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center gap-2 text-foreground/80 font-medium">
                            <FileText className="h-4 w-4" />
                            Content Management
                          </div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">Manage Pages</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Manage Posts</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Media Library</NavLink></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Right: Other Sections (same as above) */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-semibold text-muted-foreground">Other Sections</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="mb-2 font-medium text-foreground/80">Services</div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">Service 1</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Service 2</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Service 3</NavLink></li>
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 font-medium text-foreground/80">About</div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">Company Overview</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Team</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Career Opportunities</NavLink></li>
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 font-medium text-foreground/80">Contact</div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="/contact" className="hover:underline">Contact Form</NavLink></li>
                            <li><NavLink to="/help-line" className="hover:underline">Support</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Office Locations</NavLink></li>
                          </ul>
                        </div>
                        <div>
                          <div className="mb-2 font-medium text-foreground/80">Blog</div>
                          <ul className="space-y-1 text-sm">
                            <li><NavLink to="#" className="hover:underline">Latest Posts</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Categories</NavLink></li>
                            <li><NavLink to="#" className="hover:underline">Archive</NavLink></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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