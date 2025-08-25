import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

interface NavigationItem {
  icon: any;
  label: string;
  path: string;
  children?: NavigationItem[];
}

const TeacherNavigation = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { icon: Home, label: "Dashboard", path: "/teacher-dashboard" },
    { 
      icon: FileText, 
      label: "Assignments", 
      path: "/assignments",
      children: [
        { icon: FileText, label: "Create Assignment", path: "/assignments/create" },
        { icon: FileText, label: "View All Assignments", path: "/assignments" },
        { icon: FileText, label: "Assignment Templates", path: "/assignments/templates" },
      ]
    },
    { 
      icon: Users, 
      label: "Students & Classes", 
      path: "/classes",
      children: [
        { icon: Users, label: "My Classes", path: "/classes" },
        { icon: Users, label: "Student Progress", path: "/students/progress" },
        { icon: Users, label: "Attendance", path: "/attendance" },
      ]
    },
    { 
      icon: BarChart3, 
      label: "Reports & Grades", 
      path: "/reports",
      children: [
        { icon: BarChart3, label: "Grade Book", path: "/grades" },
        { icon: BarChart3, label: "Progress Reports", path: "/reports/progress" },
        { icon: BarChart3, label: "Class Analytics", path: "/reports/analytics" },
      ]
    },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: BookOpen, label: "Resources", path: "/resources" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
  ];

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.label);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.label} className="mb-1">
        <Button
          variant="ghost"
          className={`w-full justify-start h-12 px-4 text-left font-normal hover:bg-accent/10 ${
            level > 0 ? 'ml-6 border-l-2 border-border pl-6' : ''
          }`}
          onClick={() => hasChildren ? toggleExpanded(item.label) : window.location.href = item.path}
        >
          <item.icon className="mr-3 h-5 w-5 shrink-0" />
          <span className="flex-1 text-base">{item.label}</span>
          {hasChildren && (
            isExpanded ? 
              <ChevronDown className="h-4 w-4 ml-2" /> : 
              <ChevronRight className="h-4 w-4 ml-2" />
          )}
        </Button>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 animate-accordion-down">
            {item.children?.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-background shadow-lg"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="ml-2">{mobileMenuOpen ? 'Close Menu' : 'Open Menu'}</span>
        </Button>
      </div>

      {/* Navigation Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-80 bg-background border-r-2 border-border shadow-lg z-40
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6 border-b-2 border-border">
          <h1 className="text-2xl font-bold text-foreground">Teacher Portal</h1>
          <p className="text-base text-muted-foreground mt-1">Welcome, Mrs. Johnson</p>
        </div>
        
        <nav className="p-4 h-full overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map(item => renderNavigationItem(item))}
          </div>
          
          {/* Emergency Help Button */}
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-medium text-base mb-2 text-red-800">Need Immediate Help?</h3>
            <p className="text-sm text-red-700 mb-3">Contact our support team directly</p>
            <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
              <HelpCircle className="mr-2 h-4 w-4" />
              Emergency Support
            </Button>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default TeacherNavigation;