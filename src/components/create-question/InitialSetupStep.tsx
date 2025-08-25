import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Brain, GraduationCap } from "lucide-react";
import { QuestionFormData } from "@/types/question";

interface InitialSetupStepProps {
  formData: QuestionFormData;
  updateFormData: (updates: Partial<QuestionFormData>) => void;
  onNext: () => void;
}

export function InitialSetupStep({ formData, updateFormData, onNext }: InitialSetupStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const classes = Array.from({ length: 10 }, (_, i) => `ক্লাস ${i + 3}`);
  const groups = ["বিজ্ঞান", "বাণিজ্য", "মানবিক"];
  const subjects = ["পদার্থবিজ্ঞান", "রসায়ন", "গণিত", "জীববিজ্ঞান", "ইংরেজি", "ইতিহাস"];
  const chapters = ["অধ্যায় ১: ভূমিকা", "অধ্যায় ২: মৌলিক বিষয়", "অধ্যায় ৩: উন্নত বিষয়"];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.questionType) newErrors.questionType = "অনুগ্রহ করে একটি বৈধ প্রশ্নের ধরন নির্বাচন করুন।";
    if (!formData.method) newErrors.method = "অনুগ্রহ করে একটি বৈধ পদ্ধতি নির্বাচন করুন।";
    if (!formData.examName.trim()) newErrors.examName = "অনুগ্রহ করে একটি বৈধ পরীক্ষার নাম প্রবেশ করান।";
    if (!formData.class) newErrors.class = "অনুগ্রহ করে একটি বৈধ ক্লাস নির্বাচন করুন।";
    if (!formData.group) newErrors.group = "অনুগ্রহ করে একটি বৈধ গ্রুপ নির্বাচন করুন।";
    if (!formData.subject) newErrors.subject = "অনুগ্রহ করে একটি বিষয় নির্বাচন করুন।";
    if (!formData.chapter) newErrors.chapter = "অনুগ্রহ করে একটি অধ্যায় নির্বাচন করুন।";
    if (!formData.questionTypeDetail) newErrors.questionTypeDetail = "অনুগ্রহ করে একটি প্রশ্নের ধরন নির্বাচন করুন।";
    if (!formData.totalQuestions || formData.totalQuestions <= 0) {
      newErrors.totalQuestions = "অনুগ্রহ করে প্রশ্নের সংখ্যার একটি বৈধ সংখ্যা প্রবেশ করান।";
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
      {/* <Card className="shadow-soft">
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
      </Card> */}

      {/* Method Selection */}
      {/* <Card className="shadow-soft">
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
      </Card> */}

      {/* Exam Information */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            পরীক্ষার তথ্য
          </CardTitle>
          <CardDescription>
            আপনার প্রশ্ন সেটের জন্য মৌলিক বিবরণ কনফিগার করুন
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="examName">পরীক্ষার নাম *</Label>
              <Input
                id="examName"
                placeholder="যেমন, মধ্যবার্ষিক পদার্থবিজ্ঞান পরীক্ষা"
                value={formData.examName}
                onChange={(e) => updateFormData({ examName: e.target.value })}
                className={errors.examName ? "border-destructive" : ""}
              />
              {errors.examName && (
                <p className="text-sm text-destructive">{errors.examName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">ক্লাস *</Label>
              <Select value={formData.class} onValueChange={(value) => updateFormData({ class: value })}>
                <SelectTrigger className={errors.class ? "border-destructive" : ""}>
                  <SelectValue placeholder="ক্লাস নির্বাচন করুন" />
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
              <Label htmlFor="group">গ্রুপ *</Label>
              <Select value={formData.group} onValueChange={(value) => updateFormData({ group: value })}>
                <SelectTrigger className={errors.group ? "border-destructive" : ""}>
                  <SelectValue placeholder="গ্রুপ নির্বাচন করুন" />
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
              <Label htmlFor="subject">বিষয় *</Label>
              <Select value={formData.subject} onValueChange={(value) => updateFormData({ subject: value })}>
                <SelectTrigger className={errors.subject ? "border-destructive" : ""}>
                  <SelectValue placeholder="বিষয় নির্বাচন করুন" />
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
              <Label htmlFor="chapter">অধ্যায় *</Label>
              <Select value={formData.chapter} onValueChange={(value) => updateFormData({ chapter: value })}>
                <SelectTrigger className={errors.chapter ? "border-destructive" : ""}>
                  <SelectValue placeholder="অধ্যায় নির্বাচন করুন" />
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
              <Label htmlFor="questionType">প্রশ্নের ধরন *</Label>
              <Select value={formData.questionTypeDetail} onValueChange={(value) => updateFormData({ questionTypeDetail: value as any })}>
                <SelectTrigger className={errors.questionTypeDetail ? "border-destructive" : ""}>
                  <SelectValue placeholder="প্রশ্নের ধরন নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcq">MCQ (বহুনির্বাচনী)</SelectItem>
                  <SelectItem value="cq">CQ (সৃজনশীল প্রশ্ন)</SelectItem>
                  <SelectItem value="both">উভয় MCQ ও CQ</SelectItem>
                </SelectContent>
              </Select>
              {errors.questionTypeDetail && (
                <p className="text-sm text-destructive">{errors.questionTypeDetail}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalQuestions">মোট প্রশ্নের সংখ্যা *</Label>
            <Input
              id="totalQuestions"
              type="number"
              placeholder="যেমন, ২০"
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
              সুপারিশ: সর্বোত্তম মূল্যায়নের জন্য ১০-৩০টি প্রশ্ন
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-end">
        <Button onClick={handleNext} size="lg" className="px-8">
          প্রশ্ন সেট তৈরি করুন
        </Button>
      </div>
    </div>
  );
}