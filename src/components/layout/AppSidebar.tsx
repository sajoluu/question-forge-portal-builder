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

  // Auto-expand groups with active items on mount
  const shouldBeOpen = (item: typeof menuItems[0]) => {
    const hasActive = hasActiveSubItem(item.subItems) || isActive(item.url);
    return openGroups[item.title] !== undefined ? openGroups[item.title] : hasActive;
  };

  return (
    <Sidebar
      className="border-r-2 border-guardey-teal bg-sage shadow-2xl"
      collapsible="icon"
      style={{ minHeight: '100vh', zIndex: 40 }}
    >
      {/* Header */}
      <SidebarHeader className="border-b-2 border-guardey-teal p-6 bg-sage">
        <div className="flex items-center gap-3">
          <div className="bg-guardey-lime p-3 rounded-xl shadow-lg">
            <GraduationCap className="h-7 w-7 text-guardey-lime-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold text-guardey-dark">Question Bank</h2>
              <p className="text-sm text-sage-foreground">Teacher Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="py-4 bg-sage overflow-y-auto max-h-[calc(100vh-200px)]">
        <SidebarGroup>
          <SidebarGroupLabel className={`text-guardey-dark font-semibold text-base px-4 mb-2 ${isCollapsed ? 'sr-only' : ''}`}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
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
                          className={`w-full justify-between transition-all duration-200 rounded-lg font-medium ${
                            hasActiveSubItem(item.subItems) || isActive(item.url)
                              ? 'bg-guardey-lime text-guardey-lime-foreground shadow-md' 
                              : 'text-guardey-dark hover:bg-guardey-lime/20 hover:text-guardey-dark bg-sage/50'
                          } ${isCollapsed ? 'p-2' : 'p-3'}`}
                          tooltip={isCollapsed ? item.title : undefined}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className={`flex-shrink-0 ${isCollapsed ? 'h-5 w-5' : 'h-5 w-5'}`} />
                            {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
                          </div>
                          {!isCollapsed && (
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                              shouldBeOpen(item) ? 'rotate-180' : ''
                            }`} />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!isCollapsed && (
                        <CollapsibleContent className="transition-all duration-300 ease-in-out">
                          <SidebarMenuSub className="ml-6 mt-1 space-y-1 border-l-2 border-guardey-teal/20 pl-4">
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <NavLink
                                    to={subItem.url}
                                    className={`text-xs transition-all duration-200 p-2 rounded-md block ${
                                      isActive(subItem.url)
                                        ? 'bg-guardey-lime text-guardey-lime-foreground font-medium shadow-sm'
                                        : 'text-sage-foreground hover:bg-guardey-lime/15 hover:text-guardey-dark'
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
                        className={`flex items-center gap-3 w-full transition-all duration-200 rounded-lg font-medium ${
                          isActive(item.url)
                            ? 'bg-guardey-lime text-guardey-lime-foreground shadow-md'
                            : 'text-guardey-dark hover:bg-guardey-lime/20 hover:text-guardey-dark bg-sage/50'
                        } ${isCollapsed ? 'p-2' : 'p-3'}`}
                      >
                        <item.icon className={`flex-shrink-0 ${isCollapsed ? 'h-5 w-5' : 'h-5 w-5'}`} />
                        {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
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
      <SidebarFooter className="border-t-2 border-guardey-teal p-6 bg-sage">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-guardey-dark hover:bg-guardey-lime/30 hover:text-guardey-dark h-10 w-10 rounded-xl border border-guardey-teal/20"
            >
              <Bell className="h-5 w-5" />
            </Button>
            
            <Avatar className="h-10 w-10 border-2 border-guardey-teal">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-guardey-lime text-guardey-lime-foreground">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm text-sage-foreground">
                Welcome, <span className="font-semibold text-guardey-dark">Teacher</span>
              </div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}