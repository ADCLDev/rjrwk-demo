// components/ui/header.tsx
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          RJR Woven & Knit Wears
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/products" className="hover:text-primary">Products</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}