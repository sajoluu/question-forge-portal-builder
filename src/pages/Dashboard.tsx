import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  FileQuestion, 
  BookOpen, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication and set up listener
  useEffect(() => {
    // Get initial session
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট হয়েছেন",
    });
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Questions Created",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: FileQuestion,
      color: "text-primary"
    },
    {
      title: "Question Sets",
      value: "89",
      change: "+5%",
      trend: "up",
      icon: BookOpen,
      color: "text-success"
    },
    {
      title: "Students Assessed",
      value: "2,456",
      change: "+18%",
      trend: "up",
      icon: Users,
      color: "text-warning"
    },
    {
      title: "Active Packages",
      value: "15",
      change: "0%",
      trend: "neutral",
      icon: TrendingUp,
      color: "text-primary"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "created",
      title: "Physics Chapter 5 Questions",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "modified",
      title: "Mathematics MCQ Set",
      time: "4 hours ago",
      status: "draft"
    },
    {
      id: 3,
      type: "exported",
      title: "Chemistry Question Paper",
      time: "1 day ago",
      status: "completed"
    }
  ];

  const quickActions = [
    {
      title: "Create New Question",
      description: "Start creating a new question set",
      icon: PlusCircle,
      action: () => navigate("/create-question"),
      variant: "primary" as const
    },
    {
      title: "Browse Library",
      description: "Explore existing questions",
      icon: FileQuestion,
      action: () => navigate("/question-library"),
      variant: "secondary" as const
    },
    {
      title: "Manage Books",
      description: "Organize your study materials",
      icon: BookOpen,
      action: () => navigate("/books"),
      variant: "secondary" as const
    }
  ];

  return (
    <div className="space-y-6 bg-gradient-to-br from-background to-guardey-dark/5 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            স্বাগতম {user?.email}! আপনার শিক্ষা পোর্টালে প্রশ্ন পরিচালনা করুন।
          </p>
        </div>
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          লগআউট
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {quickActions.map((action, index) => (
          <Card 
            key={index} 
            className="cursor-pointer transition-all duration-200 hover:shadow-medium hover:-translate-y-1"
            onClick={action.action}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  action.variant === 'primary' 
                    ? 'bg-guardey-lime text-guardey-lime-foreground' 
                    : 'bg-guardey-teal text-guardey-teal-foreground'
                }`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${
                stat.color === 'text-primary' ? 'text-guardey-lime' :
                stat.color === 'text-success' ? 'text-guardey-teal' :
                stat.color === 'text-warning' ? 'text-guardey-purple' :
                stat.color
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-guardey-teal" />}
                <span className={stat.trend === 'up' ? 'text-guardey-teal' : 'text-muted-foreground'}>
                  {stat.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-guardey-lime" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest question creation activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
                <div className="flex-shrink-0">
                  {activity.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-guardey-teal" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-guardey-purple" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
                <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-guardey-lime" />
              Quick Tips
            </CardTitle>
            <CardDescription>
              Tips to improve your question creation workflow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-guardey/10 border border-guardey-teal/20">
              <h4 className="font-medium text-foreground mb-2">💡 Use AI Generation</h4>
              <p className="text-sm text-muted-foreground">
                Try the AI-powered question generation for faster content creation.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-guardey/10 border border-guardey-teal/20">
              <h4 className="font-medium text-foreground mb-2">📚 Organize by Chapters</h4>
              <p className="text-sm text-muted-foreground">
                Group your questions by chapters for better management and reusability.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-guardey/10 border border-guardey-teal/20">
              <h4 className="font-medium text-foreground mb-2">⚡ Use Templates</h4>
              <p className="text-sm text-muted-foreground">
                Create question templates to speed up your workflow.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;