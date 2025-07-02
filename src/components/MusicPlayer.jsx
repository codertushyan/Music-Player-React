import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PlayFill, PauseFill } from 'react-bootstrap-icons';
import { FaFastForward, FaFastBackward } from "react-icons/fa";
import '../MusicPlayer.css';

const MusicPlayer = ({
  search,
  setSearch,
  videoList,
  setVideoList,
  videoIndex,
  setVideoIndex,
  handleSearch
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  const currentVideo = videoList[videoIndex];

  const getAudioURL = async (videoId) => {
    const response = await axios.get(`http://localhost:4000/api/youtube-audio/${videoId}`);
    return response.data.audioUrl;
  };

  const playVideo = async () => {
    if (!currentVideo) return;

    if (!audio) {
      const url = await getAudioURL(currentVideo.videoId);
      const newAudio = new Audio(url);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);

      newAudio.ontimeupdate = () => {
        setProgress((newAudio.currentTime / newAudio.duration) * 100);
      };

      newAudio.onended = () => {
        setIsPlaying(false);
        setProgress(0);
        if (videoIndex < videoList.length - 1) setVideoIndex(videoIndex + 1);
      };
    } else {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    audio.currentTime = percentage * audio.duration;
    setProgress(percentage * 100);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="music-player-bg">
      <Container fluid className="glass-player py-5">
        <Row className="justify-content-center">
          {/* Player Section */}
          <Col lg={5} md={8} sm={12} className="playlist-side px-4">
            {currentVideo && (
              <>
                <img src={currentVideo.thumbnail} alt="cover" className="music-image mb-3" />
                <h4 className="text-white text-center">{currentVideo.title}</h4>
                <p className="text-light text-center">{currentVideo.channel}</p>

                <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                  <Button variant="outline-light" className="bg-transparent border-0" onClick={() => {
                    if (videoIndex > 0) {
                      audio?.pause();
                      setAudio(null);
                      setVideoIndex(videoIndex - 1);
                      setIsPlaying(false);
                      setProgress(0);
                    }
                  }}><FaFastBackward /></Button>

                  <Button variant="outline-light" className="bg-transparent border-0 rounded-circle" onClick={playVideo}>
                    {isPlaying ? <PauseFill size={32} /> : <PlayFill size={32} />}
                  </Button>

                  <Button variant="outline-light" className="bg-transparent border-0" onClick={() => {
                    if (videoIndex < videoList.length - 1) {
                      audio?.pause();
                      setAudio(null);
                      setVideoIndex(videoIndex + 1);
                      setIsPlaying(false);
                      setProgress(0);
                    }
                  }}><FaFastForward /></Button>
                </div>

                <div className="d-flex justify-content-between text-light small mb-1">
                  <span>{audio ? formatTime(audio.currentTime) : '0:00'}</span>
                  <span>{audio ? formatTime(audio.duration) : '0:00'}</span>
                </div>

                <div
                  className="progress-wrapper"
                  onClick={handleSeek}
                  onMouseDown={() => setDragging(true)}
                  onMouseUp={() => setDragging(false)}
                  onMouseMove={(e) => dragging && handleSeek(e)}
                >
                  <div className="progress-bar-custom">
                    <div className="progress-filled" style={{ width: `${progress}%` }}>
                      <div className="progress-knob" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </Col>

          {/* Playlist Section */}
          <Col lg={5} md={8} sm={12} className="playlist-side px-4">
            <h5 className="text-light text-start mb-3">Playlist</h5>
            {videoList.map((video, idx) => (
              <div
                key={video.videoId}
                onClick={() => {
                  if (idx !== videoIndex) {
                    audio?.pause();
                    setAudio(null);
                    setVideoIndex(idx);
                    setIsPlaying(false);
                    setProgress(0);
                  }
                }}
                className={`d-flex gap-3 align-items-center p-2 rounded mb-2 shadow-sm playlist-item ${
                  idx === videoIndex ? 'bg-opacity-75 bg-light text-dark' : 'bg-dark text-light'
                }`}
                style={{
                  cursor: 'pointer',
                  border: idx === videoIndex ? '2px solid #ccc' : '1px solid #444',
                  transition: 'background 0.3s ease',
                }}
              >
                <img src={video.thumbnail} alt={video.title} style={{ width: '60px', height: 'auto', borderRadius: '8px' }} />
                <div style={{ flex: 1, whiteSpace: 'normal', wordWrap: 'break-word' }}>
                  <strong style={{ fontSize: '14px' }}>{video.title}</strong><br />
                  <span style={{ fontSize: '12px' }}>{video.channel}</span>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MusicPlayer;
