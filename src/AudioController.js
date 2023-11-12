import React, { useState, useEffect, useRef } from 'react';
import muteIcon from './assets/mute-icon.png'; 
import unmuteIcon from './assets/unmute-icon.png';

const AudioController = ({ audioFile }) => {

    const [isMuted, setIsMuted] = useState(true); // Start muted to comply with autoplay policies
    const audioRef = useRef(null);
    
    useEffect(() => {
        // Create new audio object with the file
        const audio = new Audio(audioFile);
        audio.loop = true;
        audio.volume = 0.5;
        audio.muted = isMuted;
        audio.autoplay = true;
        audioRef.current = audio;
    
        // Attempt to play the audio
        audio.play().catch((error) => {
          console.error('Autoplay was prevented:', error);
        });
        
        // Cleanup function to pause the audio when component unmounts
        return () => {
          audio.pause();
        };
      }, [audioFile, isMuted]);
    
      const toggleMute = () => {
        if (audioRef.current) {
          audioRef.current.muted = !isMuted;
          setIsMuted(!isMuted);
    
          // If unmuting, make sure the audio plays
          if (isMuted) {
            audioRef.current.play().catch((error) => {
              console.error('Error occurred while trying to play audio:', error);
            });
          }
        }
      };
    
      return (
        <button onClick={toggleMute} className="mute-button">
          <img src={isMuted ? unmuteIcon : muteIcon} alt="Mute/Unmute" />
        </button>
      );
    };
    
    export default AudioController;
    