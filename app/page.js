import Hero from '@/components/Hero'
import Hero2 from '@/components/Hero2'
import LinkToPages from '@/components/LinkToPages'
import TransitionEffect from '@/components/TransitionEffect'

export default function HomeRout() {
  return (
    <main className="">
      <TransitionEffect/>
      <Hero />
      <Hero2 />
      <LinkToPages />
    </main>
  )
}
