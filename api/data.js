const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Obtener los exámenes, preguntas y resultados desde Vercel KV
      const exams = await kv.get('appu_exams') || [];
      const questions = await kv.get('appu_questions') || [];
      const results = await kv.get('appu_results') || [];
      
      res.status(200).json({ exams, questions, results });
    } else if (req.method === 'POST') {
      const { key, data } = req.body;
      if (!key || !data) {
        res.status(400).json({ error: 'Faltan parámetros key o data' });
        return;
      }

      // Validar llaves permitidas para evitar escrituras arbitrarias
      const kvKey = `appu_${key}`;
      if (kvKey !== 'appu_exams' && kvKey !== 'appu_questions' && kvKey !== 'appu_results') {
        res.status(400).json({ error: 'Llave de persistencia inválida' });
        return;
      }

      // Guardar en la base de datos Vercel KV (Upstash)
      await kv.set(kvKey, data);
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ error: 'Método no permitido' });
    }
  } catch (error) {
    console.error("Error en Vercel KV API Handler:", error);
    res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
};
