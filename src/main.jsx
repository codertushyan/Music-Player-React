import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import Navbar from './navigate.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Root() {
  const [search, setSearch] = React.useState('');
  const [videoList, setVideoList] = React.useState([]);
  const [videoIndex, setVideoIndex] = React.useState(0);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 5,
          q: query,
          key: 'AIzaSyDB9Nfcw5Ky1MAEZ8eSfb1fyFFKgBBEEcs',
          type: 'video',
        },
      });
      const videos = response.data.items.map(item => ({
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoId: item.id.videoId,
      }));
      setVideoList(videos);
      setVideoIndex(0);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
    }
  };

  return (
    <BrowserRouter>
      <Navbar search={search} setSearch={setSearch} handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<App search={search} setSearch={setSearch} videoList={videoList} setVideoList={setVideoList} videoIndex={videoIndex} setVideoIndex={setVideoIndex} handleSearch={handleSearch} />} />
        <Route path="/home" element={<App search={search} setSearch={setSearch} videoList={videoList} setVideoList={setVideoList} videoIndex={videoIndex} setVideoIndex={setVideoIndex} handleSearch={handleSearch} />} />
        <Route path="/link" element={<App search={search} setSearch={setSearch} videoList={videoList} setVideoList={setVideoList} videoIndex={videoIndex} setVideoIndex={setVideoIndex} handleSearch={handleSearch} />} />
        <Route path="/action3" element={<App search={search} setSearch={setSearch} videoList={videoList} setVideoList={setVideoList} videoIndex={videoIndex} setVideoIndex={setVideoIndex} handleSearch={handleSearch} />} />
        <Route path="/action4" element={<App search={search} setSearch={setSearch} videoList={videoList} setVideoList={setVideoList} videoIndex={videoIndex} setVideoIndex={setVideoIndex} handleSearch={handleSearch} />} />
        <Route path="/action5" element={<App search={search} setSearch={setSearch} videoList={videoList} setVideoList={setVideoList} videoIndex={videoIndex} setVideoIndex={setVideoIndex} handleSearch={handleSearch} />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<Root />)
