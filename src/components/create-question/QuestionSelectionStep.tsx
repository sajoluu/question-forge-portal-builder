import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  CheckSquare, 
  Eye, 
  Save, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp,
  BookOpen,
  Image as ImageIcon,
  Calculator,
  FileText,
  School,
  Clock,
  Download,
  Plus,
  Minus,
  Printer,
  Settings,
  Palette
} from "lucide-react";
import { QuestionFormData } from "@/types/question";

interface QuestionSelectionStepProps {
  formData: QuestionFormData;
  updateFormData: (updates: Partial<QuestionFormData>) => void;
  onNext: () => void;
}

// Mock question data
const mockQuestions = Array.from({ length: 50 }, (_, i) => ({
  id: `q${i + 1}`,
  type: i % 3 === 0 ? 'mcq' : 'cq',
  question: `Sample question ${i + 1}: This is a comprehensive question about the subject that tests understanding of key concepts.`,
  difficulty: ['easy', 'medium', 'hard'][i % 3],
  marks: i % 3 === 0 ? 1 : 5,
  topics: ['Topic A', 'Topic B', 'Topic C'][i % 3],
  board: ['Dhaka Board', 'Chittagong Board', 'Sylhet Board'][i % 3],
  year: 2020 + (i % 4),
  school: ['ABC School', 'XYZ College', 'DEF Institute'][i % 3],
  hasImage: i % 5 === 0,
  isMathematical: i % 4 === 0,
  isRepeated: i % 7 === 0
}));

export function QuestionSelectionStep({ formData, updateFormData, onNext }: QuestionSelectionStepProps) {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>(formData.selectedQuestions);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    keyword: "",
    specialSearch: [] as string[],
    topics: [] as string[],
    boards: [] as string[],
    years: [] as string[],
    schools: [] as string[]
  });
  
  // Settings state to match the image
  const [settings, setSettings] = useState({
    answerSheet: true,
    questionMetadata: false,
    branding: true,
    watermark: false,
    fontSize: 14,
    paperSize: "A4",
    columns: 1,
    fontFamily: "Times New Roman"
  });

  const questionsPerPage = 10;
  const totalPages = Math.ceil(mockQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = mockQuestions.slice(startIndex, endIndex);

  const toggleQuestion = (questionId: string) => {
    const newSelected = selectedQuestions.includes(questionId)
      ? selectedQuestions.filter(id => id !== questionId)
      : [...selectedQuestions, questionId];
    
    setSelectedQuestions(newSelected);
    updateFormData({ selectedQuestions: newSelected });
  };

  const selectAll = () => {
    const allIds = currentQuestions.map(q => q.id);
    const newSelected = [...new Set([...selectedQuestions, ...allIds])];
    setSelectedQuestions(newSelected);
    updateFormData({ selectedQuestions: newSelected });
  };

  const handleNext = () => {
    if (selectedQuestions.length === 0) {
      alert("পরবর্তী ধাপে যাওয়ার আগে অনুগ্রহ করে কমপক্ষে একটি প্রশ্ন নির্বাচন করুন।");
      return;
    }
    onNext();
  };

  const specialSearchOptions = [
    "পুনরাবৃত্ত বোর্ড প্রশ্ন",
    "গাণিতিক",
    "তাত্ত্বিক", 
    "চিত্র-ভিত্তিক প্রশ্ন",
    "বহুপদী সম্পূর্ণকরণ",
    "অন্যান্য তথ্য-ভিত্তিক"
  ];

  const topicOptions = ["বিষয় ক", "বিষয় খ", "বিষয় গ", "উন্নত বিষয়সমূহ"];
  const boardOptions = ["ঢাকা বোর্ড", "চট্টগ্রাম বোর্ড", "সিলেট বোর্ড", "রাজশাহী বোর্ড"];
  const yearOptions = ["২০২৪", "২০২৩", "২০২২", "২০২১", "২০২০"];
  const schoolOptions = ["এবিসি স্কুল", "এক্সওয়াইজেড কলেজ", "ডিইএফ ইনস্টিটিউট", "জিএইচআই একাডেমি"];

  return (
    <div className="flex gap-6 h-[calc(100vh-200px)]">
      {/* Main Content Area - 75% */}
      <div className="flex-1 w-3/4 space-y-4 overflow-y-auto">
        {/* Question Paper Preview */}
        <Card className="shadow-soft bg-white">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold">বগরাম ডা. রমজান আলী উচ্চ বিদ্যালয়</h2>
              <div className="flex justify-between items-center text-sm">
                <span>এইচএসসি</span>
                <span>পদার্থবিজ্ঞান ১ম পত্র</span>
              </div>
              <div className="text-center">
                <div className="font-semibold">পৃষ্ঠা-১</div>
                <div className="text-xs">অধ্যায়ঃ ০২ : ভেক্টর</div>
                <div className="text-xs">সময়ঃ ২০ মিনিট | পূর্ণমানঃ ২০</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 text-center text-sm">
              <p>দ্রষ্টব্যঃ প্রশ্নপত্রে কোন প্রকার দাগ বা চিহ্ন দেওয়া যাবে না।</p>
            </div>
            
            {/* Questions List */}
            <div className="space-y-4">
              {selectedQuestions.slice(0, 10).map((questionId, index) => {
                const question = mockQuestions.find(q => q.id === questionId);
                if (!question) return null;
                
                return (
                  <div key={questionId} className="border-b pb-3">
                    <div className="flex items-start gap-3">
                      <span className="font-semibold text-slate-600 min-w-[30px]">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{question.question}</p>
                        {question.type === 'mcq' && (
                          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                            <div>(ক) √(p² + q²)</div>
                            <div>(খ) √(p² - q²)</div>
                            <div>(গ) √(p² + q² + 2pq)</div>
                            <div>(ঘ) p + q</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Available Questions for Selection */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                উপলব্ধ প্রশ্নসমূহ
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={selectAll} className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <CheckSquare className="h-4 w-4 mr-1" />
                  সব নির্বাচন করুন
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedQuestions.length} / {formData.totalQuestions} নির্বাচিত
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestions.map((question) => (
              <div 
                key={question.id}
                className={`p-4 border rounded-lg transition-all cursor-pointer ${
                  selectedQuestions.includes(question.id)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-border hover:border-blue-300'
                }`}
                onClick={() => toggleQuestion(question.id)}
              >
                <div className="flex items-start gap-4">
                  <Checkbox 
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => {}}
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={question.type === 'mcq' ? 'default' : 'secondary'} className="bg-blue-600 text-white">
                        {question.type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{question.difficulty}</Badge>
                      <Badge variant="outline">{question.marks} marks</Badge>
                      
                      {question.hasImage && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <ImageIcon className="h-3 w-3" />
                          চিত্র
                        </Badge>
                      )}
                      
                      {question.isMathematical && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calculator className="h-3 w-3" />
                          গণিত
                        </Badge>
                      )}
                      
                      {question.isRepeated && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          পুনরাবৃত্ত
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-foreground">{question.question}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <School className="h-3 w-3" />
                        {question.board} - {question.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {question.topics}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              পূর্ববর্তী
            </Button>
            
            <span className="text-sm text-muted-foreground">
              পৃষ্ঠা {currentPage} এর মধ্যে {totalPages}
            </span>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              পরবর্তী
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <Button onClick={handleNext} size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
            প্রিভিউতে চালিয়ে যান
          </Button>
        </div>
      </div>

      {/* Right Sidebar - 25% */}
      <div className="w-1/4 space-y-4 overflow-y-auto">
        {/* Search and Filters */}
        <Card className="shadow-soft">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5" />
              উন্নত ফিল্টার
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {/* Keyword Search */}
            <div className="space-y-2">
              <Label htmlFor="keyword">কীওয়ার্ড অনুসন্ধান</Label>
              <Input
                id="keyword"
                placeholder="প্রশ্ন খুঁজুন..."
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              />
            </div>

            {/* Special Search */}
            <div className="space-y-2">
              <Label>বিশেষ অনুসন্ধান</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {specialSearchOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option}
                      checked={filters.specialSearch.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters({ ...filters, specialSearch: [...filters.specialSearch, option] });
                        } else {
                          setFilters({ ...filters, specialSearch: filters.specialSearch.filter(s => s !== option) });
                        }
                      }}
                    />
                    <Label htmlFor={option} className="text-xs">{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="space-y-2">
              <Label>অধ্যায় অনুযায়ী বিষয়সমূহ</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {topicOptions.map((topic) => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Board & Year */}
            <div className="space-y-2">
              <Label>বোর্ড ও বছর</Label>
              <div className="space-y-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="বছর নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="বোর্ড নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {boardOptions.map((board) => (
                      <SelectItem key={board} value={board}>{board}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Settings */}
        <Card className="shadow-soft">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Download className="h-5 w-5" />
              রপ্তানি সেটিংস
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="bg-red-500 text-white hover:bg-red-600">
                <Download className="h-4 w-4 mr-1" />
                ডাউনলোড
              </Button>
              <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600">
                <Printer className="h-4 w-4 mr-1" />
                প্রিন্ট
              </Button>
            </div>

            {/* Paper Size */}
            <div className="space-y-2">
              <Label>কাগজের আকার</Label>
              <div className="grid grid-cols-3 gap-2">
                {["A4", "A5", "Legal", "Letter"].map((size) => (
                  <Button 
                    key={size}
                    variant={settings.paperSize === size ? "default" : "outline"}
                    size="sm"
                    className={`text-xs ${settings.paperSize === size ? 'bg-blue-600 text-white' : ''}`}
                    onClick={() => setSettings({...settings, paperSize: size})}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Font Settings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>ফন্ট সাইজ</Label>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSettings({...settings, fontSize: Math.max(8, settings.fontSize - 1)})}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm min-w-[20px] text-center">{settings.fontSize}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSettings({...settings, fontSize: Math.min(24, settings.fontSize + 1)})}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <Select value={settings.fontFamily} onValueChange={(value) => setSettings({...settings, fontFamily: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Calibri">Calibri</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Toggle Settings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">উত্তরপত্র</Label>
                <Switch 
                  checked={settings.answerSheet}
                  onCheckedChange={(checked) => setSettings({...settings, answerSheet: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-sm">প্রশ্ন মেটাডেটা</Label>
                <Switch 
                  checked={settings.questionMetadata}
                  onCheckedChange={(checked) => setSettings({...settings, questionMetadata: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-sm">ব্র্যান্ডিং</Label>
                <Switch 
                  checked={settings.branding}
                  onCheckedChange={(checked) => setSettings({...settings, branding: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-sm">ওয়াটারমার্ক</Label>
                <Switch 
                  checked={settings.watermark}
                  onCheckedChange={(checked) => setSettings({...settings, watermark: checked})}
                />
              </div>
            </div>

            {/* Background Color */}
            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white border rounded cursor-pointer"></div>
                <Button variant="outline" size="sm" className="flex-1">
                  <Palette className="h-4 w-4 mr-1" />
                  Choose
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}