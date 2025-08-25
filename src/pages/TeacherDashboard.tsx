import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import TeacherHelpSystem from "@/components/TeacherHelpSystem";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Bell,
  Eye,
  EyeOff,
  Plus,
  Clock,
  CheckCircle
} from "lucide-react";

const TeacherDashboard = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  const [showHelpSystem, setShowHelpSystem] = useState(false);

  const quickActions = [
    { icon: Plus, label: "Create New Assignment", color: "bg-blue-600", description: "Start a new assignment for your students" },
    { icon: Users, label: "View Classes", color: "bg-green-600", description: "See all your classes and students" },
    { icon: Calendar, label: "Schedule Lesson", color: "bg-purple-600", description: "Plan your upcoming lessons" },
    { icon: BarChart3, label: "View Reports", color: "bg-orange-600", description: "Check student progress and grades" },
  ];

  const recentActivities = [
    { title: "Math Quiz - Grade 7A", status: "completed", time: "2 hours ago", students: 24 },
    { title: "Science Project - Grade 8B", status: "in-progress", time: "1 day ago", students: 18 },
    { title: "History Essay - Grade 7C", status: "pending", time: "3 days ago", students: 22 },
  ];

  const upcomingTasks = [
    { task: "Grade Math Quiz", deadline: "Today, 4:00 PM", priority: "high" },
    { task: "Prepare Science Experiment", deadline: "Tomorrow, 9:00 AM", priority: "medium" },
    { task: "Parent-Teacher Conference", deadline: "Friday, 2:00 PM", priority: "high" },
  ];

  return (
    <div className={`min-h-screen bg-background p-4 md:p-6 ${highContrast ? 'high-contrast' : ''} ${fontSize}`}>
      {/* Accessibility Controls */}
      <div className="mb-6 flex flex-wrap gap-3 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setHighContrast(!highContrast)}
          className="btn-large gap-2"
        >
          {highContrast ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {highContrast ? 'Normal View' : 'High Contrast'}
        </Button>
        <select 
          className="px-4 py-2 border rounded-lg bg-background"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          <option value="text-sm">Small Text</option>
          <option value="normal">Normal Text</option>
          <option value="text-lg">Large Text</option>
          <option value="text-xl">Extra Large Text</option>
        </select>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAccessibilityPanel(true)}
          className="btn-large gap-2"
        >
          <Settings className="h-4 w-4" />
          Accessibility
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowHelpSystem(true)}
          className="btn-large gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          Help & Support
        </Button>
      </div>

      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Welcome Back, Mrs. Johnson!
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <span className="text-base md:text-lg">Today is Monday, December 4, 2024</span>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Bell className="h-4 w-4 mr-1" />
            3 New Notifications
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="card-hover cursor-pointer border-2">
              <CardContent className="p-6 text-center">
                <div className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-foreground">{action.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{action.description}</p>
                <Button className="btn-large mt-4 w-full" size="lg">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <div className="mt-1">
                    {activity.status === 'completed' && <CheckCircle className="h-6 w-6 text-green-600" />}
                    {activity.status === 'in-progress' && <Clock className="h-6 w-6 text-orange-600" />}
                    {activity.status === 'pending' && <Clock className="h-6 w-6 text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-base mb-1">{activity.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.students} students</span>
                      <Badge 
                        variant={activity.status === 'completed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="touch-target">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button variant="outline" className="btn-large w-full">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <div className="mt-1">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' : 
                      task.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-base mb-1">{task.task}</h4>
                    <p className="text-sm text-muted-foreground">{task.deadline}</p>
                  </div>
                  <Badge 
                    variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {task.priority} priority
                  </Badge>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button variant="outline" className="btn-large w-full">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Class Overview */}
      <Card className="mt-6 border-2">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Today's Classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border bg-blue-50">
              <h4 className="font-medium text-base mb-2">Grade 7A - Mathematics</h4>
              <p className="text-sm text-muted-foreground mb-2">9:00 AM - 10:00 AM</p>
              <p className="text-sm mb-3">Room 204 • 24 students</p>
              <Button size="sm" className="btn-large w-full">
                Start Class
              </Button>
            </div>
            <div className="p-4 rounded-lg border bg-green-50">
              <h4 className="font-medium text-base mb-2">Grade 8B - Science</h4>
              <p className="text-sm text-muted-foreground mb-2">11:00 AM - 12:00 PM</p>
              <p className="text-sm mb-3">Lab 1 • 18 students</p>
              <Button size="sm" className="btn-large w-full" variant="outline">
                View Lesson Plan
              </Button>
            </div>
            <div className="p-4 rounded-lg border bg-purple-50">
              <h4 className="font-medium text-base mb-2">Grade 7C - History</h4>
              <p className="text-sm text-muted-foreground mb-2">2:00 PM - 3:00 PM</p>
              <p className="text-sm mb-3">Room 105 • 22 students</p>
              <Button size="sm" className="btn-large w-full" variant="outline">
                Prepare Materials
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="mt-6 border-2 bg-blue-50">
        <CardContent className="p-6 text-center">
          <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Need Help Getting Started?</h3>
          <p className="text-base text-muted-foreground mb-4 leading-relaxed">
            Watch our step-by-step tutorial videos or contact our support team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="btn-large">
              Watch Tutorial Videos
            </Button>
            <Button variant="outline" className="btn-large">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Panel */}
      <AccessibilityPanel 
        isOpen={showAccessibilityPanel} 
        onClose={() => setShowAccessibilityPanel(false)} 
      />

      {/* Help System */}
      <TeacherHelpSystem 
        isOpen={showHelpSystem} 
        onClose={() => setShowHelpSystem(false)} 
      />
    </div>
  );
};

export default TeacherDashboard;