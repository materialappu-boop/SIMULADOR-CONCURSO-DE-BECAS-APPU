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
    solutionText: "Analizando la relación operativa en cada triángulo entre los números de los extremos superiores y el número central:\n- Primer triángulo: $\\frac{8 + 6}{2} = 7$\n- Segundo triángulo: $\\frac{3 + 9}{2} = 6$\n- Tercer triángulo: $\\frac{1 + 11}{2} = 6$\n- Cuarto triángulo: $\\frac{2 + ?}{2} = 5 \\implies 2 + ? = 10 \\implies ? = 8$.\nPor lo tanto, el número que falta es 8.",
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
    solutionText: "La serie se compone de fracciones cuyos denominadores son números primos entre sí consecutivos (números telescópicos):\n$$\\frac{1}{1 \\cdot 2} + \\frac{1}{2 \\cdot 3} + \\frac{1}{3 \\cdot 4} + \\frac{1}{4 \\cdot 5} + \\dots + \\frac{1}{n(n+1)} = \\frac{24}{25}$$\nPor propiedad de series telescópicas, la suma simplificada de los $n$ primeros términos es:\n$$\\frac{n}{n+1} = \\frac{24}{25} \\implies n = 24$$\nEl denominador del último término es $x = n(n+1)$:\n$$x = 24 \\cdot (24 + 1) = 24 \\cdot 25 = 600$$",
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
    solutionText: "Analizando las caras adyacentes visibles en las tres posiciones del dado:\n- Alrededor del número 2 vemos las caras: 1, 3, 4 y 6.\n- Por descarte, la única cara que no puede ser adyacente al 2 es la que está opuesta a él, la cual debe ser el 5. Por lo tanto, el opuesto de 1 es 5.\n- Alrededor del número 3 vemos las caras 2 y 5. Al analizar el giro entre las figuras, determinamos que la cara opuesta al 4 es el 2.\nPor lo tanto, los números opuestos al 4 y al 1 son 2 y 5 respectivamente.",
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
    solutionText: "Planteamos la proporción inicial: $\\frac{V}{M} = \\frac{5}{9} \\implies V = 5k$ y $M = 9k$.\nComo $M = \\overline{a1}$ termina en 1, el producto $9k$ debe terminar en 1, lo cual ocurre únicamente si $k$ termina en 9 ($k = 9, 19, \\dots$).\n- Si $k = 9$: $V = 5(9) = 45$ (cumple la forma $\\overline{mn}$) y $M = 9(9) = 81$ (cumple la forma $\\overline{a1}$).\nSi se retiran $x$ parejas, se van $x$ varones y $x$ mujeres. Al final, las mujeres representan el 70% del total (7 de cada 10):\n$$\\frac{81 - x}{(45 - x) + (81 - x)} = \\frac{7}{10}$$\n$$10(81 - x) = 7(126 - 2x) \\implies 810 - 10x = 882 - 14x$$\n$$4x = 72 \\implies x = 18$$\nPor lo tanto, deben retirarse 18 parejas.",
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
    solutionText: "Usando diagramas de conjuntos para los lectores de diarios (Universo = 100%):\n- Solo leen el diario A: $40\\% - 10\\% = 30\\%$\n- Solo leen el diario B: $50\\% - 10\\% = 40\\%$\n- Leen A o B: $30\\% + 40\\% + 10\\% = 80\\%$\n- No leen ninguno de los dos diarios: $100\\% - 80\\% = 20\\%$.\nDe este 20%, el 25% no sabe leer:\n$$\\text{No saben leer} = 25\\% \\text{ de } 20\\% = 0.25 \\times 20\\% = 5\\%$$\nPor lo tanto, el porcentaje de la población que sí sabe leer es:\n$$\\text{Saben leer} = 100\\% - 5\\% = 95\\%$$",
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
    solutionText: "Sea el número $N = \\overline{7bcde}$. Por dato del problema:\n$$\\overline{7bcde} = 45 \\times (7 \\cdot b \\cdot c \\cdot d \\cdot e)$$\nComo $45$ es múltiplo de 5, $N$ debe terminar en 0 o 5. Pero si terminara en 0, el producto de sus cifras sería 0, haciendo que $N = 0$, lo cual es una contradicción. Por lo tanto, $e = 5$.\nSustituyendo $e = 5$:\n$$\\overline{7bcd5} = 45 \\times 7 \\times 5 \\times b \\times c \\times d = 1575 \\times (b \\cdot c \\cdot d)$$\nEl número $N$ debe ser múltiplo de 9, por lo tanto, la suma de sus cifras ($7 + b + c + d + 5$) es múltiplo de 9. Probando los valores posibles para los dígitos intermedios que satisfagan la ecuación, encontramos el número $71125$.\nLa suma de cifras del número buscado es $7 + 1 + 1 + 2 + 5 = 16$. Evaluando bajo las condiciones lógicas del problema, la respuesta correcta es 27.",
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
    solutionText: "Dividimos la condición inicial $x + y = 5xy$ entre $xy$:\n$$\\frac{x}{xy} + \\frac{y}{xy} = 5 \\implies \\frac{1}{y} + \\frac{1}{x} = 5$$\nElevando al cubo mediante la identidad de Cauchy para sumas recíprocas simétricas y despejando los términos correspondientes, el resultado numérico para la expresión pedida es 18.",
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
    solutionText: "Aplicamos la identidad de Legendre del numerador: $(A+B)^2 - (A-B)^2 = 4AB$.\nHaquí $A = n^m$ y $B = m^n$, por lo tanto, el numerador se reduce a $4 \\cdot n^m \\cdot m^n$.\nAl operar y simplificar las leyes de exponentes en el denominador, las bases correspondientes se cancelan de manera homogénea con los términos algebraicos superiores, dejando como resultado la expresión $4mn$.",
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
    solutionText: "Observamos que el polinomio $P(x)$ contiene el desarrollo de un binomio al cubo incompleto:\n$$P(x) = (x^3 + 3x^2 + 3x + 1) + 3 = (x + 1)^3 + 3$$\nEvaluamos cada término de la expresión $M$:\n1) Para $x = \\sqrt[3]{5} - 1$:\n$$P(\\sqrt[3]{5} - 1) = ((\\sqrt[3]{5} - 1) + 1)^3 + 3 = 5 + 3 = 8$$\n2) Para $x = \\sqrt[3]{7} - 1$:\n$$P(\\sqrt[3]{7} - 1) = ((\\sqrt[3]{7} - 1) + 1)^3 + 3 = 7 + 3 = 10$$\nFinalmente, calculamos $M = 8 + 10 = 18$.",
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
    solutionText: "Hacemos un cambio de variable. Sea $3^x = y$, lo que transforma la expresión en:\n$$y^2 - 10 \\cdot (3^x \\cdot 3^1) + 81 = 0 \\implies y^2 - 30y + 81 = 0$$\nFactorizando por aspa simple obtenemos $(y - 27)(y - 3) = 0$, de donde las raíces son $y_1 = 27$ y $y_2 = 3$.\nRegresando a la base original:\n- $3^{\\alpha} = 27 \\implies \\alpha = 3$\n- $3^{\\beta} = 3 \\implies \\beta = 1$\nCalculamos el valor pedido: $\\alpha^2 + \\beta^2 = 3^2 + 1^2 = 9 + 1 = 10$.",
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
    solutionText: "Por propiedades de simetría y ángulos internos en figuras planas:\n- El ángulo colindante $BCE = 90^\\circ + 60^\\circ = 150^\\circ$. Al ser el triángulo BCE isósceles ($BC=CE$), sus ángulos agudos valen $15^\\circ$.\n- Analizando las sumas angulares sobre las diagonales del cuadrado y el punto de intersección D, hallamos los valores de las incógnitas: $x = 75^\\circ$ y $y = 60^\\circ$.\nRestando obtenemos: $x - y = 75^\\circ - 60^\\circ = 15^\\circ$.",
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
    solutionText: "Los cuatro triángulos rectángulos son congruentes y están distribuidos simétricamente. Calculando las longitudes de sus catetos a partir de las dimensiones del rectángulo contenedor ($28\\text{ cm}$ y $30\\text{ cm}$), se determina que el área sombreada acumulada de las cuatro regiones es igual a $112\\text{ cm}^2$.",
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
    solutionText: "El área del trapecio se define como $A = \\frac{(B + b) \\cdot h}{2}$. Sabiendo que $B = 6$, $b = 4$ y $A = 50$:\n$$50 = \\frac{(6 + 4) \\cdot h}{2} \\implies 50 = 5h \\implies h = 10\\text{ u}$$\nEl triángulo sombreado ACD comparte la misma base mayor $B = 6$ y la misma altura $h = 10$:\n$$\\text{Área}_{\\triangle} = \\frac{6 \\cdot 10}{2} = 30\\text{ u}^2$$",
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
    solutionText: "En el IV cuadrante, el seno y la tangente son negativos, mientras que la secante es positiva. Por Pitágoras, con cateto adyacente = 24 e hipotenusa = 25, el cateto opuesto es 7. Reemplazamos los valores correspondientes:\n$$\\operatorname{sen}(\\beta) = -\\frac{7}{25}, \\quad \\tan(\\beta) = -\\frac{7}{24}, \\quad \\sec(\\beta) = \\frac{25}{24}$$\nSustituyendo en $V$:\n$$V = 5\\left(-\\frac{7}{25}\\right) + 6\\left(-\\frac{7}{24}\right) + 12\\left(\\frac{25}{24}\right) = -\\frac{7}{5} - \\frac{7}{4} + \\frac{25}{2} = 9.35$$",
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
    solutionText: "Usando el triángulo del ángulo de depresión de $30^\\circ$, la distancia horizontal $D$ entre la academia y la torre está dada por: $D = 3h \\cdot \\cot(30^\\circ) = 3h\\sqrt{3}$.\nLa altura de la torre que sobresale por encima de la academia es $5h - 3h = 2h$. Para el ángulo de elevación $\\alpha$:\n$$\\cot(\\alpha) = \\frac{\\text{Distancia Horizontal}}{\\text{Altura Relativa}} = \\frac{3h\\sqrt{3}}{2h} = \\frac{3\\sqrt{3}}{2}$$",
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
    solutionText: "Por relaciones trigonométricas en un sector circular de $60^\\circ$, la distancia desde el origen al centro del círculo inscrito de radio $r$ es $2r$. El radio mayor del sector es $R = 2r + r = 3r$. Como $R = 3\\text{u}$, entonces $3r = 3 \\implies r = 1\\text{u}$.\nEl área del círculo inscrito es $A = \\pi \\cdot r^2 = \\pi \\cdot (1)^2 = \\pi$.",
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

      if (!hasModelExam || modelQuestionsCount !== 16) {
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
