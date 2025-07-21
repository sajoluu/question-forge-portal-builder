import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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
  Sparkles,
  Plus
} from "lucide-react";

// Mock question data
const mockQuestions = Array.from({ length: 50 }, (_, i) => ({
  id: `q${i + 1}`,
  type: i % 3 === 0 ? 'mcq' : 'cq',
  question: `Sample question ${i + 1}: This is a comprehensive question about the subject that tests understanding of key concepts and practical applications.`,
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

const CreateQuestion = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    keyword: "",
    specialSearch: [] as string[],
    topics: [] as string[],
    boards: [] as string[],
    years: [] as string[],
    schools: [] as string[]
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
  };

  const selectAll = () => {
    const allIds = currentQuestions.map(q => q.id);
    const newSelected = [...new Set([...selectedQuestions, ...allIds])];
    setSelectedQuestions(newSelected);
  };

  const specialSearchOptions = [
    "Repeated Board Question",
    "Mathematical",
    "Theoretical", 
    "Image-based Questions",
    "Polynomial Completion",
    "Other Data-Based"
  ];

  const topicOptions = ["Topic A", "Topic B", "Topic C", "Advanced Topics"];
  const boardOptions = ["Dhaka Board", "Chittagong Board", "Sylhet Board", "Rajshahi Board"];
  const yearOptions = ["2024", "2023", "2022", "2021", "2020"];
  const schoolOptions = ["ABC School", "XYZ College", "DEF Institute", "GHI Academy"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Question Bank</h1>
            <p className="text-muted-foreground">
              Browse and select questions for your examination sets
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-2 btn-glow">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </Badge>
            <Button className="btn-glow">
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Question
            </Button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Questions List - 75% width */}
        <div className="lg:col-span-3 space-y-6">
          {/* Question Panel Summary */}
          <Card className="bg-gradient-primary text-white shadow-glow card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Question Selection Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold">{selectedQuestions.length}</div>
                <div className="text-sm text-white/80">Selected Questions</div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="btn-glow">
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button variant="secondary" size="sm" className="btn-glow">
                  <Save className="h-4 w-4 mr-1" />
                  Save Set
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Question List */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Available Questions
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={selectAll} className="btn-glow">
                    <CheckSquare className="h-4 w-4 mr-1" />
                    Select All
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {selectedQuestions.length} selected
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestions.map((question) => (
                <div 
                  key={question.id}
                  className={`p-4 border rounded-lg transition-all cursor-pointer card-hover ${
                    selectedQuestions.includes(question.id)
                      ? 'border-primary bg-primary/5 shadow-glow'
                      : 'border-border hover:border-accent'
                  }`}
                  onClick={() => toggleQuestion(question.id)}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox 
                      checked={selectedQuestions.includes(question.id)}
                      onChange={() => {}}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant={question.type === 'mcq' ? 'default' : 'secondary'} className="btn-glow">
                          {question.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{question.difficulty}</Badge>
                        <Badge variant="outline">{question.marks} marks</Badge>
                        
                        {question.hasImage && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" />
                            Image
                          </Badge>
                        )}
                        
                        {question.isMathematical && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Calculator className="h-3 w-3" />
                            Math
                          </Badge>
                        )}
                        
                        {question.isRepeated && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Repeated
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-foreground leading-relaxed">{question.question}</p>
                      
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
                className="btn-glow"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="btn-glow"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-glow"
            >
              <ChevronUp className="h-4 w-4 mr-1" />
              Scroll to Top
            </Button>
          </div>
        </div>

        {/* Advanced Filters - 25% width */}
        <div className="lg:col-span-1">
          <Card className="shadow-soft sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Advanced Filters
              </CardTitle>
              <CardDescription>
                Refine your question search
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Keyword Search */}
              <div className="space-y-2">
                <Label htmlFor="keyword" className="text-sm font-medium">Keyword Search</Label>
                <Input
                  id="keyword"
                  placeholder="Search questions..."
                  value={filters.keyword}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                  className="transition-all focus:shadow-glow"
                />
              </div>

              {/* Special Search */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Special Search</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
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
                      <Label htmlFor={option} className="text-xs leading-none">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Topics by Chapter</Label>
                <Select>
                  <SelectTrigger className="transition-all focus:shadow-glow">
                    <SelectValue placeholder="Select topics" />
                  </SelectTrigger>
                  <SelectContent>
                    {topicOptions.map((topic) => (
                      <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Board & Year */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Board & Year</Label>
                <div className="space-y-2">
                  <Select>
                    <SelectTrigger className="transition-all focus:shadow-glow">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="transition-all focus:shadow-glow">
                      <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                    <SelectContent>
                      {boardOptions.map((board) => (
                        <SelectItem key={board} value={board}>{board}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Schools */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Top Schools</Label>
                <Select>
                  <SelectTrigger className="transition-all focus:shadow-glow">
                    <SelectValue placeholder="Select school" />
                  </SelectTrigger>
                  <SelectContent>
                    {schoolOptions.map((school) => (
                      <SelectItem key={school} value={school}>{school}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full btn-glow"
                onClick={() => setFilters({
                  keyword: "",
                  specialSearch: [],
                  topics: [],
                  boards: [],
                  years: [],
                  schools: []
                })}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;