import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GuardeyDemo() {
  return (
    <div className="min-h-screen bg-gradient-guardey p-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-guardey-dark-foreground mb-4">
          Guardey Color Palette Demo
        </h1>
        <p className="text-lg text-guardey-dark-foreground/80 mb-8">
          Extracted from Guardey's cybersecurity platform design
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Button className="bg-guardey-lime text-guardey-lime-foreground hover:bg-guardey-lime/90">
            Start Free Trial
          </Button>
          <Button 
            variant="outline" 
            className="border-guardey-teal text-guardey-teal hover:bg-guardey-teal hover:text-guardey-teal-foreground"
          >
            Schedule Demo
          </Button>
        </div>
      </div>

      {/* Color Showcase Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-guardey-dark border-guardey-dark">
          <CardHeader className="text-center">
            <CardTitle className="text-guardey-dark-foreground">Dark Teal</CardTitle>
            <CardDescription className="text-guardey-dark-foreground/70">
              Primary brand color
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-20 bg-guardey-dark rounded-lg mb-2"></div>
            <code className="text-xs text-guardey-dark-foreground/60">bg-guardey-dark</code>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-guardey-lime">Bright Lime</CardTitle>
            <CardDescription>CTA accent color</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-20 bg-guardey-lime rounded-lg mb-2"></div>
            <code className="text-xs text-muted-foreground">bg-guardey-lime</code>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-guardey-teal">Medium Teal</CardTitle>
            <CardDescription>Supporting color</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-20 bg-guardey-teal rounded-lg mb-2"></div>
            <code className="text-xs text-muted-foreground">bg-guardey-teal</code>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-guardey-purple">Accent Purple</CardTitle>
            <CardDescription>Highlight color</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-20 bg-guardey-purple rounded-lg mb-2"></div>
            <code className="text-xs text-muted-foreground">bg-guardey-purple</code>
          </CardContent>
        </Card>
      </div>

      {/* Gradient Examples */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-guardey-dark-foreground text-center mb-6">
          Gradient Examples
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-guardey p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Dark Gradient</h3>
            <code className="text-sm text-white/70">bg-gradient-guardey</code>
          </div>
          
          <div className="bg-gradient-guardey-accent p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-guardey-lime-foreground mb-2">Accent Gradient</h3>
            <code className="text-sm text-guardey-lime-foreground/70">bg-gradient-guardey-accent</code>
          </div>
        </div>
      </div>
    </div>
  );
}