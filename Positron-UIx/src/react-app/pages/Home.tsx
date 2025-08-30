import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@/positron';
import { Play, Download, Code, Palette, Zap, ArrowRight, Github, ExternalLink } from 'lucide-react';

export default function Home() {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const buttonVariants = [
    { variant: 'solid' as const, color: 'primary' as const, label: 'Primary Solid' },
    { variant: 'solid' as const, color: 'secondary' as const, label: 'Secondary Solid' },
    { variant: 'solid' as const, color: 'accent' as const, label: 'Accent Solid' },
    { variant: 'outline' as const, color: 'primary' as const, label: 'Primary Outline' },
    { variant: 'outline' as const, color: 'secondary' as const, label: 'Secondary Outline' },
    { variant: 'ghost' as const, color: 'primary' as const, label: 'Primary Ghost' },
  ];

  const sizes = [
    { size: 'sm' as const, label: 'Small' },
    { size: 'md' as const, label: 'Medium' },
    { size: 'lg' as const, label: 'Large' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50">
      {/* Header */}
      <header className="neo-brutal-card m-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-yellow-400 brutal-border rounded flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-mono text-neutral-900">POSITRON-UI</h1>
              <p className="text-sm font-mono text-neutral-600">Neo-Brutalism Component Library</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" color="neutral" size="sm" leftIcon={<Github className="w-4 h-4" />}>
              GitHub
            </Button>
            <Link to="/docs">
              <Button variant="solid" color="primary" size="sm" leftIcon={<ExternalLink className="w-4 h-4" />}>
                Docs
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="neo-brutal-card m-4 p-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black font-mono text-neutral-900 mb-4">
            BRUTAL.
            <br />
            <span className="text-pink-500">BEAUTIFUL.</span>
            <br />
            <span className="text-yellow-500">BOLD.</span>
          </h2>
          <p className="text-lg md:text-xl font-mono text-neutral-700 mb-8 max-w-2xl mx-auto">
            A React component library inspired by Neo-Brutalism design. 
            Chunky borders, bold colors, and unapologetic typography.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/playground">
              <Button 
                variant="solid" 
                color="primary" 
                size="lg" 
                leftIcon={<Play className="w-5 h-5" />}
              >
                Playground
              </Button>
            </Link>
            <Link to="/docs">
              <Button 
                variant="outline" 
                color="neutral" 
                size="lg" 
                leftIcon={<Download className="w-5 h-5" />}
              >
                Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="m-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="neo-brutal-card p-6">
          <div className="w-12 h-12 bg-sky-500 brutal-border rounded flex items-center justify-center mb-4">
            <Code className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black font-mono text-neutral-900 mb-2">TypeScript First</h3>
          <p className="font-mono text-neutral-600">
            Built with TypeScript for excellent DX and type safety out of the box.
          </p>
        </div>
        
        <div className="neo-brutal-card p-6">
          <div className="w-12 h-12 bg-pink-500 brutal-border rounded flex items-center justify-center mb-4">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black font-mono text-neutral-900 mb-2">Themeable</h3>
          <p className="font-mono text-neutral-600">
            Customize colors, typography, and spacing through positron.config.ts.
          </p>
        </div>
        
        <div className="neo-brutal-card p-6">
          <div className="w-12 h-12 bg-yellow-500 brutal-border rounded flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-xl font-black font-mono text-neutral-900 mb-2">Tree Shakable</h3>
          <p className="font-mono text-neutral-600">
            Import only what you need. Optimized for minimal bundle size.
          </p>
        </div>
      </section>

      {/* Button Showcase */}
      <section className="neo-brutal-card m-4 p-8">
        <h3 className="text-2xl font-black font-mono text-neutral-900 mb-6">Button Component Showcase</h3>
        
        {/* Variants */}
        <div className="mb-8">
          <h4 className="text-lg font-bold font-mono text-neutral-800 mb-4">Variants & Colors</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {buttonVariants.map((btn, index) => (
              <Button
                key={index}
                variant={btn.variant}
                color={btn.color}
                onClick={() => setActiveButton(btn.label)}
                className={activeButton === btn.label ? 'ring-2 ring-black ring-offset-2' : ''}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-8">
          <h4 className="text-lg font-bold font-mono text-neutral-800 mb-4">Sizes</h4>
          <div className="flex flex-wrap gap-4">
            {sizes.map((size, index) => (
              <Button
                key={index}
                variant="solid"
                color="primary"
                size={size.size}
              >
                {size.label}
              </Button>
            ))}
          </div>
        </div>

        {/* With Icons */}
        <div className="mb-8">
          <h4 className="text-lg font-bold font-mono text-neutral-800 mb-4">With Icons</h4>
          <div className="flex flex-wrap gap-4">
            <Button variant="solid" color="success" leftIcon={<Play className="w-4 h-4" />}>
              Play
            </Button>
            <Button variant="solid" color="warning" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Continue
            </Button>
            <Button variant="outline" color="error" leftIcon={<Download className="w-4 h-4" />} rightIcon={<ExternalLink className="w-4 h-4" />}>
              Download
            </Button>
          </div>
        </div>

        {/* Loading States */}
        <div>
          <h4 className="text-lg font-bold font-mono text-neutral-800 mb-4">Loading States</h4>
          <div className="flex flex-wrap gap-4">
            <Button variant="solid" color="primary" isLoading>
              Loading...
            </Button>
            <Button variant="outline" color="secondary" isLoading>
              Processing
            </Button>
            <Button variant="ghost" color="accent" isLoading>
              Saving
            </Button>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="neo-brutal-card m-4 p-8">
        <h3 className="text-2xl font-black font-mono text-neutral-900 mb-6">Usage Example</h3>
        <div className="bg-neutral-900 brutal-border rounded p-6 font-mono text-sm overflow-x-auto">
          <pre className="text-green-400">
{`import { Button } from '@positron-ui/react';
import { Play } from 'lucide-react';

export function App() {
  return (
    <Button
      variant="solid"
      color="primary"
      size="lg"
      leftIcon={<Play />}
      onClick={() => console.log('Clicked!')}
    >
      Get Started
    </Button>
  );
}`}
          </pre>
        </div>
      </section>

      {/* Footer */}
      <footer className="neo-brutal-card m-4 p-6 text-center">
        <p className="font-mono text-neutral-600">
          Built with React + TypeScript + Tailwind CSS + Framer Motion
        </p>
        <p className="font-mono text-sm text-neutral-500 mt-2">
          © 2025 Positron-UI. Made with ❤️ and 💪.
        </p>
      </footer>
    </div>
  );
}
