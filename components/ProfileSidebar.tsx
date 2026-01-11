'use client'

import Image from 'next/image'

const socialLinks = [
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
  { name: 'GitHub', url: 'https://github.com', icon: '💻' },
  { name: 'SoundCloud', url: 'https://soundcloud.com', icon: '🎵' },
  { name: 'Spotify', url: 'https://spotify.com', icon: '🎶' },
]

export default function ProfileSidebar() {
  return (
    <aside className="flex flex-col p-6 border-l border-gray-200 bg-white" style={{ width: '30%', minHeight: 'calc(100vh - 60px)' }}>
      {/* Profile Photo */}
      <div className="mb-6">
        <div className="w-full aspect-[4/3] bg-gray-100 border border-gray-300 relative overflow-hidden">
          <Image
            src="/profile-photo.jpg"
            alt="Dustin Washburn"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              aspect-square border border-gray-300 
              flex flex-col items-center justify-center
              hover:bg-gray-50 hover:border-gray-400 transition-all
              text-xs font-medium text-gray-700
              group
            "
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">{link.icon}</span>
            <span className="text-[10px] tracking-wide">{link.name}</span>
          </a>
        ))}
      </div>
    </aside>
  )
}
