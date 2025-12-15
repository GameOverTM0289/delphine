import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-cream py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-display text-2xl tracking-tight">
              Delphine
            </Link>
            <p className="mt-4 text-sm text-black/60 leading-relaxed">
              Mediterranean-inspired swimwear crafted for elegance and comfort.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium text-sm tracking-wide mb-4">Shop</h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-sm text-black/60 hover:text-black">All Products</Link></li>
              <li><Link href="/collections/bikinis" className="text-sm text-black/60 hover:text-black">Bikinis</Link></li>
              <li><Link href="/collections/one-pieces" className="text-sm text-black/60 hover:text-black">One Pieces</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-medium text-sm tracking-wide mb-4">Help</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm text-black/60 hover:text-black">Contact</Link></li>
              <li><Link href="/shipping" className="text-sm text-black/60 hover:text-black">Shipping</Link></li>
              <li><Link href="/returns" className="text-sm text-black/60 hover:text-black">Returns</Link></li>
              <li><Link href="/size-guide" className="text-sm text-black/60 hover:text-black">Size Guide</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-sm tracking-wide mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-sm text-black/60 hover:text-black">Terms</Link></li>
              <li><Link href="/privacy" className="text-sm text-black/60 hover:text-black">Privacy</Link></li>
              <li><Link href="/cookies" className="text-sm text-black/60 hover:text-black">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-black/60">
            © {new Date().getFullYear()} Delphine. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black/60 hover:text-black">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
