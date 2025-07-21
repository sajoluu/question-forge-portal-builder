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
  Clock
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
  const [showFilters, setShowFilters] = useState(false);

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
      alert("Please select at least one question before proceeding.");
      return;
    }
    onNext();
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
      {/* Header with Question Panel */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Question Selection
              </CardTitle>
              <CardDescription>
                Choose questions for your {formData.examName} examination
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        {/* Question Panel */}
        <Card className="bg-primary/5 border-primary/20 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-primary">Question Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{selectedQuestions.length}</div>
              <div className="text-sm text-muted-foreground">Selected Questions</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{formData.examName}</div>
              <div className="text-sm text-muted-foreground">Target: {formData.totalQuestions} questions</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search & Filter Questions
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Advanced Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Keyword Search */}
          <div className="space-y-2">
            <Label htmlFor="keyword">Keyword Search</Label>
            <Input
              id="keyword"
              placeholder="Search questions by keyword..."
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            />
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 bg-accent/50 rounded-lg">
              <div className="space-y-2">
                <Label>Special Search</Label>
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
                      <Label htmlFor={option} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Topics by Chapter</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select topics" />
                  </SelectTrigger>
                  <SelectContent>
                    {topicOptions.map((topic) => (
                      <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Board & Year</Label>
                <div className="space-y-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
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
            </div>
          )}
        </CardContent>
      </Card>

      {/* Question List */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Available Questions</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                <CheckSquare className="h-4 w-4 mr-1" />
                Select All
              </Button>
              <span className="text-sm text-muted-foreground">
                {selectedQuestions.length} / {formData.totalQuestions} selected
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
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-accent'
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
                    <Badge variant={question.type === 'mcq' ? 'default' : 'secondary'}>
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

      {/* Pagination and Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
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
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp className="h-4 w-4 mr-1" />
            Scroll to Top
          </Button>
          
          <Button onClick={handleNext} size="lg" className="px-8">
            Continue to Preview
          </Button>
        </div>
      </div>
    </div>
  );
}