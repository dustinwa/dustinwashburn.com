import Header from '@/components/Header'
import PianoKeys from '@/components/PianoKeys'
import ProfileSidebar from '@/components/ProfileSidebar'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="flex h-[calc(100vh-60px)]">
        <PianoKeys />
        <ProfileSidebar />
      </div>
    </main>
  )
}
