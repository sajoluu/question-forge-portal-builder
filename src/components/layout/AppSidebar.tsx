import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  Shield,
  Menu as MenuIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
    title: "Menu Management",
    url: "/menus",
    icon: MenuIcon,
    subItems: [
      { title: "Menu List", url: "/menus" },
      { title: "Add Menu", url: "/menus/add" },
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

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const hasActiveSubItem = (subItems?: { url: string }[]) => 
    subItems?.some(item => isActive(item.url));

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  // Auto-expand groups with active items
  const shouldBeOpen = (item: typeof menuItems[0]) => {
    return openGroups[item.title] ?? (hasActiveSubItem(item.subItems) || isActive(item.url));
  };

  return (
    <Sidebar
      className={`border-r border-guardey-teal/30 bg-gradient-guardey transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      collapsible="icon"
    >
      {/* Header */}
      <SidebarHeader className="border-b border-guardey-teal/30 p-4">
        <div className="flex items-center gap-3">
          <div className="bg-guardey-lime p-2 rounded-lg shadow-sm">
            <GraduationCap className="h-6 w-6 text-guardey-lime-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-guardey-dark-foreground">Question Bank</h2>
              <p className="text-xs text-guardey-dark-foreground/70">Teacher Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={`text-guardey-dark-foreground/80 ${isCollapsed ? 'sr-only' : ''}`}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={shouldBeOpen(item)}
                      onOpenChange={() => toggleGroup(item.title)}
                      className="group"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`w-full justify-between text-guardey-dark-foreground hover:bg-guardey-lime/20 hover:text-guardey-dark-foreground transition-colors ${
                            hasActiveSubItem(item.subItems) ? 'bg-guardey-lime/20 text-guardey-dark-foreground' : ''
                          }`}
                          tooltip={isCollapsed ? item.title : undefined}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 flex-shrink-0" />
                            {!isCollapsed && <span>{item.title}</span>}
                          </div>
                          {!isCollapsed && (
                            <ChevronDown className={`h-4 w-4 transition-transform ${
                              shouldBeOpen(item) ? 'rotate-180' : ''
                            }`} />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!isCollapsed && (
                        <CollapsibleContent className="transition-all duration-200">
                          <SidebarMenuSub className="ml-6 mt-1 space-y-1">
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <NavLink
                                    to={subItem.url}
                                    className={`text-sm transition-colors ${
                                      isActive(subItem.url)
                                        ? 'bg-guardey-lime text-guardey-lime-foreground font-medium'
                                        : 'text-guardey-dark-foreground/80 hover:bg-guardey-lime/20 hover:text-guardey-dark-foreground'
                                    }`}
                                  >
                                    {subItem.title}
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-3 w-full transition-colors ${
                          isActive(item.url)
                            ? 'bg-guardey-lime text-guardey-lime-foreground font-medium'
                            : 'text-guardey-dark-foreground hover:bg-guardey-lime/20 hover:text-guardey-dark-foreground'
                        }`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-guardey-teal/30 p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-guardey-dark-foreground hover:bg-guardey-lime/20 h-8 w-8"
            >
              <Bell className="h-4 w-4" />
            </Button>
            
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-guardey-lime text-guardey-lime-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm text-guardey-dark-foreground/70">
                Welcome, <span className="font-medium text-guardey-dark-foreground">Teacher</span>
              </div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}