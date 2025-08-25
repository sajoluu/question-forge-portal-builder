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
      title: "শুরু করা: আপনার প্রথম অ্যাসাইনমেন্ট",
      description: "শুরু থেকে শেষ পর্যন্ত আপনার প্রথম অ্যাসাইনমেন্ট তৈরি করতে শিখুন",
      type: "video",
      duration: "৮ মিনিট",
      difficulty: "beginner",
      category: "assignments",
      views: 1240,
      rating: 4.8
    },
    {
      id: "2", 
      title: "শিক্ষার্থীদের ক্লাস পরিচালনা",
      description: "কীভাবে শিক্ষার্থী যোগ করবেন, ক্লাস সংগঠিত করবেন এবং অগ্রগতি ট্র্যাক করবেন",
      type: "video",
      duration: "১২ মিনিট",
      difficulty: "beginner",
      category: "classes",
      views: 956,
      rating: 4.7
    },
    {
      id: "3",
      title: "গ্রেড রিপোর্ট বোঝা",
      description: "শিক্ষার্থীদের রিপোর্ট দেখা এবং ব্যাখ্যা করার ধাপে ধাপে গাইড",
      type: "article", 
      difficulty: "intermediate",
      category: "reports",
      views: 743,
      rating: 4.6
    },
    {
      id: "4",
      title: "আমি একজন শিক্ষার্থীর পাসওয়ার্ড কীভাবে রিসেট করব?",
      description: "যে শিক্ষার্থীরা তাদের লগইন তথ্য ভুলে গেছে তাদের সাহায্য করার দ্রুত পদক্ষেপ",
      type: "faq",
      difficulty: "beginner", 
      category: "troubleshooting",
      views: 2103,
      rating: 4.9
    },
    {
      id: "5",
      title: "উন্নত অ্যাসাইনমেন্ট সেটিংস",
      description: "সময়সীমা, প্রচেষ্টার সীমাবদ্ধতা এবং গ্রেডিং বিকল্পগুলি কনফিগার করুন",
      type: "video",
      duration: "১৫ মিনিট",
      difficulty: "advanced",
      category: "assignments", 
      views: 421,
      rating: 4.5
    }
  ];

  const categories = [
    { value: "all", label: "সমস্ত বিষয়", count: helpItems.length },
    { value: "assignments", label: "অ্যাসাইনমেন্ট", count: helpItems.filter(item => item.category === "assignments").length },
    { value: "classes", label: "ক্লাস ও শিক্ষার্থী", count: helpItems.filter(item => item.category === "classes").length },
    { value: "reports", label: "রিপোর্ট ও গ্রেড", count: helpItems.filter(item => item.category === "reports").length },
    { value: "troubleshooting", label: "সমস্যা সমাধান", count: helpItems.filter(item => item.category === "troubleshooting").length }
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
              সহায়তা ও সাপোর্ট কেন্দ্র
            </CardTitle>
            <Button variant="outline" onClick={onClose} className="touch-target text-xl">
              ×
            </Button>
          </div>
          <p className="text-base text-muted-foreground">
            টিউটোরিয়াল, গাইড এবং সাধারণ প্রশ্নের উত্তর খুঁজুন
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto space-y-6">
          {/* Emergency Support */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-800">তাৎক্ষণিক সাহায্য প্রয়োজন?</h3>
            <p className="text-sm text-red-700 mb-3">
              জরুরি সমস্যা বা প্রযুক্তিগত সমস্যার জন্য সরাসরি আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 gap-2">
                <Phone className="h-4 w-4" />
                সাপোর্ট কল: ১-৮০০-শিক্ষক
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                ইমেইল সাপোর্ট
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                লাইভ চ্যাট
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="সাহায্যের বিষয়, টিউটোরিয়াল, বা প্রশ্ন খুঁজুন..."
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
            <h3 className="text-xl font-semibold mb-4">জনপ্রিয় সাহায্যের বিষয়</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1">অ্যাসাইনমেন্ট তৈরি</h4>
                  <p className="text-sm text-muted-foreground">ধাপে ধাপে গাইড</p>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium mb-1">শিক্ষার্থী পরিচালনা</h4>
                  <p className="text-sm text-muted-foreground">ক্লাস সংগঠন</p>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium mb-1">গ্রেডিং ও রিপোর্ট</h4>
                  <p className="text-sm text-muted-foreground">মূল্যায়ন সরঞ্জাম</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Help Items List */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {searchQuery ? `অনুসন্ধানের ফলাফল (${filteredItems.length})` : 'সমস্ত সাহায্যের উৎস'}
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
                            <span className="text-muted-foreground">{item.views} দেখা হয়েছে</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {item.type === 'video' && (
                            <Button size="sm" className="gap-2">
                              <Play className="h-4 w-4" />
                              দেখুন
                            </Button>
                          )}
                          {item.type === 'article' && (
                            <Button size="sm" className="gap-2">
                              <BookOpen className="h-4 w-4" />
                              পড়ুন
                            </Button>
                          )}
                          {item.type === 'faq' && (
                            <Button size="sm" className="gap-2">
                              <ChevronRight className="h-4 w-4" />
                              উত্তর দেখুন
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
                দ্রুত রেফারেন্স গাইড
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                আপনার ডেস্কে রাখতে পারেন এমন প্রিন্টযোগ্য গাইড ডাউনলোড করুন
              </p>
              <Button size="sm" variant="outline" className="w-full">
                PDF গাইড ডাউনলোড করুন
              </Button>
            </Card>
            <Card className="p-4"> 
              <h4 className="font-medium text-base mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                শিক্ষক কমিউনিটি
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                অন্যান্য শিক্ষকদের সাথে সংযুক্ত হন এবং সেরা অনুশীলন শেয়ার করুন
              </p>
              <Button size="sm" variant="outline" className="w-full">
                কমিউনিটি ফোরামে যোগদান করুন
              </Button>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherHelpSystem;