import { AnimatedText } from "@/components/ui/animated-text"
import { ShaderAnimation } from "@/components/ui/shader-animation"

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          {/* "ID taxi" animated logo */}
          <AnimatedText
            text="ID taxi"
            className="items-start"
            textClassName="text-2xl font-bold tracking-tight text-white"
            underlineHeight="h-[2px]"
            underlineOffset="-bottom-1"
            underlineGradient="from-blue-400 via-indigo-500 to-purple-500"
          />
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Shader */}
        <div className="absolute inset-0 z-0">
          <ShaderAnimation />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50">
              Une autre idée
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50">
              du transport en taxi
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Experience premium mobility with our next-generation service.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Add CTA buttons here later */}
            <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
              Book a Ride
            </button>
            <button className="px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Optional overlay to darken shader for better text contrast if needed */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />
      </main>
    </div>
  )
}

export default App
