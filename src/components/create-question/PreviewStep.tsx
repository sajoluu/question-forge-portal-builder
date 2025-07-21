import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { 
  Eye, 
  Save, 
  Download, 
  Printer, 
  Shuffle, 
  Settings, 
  FileText,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus,
  Minus,
  Palette,
  Layout,
  Droplets,
  MapPin
} from "lucide-react";
import { QuestionFormData } from "@/types/question";

interface PreviewStepProps {
  formData: QuestionFormData;
  updateFormData: (updates: Partial<QuestionFormData>) => void;
}

export function PreviewStep({ formData }: PreviewStepProps) {
  const [settings, setSettings] = useState({
    questionAttachments: {
      answerSheet: false,
      importantQuestions: false,
      questionMetadata: true
    },
    metadata: {
      subjectName: formData.subject || "",
      chapterName: formData.chapter || "",
      setCode: "SET-001",
      setCodeName: "Physics Midterm Set A",
      examName: formData.examName || "",
      instructions: "Read all questions carefully before answering."
    },
    editingMode: {
      textAlignment: "left" as "left" | "center" | "right",
      paperSize: "a4" as "a4" | "a5" | "legal" | "letter",
      optionStyle: "circle" as "circle" | "dot" | "brackets",
      font: "times" as "solaiman" | "kalpurush" | "times",
      fontSize: 12,
      columnLayout: 1,
      columnDivider: false
    },
    branding: {
      enabled: false,
      specificAddress: "",
      upazila: "",
      district: "",
      division: ""
    },
    watermark: {
      enabled: false,
      opacity: 0.3,
      size: 50,
      name: "Institution Name"
    }
  });

  const [fontSize, setFontSize] = useState([12]);
  const [watermarkOpacity, setWatermarkOpacity] = useState([30]);
  const [watermarkSize, setWatermarkSize] = useState([50]);

  // Mock selected questions for preview
  const mockSelectedQuestions = [
    {
      id: "q1",
      type: "mcq",
      question: "What is the fundamental principle of physics that states energy cannot be created or destroyed?",
      options: ["Conservation of Energy", "Newton's First Law", "Theory of Relativity", "Quantum Mechanics"],
      answer: "A",
      marks: 1
    },
    {
      id: "q2", 
      type: "cq",
      question: "Explain the concept of electromagnetic induction and provide two practical applications in modern technology.",
      marks: 5
    },
    {
      id: "q3",
      type: "mcq",
      question: "Which of the following best describes the relationship between wavelength and frequency?",
      options: ["Directly proportional", "Inversely proportional", "No relationship", "Exponentially related"],
      answer: "B",
      marks: 1
    }
  ];

  const shuffleQuestions = () => {
    // In a real implementation, this would shuffle the question order
    console.log("Questions shuffled!");
  };

  const handleSave = () => {
    console.log("Question set saved with settings:", settings);
    alert("Question set saved successfully!");
  };

  const handleExport = (format: string) => {
    console.log(`Exporting in ${format} format`);
    alert(`Exporting question set in ${format} format...`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left Panel - Question Preview */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Question Set Preview
            </CardTitle>
            <CardDescription>
              Preview your complete question set with current formatting
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Header Section */}
            <div className="text-center mb-6 p-4 border-2 border-dashed border-border">
              <h2 className="text-xl font-bold mb-2">{settings.metadata.examName}</h2>
              <p className="text-sm text-muted-foreground">
                {formData.class} - {formData.subject} - {settings.metadata.chapterName}
              </p>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span>Time: 2 hours</span>
                <span>Set: {settings.metadata.setCode}</span>
                <span>Total Marks: {mockSelectedQuestions.reduce((sum, q) => sum + q.marks, 0)}</span>
              </div>
            </div>

            {/* Instructions */}
            {settings.metadata.instructions && (
              <div className="mb-6 p-3 bg-accent/50 rounded-lg">
                <h4 className="font-medium mb-2">Instructions:</h4>
                <p className="text-sm">{settings.metadata.instructions}</p>
              </div>
            )}

            {/* Questions */}
            <div className="space-y-6">
              {mockSelectedQuestions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-primary">{index + 1}.</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={question.type === 'mcq' ? 'default' : 'secondary'}>
                          {question.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{question.marks} marks</Badge>
                      </div>
                      <p className="mb-3">{question.question}</p>
                      
                      {question.type === 'mcq' && question.options && (
                        <div className="space-y-1 ml-4">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center gap-2">
                              {settings.editingMode.optionStyle === 'circle' && (
                                <span className="w-6 h-6 border border-border rounded-full flex items-center justify-center text-xs">
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                              )}
                              {settings.editingMode.optionStyle === 'dot' && (
                                <span className="w-2 h-2 bg-border rounded-full"></span>
                              )}
                              {settings.editingMode.optionStyle === 'brackets' && (
                                <span className="text-sm">({String.fromCharCode(65 + optIndex)})</span>
                              )}
                              <span className="text-sm">{option}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Watermark Preview */}
            {settings.watermark.enabled && (
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ 
                  opacity: settings.watermark.opacity,
                  fontSize: `${settings.watermark.size}px`,
                  color: 'hsl(var(--muted-foreground))',
                  transform: 'rotate(-45deg)',
                  zIndex: 1
                }}
              >
                {settings.watermark.name}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Settings */}
      <div className="space-y-6">
        {/* Question Attachments */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Question Attachments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {Object.entries(settings.questionAttachments).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox 
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings,
                        questionAttachments: {
                          ...settings.questionAttachments,
                          [key]: checked as boolean
                        }
                      })
                    }
                  />
                  <Label htmlFor={key} className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Question Metadata */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Question Metadata
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="setCode" className="text-sm">Set Code</Label>
                <Input
                  id="setCode"
                  value={settings.metadata.setCode}
                  onChange={(e) => setSettings({
                    ...settings,
                    metadata: { ...settings.metadata, setCode: e.target.value }
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="instructions" className="text-sm">Instructions</Label>
                <Textarea
                  id="instructions"
                  value={settings.metadata.instructions}
                  onChange={(e) => setSettings({
                    ...settings,
                    metadata: { ...settings.metadata, instructions: e.target.value }
                  })}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Editing Mode */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Formatting Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Text Alignment */}
            <div>
              <Label className="text-sm mb-2 block">Text Alignment</Label>
              <div className="flex gap-1">
                {[
                  { value: 'left', icon: AlignLeft },
                  { value: 'center', icon: AlignCenter },
                  { value: 'right', icon: AlignRight }
                ].map(({ value, icon: Icon }) => (
                  <Button
                    key={value}
                    variant={settings.editingMode.textAlignment === value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSettings({
                      ...settings,
                      editingMode: { ...settings.editingMode, textAlignment: value as any }
                    })}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Paper Size */}
            <div>
              <Label className="text-sm">Paper Size</Label>
              <Select 
                value={settings.editingMode.paperSize} 
                onValueChange={(value) => setSettings({
                  ...settings,
                  editingMode: { ...settings.editingMode, paperSize: value as any }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="a5">A5</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="letter">Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Font Size */}
            <div>
              <Label className="text-sm mb-2 block">Font Size</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFontSize([Math.max(8, fontSize[0] - 1)])}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm w-8 text-center">{fontSize[0]}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFontSize([Math.min(24, fontSize[0] + 1)])}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Column Layout */}
            <div>
              <Label className="text-sm">Column Layout</Label>
              <Select 
                value={settings.editingMode.columnLayout.toString()} 
                onValueChange={(value) => setSettings({
                  ...settings,
                  editingMode: { ...settings.editingMode, columnLayout: parseInt(value) }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Column</SelectItem>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Watermark Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              Watermark
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="watermarkEnabled"
                checked={settings.watermark.enabled}
                onCheckedChange={(checked) => 
                  setSettings({
                    ...settings,
                    watermark: { ...settings.watermark, enabled: checked as boolean }
                  })
                }
              />
              <Label htmlFor="watermarkEnabled" className="text-sm">Enable Watermark</Label>
            </div>
            
            {settings.watermark.enabled && (
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Institution Name</Label>
                  <Input
                    value={settings.watermark.name}
                    onChange={(e) => setSettings({
                      ...settings,
                      watermark: { ...settings.watermark, name: e.target.value }
                    })}
                  />
                </div>
                
                <div>
                  <Label className="text-sm mb-2 block">Opacity: {watermarkOpacity[0]}%</Label>
                  <Slider
                    value={watermarkOpacity}
                    onValueChange={setWatermarkOpacity}
                    max={100}
                    step={5}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={shuffleQuestions} variant="outline" className="w-full">
            <Shuffle className="h-4 w-4 mr-2" />
            Shuffle Questions
          </Button>
          
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Question Set
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => handleExport('pdf')} variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Export PDF
            </Button>
            <Button onClick={() => handleExport('print')} variant="outline">
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}