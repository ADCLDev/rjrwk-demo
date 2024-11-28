import Link from "next/link";

// components/ui/footer.tsx
export function Footer() {
    return (
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <p className="text-sm">Your trusted partner in garment sourcing and manufacturing.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: info@example.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Address: 123 Business Street</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {/* Add social media icons/links here */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }