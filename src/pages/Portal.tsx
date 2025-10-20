import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginModal } from "@/components/auth/LoginModal";
import { SignupModal } from "@/components/auth/SignupModal";
import { BookOpen, FileQuestion, Users, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Portal = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  const features = [
    {
      icon: FileQuestion,
      title: "প্রশ্ন তৈরি করুন",
      description: "সহজেই প্রশ্ন সেট এবং অ্যাসাইনমেন্ট তৈরি করুন",
    },
    {
      icon: BookOpen,
      title: "শিক্ষা সামগ্রী",
      description: "বই এবং অধ্যায় অনুযায়ী সংগঠিত করুন",
    },
    {
      icon: Users,
      title: "শিক্ষার্থী পরিচালনা",
      description: "শিক্ষার্থীদের অগ্রগতি ট্র্যাক করুন",
    },
    {
      icon: TrendingUp,
      title: "রিপোর্ট ও বিশ্লেষণ",
      description: "বিস্তারিত পারফরম্যান্স রিপোর্ট দেখুন",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">শিক্ষক পোর্টাল</span>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSignupModal(true)}
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              নিবন্ধন
            </Button>
            <Button
              onClick={() => setShowLoginModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              লগইন
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            আধুনিক শিক্ষকদের জন্য <br />
            <span className="text-green-600">ডিজিটাল প্ল্যাটফর্ম</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            প্রশ্ন সেট তৈরি, শিক্ষার্থী মূল্যায়ন এবং শিক্ষা সংস্থান পরিচালনা করুন একটি সহজ এবং শক্তিশালী প্ল্যাটফর্মে
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setShowSignupModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white text-lg px-8"
            >
              বিনামূল্যে শুরু করুন
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowLoginModal(true)}
              className="text-lg px-8"
            >
              লগইন করুন
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600">সক্রিয় শিক্ষক</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
              <div className="text-gray-600">প্রশ্ন তৈরি হয়েছে</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">শিক্ষার্থী মূল্যায়ন</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
          <CardHeader>
            <CardTitle className="text-3xl text-white">আজই শুরু করুন</CardTitle>
            <CardDescription className="text-white/90 text-lg">
              আপনার শিক্ষাদান অভিজ্ঞতা উন্নত করুন আমাদের প্ল্যাটফর্মের সাথে
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              onClick={() => setShowSignupModal(true)}
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8"
            >
              বিনামূল্যে নিবন্ধন করুন
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Modals */}
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />
      <SignupModal
        open={showSignupModal}
        onOpenChange={setShowSignupModal}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

export default Portal;
