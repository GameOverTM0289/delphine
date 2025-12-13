import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="font-display text-3xl tracking-tight mb-8 block">
            Delphine
          </Link>
          {children}
        </div>
      </div>
      
      {/* Right - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-ocean-500 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200)' }}
        />
        <div className="absolute inset-0 bg-ocean-900/40" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h2 className="heading-2 mb-4">Welcome to Delphine</h2>
            <p className="text-white/80 max-w-sm">
              Mediterranean-inspired swimwear crafted for elegance and comfort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
