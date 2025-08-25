import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowLeft, ArrowRight, Sparkles, BookOpen } from "lucide-react";

// Import step components
import { QuestionTypeStep } from "@/components/create-question/QuestionTypeStep";
import { InitialSetupStep } from "@/components/create-question/InitialSetupStep";
import { QuestionSetConfirmation } from "@/components/create-question/QuestionSetConfirmation";
import { QuestionSelectionStep } from "@/components/create-question/QuestionSelectionStep";
import { PreviewStep } from "@/components/create-question/PreviewStep";
import { ExportStep } from "@/components/create-question/ExportStep";
import { QuestionFormData } from "@/types/question";

const steps = [
  { id: 1, name: "প্রশ্ন ধরন", description: "ধরন এবং পদ্ধতি নির্বাচন করুন" },
  { id: 2, name: "সেটআপ ফর্ম", description: "পরীক্ষার বিবরণ প্রবেশ করান" },
  { id: 3, name: "নিশ্চিতকরণ", description: "প্রশ্ন সেট নিশ্চিত করুন" },
  { id: 4, name: "প্রশ্ন নির্বাচন", description: "নির্দিষ্ট প্রশ্ন নির্বাচন করুন" },
  { id: 5, name: "প্রিভিউ ও সেটিংস", description: "পর্যালোচনা এবং কাস্টমাইজ করুন" },
  { id: 6, name: "রপ্তানি", description: "চূড়ান্ত এবং ডাউনলোড করুন" }
];

const CreateQuestion = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuestionFormData>({
    questionType: "",
    method: "",
    examName: "",
    class: "",
    group: "",
    subject: "",
    chapter: "",
    questionTypeDetail: "",
    totalQuestions: 0,
    selectedQuestions: []
  });

  const updateFormData = (updates: Partial<QuestionFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= steps.length) {
      setCurrentStep(step);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionTypeStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <InitialSetupStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 3:
        return (
          <QuestionSetConfirmation 
            formData={formData} 
            onNext={nextStep}
          />
        );
      case 4:
        return (
          <QuestionSelectionStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 5:
        return (
          <PreviewStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 6:
        return (
          <ExportStep 
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-guardey-dark/5 to-guardey-teal/10 p-6 rounded-lg min-h-screen">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-guardey-teal">
          <span>ড্যাশবোর্ড</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-guardey-dark font-medium">প্রশ্ন তৈরি করুন</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-guardey-dark">প্রশ্ন সেট তৈরি করুন</h1>
            <p className="text-guardey-teal">
              এআই সহায়তা এবং উন্নত ফিল্টারিং দিয়ে বিস্তৃত প্রশ্ন সেট তৈরি করুন
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-2 bg-guardey-lime/20 text-guardey-lime border-guardey-lime/30 btn-glow">
              <Sparkles className="h-3 w-3" />
              এআই চালিত
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 border-guardey-teal text-guardey-teal">
              <BookOpen className="h-3 w-3" />
              বহু-ফরম্যাট
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card className="shadow-soft border-guardey-teal/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-guardey-dark">অগ্রগতি</CardTitle>
            <span className="text-sm text-guardey-teal">
              ধাপ {currentStep} এর মধ্যে {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center text-center flex-1 cursor-pointer ${
                  index < steps.length - 1 ? 'border-r border-border' : ''
                }`}
                onClick={() => goToStep(step.id)}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-all ${
                    step.id === currentStep 
                      ? 'bg-guardey-lime text-guardey-lime-foreground shadow-glow' 
                      : step.id < currentStep 
                        ? 'bg-guardey-teal text-guardey-teal-foreground hover:shadow-glow'
                        : 'bg-muted text-muted-foreground hover:bg-guardey-lime/20'
                  }`}
                >
                  {step.id}
                </div>
                <div className="space-y-1">
                  <h4 className={`text-sm font-medium ${
                    step.id <= currentStep ? 'text-guardey-dark' : 'text-muted-foreground'
                  }`}>
                    {step.name}
                  </h4>
                  <p className="text-xs text-guardey-teal hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="min-h-[600px]">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      {currentStep > 1 && currentStep < 6 && (
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            className="flex items-center gap-2 border-guardey-teal text-guardey-teal hover:bg-guardey-teal hover:text-white btn-glow"
          >
            <ArrowLeft className="h-4 w-4" />
            পূর্ববর্তী ধাপ
          </Button>
          
          {currentStep < steps.length && (
            <Button 
              onClick={nextStep}
              className="flex items-center gap-2 bg-guardey-lime text-guardey-lime-foreground hover:bg-guardey-lime/90 btn-glow"
            >
              পরবর্তী ধাপ
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateQuestion;