import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import learningIllustration from "@/assets/learning-illustration.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Just for UI demo - no actual authentication
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex">
      {/* Left Section - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <img 
            src={learningIllustration} 
            alt="Learning illustration" 
            className="w-80 h-80 mx-auto mb-6 object-contain"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Start Your Learning Journey
          </h2>
          <p className="text-gray-600">
            Discover new skills and expand your knowledge with our interactive platform
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md bg-white shadow-xl">
          <CardContent className="p-8">
            {/* Mobile illustration */}
            <div className="lg:hidden text-center mb-6">
              <img 
                src={learningIllustration} 
                alt="Learning illustration" 
                className="w-32 h-32 mx-auto mb-4 object-contain"
              />
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back!
              </h1>
              <p className="text-gray-600 text-sm">
                Learn how to recognize cyber threats with short, weekly challenges
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400 h-12"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400 h-12"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg h-12 text-base transition-colors"
              >
                Sign in
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-lg h-12 border-gray-300 hover:bg-gray-50 transition-colors"
                  onClick={() => console.log("Google sign-in clicked")}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-lg h-12 border-gray-300 hover:bg-gray-50 transition-colors"
                  onClick={() => console.log("Microsoft sign-in clicked")}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#F25022" d="M1 1h10v10H1z" />
                    <path fill="#00A4EF" d="M13 1h10v10H13z" />
                    <path fill="#7FBA00" d="M1 13h10v10H1z" />
                    <path fill="#FFB900" d="M13 13h10v10H13z" />
                  </svg>
                  Microsoft
                </Button>
              </div>

              <div className="text-center space-y-2">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Forgot password clicked");
                  }}
                >
                  Forgot password?
                </a>
                <div className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Create account clicked");
                    }}
                  >
                    Create an account here
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;