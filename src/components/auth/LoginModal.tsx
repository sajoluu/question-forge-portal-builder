import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "অবৈধ ইমেইল ঠিকানা" }),
  password: z.string().min(1, { message: "পাসওয়ার্ড প্রয়োজন" }),
});

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignup?: () => void;
}

export function LoginModal({ open, onOpenChange, onSwitchToSignup }: LoginModalProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate inputs
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "email") fieldErrors.email = issue.message;
        if (issue.path[0] === "password") fieldErrors.password = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "লগইন ব্যর্থ হয়েছে",
          description: error.message === "Invalid login credentials" 
            ? "ইমেইল বা পাসওয়ার্ড ভুল" 
            : error.message,
          variant: "destructive",
        });
      } else if (data.session) {
        toast({
          title: "সফলভাবে লগইন হয়েছে",
          description: "আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...",
        });
        onOpenChange(false);
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "একটি ত্রুটি ঘটেছে",
        description: "অনুগ্রহ করে আবার চেষ্টা করুন",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">শিক্ষক লগইন</DialogTitle>
          <DialogDescription className="text-center">
            আপনার ড্যাশবোর্ড অ্যাক্সেস করতে লগইন করুন
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">ইমেইল</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল লিখুন"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            {isLoading ? "লগইন হচ্ছে..." : "লগইন করুন"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">অ্যাকাউন্ট নেই? </span>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onSwitchToSignup?.();
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              নিবন্ধন করুন
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
