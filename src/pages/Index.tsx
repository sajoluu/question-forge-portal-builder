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
              Welcome to the Future
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
              Experience modern design with glassmorphism effects, smooth animations, 
              and cutting-edge UI patterns. Your application is now equipped with the latest trends.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <button className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg shadow-glow hover:shadow-accent-glow transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                Get Started
              </button>
              <button className="glass border border-primary/30 text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-primary/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="glass-card p-8 card-hover">
              <div className="bg-gradient-accent rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Modern Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Glassmorphism effects, gradient backgrounds, and smooth animations create a stunning visual experience.
              </p>
            </div>

            <div className="glass-card p-8 card-hover">
              <div className="bg-gradient-primary rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">High Performance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Optimized CSS animations and modern web technologies ensure smooth performance across all devices.
              </p>
            </div>

            <div className="glass-card p-8 card-hover">
              <div className="bg-gradient-accent rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Customizable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive design system with CSS variables makes customization simple and powerful.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 glass-card p-8 animate-slide-up" style={{animationDelay: '0.8s'}}>
            <h2 className="text-3xl font-bold mb-4 text-gradient">Ready to Build Something Amazing?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Explore the modern components and start creating your next masterpiece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-glow hover:shadow-accent-glow transform hover:scale-105 transition-all duration-300">
                View Components
              </button>
              <button className="glass border border-primary/30 text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary/10 transition-all duration-300">
                Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
