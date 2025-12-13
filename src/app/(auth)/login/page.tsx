'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="heading-3 mb-2">Sign In</h1>
      <p className="body text-stone-500 mb-8">Welcome back</p>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-elegant"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="label block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-elegant"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center body-sm text-stone-500 mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-charcoal-700 underline">
          Create one
        </Link>
      </p>

      <div className="mt-8 p-4 bg-ivory-200 text-sm">
        <p className="font-medium mb-2">Demo Accounts:</p>
        <p className="body-sm text-stone-500">Admin: admin@delphine.com / admin123</p>
        <p className="body-sm text-stone-500">User: test@example.com / test123</p>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
