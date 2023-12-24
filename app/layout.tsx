import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ModalProvider } from '@/components/providers/modal-provider'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { SocketProvider } from '@/components/providers/socket-provider'
import { QueryProvider } from '@/components/providers/query-provider'

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
        <head>
          <link rel="shortcut icon" href="/ramiel.webp" type="image/x-icon" />
        </head>
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
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>
                {children}
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
