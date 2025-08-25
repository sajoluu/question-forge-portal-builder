import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Users, TrendingUp } from "lucide-react";

export function GuardeyShowcase() {
  return (
    <div className="min-h-screen bg-gradient-guardey p-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-guardey-lime/20 text-guardey-lime border-guardey-lime/30 mb-4">
            🔒 Cybersecurity Inspired Design
          </Badge>
          <h1 className="text-5xl font-bold text-guardey-dark-foreground mb-6">
            Guardey Color Palette
          </h1>
          <p className="text-xl text-guardey-dark-foreground/80 max-w-2xl mx-auto mb-8">
            Professional cybersecurity-inspired colors extracted from Guardey's website, 
            now integrated into your application's design system.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="bg-guardey-lime text-guardey-lime-foreground hover:bg-guardey-lime/90 shadow-lg">
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              className="border-guardey-lime text-guardey-lime hover:bg-guardey-lime hover:text-guardey-lime-foreground"
            >
              Schedule Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 border-guardey-teal/30 backdrop-blur-sm">
            <CardHeader>
              <div className="bg-guardey-lime p-3 rounded-lg w-fit">
                <Shield className="h-6 w-6 text-guardey-lime-foreground" />
              </div>
              <CardTitle className="text-guardey-dark-foreground">Secure Design</CardTitle>
              <CardDescription className="text-guardey-dark-foreground/70">
                Professional cybersecurity aesthetics that build trust and confidence.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 border-guardey-teal/30 backdrop-blur-sm">
            <CardHeader>
              <div className="bg-guardey-teal p-3 rounded-lg w-fit">
                <Zap className="h-6 w-6 text-guardey-teal-foreground" />
              </div>
              <CardTitle className="text-guardey-dark-foreground">High Contrast</CardTitle>
              <CardDescription className="text-guardey-dark-foreground/70">
                Bright lime accents on dark teal backgrounds for optimal readability.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 border-guardey-teal/30 backdrop-blur-sm">
            <CardHeader>
              <div className="bg-guardey-purple p-3 rounded-lg w-fit">
                <Users className="h-6 w-6 text-guardey-purple-foreground" />
              </div>
              <CardTitle className="text-guardey-dark-foreground">User Focused</CardTitle>
              <CardDescription className="text-guardey-dark-foreground/70">
                Colors designed for the 35-65 age group with accessibility in mind.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Color Palette Display */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-guardey-dark mb-8 text-center">Color Palette</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dark Teal */}
            <div className="text-center">
              <div className="w-full h-32 bg-guardey-dark rounded-lg mb-4 shadow-lg"></div>
              <h3 className="font-semibold text-guardey-dark mb-2">Dark Teal</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>HEX:</strong> #2B5A5A</p>
                <p><strong>RGB:</strong> 43, 90, 90</p>
                <p><strong>HSL:</strong> 180°, 35%, 26%</p>
              </div>
            </div>

            {/* Lime Green */}
            <div className="text-center">
              <div className="w-full h-32 bg-guardey-lime rounded-lg mb-4 shadow-lg"></div>
              <h3 className="font-semibold text-guardey-dark mb-2">Bright Lime</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>HEX:</strong> #B8E986</p>
                <p><strong>RGB:</strong> 184, 233, 134</p>
                <p><strong>HSL:</strong> 90°, 70%, 72%</p>
              </div>
            </div>

            {/* Medium Teal */}
            <div className="text-center">
              <div className="w-full h-32 bg-guardey-teal rounded-lg mb-4 shadow-lg"></div>
              <h3 className="font-semibold text-guardey-dark mb-2">Medium Teal</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>HEX:</strong> #4A8B8B</p>
                <p><strong>RGB:</strong> 74, 139, 139</p>
                <p><strong>HSL:</strong> 180°, 30%, 42%</p>
              </div>
            </div>

            {/* Purple */}
            <div className="text-center">
              <div className="w-full h-32 bg-guardey-purple rounded-lg mb-4 shadow-lg"></div>
              <h3 className="font-semibold text-guardey-dark mb-2">Accent Purple</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>HEX:</strong> #5A6BCF</p>
                <p><strong>RGB:</strong> 90, 107, 207</p>
                <p><strong>HSL:</strong> 231°, 57%, 58%</p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-guardey-dark mb-6 text-center">Usage Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-guardey p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-guardey-dark-foreground mb-2">Primary Gradient</h4>
                <p className="text-guardey-dark-foreground/80">bg-gradient-guardey</p>
              </div>
              <div className="bg-gradient-guardey-accent p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-guardey-lime-foreground mb-2">Accent Gradient</h4>
                <p className="text-guardey-lime-foreground/80">bg-gradient-guardey-accent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}