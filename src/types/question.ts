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