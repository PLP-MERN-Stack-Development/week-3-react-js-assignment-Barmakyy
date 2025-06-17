import * as React from "react"
import { Github, Twitter, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-muted-foreground">
              A modern React application showcasing task management and API integration
              with a beautiful UI built using Tailwind CSS.Built by @Barmakyy PLP FEB 2025 COHORT.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Tasks
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Posts
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Barmakyy"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/barmakyy"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/yahya-mohammed-6a3555366"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Barmakyy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 