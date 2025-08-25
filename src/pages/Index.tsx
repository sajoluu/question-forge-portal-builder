// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-accent/15 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-primary/8 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="glass-card p-12 mb-8 animate-slide-up">
            <div className="bg-gradient-primary p-6 rounded-2xl w-24 h-24 mx-auto mb-8 flex items-center justify-center animate-glow shadow-glow">
              <span className="text-4xl">🚀</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient animate-slide-up">
              ভবিষ্যতে স্বাগতম
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
              গ্লাসমরফিজম ইফেক্ট, মসৃণ অ্যানিমেশন এবং অত্যাধুনিক UI প্যাটার্ন সহ আধুনিক ডিজাইনের অভিজ্ঞতা নিন। 
              আপনার অ্যাপ্লিকেশন এখন সর্বশেষ ট্রেন্ড দিয়ে সজ্জিত।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <button className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg shadow-glow hover:shadow-accent-glow transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                শুরু করুন
              </button>
              <button className="glass border border-primary/30 text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-primary/10 transition-all duration-300">
                আরও জানুন
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="glass-card p-8 card-hover">
              <div className="bg-gradient-accent rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">আধুনিক ডিজাইন</h3>
              <p className="text-muted-foreground leading-relaxed">
                গ্লাসমরফিজম ইফেক্ট, গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড এবং মসৃণ অ্যানিমেশন একটি দুর্দান্ত ভিজ্যুয়াল অভিজ্ঞতা তৈরি করে।
              </p>
            </div>

            <div className="glass-card p-8 card-hover">
              <div className="bg-gradient-primary rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">উচ্চ কার্যক্ষমতা</h3>
              <p className="text-muted-foreground leading-relaxed">
                অপ্টিমাইজড CSS অ্যানিমেশন এবং আধুনিক ওয়েব প্রযুক্তি সব ডিভাইসে মসৃণ কার্যক্ষমতা নিশ্চিত করে।
              </p>
            </div>

            <div className="glass-card p-8 card-hover">
              <div className="bg-gradient-accent rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">কাস্টমাইজযোগ্য</h3>
              <p className="text-muted-foreground leading-relaxed">
                CSS ভেরিয়েবল সহ সম্পূর্ণ ডিজাইন সিস্টেম কাস্টমাইজেশনকে সহজ এবং শক্তিশালী করে তোলে।
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 glass-card p-8 animate-slide-up" style={{animationDelay: '0.8s'}}>
            <h2 className="text-3xl font-bold mb-4 text-gradient">কিছু অসাধারণ তৈরি করার জন্য প্রস্তুত?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              আধুনিক কম্পোনেন্টগুলি অন্বেষণ করুন এবং আপনার পরবর্তী মাস্টারপিস তৈরি শুরু করুন।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-glow hover:shadow-accent-glow transform hover:scale-105 transition-all duration-300">
                কম্পোনেন্ট দেখুন
              </button>
              <button className="glass border border-primary/30 text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary/10 transition-all duration-300">
                ডকুমেন্টেশন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
