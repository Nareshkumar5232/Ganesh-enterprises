import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-400 mb-6">We couldn’t find the page you’re looking for.</p>
        <Link href="/">
          <a className="px-4 py-2 rounded bg-[#DC2626] text-white font-semibold">Go home</a>
        </Link>
      </div>
    </div>
  );
}
