'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';
import SpotifyBtnLogin from '@/components/SpotifyBtnLogin';
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import CursorBlob  from "@/components/CursorBlob"
import TextSpanWrapper from '@/components/TextSpanWrapper';
import { AudioLines } from '@/components/animate-ui/icons/audio-lines';

const images = [
  "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  "https://assets.aceternity.com/animated-modal.png",
  "https://assets.aceternity.com/animated-testimonials.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  "https://assets.aceternity.com/github-globe.png",
  "https://assets.aceternity.com/glare-card.png",
  "https://assets.aceternity.com/layout-grid.png",
  "https://assets.aceternity.com/flip-text.png",
  "https://assets.aceternity.com/hero-highlight.png",
  "https://assets.aceternity.com/carousel.webp",
  "https://assets.aceternity.com/placeholders-and-vanish-input.png",
  "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  "https://assets.aceternity.com/signup-form.png",
  "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
  "https://assets.aceternity.com/spotlight-new.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
  "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
  "https://assets.aceternity.com/tabs.png",
  "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
  "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
  "https://assets.aceternity.com/glowing-effect.webp",
  "https://assets.aceternity.com/hover-border-gradient.png",
  "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
  "https://assets.aceternity.com/macbook-scroll.png",
  "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
  "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  "https://assets.aceternity.com/multi-step-loader.png",
  "https://assets.aceternity.com/vortex.png",
  "https://assets.aceternity.com/wobble-card.png",
  "https://assets.aceternity.com/world-map.webp",
];

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div className="bg-gray-800 flex items-center flex-col justify-center min-h-screen relative">
      <ThreeDMarquee
        images={images}
        className="absolute z-0 inset-0 h-full w-full "
        offset={200}
      />
      <div className="pointer-events-none absolute inset-0 z-10 min-h-screen bg-black/80 dark:bg-black/30" />
      <CursorBlob
        className="z-20 m-8 shadow-[inset_-5px_-10px_30px_-10px_rgba(128,128,128,0.5)] backdrop-blur-md rounded-lg flex items-center flex-col justify-center bg-accent/50"
      >
        <div className="relative py-8 p-4 sm:p-8 md:p-16 lg:p-24 z-20 text-center flex items-center flex-col justify-center">
          <AudioLines animate size={64} />
          <TextSpanWrapper className='mt-4 mb-1'>Spotify Taste Mixer</TextSpanWrapper>
          <p className="text-gray text-lg text-balance mb-8 text-center">
            Mezcla tu música favorita con artistas inesperados
          </p>
          <SpotifyBtnLogin onClick={handleLogin}>
            Inicia sesion con Spotify
          </SpotifyBtnLogin>
        </div>
      </CursorBlob> 
    </div>
  );
}


/*
shadow-[inset_0_-20px_30px_-10px_rgba(0,0,0,0.5)]
              │    │   │     │     │
              │    │   │     │     └── color
              │    │   │     └── spread (negative = smaller)
              │    │   └── blur
              │    └── Y offset (negative = bottom)
              └── X offset


*/


