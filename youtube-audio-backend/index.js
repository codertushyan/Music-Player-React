const express = require('express');
const ytdl = require('@distube/ytdl-core');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/api/youtube-audio/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, {
      quality: 'highestaudio',
      filter: 'audioonly'
    });

    res.json({ audioUrl: format.url });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch audio URL');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

module.eports = app;
