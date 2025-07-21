import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Printer, FileText, Share2, Mail, Trophy } from "lucide-react";
import { QuestionFormData } from "@/types/question";
import { useToast } from "@/hooks/use-toast";

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
      title: "Export Successful!",
      description: `Question set exported as ${format.toUpperCase()} format.`,
      variant: "default",
    });
    
    setIsExporting(false);
  };

  const handleSave = async () => {
    setIsExporting(true);
    
    // Simulate save process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Question Set Saved!",
      description: "Your question set has been saved successfully.",
      variant: "default",
    });
    
    setIsExporting(false);
  };

  const exportOptions = [
    { format: "A4", icon: FileText, description: "Standard A4 paper size" },
    { format: "A5", icon: FileText, description: "Compact A5 paper size" },
    { format: "Legal", icon: FileText, description: "Legal paper size" },
    { format: "Letter", icon: FileText, description: "US Letter paper size" }
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
          <CardTitle className="text-2xl">Question Set Created Successfully!</CardTitle>
          <CardDescription className="text-white/80">
            Your question set is ready for export and distribution
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Question Set Summary */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Final Question Set Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{formData.selectedQuestions.length}</div>
              <div className="text-sm text-muted-foreground">Questions Selected</div>
            </div>
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{formData.totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
            <div className="text-center p-4 bg-accent/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {formData.totalQuestions * (formData.questionTypeDetail === 'mcq' ? 1 : 5)}
              </div>
              <div className="text-sm text-muted-foreground">Total Marks</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold">Exam Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Exam Name:</span>
                  <Badge variant="outline">{formData.examName}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Subject:</span>
                  <Badge variant="outline">{formData.subject}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Chapter:</span>
                  <Badge variant="outline">{formData.chapter}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Academic Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Class:</span>
                  <Badge variant="secondary">{formData.class}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Group:</span>
                  <Badge variant="secondary">{formData.group}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
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
            Export & Print Options
          </CardTitle>
          <CardDescription>
            Choose your preferred format for exporting the question set
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
              {isExporting ? "Saving..." : "Save Question Set"}
            </Button>

            <Button 
              onClick={() => handleExport("PDF")}
              size="lg"
              disabled={isExporting}
              className="btn-glow"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Exporting..." : "Download PDF"}
            </Button>

            <Button 
              onClick={() => window.print()}
              variant="secondary"
              size="lg"
              className="btn-glow"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Now
            </Button>
          </div>

          {/* Share Options */}
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4 text-center">Share Question Set</h4>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" className="btn-glow">
                <Share2 className="h-4 w-4 mr-1" />
                Share Link
              </Button>
              <Button variant="outline" size="sm" className="btn-glow">
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}