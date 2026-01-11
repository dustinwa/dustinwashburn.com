'use client'

// Piano key mapping as specified:
// C = Dev Projects (white)
// C# (black) = Bio
// D = My Company (white)
// D# (black) = Music
// E = Narration (white)
// F = Aviation (white)
// F# (black) = Portfolio
// G = Community Service (white)
// G# (black) = Tools
// A = Contact (white)

const whiteKeys = [
  { id: 'dev-projects', label: 'DEV PROJECTS', note: 'C' },
  { id: 'my-company', label: 'MY COMPANY', note: 'D' },
  { id: 'narration', label: 'NARRATION', note: 'E' },
  { id: 'aviation', label: 'AVIATION', note: 'F' },
  { id: 'community-service', label: 'COMMUNITY SERVICE', note: 'G' },
  { id: 'contact', label: 'CONTACT', note: 'A' },
]

const blackKeys = [
  { id: 'bio', label: 'BIO', note: 'C#', whiteKeyIndex: 0 }, // Between C (0) and D (1)
  { id: 'music', label: 'MUSIC', note: 'D#', whiteKeyIndex: 1 }, // Between D (1) and E (2)
  { id: 'portfolio', label: 'PORTFOLIO', note: 'F#', whiteKeyIndex: 3 }, // Between F (3) and G (4)
  { id: 'tools', label: 'TOOLS', note: 'G#', whiteKeyIndex: 4 }, // Between G (4) and A (5)
]

export default function PianoKeys() {

  // White keys should be equal width and touch each other
  const whiteKeyWidthPercent = 100 / whiteKeys.length
  // Black keys are about 60% the width of white keys
  const blackKeyWidthPercent = whiteKeyWidthPercent * 0.6

  return (
    <div className="flex-1 flex overflow-hidden relative" style={{ width: '70%' }}>
      <div className="relative w-full h-[calc(100vh-60px)] bg-gray-200">
        {/* White Keys Layer - Full height, touching each other */}
        <div className="absolute inset-0 flex">
          {whiteKeys.map((key, index) => {
            return (
              <div
                key={key.id}
                className="relative flex-shrink-0 h-full"
                style={{ width: `${whiteKeyWidthPercent}%` }}
              >
                <a
                  href="#"
                  className="
                    w-full h-full
                    transition-all duration-150
                    relative
                    cursor-pointer
                    piano-key-white
                    block
                  "
                  style={{ 
                    marginRight: index < whiteKeys.length - 1 ? '-1px' : '0' // Overlap borders slightly
                  }}
                >
                  <span 
                    className="text-2xl font-semibold tracking-widest uppercase text-black z-20 absolute pointer-events-none"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      bottom: '5rem',
                      left: '50%',
                      transform: 'translateX(-50%) rotate(180deg)',
                    }}
                  >
                    {key.label}
                  </span>
                </a>
              </div>
            )
          })}
        </div>

        {/* Black Keys Layer - Shorter, positioned above white keys */}
        <div className="absolute inset-0 pointer-events-none">
          {blackKeys.map((key) => {
            // Black key is positioned between two white keys
            // It overlaps the boundary between white keys
            // Position it at the right edge of whiteKeyIndex, centered in the gap
            const whiteKeyRightEdge = (key.whiteKeyIndex + 1) * whiteKeyWidthPercent
            const blackKeyLeft = whiteKeyRightEdge - (blackKeyWidthPercent / 2)
            
            return (
              <div
                key={key.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${blackKeyLeft}%`,
                  width: `${blackKeyWidthPercent}%`,
                  height: '62%',
                  zIndex: 25,
                }}
              >
                <a
                  href="#"
                  className="
                    piano-key-black w-full h-full
                    flex items-center justify-center
                    transition-all duration-150
                    block
                  "
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                  <span className="text-2xl font-semibold tracking-widest uppercase transform rotate-180 text-white z-20 relative pointer-events-none">
                    {key.label}
                  </span>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
