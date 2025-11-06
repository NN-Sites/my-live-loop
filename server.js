const puppeteer = require('puppeteer');
const { exec } = require('child_process');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/index.html');

  console.log('Page loaded, starting ffmpeg...');

  const streamKey = 'YOUR_YOUTUBE_STREAM_KEY';
  const cmd = `ffmpeg -f x11grab -s 1920x1080 -i :0.0 -framerate 30 -c:v libx264 -preset veryfast -b:v 3000k -c:a aac -b:a 128k -f flv rtmp://a.rtmp.youtube.com/live2/${streamKey}`;

  const ffmpegProcess = exec(cmd);
  ffmpegProcess.stdout.on('data', data => console.log(data));
  ffmpegProcess.stderr.on('data', data => console.log(data));
})();
