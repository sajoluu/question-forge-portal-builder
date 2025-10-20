import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Printer, FileText, Share2, Mail, Trophy } from "lucide-react";
import { QuestionFormData } from "@/types/question";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ExportStepProps {
  formData: QuestionFormData;
}

export function ExportStep({ formData }: ExportStepProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: string) => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "রপ্তানি সফল!",
      description: `প্রশ্ন সেট ${format.toUpperCase()} ফরম্যাটে রপ্তানি করা হয়েছে।`,
      variant: "default",
    });
    
    setIsExporting(false);
  };

  const handleSave = async () => {
    setIsExporting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "প্রমাণীকরণ ত্রুটি",
          description: "প্রশ্ন সেট সংরক্ষণ করতে আপনাকে লগইন করতে হবে।",
          variant: "destructive",
        });
        setIsExporting(false);
        return;
      }

      const { error } = await supabase.from('questions').insert({
        user_id: user.id,
        question_type: formData.questionType,
        method: formData.method,
        exam_name: formData.examName,
        class: formData.class,
        group: formData.group,
        subject: formData.subject,
        chapter: formData.chapter,
        question_type_detail: formData.questionTypeDetail,
        total_questions: formData.totalQuestions,
        selected_questions: formData.selectedQuestions,
      });

      if (error) throw error;

      toast({
        title: "প্রশ্ন সেট সংরক্ষিত!",
        description: "আপনার প্রশ্ন সেট সফলভাবে সংরক্ষণ করা হয়েছে।",
        variant: "default",
      });
    } catch (error) {
      console.error('Error saving question set:', error);
      toast({
        title: "সংরক্ষণ ব্যর্থ",
        description: "প্রশ্ন সেট সংরক্ষণ করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportOptions = [
    { format: "A4", icon: FileText, description: "প্রমাণ A4 কাগজের আকার" },
    { format: "A5", icon: FileText, description: "কম্প্যাক্ট A5 কাগজের আকার" },
    { format: "Legal", icon: FileText, description: "লিগাল কাগজের আকার" },
    { format: "Letter", icon: FileText, description: "US লেটার কাগজের আকার" }
  ];

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <Card className="shadow-soft bg-gradient-primary text-white">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Trophy className="h-12 w-12" />
            </div>
          </div>
          <CardTitle className="text-2xl">প্রশ্ন সেট সফলভাবে তৈরি হয়েছে!</CardTitle>
          <CardDescription className="text-white/80">
            আপনার প্রশ্ন সেট রপ্তানি এবং বিতরণের জন্য প্রস্তুত
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Question Set Summary */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            চূড়ান্ত প্রশ্ন সেট সারসংক্ষেপ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{formData.selectedQuestions.length}</div>
              <div className="text-sm text-muted-foreground">নির্বাচিত প্রশ্ন</div>
            </div>
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{formData.totalQuestions}</div>
              <div className="text-sm text-muted-foreground">মোট প্রশ্ন</div>
            </div>
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {formData.totalQuestions * (formData.questionTypeDetail === 'mcq' ? 1 : 5)}
              </div>
              <div className="text-sm text-muted-foreground">মোট নম্বর</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold">পরীক্ষার তথ্য</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>পরীক্ষার নাম:</span>
                  <Badge variant="outline">{formData.examName}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>বিষয়:</span>
                  <Badge variant="outline">{formData.subject}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>অধ্যায়:</span>
                  <Badge variant="outline">{formData.chapter}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">একাডেমিক বিবরণ</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>ক্লাস:</span>
                  <Badge variant="secondary">{formData.class}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>গ্রুপ:</span>
                  <Badge variant="secondary">{formData.group}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>ধরন:</span>
                  <Badge variant="secondary">{formData.questionTypeDetail?.toUpperCase()}</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            রপ্তানি ও প্রিন্ট অপশন
          </CardTitle>
          <CardDescription>
            প্রশ্ন সেট রপ্তানি করার জন্য আপনার পছন্দের ফরম্যাট নির্বাচন করুন
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {exportOptions.map((option) => (
              <Card 
                key={option.format} 
                className="cursor-pointer transition-all hover:shadow-medium card-hover"
                onClick={() => handleExport(option.format)}
              >
                <CardContent className="p-4 text-center">
                  <option.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold">{option.format}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-6">
            <Button 
              onClick={handleSave}
              variant="outline"
              size="lg"
              disabled={isExporting}
              className="btn-glow"
            >
              <FileText className="h-4 w-4 mr-2" />
              {isExporting ? "সংরক্ষণ করা হচ্ছে..." : "প্রশ্ন সেট সংরক্ষণ করুন"}
            </Button>

            <Button 
              onClick={() => handleExport("PDF")}
              size="lg"
              disabled={isExporting}
              className="btn-glow"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "রপ্তানি করা হচ্ছে..." : "পিডিএফ ডাউনলোড করুন"}
            </Button>

            <Button 
              onClick={() => window.print()}
              variant="secondary"
              size="lg"
              className="btn-glow"
            >
              <Printer className="h-4 w-4 mr-2" />
              এখনই প্রিন্ট করুন
            </Button>
          </div>

          {/* Share Options */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4 text-center">প্রশ্ন সেট শেয়ার করুন</h4>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" className="btn-glow">
                <Share2 className="h-4 w-4 mr-1" />
                লিংক শেয়ার করুন
              </Button>
              <Button variant="outline" size="sm" className="btn-glow">
                <Mail className="h-4 w-4 mr-1" />
                ইমেইল
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}