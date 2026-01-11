'use client'

interface SectionContentProps {
  sectionId: string
}

const sectionContent: Record<string, { title: string; content: string; note?: string }> = {
  'dev-projects': {
    title: 'DEV PROJECTS',
    content: 'Software, engineering, and technical projects I\'ve worked on. Showcasing my expertise in full-stack development, system architecture, and innovative solutions.',
  },
  'bio': {
    title: 'BIO',
    content: 'Personal background and professional summary. Learn about my journey as a senior technologist, creative professional, and entrepreneur.',
  },
  'my-company': {
    title: 'MY COMPANY',
    content: 'Information about Spark Integrity Ventures, LLC. Our mission, values, and the work we do.',
  },
  'music': {
    title: 'MUSIC',
    content: 'Band work, solo projects, and audio creations. Explore my musical journey and creative output.',
  },
  'narration': {
    title: 'NARRATION',
    content: 'Audiobook narration samples and credits. Professional voice work and storytelling.',
  },
  'aviation': {
    title: 'AVIATION',
    content: 'Aviation-related experience and interests. My passion for flight and aerospace.',
  },
  'portfolio': {
    title: 'PORTFOLIO',
    content: 'Curated highlights and best work across all disciplines. A comprehensive showcase of my professional and creative achievements.',
  },
  'community-service': {
    title: 'COMMUNITY SERVICE',
    content: 'Volunteer work, civic engagement, nonprofit contributions, and board memberships. Giving back to the community.',
  },
  'tools': {
    title: 'TOOLS',
    content: 'Web tools I\'ve created for practical use. Utilities and applications built to solve real problems.',
  },
  'contact': {
    title: 'CONTACT',
    content: 'For sales and consultation inquiries, please reach out. I\'m available for professional opportunities and collaborations.',
    note: 'for sales / consultation',
  },
}

export default function SectionContent({ sectionId }: SectionContentProps) {
  const section = sectionContent[sectionId]

  if (!section) return null

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        {section.title}
      </h2>
      {section.note && (
        <p className="text-sm text-gray-500 italic mb-6">{section.note}</p>
      )}
      <div className="prose prose-sm max-w-none text-gray-700">
        <p>{section.content}</p>
      </div>
      {/* Additional content can be added here per section */}
    </div>
  )
}
