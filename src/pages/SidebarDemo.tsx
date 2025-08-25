import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Menu, Sidebar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SidebarDemo() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Collapsible Navigation",
      description: "Click the menu button to expand/collapse the sidebar",
      status: "active"
    },
    {
      title: "Responsive Design", 
      description: "Automatically adapts to mobile and desktop screens",
      status: "active"
    },
    {
      title: "Smooth Transitions",
      description: "Beautiful animations between collapsed and expanded states",
      status: "active"
    },
    {
      title: "Icon-Only Mode",
      description: "Shows only icons when collapsed with tooltips on hover",
      status: "active"
    },
    {
      title: "Auto-Expand Groups",
      description: "Menu groups automatically expand when containing active items",
      status: "active"
    },
    {
      title: "Guardey Theme",
      description: "Professional cybersecurity color scheme throughout",
      status: "active"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Badge className="bg-guardey-lime/20 text-guardey-lime border-guardey-lime/30 mb-4">
          <Sidebar className="h-4 w-4 mr-2" />
          New Navigation System
        </Badge>
        <h1 className="text-4xl font-bold text-guardey-dark mb-4">
          Left Sidebar Navigation
        </h1>
        <p className="text-xl text-guardey-teal max-w-2xl mx-auto">
          Your navigation has been transformed from a top bar to a modern, collapsible left sidebar 
          with smooth transitions and responsive behavior.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-guardey-teal/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-guardey-dark flex items-center gap-2">
              <Menu className="h-6 w-6 text-guardey-lime" />
              How to Use
            </CardTitle>
            <CardDescription className="text-guardey-teal">
              Navigate your new sidebar like a pro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-guardey-lime/5">
                <div className="bg-guardey-lime text-guardey-lime-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-guardey-dark">Toggle Sidebar</h4>
                  <p className="text-sm text-guardey-teal">Click the hamburger menu button in the top-left to collapse/expand</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-guardey-lime/5">
                <div className="bg-guardey-lime text-guardey-lime-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-guardey-dark">Navigate Menus</h4>
                  <p className="text-sm text-guardey-teal">Click on items with sub-menus to expand/collapse them</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-guardey-lime/5">
                <div className="bg-guardey-lime text-guardey-lime-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-guardey-dark">Hover for Tooltips</h4>
                  <p className="text-sm text-guardey-teal">When collapsed, hover over icons to see menu labels</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-guardey-teal/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-guardey-dark">Features</CardTitle>
            <CardDescription className="text-guardey-teal">
              Everything you need in a modern navigation system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-guardey-teal mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-guardey-dark text-sm">{feature.title}</h4>
                    <p className="text-xs text-guardey-teal">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-guardey-teal/20 shadow-lg bg-gradient-to-r from-guardey-lime/5 to-guardey-teal/5">
        <CardHeader>
          <CardTitle className="text-guardey-dark">Technical Implementation</CardTitle>
          <CardDescription className="text-guardey-teal">
            Built with modern React patterns and accessibility in mind
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-white/50">
              <h4 className="font-semibold text-guardey-dark mb-2">React + TypeScript</h4>
              <p className="text-sm text-guardey-teal">Type-safe components with modern hooks</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/50">
              <h4 className="font-semibold text-guardey-dark mb-2">Shadcn/ui Sidebar</h4>
              <p className="text-sm text-guardey-teal">Professional sidebar component system</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/50">
              <h4 className="font-semibold text-guardey-dark mb-2">Responsive Design</h4>
              <p className="text-sm text-guardey-teal">Works perfectly on all screen sizes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={() => navigate("/")}
          className="bg-guardey-lime text-guardey-lime-foreground hover:bg-guardey-lime/90"
        >
          Explore Dashboard
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}