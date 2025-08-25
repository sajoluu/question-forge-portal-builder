import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, User, BookOpen, FileText, Target } from "lucide-react";
import { QuestionFormData } from "@/types/question";

interface QuestionSetConfirmationProps {
  formData: QuestionFormData;
  onNext: () => void;
}

export function QuestionSetConfirmation({ formData, onNext }: QuestionSetConfirmationProps) {
  const confirmationData = {
    schoolName: "ABC High School",
    examDetails: {
      name: formData.examName,
      class: formData.class,
      subject: formData.subject,
      chapter: formData.chapter,
      group: formData.group
    },
    timeAllocation: "2 hours",
    totalMarks: formData.totalQuestions * (formData.questionTypeDetail === 'both' ? 5 : formData.questionTypeDetail === 'mcq' ? 1 : 10),
    questionBreakdown: {
      mcq: formData.questionTypeDetail === 'mcq' ? formData.totalQuestions : formData.questionTypeDetail === 'both' ? Math.floor(formData.totalQuestions * 0.6) : 0,
      cq: formData.questionTypeDetail === 'cq' ? formData.totalQuestions : formData.questionTypeDetail === 'both' ? Math.ceil(formData.totalQuestions * 0.4) : 0
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <Card className="border-success bg-success/5 shadow-soft">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success text-success-foreground rounded-full">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-success">প্রশ্ন সেট সফলভাবে তৈরি হয়েছে!</h3>
              <p className="text-sm text-muted-foreground">
                আপনার প্রশ্ন সেট কনফিগারেশন প্রস্তুত করা হয়েছে। নিচের বিবরণ পর্যালোচনা করুন।
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* School & Exam Information */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              পরীক্ষার তথ্য
            </CardTitle>
            <CardDescription>আপনার প্রশ্ন সেটের মৌলিক বিবরণ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">স্কুলের নাম</span>
                <span className="font-medium">{confirmationData.schoolName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">পরীক্ষার নাম</span>
                <span className="font-medium">{confirmationData.examDetails.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">ক্লাস ও গ্রুপ</span>
                <span className="font-medium">{confirmationData.examDetails.class} - {confirmationData.examDetails.group}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">বিষয়</span>
                <span className="font-medium">{confirmationData.examDetails.subject}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">অধ্যায়</span>
                <span className="font-medium">{confirmationData.examDetails.chapter}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time & Marks Information */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              মূল্যায়নের বিবরণ
            </CardTitle>
            <CardDescription>সময় বরাদ্দ এবং নম্বর বিন্যাস</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">সময় বরাদ্দ</span>
                </div>
                <span className="text-2xl font-bold text-primary">{confirmationData.timeAllocation}</span>
              </div>
              
              <div className="p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">মোট নম্বর</span>
                </div>
                <span className="text-2xl font-bold text-primary">{confirmationData.totalMarks}</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">প্রশ্ন বিভাজন</h4>
                <div className="space-y-2">
                  {confirmationData.questionBreakdown.mcq > 0 && (
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm">MCQ প্রশ্ন</span>
                      <Badge variant="secondary">{confirmationData.questionBreakdown.mcq}</Badge>
                    </div>
                  )}
                  {confirmationData.questionBreakdown.cq > 0 && (
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm">সৃজনশীল প্রশ্ন</span>
                      <Badge variant="secondary">{confirmationData.questionBreakdown.cq}</Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Question Set Summary */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            প্রশ্ন সেট সারসংক্ষেপ
          </CardTitle>
          <CardDescription>আপনার কনফিগার করা প্রশ্ন সেটের সংক্ষিপ্ত বিবরণ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-gradient-secondary rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">{formData.totalQuestions}</div>
              <div className="text-sm text-muted-foreground">মোট প্রশ্ন</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-secondary rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">
                {formData.questionType === 'ai-generated' ? 'AI' : 'ম্যানুয়াল'}
              </div>
              <div className="text-sm text-muted-foreground">তৈরি করার ধরন</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-secondary rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">
                {formData.method === 'board-book' ? 'বোর্ড' : 'গাইড'}
              </div>
              <div className="text-sm text-muted-foreground">উৎস পদ্ধতি</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-primary/5 border-primary/20 shadow-soft">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-primary">প্রশ্ন যোগ করার জন্য প্রস্তুত?</h3>
            <p className="text-muted-foreground">
              আপনার প্রশ্ন সেট কাঠামো প্রস্তুত। আপনার পরীক্ষার জন্য নির্দিষ্ট প্রশ্ন নির্বাচন শুরু করতে নিচে ক্লিক করুন।
            </p>
            <Button onClick={onNext} size="lg" className="px-8">
              প্রশ্ন যোগ করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}