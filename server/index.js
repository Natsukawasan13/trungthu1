const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = path.join(__dirname, 'data');
const uploadDir = path.join(__dirname, 'uploads');

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(uploadDir, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '2mb' }));

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, callback) => {
    const extension = file.mimetype === 'video/webm'
      ? '.webm'
      : path.extname(file.originalname) || '.bin';
    callback(null, `${crypto.randomUUID()}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024
  }
});

function appendLog(filename, data) {
  const filePath = path.join(dataDir, filename);

  fs.appendFileSync(
    filePath,
    `${JSON.stringify(data)}\n`,
    'utf8'
  );
}

const healthHandler = (req, res) => {
  res.json({
    ok: true,
    service: 'trungthu1-api'
  });
};

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

app.post('/api/events', (req, res) => {
  appendLog('events.ndjson', {
    id: crypto.randomUUID(),
    ...req.body,
    ip: req.ip,
    createdAt: new Date().toISOString()
  });

  res.json({ ok: true });
});

app.post('/api/messages', (req, res) => {
  appendLog('messages.ndjson', {
    id: crypto.randomUUID(),
    ...req.body,
    ip: req.ip,
    createdAt: new Date().toISOString()
  });

  res.json({ ok: true });
});

app.post('/api/recordings', upload.single('video'), (req, res) => {
  appendLog('recordings.ndjson', {
    id: crypto.randomUUID(),
    sessionId: req.body.sessionId,
    filename: req.file?.filename,
    originalName: req.file?.originalname,
    size: req.file?.size,
    mimeType: req.file?.mimetype,
    createdAt: new Date().toISOString()
  });

  res.json({
    ok: true,
    filename: req.file?.filename
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      ok: false,
      error: 'File quá lớn'
    });
  }

  res.status(500).json({
    ok: false,
    error: 'Server error'
  });
});

app.listen(PORT, () => {
  console.log(`API đang chạy tại http://localhost:${PORT}`);
});