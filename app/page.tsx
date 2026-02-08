'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const screens = [
  {
    id: 1,
    type: 'greeting',
    title: 'Hey Cutiepie',
    subtitle: "Can we talk, There's something important I want to tell you.",
    gif: "/annoyed.gif",
  },
  {
    id: 2,
    type: 'cute-cat-screen',
    message: "I know I hurt you... and I've been feeling bad about it.",
    gif: "/cute.gif",
  },
  {
    id: 3,
    type: 'swipe-messages',
    title: 'Little things I want to tell you...',
    subtitle: 'Tap each one',
    messages: [
      { text: "I messed up...🥺 and I done Anger On You." },
      { text: "I'm Really Sorry For That 🥺" },
      { text: "Please forgive me... I Really Love You..🐼" },
    ],
  },
  {
    id: 4,
    type: 'my-message-button',
    title: 'Ready to hear it all?',
  },
];

const HeartIcon = ({ color = 'text-red-400', className = "w-6 h-6" }) => (
  <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeIndex, setSwipeIndex] = useState(0);
  const [messageCardVisible, setMessageCardVisible] = useState(false);
  
  // Music Reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleNext = () => {
    // Play music on first interaction (required by browsers)
    if (audioRef.current && currentScreen === 0) {
      audioRef.current.play().catch(e => console.log("Audio play blocked until further interaction"));
    }

    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
      setSwipeIndex(0);
      setMessageCardVisible(false);
      setIsAnimating(false);
    }, 500);
  };

  const screen = screens[currentScreen];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-yellow-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* BACKGROUND MUSIC PLAYER */}
      <audio 
        ref={audioRef}
        src="/Samjhawan_-_Humpty_Sharma_Ki_Dulhania_Varun_Dhawan_and_Alia_Bhatt_-_Arijit_Singh_Shreya_Ghoshal_48KBPS.mp4" 
        loop 
      />

      {/* PERSISTENT HIGH-DENSITY HEART RAIN */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-floating-hearts text-red-400 select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-15%`,
              fontSize: `${Math.random() * (2.5 - 0.5) + 0.5}rem`,
              opacity: Math.random() * (0.6 - 0.1) + 0.1,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${3 + Math.random() * 6}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className={isAnimating ? 'animate-slide-out-bottom' : 'animate-slide-in-bottom'}>
          
          {/* Screens 1 & 2 */}
          {(screen.type === 'greeting' || screen.type === 'cute-cat-screen') && (
            <div className="glass-morphism rounded-3xl p-8 space-y-6 shadow-2xl bg-white/50 backdrop-blur-md border border-white/20">
              <div className="flex justify-center items-center">
                <img src={screen.gif} alt="Emoji" className="w-48 h-auto rounded-2xl" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-serif text-gray-700 italic font-bold leading-tight">
                  {screen.title || screen.message}
                </h1>
                {screen.subtitle && <p className="text-gray-500 text-sm mt-2">{screen.subtitle}</p>}
              </div>
              <button onClick={handleNext} className="w-full bg-pink-300 py-3 rounded-full font-bold text-gray-700 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform">
                {screen.type === 'greeting' ? 'Continue' : 'Next'} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Screen 3: Swipe Messages */}
          {screen.type === 'swipe-messages' && (
            <div className="glass-morphism rounded-3xl p-8 space-y-6 shadow-2xl bg-white/50">
              <h1 className="text-2xl font-serif text-center italic text-gray-700 font-bold">{screen.title}</h1>
              <div className="space-y-4">
                {screen.messages.map((msg, idx) => {
                  const isRevealed = swipeIndex > idx;
                  return (
                    <div key={idx} className="relative h-16 rounded-3xl overflow-hidden bg-pink-50 border border-pink-200">
                      <div className="absolute inset-0 flex items-center justify-center px-6 text-gray-600 text-sm font-medium text-center">{msg.text}</div>
                      <div
                        onClick={() => !isRevealed && setSwipeIndex(idx + 1)}
                        className={`absolute inset-0 bg-pink-100 flex items-center justify-center transition-transform duration-700 cursor-pointer z-10 ${isRevealed ? '-translate-x-full' : ''}`}
                      >
                        <HeartIcon className="w-8 h-8 text-pink-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={handleNext} className="w-full bg-pink-300 py-3 rounded-full font-bold text-gray-700 shadow-md">Next</button>
            </div>
          )}

          {/* Screen 4: The Letter Button with New GIF */}
          {screen.type === 'my-message-button' && (
            <div className="flex flex-col items-center">
               {!messageCardVisible ? (
                  <div className="glass-morphism rounded-3xl p-8 space-y-4 flex flex-col items-center justify-center min-h-[450px] w-full bg-white/50 shadow-2xl">
                    
                    {/* NEW GIF ABOVE OPEN LETTER BUTTON */}
                    <img src="/gatito-llorando.gif" alt="Crying Cat" className="w-40 h-auto mb-4 rounded-xl" />
                    
                    {/* OPEN LETTER BUTTON */}
                    <button 
                      onClick={() => setMessageCardVisible(true)} 
                      className="bg-pink-50 border-2 border-pink-200 px-14 py-4 rounded-3xl text-pink-500 font-black hover:bg-pink-100 transition-all shadow-md active:scale-90"
                    >
                      OPEN LETTER
                    </button>
                  </div>
               ) : (
                  <div className="glass-morphism rounded-3xl p-8 space-y-6 w-full shadow-2xl animate-scale-in-bounce bg-white/70">
                    <h1 className="text-4xl font-serif text-gray-700 italic text-center font-bold">I'm Sorry</h1>
                    <div className="bg-white/80 rounded-3xl p-6 shadow-inner border border-pink-100">
                      <p className="text-gray-600 text-center text-sm leading-relaxed font-medium">
                      For hurting you and making you feel upset 😔 I'm truly sorry umiii 🥺 I never wanted to be the reason behind your tears 🥺 or your silence. You matter to me more than I always manage to show, 💞 and I hate that I let you down. 🧿 I promise to grow,🤞🏼to listen, and to be better for you every single day.🫂 Thank you for staying, for caring, and for being you. I'm really trying... and I hope you can forgive me. 🥺 N I'm doing from now I'm try to improve myself umi 🥺 🫂. N I'm not going to do Anga I know that I always hurt you 🥺 but trust me 🤞🏼I love you a lot umiii 🐯🐼🫂♾️❤️🧿
                      </p>
                    </div>
                    <button onClick={handleNext} className="w-full bg-pink-300 py-4 rounded-full font-black text-gray-700 shadow-lg active:scale-95">
                      I FORGIVE YOU
                    </button>
                  </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}