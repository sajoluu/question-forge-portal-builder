// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-guardey-dark to-guardey-teal">
      <div className="text-center max-w-2xl mx-auto p-8">
        <div className="bg-guardey-lime p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl">🎯</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-guardey-dark-foreground">
          Welcome to Your Application
        </h1>
        <p className="text-xl text-guardey-dark-foreground/80 mb-8">
          Your application is now styled with Guardey's professional cybersecurity color palette. 
          Start building your amazing project with these beautiful, secure-looking colors!
        </p>
        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-guardey-lime/30">
            <h3 className="text-lg font-semibold text-guardey-dark-foreground mb-2">
              🎨 Guardey Colors Applied
            </h3>
            <p className="text-guardey-dark-foreground/70">
              Dark teal backgrounds, bright lime accents, and professional gradients throughout your app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
