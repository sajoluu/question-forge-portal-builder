import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, Bot, BookOpen, GraduationCap, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QuestionFormData } from "@/types/question";

interface QuestionTypeStepProps {
  formData: QuestionFormData;
  updateFormData: (updates: Partial<QuestionFormData>) => void;
  onNext: () => void;
}

export function QuestionTypeStep({ formData, updateFormData, onNext }: QuestionTypeStepProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateAndNext = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.questionType) {
      newErrors.questionType = "Please select a valid question type.";
    }
    if (!formData.method) {
      newErrors.method = "Please select a valid method.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Question Set Configuration
          </CardTitle>
          <CardDescription>
            Choose the type of questions and method for your examination
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Question Type Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Question Type *</Label>
            <RadioGroup
              value={formData.questionType}
              onValueChange={(value: "regular" | "ai-generated") => {
                updateFormData({ questionType: value });
                if (errors.questionType) {
                  setErrors({ ...errors, questionType: "" });
                }
              }}
              className="grid gap-4 md:grid-cols-2"
            >
              <div className="relative">
                <RadioGroupItem
                  value="regular"
                  id="regular"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="regular"
                  className={`flex flex-col items-center justify-between rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-medium ${
                    formData.questionType === "regular"
                      ? "border-primary bg-primary/5 shadow-glow"
                      : "border-border hover:border-accent"
                  }`}
                >
                  <FileText className="h-12 w-12 mb-3 text-primary" />
                  <div className="text-center">
                    <div className="text-lg font-semibold">Regular</div>
                    <div className="text-sm text-muted-foreground">
                      Traditional question selection from database
                    </div>
                  </div>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem
                  value="ai-generated"
                  id="ai-generated"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="ai-generated"
                  className={`flex flex-col items-center justify-between rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-medium ${
                    formData.questionType === "ai-generated"
                      ? "border-primary bg-primary/5 shadow-glow"
                      : "border-border hover:border-accent"
                  }`}
                >
                  <Bot className="h-12 w-12 mb-3 text-primary" />
                  <div className="text-center">
                    <div className="text-lg font-semibold">AI Generated</div>
                    <div className="text-sm text-muted-foreground">
                      AI-powered intelligent question creation
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
            {errors.questionType && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.questionType}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Method Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Method *</Label>
            <RadioGroup
              value={formData.method}
              onValueChange={(value: "board-book" | "guide-book") => {
                updateFormData({ method: value });
                if (errors.method) {
                  setErrors({ ...errors, method: "" });
                }
              }}
              className="grid gap-4 md:grid-cols-2"
            >
              <div className="relative">
                <RadioGroupItem
                  value="board-book"
                  id="board-book"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="board-book"
                  className={`flex flex-col items-center justify-between rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-medium ${
                    formData.method === "board-book"
                      ? "border-primary bg-primary/5 shadow-glow"
                      : "border-border hover:border-accent"
                  }`}
                >
                  <BookOpen className="h-12 w-12 mb-3 text-primary" />
                  <div className="text-center">
                    <div className="text-lg font-semibold">Board Book</div>
                    <div className="text-sm text-muted-foreground">
                      Questions from official board textbooks
                    </div>
                  </div>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem
                  value="guide-book"
                  id="guide-book"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="guide-book"
                  className={`flex flex-col items-center justify-between rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-medium ${
                    formData.method === "guide-book"
                      ? "border-primary bg-primary/5 shadow-glow"
                      : "border-border hover:border-accent"
                  }`}
                >
                  <GraduationCap className="h-12 w-12 mb-3 text-primary" />
                  <div className="text-center">
                    <div className="text-lg font-semibold">Guide Book</div>
                    <div className="text-sm text-muted-foreground">
                      Questions from supplementary guide books
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
            {errors.method && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.method}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Continue Button */}
          <div className="flex justify-end pt-6">
            <Button 
              onClick={validateAndNext}
              size="lg"
              className="btn-glow"
            >
              Continue to Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}