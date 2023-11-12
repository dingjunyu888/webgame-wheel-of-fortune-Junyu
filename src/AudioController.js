import React, { useState, useEffect, useRef } from 'react';
import muteIcon from './assets/mute-icon.png';
import unmuteIcon from './assets/unmute-icon.png';
import winSound from './assets/winSound.mp3';
import loseSound from './assets/loseSound.mp3';

const AudioController = ({ audioFile, playWinSound, playLoseSound }) => {
  const [isMuted, setIsMuted] = useState(true);
  const bgmAudioRef = useRef(new Audio(audioFile));
  const winAudioRef = useRef(new Audio(winSound));
  const loseAudioRef = useRef(new Audio(loseSound)); // Corrected variable name here

  useEffect(() => {
    // Set up the background music audio
    const bgmAudio = bgmAudioRef.current;
    bgmAudio.loop = true;
    bgmAudio.volume = 0.5;
    bgmAudio.muted = isMuted;
    bgmAudio.autoplay = true;

    // Attempt to play the background music
    bgmAudio.play().catch((error) => {
      console.error('Autoplay of background music was prevented:', error);
    });

    // Set up the victory and lose sound audio
    winAudioRef.current.muted = isMuted;
    loseAudioRef.current.muted = isMuted; // Use the correct reference here

    // Cleanup function to pause the audio when component unmounts
    return () => {
      bgmAudio.pause();
      winAudioRef.current.pause();
      loseAudioRef.current.pause(); // Corrected method call here
    };
  }, [audioFile, isMuted]);

  useEffect(() => {
    // Play the victory or lose sound based on the props
    if (playWinSound) {
      bgmAudioRef.current.pause();
      winAudioRef.current.play().catch((error) => {
        console.error('Playback of victory sound was prevented:', error);
      });
    } else if (playLoseSound) {
      bgmAudioRef.current.pause();
      loseAudioRef.current.play().catch((error) => {
        console.error('Playback of lose sound was prevented:', error);
      });
    }
  }, [playWinSound, playLoseSound]);

  const toggleMute = () => {
    const isNowMuted = !isMuted;
    setIsMuted(isNowMuted);
    bgmAudioRef.current.muted = isNowMuted;
    winAudioRef.current.muted = isNowMuted;
    loseAudioRef.current.muted = isNowMuted;
  };

  return (
    <button onClick={toggleMute} className="mute-button">
      <img src={isMuted ? unmuteIcon : muteIcon} alt="Mute/Unmute" />
    </button>
  );
};

export default AudioController;