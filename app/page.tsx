import { Suspense } from 'react'
import PromptForm from '../components/PromptForm'
import Loading from './loading'

const examples = [
  {
    title: "Code Documentation",
    category: "Coders",
    context: "Generate documentation for a React component that handles user authentication",
    tone: "Professional",
    format: "Paragraph",
    result: "This React component implements a secure authentication system using JWT tokens. It provides user login, registration, and session management functionality. The component uses React hooks for state management and includes error handling for failed authentication attempts."
  },
  {
    title: "Social Media Post",
    category: "Content Creators",
    context: "Create an engaging post about the benefits of AI in healthcare",
    tone: "Friendly",
    format: "List",
    result: "✨ AI in Healthcare: 5 Game-Changing Benefits\n\n1. Faster Diagnosis: AI algorithms can analyze medical images in seconds\n2. Personalized Treatment: Machine learning helps create custom care plans\n3. 24/7 Support: AI chatbots provide instant medical guidance\n4. Drug Discovery: AI accelerates the development of new medications\n5. Remote Monitoring: Smart devices track patient health in real-time"
  },
  {
    title: "Research Summary",
    category: "Researchers",
    context: "Summarize the key findings of a study on climate change impacts",
    tone: "Professional",
    format: "Table",
    result: "| Impact Area | Key Finding | Confidence Level |\n|------------|-------------|-----------------|\n| Temperature | 1.5°C increase by 2030 | High |\n| Sea Level | 0.5m rise by 2100 | Medium |\n| Biodiversity | 30% species at risk | High |\n| Agriculture | 20% yield reduction | Medium |"
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-400 dark:to-purple-400">
            AI Prompt Generator
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Create perfect prompts for any task. Whether you're coding, creating content, or conducting research,
            our AI-powered tool helps you craft the ideal prompt every time.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-900 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-100">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-800 dark:bg-gray-800">
              <div className="text-2xl mb-4">🎯</div>
              <h3 className="font-semibold mb-2 text-gray-100">Choose Category</h3>
              <p className="text-gray-400">Select from Coders, Content Creators, or Researchers</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-800 dark:bg-gray-800">
              <div className="text-2xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2 text-gray-100">Customize</h3>
              <p className="text-gray-400">Set tone, format, and length to match your needs</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-800 dark:bg-gray-800">
              <div className="text-2xl mb-4">✨</div>
              <h3 className="font-semibold mb-2 text-gray-100">Generate</h3>
              <p className="text-gray-400">Get perfectly crafted prompts instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-100">Example Prompts</h2>
          <div className="space-y-8">
            {examples.map((example, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm">
                    {example.category}
                  </span>
                  <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-sm">
                    {example.tone}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">{example.title}</h3>
                <p className="text-gray-400 mb-4">{example.context}</p>
                <div className="bg-gray-900 p-4 rounded">
                  <pre className="whitespace-pre-wrap text-sm text-gray-200">{example.result}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section className="py-16 px-6 bg-gray-900 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">Create Your Prompt</h2>
          <Suspense fallback={<Loading />}>
            <PromptForm />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
