import { StoreProvider } from '@/context/Store'
import '../styles/globals.css'
import { Montserrat } from 'next/font/google'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata = {
  title: 'Otaku: Discover your favorite anime',
  description: 'Explore a world of captivating anime series tailored to your preferences. With Anime Finder, effortlessly discover the best anime based on your chosen genre, age rating, and more. Start your immersive journey into the world of anime today!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${montserrat.className} m-auto bg-dark w-[100vw] min-h-screen text-light`}>
        <StoreProvider>
          <div>
            <NavBar />
            {children}
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html >
  )
}
