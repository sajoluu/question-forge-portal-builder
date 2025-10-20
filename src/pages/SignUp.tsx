import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import learningIllustration from "@/assets/learning-illustration.png";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: "",
    color: ""
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();
  }, [navigate]);

  // Password validation checks
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  };

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    if (!password) return { score: 0, label: "", color: "" };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score <= 2) return { score, label: "দুর্বল", color: "bg-red-500" };
    if (score <= 4) return { score, label: "মাঝারি", color: "bg-yellow-500" };
    return { score, label: "শক্তিশালী", color: "bg-green-500" };
  };

  const validateFullName = (name: string): string => {
    if (!name.trim()) return "পুরো নাম প্রয়োজন";
    if (!/^[a-zA-Z\s\u0980-\u09FF]+$/.test(name)) {
      return "পুরো নামে শুধুমাত্র বর্ণমালার অক্ষর থাকতে হবে";
    }
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "ইমেইল প্রয়োজন";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা লিখুন";
    }
    // In real app, check if email exists in database
    return "";
  };

  const validatePhoneNumber = (phone: string): string => {
    if (!phone.trim()) return "ফোন নম্বর প্রয়োজন";
    const phoneRegex = /^(\+?88)?01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return "অনুগ্রহ করে একটি বৈধ ফোন নম্বর লিখুন";
    }
    // In real app, check if phone exists in database
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) return "পাসওয়ার্ড প্রয়োজন";
    if (password.length < 8) {
      return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    }
    if (!/[A-Z]/.test(password)) {
      return "পাসওয়ার্ডে কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে";
    }
    if (!/[a-z]/.test(password)) {
      return "পাসওয়ার্ডে কমপক্ষে একটি ছোট হাতের অক্ষর থাকতে হবে";
    }
    if (!/[0-9]/.test(password)) {
      return "পাসওয়ার্ডে কমপক্ষে একটি সংখ্যা থাকতে হবে";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "পাসওয়ার্ডে কমপক্ষে একটি বিশেষ অক্ষর থাকতে হবে (@, #, $, !, ইত্যাদি)";
    }
    return "";
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }

    // Update password strength
    if (field === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    
    const nameError = validateFullName(formData.fullName);
    if (nameError) newErrors.fullName = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhoneNumber(formData.phoneNumber);
    if (phoneError) newErrors.phoneNumber = phoneError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    }

    setErrors(newErrors);

    // If no errors, proceed with signup
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              full_name: formData.fullName,
              phone_number: formData.phoneNumber,
            }
          }
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "এই ইমেইল ইতিমধ্যে নিবন্ধিত",
              description: "অনুগ্রহ করে লগইন করুন বা অন্য ইমেইল ব্যবহার করুন",
              variant: "destructive",
            });
          } else {
            toast({
              title: "নিবন্ধন ব্যর্থ হয়েছে",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!",
            description: "আপনাকে ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...",
          });
          
          // Auto-redirect to dashboard since auto-confirm is enabled
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex">
      {/* Left Section - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <img 
            src={learningIllustration} 
            alt="শিক্ষার চিত্র" 
            className="w-80 h-80 mx-auto mb-6 object-contain"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            শিক্ষকদের জন্য ডিজিটাল প্ল্যাটফর্ম
          </h2>
          <p className="text-gray-600">
            প্রশ্ন সেট, অ্যাসাইনমেন্ট এবং শিক্ষা সংস্থান পরিচালনা করুন সহজেই
          </p>
        </div>
      </div>

      {/* Right Section - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md bg-white shadow-xl">
          <CardContent className="p-8">
            {/* Mobile illustration */}
            <div className="lg:hidden text-center mb-6">
              <img 
                src={learningIllustration} 
                alt="শিক্ষার চিত্র" 
                className="w-32 h-32 mx-auto mb-4 object-contain"
              />
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                শিক্ষক নিবন্ধন
              </h1>
              <p className="text-gray-600 text-sm">
                আপনার অ্যাকাউন্ট তৈরি করুন এবং শিক্ষা সংস্থান অ্যাক্সেস করুন
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">
                  পুরো নাম <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={`w-full rounded-lg bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400 h-12 ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                  placeholder="আপনার পুরো নাম লিখুন"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  ইমেইল ঠিকানা <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full rounded-lg bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400 h-12 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="example@domain.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">
                  ফোন নম্বর <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className={`w-full rounded-lg bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400 h-12 ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                  placeholder="01XXXXXXXXX"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  পাসওয়ার্ড <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`w-full rounded-lg bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400 h-12 pr-10 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="পাসওয়ার্ড লিখুন"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{passwordStrength.label}</span>
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="space-y-1 text-xs">
                      <div className={`flex items-center gap-1 ${passwordChecks.length ? "text-green-600" : "text-gray-500"}`}>
                        {passwordChecks.length ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        <span>কমপক্ষে ৮ অক্ষর</span>
                      </div>
                      <div className={`flex items-center gap-1 ${passwordChecks.uppercase ? "text-green-600" : "text-gray-500"}`}>
                        {passwordChecks.uppercase ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        <span>একটি বড় হাতের অক্ষর (A-Z)</span>
                      </div>
                      <div className={`flex items-center gap-1 ${passwordChecks.lowercase ? "text-green-600" : "text-gray-500"}`}>
                        {passwordChecks.lowercase ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        <span>একটি ছোট হাতের অক্ষর (a-z)</span>
                      </div>
                      <div className={`flex items-center gap-1 ${passwordChecks.number ? "text-green-600" : "text-gray-500"}`}>
                        {passwordChecks.number ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        <span>একটি সংখ্যা (0-9)</span>
                      </div>
                      <div className={`flex items-center gap-1 ${passwordChecks.special ? "text-green-600" : "text-gray-500"}`}>
                        {passwordChecks.special ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        <span>একটি বিশেষ অক্ষর (@, #, $, !)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  পাসওয়ার্ড নিশ্চিত করুন <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`w-full rounded-lg bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400 h-12 pr-10 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg h-12 text-base transition-colors disabled:opacity-50"
              >
                {isLoading ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                >
                  এখানে লগইন করুন
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
