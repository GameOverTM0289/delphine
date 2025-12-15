import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/utils';

const instagramPosts = [
  { id: 1, image: '/images/instagram/ig-1.jpg', likes: 234, comments: 12 },
  { id: 2, image: '/images/instagram/ig-2.jpg', likes: 456, comments: 23 },
  { id: 3, image: '/images/instagram/ig-3.jpg', likes: 789, comments: 34 },
  { id: 4, image: '/images/instagram/ig-4.jpg', likes: 321, comments: 15 },
  { id: 5, image: '/images/instagram/ig-5.jpg', likes: 567, comments: 28 },
  { id: 6, image: '/images/instagram/ig-6.jpg', likes: 432, comments: 19 },
];

export default function InstagramFeed() {
  return (
    <section className="section-sm bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-ocean-600 text-sm uppercase tracking-widest mb-2 block">
            @delphineswimwear
          </span>
          <h2 className="heading-3 mb-4">Follow Us on Instagram</h2>
          <p className="text-gray-600">
            Join our community and share your Delphine moments
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {instagramPosts.map((post, index) => (
            <Link
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Image
                src={getImageUrl(post.image)}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white text-sm">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 6h-2V4c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4-2v2H7V4h10zm4 16H3V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h10v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/>
                    </svg>
                    {post.comments}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-8">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow @delphineswimwear
          </Link>
        </div>
      </div>
    </section>
  );
}
