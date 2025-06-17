import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "../../lib/utils"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Barmakyy
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/about">About</MobileNavLink>
            <MobileNavLink to="/services">Services</MobileNavLink>
            <MobileNavLink to="/contact">Contact</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

const NavLink = ({ to, children, className }) => (
  <Link
    to={to}
    className={cn(
      "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white",
      className
    )}
  >
    {children}
  </Link>
)

const MobileNavLink = ({ to, children, className }) => (
  <Link
    to={to}
    className={cn(
      "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white",
      className
    )}
  >
    {children}
  </Link>
)

export default Navbar 