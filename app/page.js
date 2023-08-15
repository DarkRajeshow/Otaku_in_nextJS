import Image from 'next/image'
import Home from '@/components/Home'
import Hero from '@/components/Hero'

export default function HomeRout() {
  return (
    <main className="">
      <Hero />
      <Home />
    </main>
  )
}
