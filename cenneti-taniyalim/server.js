const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Statik dosyaları 'public' klasöründen sun
app.use(express.static(path.join(__dirname, 'public')));

// Yanıtları yerel olarak da yedeklemek için veri dosyası
const DATA_DIR = path.join(__dirname, 'data');
const RESPONSES_FILE = path.join(DATA_DIR, 'responses.json');

function readLocalResponses() {
  try {
    if (!fs.existsSync(RESPONSES_FILE)) return [];
    const raw = fs.readFileSync(RESPONSES_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

function writeLocalResponses(list) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(RESPONSES_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    // Yazma hatası olursa sessizce geç
  }
}

/**
 * Kayıt ekleme / güncelleme (Upsert by sessionId)
 */
app.post('/api/responses', (req, res) => {
  const payload = req.body;
  if (!payload || !payload.sessionId) {
    return res.status(400).json({ error: 'sessionId gerekli' });
  }

  const list = readLocalResponses();
  const idx = list.findIndex((item) => item.sessionId === payload.sessionId);

  if (idx >= 0) {
    list[idx] = { ...list[idx], ...payload, updatedAt: new Date().toISOString() };
  } else {
    list.push({
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...payload
    });
  }

  writeLocalResponses(list);
  return res.status(200).json({ success: true });
});

/**
 * Tüm kayıtları listele
 */
app.get('/api/responses', (req, res) => {
  const list = readLocalResponses();
  res.json(list);
});

/**
 * Belirli bir kaydı sil
 */
app.delete('/api/responses/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const list = readLocalResponses().filter((item) => item.sessionId !== sessionId);
  writeLocalResponses(list);
  res.json({ success: true });
});

/**
 * /admin sayfası yönlendirmesi
 */
app.get(['/admin', '/admin/'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Ana sayfa yönlendirmesi
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✨ "Biraz da Seni Tanıyalım, Prenses" sunucusu hazır!`);
  console.log(`🌸 Ana Sayfa : http://localhost:${PORT}`);
  console.log(`👑 Admin Panel: http://localhost:${PORT}/admin\n`);
});
