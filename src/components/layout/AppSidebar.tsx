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
  ChevronRight,
  GraduationCap
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openMenus, setOpenMenus] = useState<string[]>(["Create Question"]);

  const isActive = (path: string) => currentPath === path;
  const isActiveParent = (item: any) => {
    if (item.subItems) {
      return item.subItems.some((sub: any) => currentPath === sub.url) || currentPath === item.url;
    }
    return currentPath === item.url;
  };

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const getNavClassName = (isActiveState: boolean) =>
    `transition-all duration-200 ${
      isActiveState 
        ? "bg-primary text-primary-foreground shadow-soft" 
        : "hover:bg-accent hover:text-accent-foreground"
    }`;

  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          {state !== "collapsed" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">EduPortal</h2>
              <p className="text-sm text-muted-foreground">Teacher Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={openMenus.includes(item.title)}
                      onOpenChange={() => toggleMenu(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className={getNavClassName(isActiveParent(item))}
                          tooltip={item.title}
                        >
                          <item.icon className="h-5 w-5" />
                          {state !== "collapsed" && (
                            <>
                              <span className="flex-1 text-left">{item.title}</span>
                              <ChevronRight className={`h-4 w-4 transition-transform ${
                                openMenus.includes(item.title) ? 'rotate-90' : ''
                              }`} />
                            </>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {state !== "collapsed" && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <NavLink 
                                    to={subItem.url} 
                                    className={getNavClassName(isActive(subItem.url))}
                                  >
                                    <span>{subItem.title}</span>
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink 
                        to={item.url} 
                        className={getNavClassName(isActive(item.url))}
                      >
                        <item.icon className="h-5 w-5" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}