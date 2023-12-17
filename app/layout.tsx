import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eden',
  description: 'EDEN: Explore an exciting virtual space where conversation comes to life. Connect with friends and discover a new way to communicate online. EDEN, your destination for enriching community chat experiences.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body 
        className={cn(
          font.className,
          "bg-white dark:bg-[#313338]",
          )}>
           <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey='discord-theme'
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
