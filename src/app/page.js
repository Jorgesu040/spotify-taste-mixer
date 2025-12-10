'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';
import SpotifyBtnLogin from '@/components/SpotifyBtnLogin';
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import CursorBlob from "@/components/CursorBlob"
import TextSpanWrapper from '@/components/TextSpanWrapper';
import { AudioLines } from '@/components/animate-ui/icons/audio-lines';

const images = [
  '/img/spotify_cd_12.png',
  '/img/spotify_boombox_13.png',
  '/img/spotify_radio_14.png',
  '/img/spotify_turntable_15.png',
  '/img/spotify_waveform_16.png',
  '/img/spotify_equalizer_17.png',
  '/img/spotify_shuffle_19.png',
  '/img/spotify_stage_21.png',
  '/img/spotify_wave_1.png',
  '/img/spotify_vinyl_2.png',
  '/img/spotify_abstract_3.png',
  '/img/spotify_concert_5.png',
  '/img/spotify_guitar_6.png',
  '/img/spotify_piano_7.png',
  '/img/spotify_drums_8.png',
  '/img/spotify_mic_9.png',
  '/img/spotify_speaker_10.png',
  '/img/spotify_cassette_11.png',
  '/img/spotify_cd_12.png',
  '/img/spotify_boombox_13.png',
  '/img/spotify_radio_14.png',
  '/img/spotify_wave_1.png',
  '/img/spotify_vinyl_2.png',
  '/img/spotify_abstract_3.png',
  '/img/spotify_concert_5.png',
  '/img/spotify_guitar_6.png',
  '/img/spotify_piano_7.png',
  '/img/spotify_drums_8.png',
  '/img/spotify_mic_9.png',
  '/img/spotify_speaker_10.png',
  '/img/spotify_cassette_11.png',
  '/img/spotify_turntable_15.png',
  '/img/spotify_waveform_16.png',
  '/img/spotify_equalizer_17.png',
  '/img/spotify_shuffle_19.png',
  '/img/spotify_stage_21.png',
]

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


