const { kv } = require('@vercel/kv');

const modelExamId = "exam-modelo-becas";

const modelExam = {
  id: modelExamId,
  name: "Examen Modelo – Concurso de Becas APPU",
  description: "Examen de entrenamiento de Habilidad Matemática",
  createdAt: "2026-06-11T11:00:00.000Z"
};

const modelQuestions = [
  {
    id: "q-model-1",
    examId: modelExamId,
    text: "¿Qué número falta en la siguiente secuencia?\n\n[Figura 1: Distribución numérica en triángulos de la secuencia]",
    options: {
      A: "2",
      B: "6",
      C: "8",
      D: "10",
      E: "9"
    },
    correctOption: "C",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 1,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-2",
    examId: modelExamId,
    text: "Hallar \"x\" si:\n$$\\frac{1}{2} + \\frac{1}{6} + \\frac{1}{12} + \\frac{1}{20} + \\dots + \\frac{1}{x} = \\frac{24}{25}$$",
    options: {
      A: "480",
      B: "520",
      C: "552",
      D: "600",
      E: "650"
    },
    correctOption: "D",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 2,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-3",
    examId: modelExamId,
    text: "Se ha construido un dado especial. En el gráfico se observan sus tres posiciones.\n\n[Figura 2: Tres vistas del dado especial]\n\n¿Qué número se opone al 4 y cuál al 1, respectivamente?",
    options: {
      A: "3 y 5",
      B: "2 y 5",
      C: "6 y 3",
      D: "2 y 4",
      E: "5 y 2"
    },
    correctOption: "B",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 3,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-4",
    examId: modelExamId,
    text: "En una reunión se observan $\\overline{mn}$ varones y $\\overline{a1}$ mujeres, donde el número de varones es al número de mujeres como 5 es a 9. ¿Cuántas parejas deben retirarse para que al final por cada 10 personas, 7 sean mujeres?",
    options: {
      A: "15",
      B: "12",
      C: "6",
      D: "9",
      E: "18"
    },
    correctOption: "E",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 4,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-5",
    examId: modelExamId,
    text: "En la población limeña se observó que el 40% lee el diario A, el 50% lee el diario B y el 10% lee ambos. De los que no leen ningún diario de los mencionados, el 25% no lo hace porque no sabe leer. Calcule qué tanto por ciento de la población representan las personas que saben leer.",
    options: {
      A: "85%",
      B: "70%",
      C: "96%",
      D: "90%",
      E: "95%"
    },
    correctOption: "E",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 5,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-6",
    examId: modelExamId,
    text: "De la suma de las cifras del número comprendido entre 70000 y 80000 que sea igual a 45 veces el producto de sus cifras.",
    options: {
      A: "9",
      B: "18",
      C: "27",
      D: "36",
      E: "45"
    },
    correctOption: "C",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 6,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-7",
    examId: modelExamId,
    text: "Si $x + y = 5xy$, calcule el valor de:\n$$\\left(\\frac{x}{y}\\right)^3 + \\left(\\frac{y}{x}\\right)^3$$",
    options: {
      A: "15",
      B: "21",
      C: "18",
      D: "25",
      E: "24"
    },
    correctOption: "C",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 7,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-8",
    examId: modelExamId,
    text: "Reduzca la siguiente expresión:\n$$\\frac{(n^m + m^n)^2 - (n^m - m^n)^2}{m^5 \\cdot n^{-5} \\cdot m^{2n-5}}$$",
    options: {
      A: "4nm",
      B: "4mn",
      C: "nm",
      D: "mn",
      E: "1"
    },
    correctOption: "B",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 8,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-9",
    examId: modelExamId,
    text: "Sea $P(x) = x^3 + 3x^2 + 3x + 4$, calcule el valor numérico de la expresión:\n$$M = P(\\sqrt[3]{5}-1) + P(\\sqrt[3]{7}-1)$$",
    options: {
      A: "18",
      B: "12",
      C: "21",
      D: "16",
      E: "24"
    },
    correctOption: "A",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 9,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-10",
    examId: modelExamId,
    text: "Dada la expresión matemática: $P(x) = 9^x - 10 \\cdot 3^{x+1} + 81$. Si existen $\\alpha$ y $\\beta$ números reales tales que $P(\\alpha) = P(\\beta) = 0$, determine el valor de $\\alpha^2 + \\beta^2$.",
    options: {
      A: "36",
      B: "9",
      C: "10",
      D: "13",
      E: "26"
    },
    correctOption: "C",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 10,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-11",
    examId: modelExamId,
    text: "En la figura mostrada, ABCD es un cuadrado y CDE es un triángulo equilátero. Halle $x - y$.\n\n[Figura 3: Cuadrado ABCD con triángulo equilátero adyacente CDE]",
    options: {
      A: "15°",
      B: "12°",
      C: "10°",
      D: "5°",
      E: "20°"
    },
    correctOption: "A",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 11,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-12",
    examId: modelExamId,
    text: "¿Cuál es el área de la región sombreada formada por los cuatro triángulos rectángulos iguales que se muestran en la figura?\n\n[Figura 4: Cuadrado de dimensiones 28cm x 30cm con cuatro triángulos rectángulos]",
    options: {
      A: "112 cm²",
      B: "56 cm²",
      C: "180 cm²",
      D: "90 cm²",
      E: "64 cm²"
    },
    correctOption: "A",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 12,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-13",
    examId: modelExamId,
    text: "Si el área del trapecio ABCD es $50\\text{u}^2$, halla el área de la región triangular ACD.\n\n[Figura 5: Trapecio ABCD con base menor 4U y base mayor 6U]",
    options: {
      A: "30 U²",
      B: "40 U²",
      C: "50 U²",
      D: "60 U²",
      E: "48 U²"
    },
    correctOption: "A",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 13,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-14",
    examId: modelExamId,
    text: "Si $\\beta$ es un ángulo del cuarto cuadrante y $\\cos(\\beta) = \\frac{24}{25}$, determine el valor de:\n$$V = 5\\operatorname{sen}(\\beta) + 6\\tan(\\beta) + 12\\sec(\\beta)$$",
    options: {
      A: "12,85",
      B: "12,15",
      C: "10,35",
      D: "9,35",
      E: "11,56"
    },
    correctOption: "D",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 14,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-15",
    examId: modelExamId,
    text: "Desde el último piso de la academia APPU de altura $3h$ se observa la parte superior de una torre de altura $5h$ con un ángulo de elevación $\\alpha$ y la parte baja de esa torre con un ángulo de depresión de $30^\\circ$. Calcule $\\cot(\\alpha)$.",
    options: {
      A: "3\\sqrt{3}/2",
      B: "\\sqrt{3}/3",
      C: "\\sqrt{3}/2",
      D: "2\\sqrt{3}/9",
      E: "\\sqrt{3}"
    },
    correctOption: "A",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 15,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  },
  {
    id: "q-model-16",
    examId: modelExamId,
    text: "Calcule el área de la región sombreada, si $OA = OB = 3\\text{u}$ y el ángulo central es de $60^\\circ$.\n\n[Figura 6: Sector circular con círculo inscrito tangencial]",
    options: {
      A: "4",
      B: "\\pi",
      C: "6",
      D: "2",
      E: "0.5"
    },
    correctOption: "B",
    solutionText: "",
    imageType: "none",
    imageUrl: "",
    solutionImageType: "none",
    solutionImageUrl: "",
    order: 16,
    createdAt: "2026-06-11T11:00:00.000Z",
    updatedAt: "2026-06-11T11:00:00.000Z"
  }
];

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
      let exams = await kv.get('appu_exams') || [];
      let questions = await kv.get('appu_questions') || [];
      const results = await kv.get('appu_results') || [];
      
      // Auto-seeding o auto-actualización del Examen Modelo
      const hasModelExam = exams.some(ex => ex.id === modelExamId);
      const modelQuestionsCount = questions.filter(q => q.examId === modelExamId).length;

      if (!hasModelExam) {
        // 1. Agregar el examen si falta
        if (!hasModelExam) {
          exams.push(modelExam);
        } else {
          // Si el examen existe pero las preguntas no coinciden, nos aseguramos que el metadata esté bien
          exams = exams.map(ex => ex.id === modelExamId ? modelExam : ex);
        }
        await kv.set('appu_exams', exams);

        // 2. Limpiar y semillar preguntas del examen modelo
        const otherQuestions = questions.filter(q => q.examId !== modelExamId);
        questions = [...otherQuestions, ...modelQuestions];
        await kv.set('appu_questions', questions);
      }

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
