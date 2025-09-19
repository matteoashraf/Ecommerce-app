import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-8">Could not find the requested resource</p>
      <Link 
        href="/"
        className="bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-600 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}