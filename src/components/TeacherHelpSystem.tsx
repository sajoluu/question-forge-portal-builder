import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  HelpCircle, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Phone, 
  Mail,
  Search,
  Star,
  Clock,
  Users,
  FileText,
  ChevronRight,
  Play,
  Download
} from "lucide-react";

interface HelpSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HelpItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'faq';
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  views: number;
  rating: number;
}

const TeacherHelpSystem = ({ isOpen, onClose }: HelpSystemProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const helpItems: HelpItem[] = [
    {
      id: "1",
      title: "Getting Started: Your First Assignment",
      description: "Learn how to create your first assignment from start to finish",
      type: "video",
      duration: "8 min",
      difficulty: "beginner",
      category: "assignments",
      views: 1240,
      rating: 4.8
    },
    {
      id: "2", 
      title: "Managing Student Classes",
      description: "How to add students, organize classes, and track progress",
      type: "video",
      duration: "12 min",
      difficulty: "beginner",
      category: "classes",
      views: 956,
      rating: 4.7
    },
    {
      id: "3",
      title: "Understanding Grade Reports",
      description: "Step-by-step guide to viewing and interpreting student reports",
      type: "article", 
      difficulty: "intermediate",
      category: "reports",
      views: 743,
      rating: 4.6
    },
    {
      id: "4",
      title: "How do I reset a student's password?",
      description: "Quick steps to help students who forgot their login credentials",
      type: "faq",
      difficulty: "beginner", 
      category: "troubleshooting",
      views: 2103,
      rating: 4.9
    },
    {
      id: "5",
      title: "Advanced Assignment Settings",
      description: "Configure time limits, attempt restrictions, and grading options",
      type: "video",
      duration: "15 min",
      difficulty: "advanced",
      category: "assignments", 
      views: 421,
      rating: 4.5
    }
  ];

  const categories = [
    { value: "all", label: "All Topics", count: helpItems.length },
    { value: "assignments", label: "Assignments", count: helpItems.filter(item => item.category === "assignments").length },
    { value: "classes", label: "Classes & Students", count: helpItems.filter(item => item.category === "classes").length },
    { value: "reports", label: "Reports & Grades", count: helpItems.filter(item => item.category === "reports").length },
    { value: "troubleshooting", label: "Troubleshooting", count: helpItems.filter(item => item.category === "troubleshooting").length }
  ];

  const filteredItems = helpItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'faq': return <HelpCircle className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <HelpCircle className="h-6 w-6" />
              Help & Support Center
            </CardTitle>
            <Button variant="outline" onClick={onClose} className="touch-target text-xl">
              ×
            </Button>
          </div>
          <p className="text-base text-muted-foreground">
            Find tutorials, guides, and answers to common questions
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto space-y-6">
          {/* Emergency Support */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-800">Need Immediate Help?</h3>
            <p className="text-sm text-red-700 mb-3">
              Contact our support team directly for urgent issues or technical problems
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 gap-2">
                <Phone className="h-4 w-4" />
                Call Support: 1-800-TEACHER
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Email Support
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Live Chat
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help topics, tutorials, or questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-base"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className="text-sm"
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>

          <Separator />

          {/* Popular Topics */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Popular Help Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">Creating Assignments</h4>
                  <p className="text-sm text-muted-foreground">Step-by-step guides</p>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium mb-1">Managing Students</h4>
                  <p className="text-sm text-muted-foreground">Class organization</p>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium mb-1">Grading & Reports</h4>
                  <p className="text-sm text-muted-foreground">Assessment tools</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Help Items List */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {searchQuery ? `Search Results (${filteredItems.length})` : 'All Help Resources'}
            </h3>
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <Card key={item.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                        {getTypeIcon(item.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-base mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <Badge className={getDifficultyColor(item.difficulty)}>
                              {item.difficulty}
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              {getTypeIcon(item.type)}
                              {item.type}
                            </Badge>
                            {item.duration && (
                              <Badge variant="outline" className="gap-1">
                                <Clock className="h-3 w-3" />
                                {item.duration}
                              </Badge>
                            )}
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{item.rating}</span>
                            </div>
                            <span className="text-muted-foreground">{item.views} views</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {item.type === 'video' && (
                            <Button size="sm" className="gap-2">
                              <Play className="h-4 w-4" />
                              Watch
                            </Button>
                          )}
                          {item.type === 'article' && (
                            <Button size="sm" className="gap-2">
                              <BookOpen className="h-4 w-4" />
                              Read
                            </Button>
                          )}
                          {item.type === 'faq' && (
                            <Button size="sm" className="gap-2">
                              <ChevronRight className="h-4 w-4" />
                              View Answer
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-medium text-base mb-2 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Quick Reference Guides
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Download printable guides you can keep at your desk
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Download PDF Guides
              </Button>
            </Card>
            <Card className="p-4"> 
              <h4 className="font-medium text-base mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Teacher Community
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Connect with other teachers and share best practices
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Join Community Forum
              </Button>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherHelpSystem;