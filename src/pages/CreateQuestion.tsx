import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowLeft, ArrowRight, Sparkles, BookOpen } from "lucide-react";

// Import step components
import { InitialSetupStep } from "@/components/create-question/InitialSetupStep";
import { QuestionSetConfirmation } from "@/components/create-question/QuestionSetConfirmation";
import { QuestionSelectionStep } from "@/components/create-question/QuestionSelectionStep";
import { PreviewStep } from "@/components/create-question/PreviewStep";

export interface QuestionFormData {
  questionType: "regular" | "ai-generated" | "";
  method: "board-book" | "guide-book" | "";
  examName: string;
  class: string;
  group: string;
  subject: string;
  chapter: string;
  questionTypeDetail: "mcq" | "cq" | "both" | "";
  totalQuestions: number;
  selectedQuestions: string[];
}

const steps = [
  { id: 1, name: "Initial Setup", description: "Configure basic settings" },
  { id: 2, name: "Question Set", description: "Create your question set" },
  { id: 3, name: "Select Questions", description: "Choose specific questions" },
  { id: 4, name: "Preview & Export", description: "Review and finalize" }
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

  const progress = (currentStep / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <InitialSetupStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <QuestionSetConfirmation 
            formData={formData} 
            onNext={nextStep}
          />
        );
      case 3:
        return (
          <QuestionSelectionStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 4:
        return (
          <PreviewStep 
            formData={formData} 
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Create Question</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create Question Set</h1>
            <p className="text-muted-foreground">
              Build comprehensive question sets with AI assistance and advanced filtering
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <BookOpen className="h-3 w-3" />
              Multi-Format
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card className="shadow-soft">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Progress</CardTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center text-center flex-1 ${
                  index < steps.length - 1 ? 'border-r border-border' : ''
                }`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                    step.id === currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : step.id < currentStep 
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.id}
                </div>
                <div className="space-y-1">
                  <h4 className={`text-sm font-medium ${
                    step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.name}
                  </h4>
                  <p className="text-xs text-muted-foreground hidden sm:block">
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
      {currentStep > 1 && (
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous Step
          </Button>
          
          {currentStep < steps.length && (
            <Button 
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              Next Step
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateQuestion;