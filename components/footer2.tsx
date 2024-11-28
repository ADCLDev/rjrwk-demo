// components/footer.tsx
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Collections", href: "/collections" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
  ],
}

export function Footer() {
  return (
    <footer className="mt-auto bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link 
                href={item.href} 
                className="text-sm leading-6 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-neutral-500 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} RJR Woven & Knit Wears. All rights reserved.
        </p>
      </div>
    </footer>
  )
}