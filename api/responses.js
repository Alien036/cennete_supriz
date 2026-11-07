// Vercel Serverless Function (Firebase Firestore'a ek olarak 404 hatalarını önler)
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET') {
    return res.status(200).json([]);
  }
  return res.status(200).json({ success: true });
};
