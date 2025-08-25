import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Eye, 
  EyeOff, 
  Type, 
  Volume2, 
  Settings,
  Palette,
  MousePointer,
  Monitor,
  HelpCircle
} from "lucide-react";

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityPanel = ({ isOpen, onClose }: AccessibilityPanelProps) => {
  const [settings, setSettings] = useState({
    highContrast: false,
    fontSize: 'normal',
    colorScheme: 'default',
    reducedMotion: false,
    largePointer: false,
    screenReader: false
  });

  const fontSizeOptions = [
    { value: 'text-sm', label: 'ছোট (১৪পিএক্স)' },
    { value: 'normal', label: 'স্বাভাবিক (১৬পিএক্স)' },
    { value: 'text-lg', label: 'বড় (১৮পিএক্স)' },
    { value: 'text-xl', label: 'অতিরিক্ত বড় (২০পিএক্স)' },
    { value: 'text-2xl', label: 'XXL (২৪পিএক্স)' }
  ];

  const colorSchemes = [
    { value: 'default', label: 'ডিফল্ট রঙ', bg: 'bg-blue-100' },
    { value: 'warm', label: 'উষ্ণ রঙ', bg: 'bg-orange-100' },
    { value: 'cool', label: 'শীতল রঙ', bg: 'bg-teal-100' },
    { value: 'monochrome', label: 'উচ্চ কনট্রাস্ট B&W', bg: 'bg-gray-100' }
  ];

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Apply settings to document
    const root = document.documentElement;
    
    switch (key) {
      case 'highContrast':
        root.classList.toggle('high-contrast', value);
        break;
      case 'fontSize':
        root.classList.remove('text-sm', 'text-lg', 'text-xl', 'text-2xl');
        if (value !== 'normal') {
          root.classList.add(value);
        }
        break;
      case 'reducedMotion':
        root.style.setProperty('--transition-duration', value ? '0s' : '0.3s');
        break;
      case 'largePointer':
        root.style.cursor = value ? 'pointer' : 'default';
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Settings className="h-6 w-6" />
              অ্যাক্সেসিবিলিটি সেটিংস
            </CardTitle>
            <Button variant="outline" onClick={onClose} className="touch-target">
              ×
            </Button>
          </div>
          <p className="text-base text-muted-foreground">
            আপনার প্রয়োজন এবং পছন্দ অনুযায়ী ইন্টারফেস কাস্টমাইজ করুন
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Vision Settings */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              দৃষ্টি ও ডিসপ্লে
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-base mb-1">উচ্চ কনট্রাস্ট মোড</h4>
                  <p className="text-sm text-muted-foreground">
                    ভাল দৃশ্যমানতার জন্য কনট্রাস্ট বৃদ্ধি করুন
                  </p>
                </div>
                <Button
                  variant={settings.highContrast ? "default" : "outline"}
                  onClick={() => updateSetting('highContrast', !settings.highContrast)}
                  className="touch-target"
                >
                  {settings.highContrast ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                  {settings.highContrast ? 'চালু' : 'বন্ধ'}
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-base mb-3 flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  টেক্সট সাইজ
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {fontSizeOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={settings.fontSize === option.value ? "default" : "outline"}
                      onClick={() => updateSetting('fontSize', option.value)}
                      className="text-left justify-start"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-base mb-3 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  রঙের স্কিম
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {colorSchemes.map((scheme) => (
                    <Button
                      key={scheme.value}
                      variant={settings.colorScheme === scheme.value ? "default" : "outline"}
                      onClick={() => updateSetting('colorScheme', scheme.value)}
                      className="text-left justify-start"
                    >
                      <div className={`w-4 h-4 rounded mr-2 ${scheme.bg}`} />
                      {scheme.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Motor Settings */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MousePointer className="h-5 w-5" />
              মোটর ও নেভিগেশন
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-base mb-1">গতি কমান</h4>
                  <p className="text-sm text-muted-foreground">
                    অ্যানিমেশন এবং ট্রানজিশন কমিয়ে দিন
                  </p>
                </div>
                <Button
                  variant={settings.reducedMotion ? "default" : "outline"}
                  onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                  className="touch-target"
                >
                  {settings.reducedMotion ? 'চালু' : 'বন্ধ'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-base mb-1">বড় মাউস পয়েন্টার</h4>
                  <p className="text-sm text-muted-foreground">
                    কার্সারকে দেখতে সহজ করুন
                  </p>
                </div>
                <Button
                  variant={settings.largePointer ? "default" : "outline"}
                  onClick={() => updateSetting('largePointer', !settings.largePointer)}
                  className="touch-target"
                >
                  {settings.largePointer ? 'চালু' : 'বন্ধ'}
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Screen Reader */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              স্ক্রিন রিডার সাপোর্ট
            </h3>
            
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-base">স্ক্রিন রিডার মোড</h4>
                <Button
                  variant={settings.screenReader ? "default" : "outline"}
                  onClick={() => updateSetting('screenReader', !settings.screenReader)}
                  className="touch-target"
                >
                  {settings.screenReader ? 'চালু' : 'বন্ধ'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                স্ক্রিন রিডিং সফটওয়্যারের জন্য ইন্টারফেস অপ্টিমাইজ করুন
              </p>
              <div className="text-sm bg-white p-3 rounded border">
                <strong>সমর্থিত স্ক্রিন রিডার:</strong>
                <ul className="mt-2 space-y-1">
                  <li>• NVDA (উইন্ডোজ)</li>
                  <li>• JAWS (উইন্ডোজ)</li>
                  <li>• VoiceOver (ম্যাক/আইওএস)</li>
                  <li>• TalkBack (অ্যান্ড্রয়েড)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-medium text-base mb-2 flex items-center gap-2 text-green-800">
              <HelpCircle className="h-4 w-4" />
              সাহায্য প্রয়োজন?
            </h4>
            <p className="text-sm text-green-700 mb-3">
              আমাদের সাপোর্ট টিম এই সেটিংস কনফিগার করতে বা অতিরিক্ত সহায়তা প্রদান করতে সাহায্য করতে পারে।
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                সাপোর্টের সাথে যোগাযোগ করুন
              </Button>
              <Button size="sm" variant="outline">
                টিউটোরিয়াল ভিডিও দেখুন
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={onClose} className="btn-large flex-1">
              সেটিংস প্রয়োগ করুন
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSettings({
                  highContrast: false,
                  fontSize: 'normal',
                  colorScheme: 'default',
                  reducedMotion: false,
                  largePointer: false,
                  screenReader: false
                });
              }}
              className="btn-large"
            >
              ডিফল্টে রিসেট করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityPanel;