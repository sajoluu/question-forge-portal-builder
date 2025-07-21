import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Brain, GraduationCap } from "lucide-react";
import { QuestionFormData } from "@/pages/CreateQuestion";

interface InitialSetupStepProps {
  formData: QuestionFormData;
  updateFormData: (updates: Partial<QuestionFormData>) => void;
  onNext: () => void;
}

export function InitialSetupStep({ formData, updateFormData, onNext }: InitialSetupStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const classes = Array.from({ length: 10 }, (_, i) => `Class ${i + 3}`);
  const groups = ["Science", "Commerce", "Humanities"];
  const subjects = ["Physics", "Chemistry", "Mathematics", "Biology", "English", "History"];
  const chapters = ["Chapter 1: Introduction", "Chapter 2: Fundamentals", "Chapter 3: Advanced Topics"];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.questionType) newErrors.questionType = "Please select a valid question type.";
    if (!formData.method) newErrors.method = "Please select a valid method.";
    if (!formData.examName.trim()) newErrors.examName = "Please enter a valid exam name.";
    if (!formData.class) newErrors.class = "Please select a valid class.";
    if (!formData.group) newErrors.group = "Please select a valid group.";
    if (!formData.subject) newErrors.subject = "Please select a subject.";
    if (!formData.chapter) newErrors.chapter = "Please select a chapter.";
    if (!formData.questionTypeDetail) newErrors.questionTypeDetail = "Please select a question type.";
    if (!formData.totalQuestions || formData.totalQuestions <= 0) {
      newErrors.totalQuestions = "Please enter a valid number of questions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Type Selection */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Question Generation Type
          </CardTitle>
          <CardDescription>
            Choose how you want to create your questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.questionType === 'regular' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-accent'
              }`}
              onClick={() => updateFormData({ questionType: 'regular' })}
            >
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Regular</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Manually select and customize questions from our database
              </p>
            </div>
            
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.questionType === 'ai-generated' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-accent'
              }`}
              onClick={() => updateFormData({ questionType: 'ai-generated' })}
            >
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-medium">AI Generated</h3>
                <Badge variant="secondary" className="text-xs">New</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Let AI create questions based on your requirements
              </p>
            </div>
          </div>
          {errors.questionType && (
            <p className="text-sm text-destructive mt-2">{errors.questionType}</p>
          )}
        </CardContent>
      </Card>

      {/* Method Selection */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Source Method</CardTitle>
          <CardDescription>Select the source material for your questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.method === 'board-book' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-accent'
              }`}
              onClick={() => updateFormData({ method: 'board-book' })}
            >
              <h3 className="font-medium mb-2">Board Book</h3>
              <p className="text-sm text-muted-foreground">
                Questions based on official curriculum and board guidelines
              </p>
            </div>
            
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.method === 'guide-book' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-accent'
              }`}
              onClick={() => updateFormData({ method: 'guide-book' })}
            >
              <h3 className="font-medium mb-2">Guide Book</h3>
              <p className="text-sm text-muted-foreground">
                Questions from supplementary guides and reference materials
              </p>
            </div>
          </div>
          {errors.method && (
            <p className="text-sm text-destructive mt-2">{errors.method}</p>
          )}
        </CardContent>
      </Card>

      {/* Exam Information */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Exam Information
          </CardTitle>
          <CardDescription>
            Configure the basic details for your question set
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="examName">Exam Name *</Label>
              <Input
                id="examName"
                placeholder="e.g., Mid-term Physics Exam"
                value={formData.examName}
                onChange={(e) => updateFormData({ examName: e.target.value })}
                className={errors.examName ? "border-destructive" : ""}
              />
              {errors.examName && (
                <p className="text-sm text-destructive">{errors.examName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <Select value={formData.class} onValueChange={(value) => updateFormData({ class: value })}>
                <SelectTrigger className={errors.class ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.class && (
                <p className="text-sm text-destructive">{errors.class}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="group">Group *</Label>
              <Select value={formData.group} onValueChange={(value) => updateFormData({ group: value })}>
                <SelectTrigger className={errors.group ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.group && (
                <p className="text-sm text-destructive">{errors.group}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select value={formData.subject} onValueChange={(value) => updateFormData({ subject: value })}>
                <SelectTrigger className={errors.subject ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subject && (
                <p className="text-sm text-destructive">{errors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="chapter">Chapter *</Label>
              <Select value={formData.chapter} onValueChange={(value) => updateFormData({ chapter: value })}>
                <SelectTrigger className={errors.chapter ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select chapter" />
                </SelectTrigger>
                <SelectContent>
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.chapter && (
                <p className="text-sm text-destructive">{errors.chapter}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="questionType">Question Type *</Label>
              <Select value={formData.questionTypeDetail} onValueChange={(value) => updateFormData({ questionTypeDetail: value as any })}>
                <SelectTrigger className={errors.questionTypeDetail ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcq">MCQ (Multiple Choice)</SelectItem>
                  <SelectItem value="cq">CQ (Creative Questions)</SelectItem>
                  <SelectItem value="both">Both MCQ & CQ</SelectItem>
                </SelectContent>
              </Select>
              {errors.questionTypeDetail && (
                <p className="text-sm text-destructive">{errors.questionTypeDetail}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalQuestions">Total Number of Questions *</Label>
            <Input
              id="totalQuestions"
              type="number"
              placeholder="e.g., 20"
              min="1"
              max="100"
              value={formData.totalQuestions || ""}
              onChange={(e) => updateFormData({ totalQuestions: parseInt(e.target.value) || 0 })}
              className={errors.totalQuestions ? "border-destructive" : ""}
            />
            {errors.totalQuestions && (
              <p className="text-sm text-destructive">{errors.totalQuestions}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Recommended: 10-30 questions for optimal assessment
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-end">
        <Button onClick={handleNext} size="lg" className="px-8">
          Create Question Set
        </Button>
      </div>
    </div>
  );
}