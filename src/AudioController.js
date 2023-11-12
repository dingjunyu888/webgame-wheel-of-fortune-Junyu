import React, { useState, useEffect, useRef } from 'react';
import muteIcon from './assets/mute-icon.png'; 
import unmuteIcon from './assets/unmute-icon.png';

const AudioController = ({ audioFile }) => {

    const [isMuted, setIsMuted] = useState(true); // Start muted to comply with autoplay policies
    const audioRef = useRef(new Audio(audioFile));
    
    // Play music once the user interacts
    const playMusic = () => {
        // Check if the audio is already playing
        if (audioRef.current.paused) {
            // Attempt to play and catch any errors
            audioRef.current.play().then(() => {
            console.log('Audio started playing');
            }).catch((error) => {
            console.error('Error occurred while trying to play audio:', error);
            // Handle the error here. For example, you might want to display an alert to the user.
            });
        } else {
            // If audio is playing, pause it
            audioRef.current.pause();
        }
        setIsMuted(!isMuted);
    };


    return (
        <button onClick={playMusic} className="mute-button">
        <img src={isMuted ? unmuteIcon : muteIcon} alt="Mute/Unmute" />
        </button>
    );
};

export default AudioController;