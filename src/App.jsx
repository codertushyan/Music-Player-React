import React, { useState } from 'react';
import MusicPlayer from './components/MusicPlayer';
import axios from 'axios';

function App({ search, setSearch, videoList, setVideoList, videoIndex, setVideoIndex, handleSearch }) {
  // All state and handleSearch are now managed in main.jsx/root and passed as props
  return <MusicPlayer 
    search={search}
    setSearch={setSearch}
    videoList={videoList}
    setVideoList={setVideoList}
    videoIndex={videoIndex}
    setVideoIndex={setVideoIndex}
    handleSearch={handleSearch}
  />;
}

export default App;
