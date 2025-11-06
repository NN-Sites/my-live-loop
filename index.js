import express from "express";
const app = express();

app.use(express.static('videos')); // טוען את כל הסרטונים בתיקייה videos

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>LIVE 24/7 🔴</title>
        <style>
          body { background:black; color:white; font-family:sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; }
          video { width:80%; border-radius:20px; box-shadow:0 0 30px red; }
          #stopwatch { margin-top:20px; font-size:40px; }
        </style>
      </head>
      <body>
        <h1>🎥 LIVE 24/7</h1>
        <video autoplay muted loop>
          <source src="vid1.mp4" type="video/mp4">
        </video>
        <div id="stopwatch"></div>
        <script>
          const startDate = new Date("2025-11-04T00:00:00").getTime();
          const stopwatchEl = document.getElementById('stopwatch');
          setInterval(() => {
            const now = new Date().getTime();
            const diff = now - startDate;
            let totalSeconds = Math.floor(diff / 1000);
            const days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            const hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            stopwatchEl.innerText = \`\${days}d \${hours}h \${minutes}m \${seconds}s\`;
          }, 1000);
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("Server running on port 3000"));
