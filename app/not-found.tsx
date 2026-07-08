import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-white dark:bg-[#000000]">
      <p className="text-[13px] font-semibold text-[#86868b] uppercase tracking-widest mb-4">404</p>
      <h1 className="text-[36px] sm:text-[48px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight text-center mb-4">
        Page Not Found
      </h1>
      <p className="text-[17px] text-[#6e6e73] dark:text-[#86868b] text-center max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full text-[15px] font-semibold bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] hover:opacity-80 transition-opacity"
      >
        Back to Newsroom
      </Link>
    </div>
  )
}
