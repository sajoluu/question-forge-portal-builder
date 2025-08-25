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
    title: "ড্যাশবোর্ড",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "প্রশ্ন তৈরি করুন",
    url: "/create-question",
    icon: PlusCircle,
    subItems: [
      { title: "প্রশ্ন জেনারেটর", url: "/create-question" },
      { title: "সংরক্ষিত খসড়া", url: "/create-question/drafts" },
    ]
  },
  {
    title: "বই",
    url: "/books",
    icon: BookOpen,
  },
  {
    title: "প্রশ্ন লাইব্রেরি",
    url: "/question-library",
    icon: FileQuestion,
  },
  {
    title: "প্যাকেজ ব্যবস্থাপনা",
    url: "/package-management",
    icon: Package,
  },
  {
    title: "প্রোফাইল ব্যবস্থাপনা",
    url: "/profile-management",
    icon: UserCog,
  },
  {
    title: "ভূমিকা ও অনুমতি",
    url: "/roles",
    icon: Shield,
    subItems: [
      { title: "ভূমিকার তালিকা", url: "/roles" },
      { title: "ভূমিকা যোগ করুন", url: "/roles/add" },
      { title: "অনুমতি ম্যাট্রিক্স", url: "/roles/permissions" },
    ],
  },
  {
    title: "মেনু ব্যবস্থাপনা",
    url: "/menus",
    icon: MenuIcon,
    subItems: [
      { title: "মেনু তালিকা", url: "/menus" },
      { title: "মেনু যোগ করুন", url: "/menus/add" },
    ],
  },
  {
    title: "সহায়তা লাইন",
    url: "/help-line",
    icon: HelpCircle,
  },
  {
    title: "যোগাযোগ",
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
              <h2 className="text-xl font-bold text-guardey-dark">প্রশ্ন ব্যাংক</h2>
              <p className="text-sm text-sage-foreground">শিক্ষক ড্যাশবোর্ড</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="py-4 bg-sage overflow-y-auto max-h-[calc(100vh-200px)]">
        <SidebarGroup>
          <SidebarGroupLabel className={`text-guardey-dark font-semibold text-base px-4 mb-2 ${isCollapsed ? 'sr-only' : ''}`}>
            নেভিগেশন
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
                স্বাগতম, <span className="font-semibold text-guardey-dark">শিক্ষক</span>
              </div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}