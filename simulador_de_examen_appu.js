"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = typeof __firebase_config !== 'undefined'
    ? JSON.parse(__firebase_config)
    : {
        apiKey: "AIzaSyDummyKeyForAppuLocalDevOnly",
        authDomain: "dummy-appu.firebaseapp.com",
        projectId: "dummy-appu",
        storageBucket: "dummy-appu.appspot.com",
        messagingSenderId: "1234567890",
        appId: "1:1234567890:web:abcdef"
    };
const app = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
const db = (0, firestore_1.getFirestore)(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'appu-becas-2026';
// --- DATOS POR DEFECTO PARA EL MODO OFFLINE / FALLBACK ---
const defaultExams = [
    {
        id: "exam-1",
        name: "Simulacro Básico (1° y 2° de Secundaria)",
        description: "Evaluación de Aritmética, Álgebra Escolar y Razonamiento Matemático Básico."
    },
    {
        id: "exam-2",
        name: "Simulacro Intermedio (3° de Secundaria)",
        description: "Evaluación de Álgebra Intermedia, Geometría y Fundamentos de Química y Biología."
    },
    {
        id: "exam-3",
        name: "Simulacro Avanzado Pre-Universitario (4° y 5° de Secundaria)",
        description: "Desafío de alto rendimiento en Trigonometría, Física Aplicada y Química Orgánica."
    }
];
const defaultQuestions = [
    // EXAM 1: Básico
    {
        id: "q-1-1",
        examId: "exam-1",
        text: "Si al triple de un número se le resta $15$, se obtiene el doble del mismo número aumentado en $8$. ¿Cuál es el número?",
        options: {
            A: "23",
            B: "15",
            C: "7",
            D: "30",
            E: "18"
        },
        correctOption: "A",
        solutionText: "Planteamos la ecuación según el enunciado:\\nSea $x$ el número buscado.\\n$3x - 15 = 2x + 8$\\nRestamos $2x$ a ambos lados:\\n$x - 15 = 8$\\nSumamos $15$ a ambos lados:\\n$x = 23$\\n\\nPor lo tanto, el número es $23$.",
        imageType: "none",
        imageUrl: "",
        solutionImageType: "none",
        solutionImageUrl: "",
        order: 1
    },
    {
        id: "q-1-2",
        examId: "exam-1",
        text: "Simplifique la siguiente expresión fraccionaria:\\n$$E = \\\\frac{2}{3} + \\\\frac{5}{6} \\\\times \\\\frac{3}{10} - \\\\frac{1}{4}$$",
        options: {
            A: "$\\\\frac{2}{3}$",
            B: "$\\\\frac{5}{12}$",
            C: "$\\\\frac{3}{4}$",
            D: "$\\\\frac{1}{2}$",
            E: "$\\\\frac{7}{12}$"
        },
        correctOption: "A",
        solutionText: "Primero resolvemos la multiplicación según la jerarquía de operaciones:\\n$$\\\\frac{5}{6} \\\\times \\\\frac{3}{10} = \\\\frac{15}{60} = \\\\frac{1}{4}$$\\nSustituimos:\\n$$E = \\\\frac{2}{3} + \\\\frac{1}{4} - \\\\frac{1}{4} = \\\\frac{2}{3}$$",
        imageType: "none",
        imageUrl: "",
        solutionImageType: "none",
        solutionImageUrl: "",
        order: 2
    },
    // EXAM 2: Intermedio
    {
        id: "q-2-1",
        examId: "exam-2",
        text: "En un triángulo rectángulo, los catetos miden $6\\\\text{ cm}$ y $8\\\\text{ cm}$. Calcule la longitud de la altura relativa a la hipotenusa.",
        options: {
            A: "$4.8\\\\text{ cm}$",
            B: "$5.0\\\\text{ cm}$",
            C: "$4.2\\\\text{ cm}$",
            D: "$3.6\\\\text{ cm}$",
            E: "$5.4\\\\text{ cm}$"
        },
        correctOption: "A",
        solutionText: "Por Pitágoras, la hipotenusa mide:\\n$$c = \\\\sqrt{6^2 + 8^2} = 10\\\\text{ cm}$$\\nPor relaciones métricas:\\n$$cateto_1 \\\\times cateto_2 = hipotenusa \\\\times altura$$\\n$$6 \\\\times 8 = 10 \\\\times h \\\\implies h = 4.8\\\\text{ cm}$$",
        imageType: "none",
        imageUrl: "",
        solutionImageType: "none",
        solutionImageUrl: "",
        order: 1
    },
    {
        id: "q-2-2",
        examId: "exam-2",
        text: "Determine las raíces de la siguiente ecuación cuadrática:\\n$$x^2 - 5x + 6 = 0$$",
        options: {
            A: "$x_1 = 2,\\\\ x_2 = 3$",
            B: "$x_1 = -2,\\\\ x_2 = -3$",
            C: "$x_1 = 1,\\\\ x_2 = 6$",
            D: "$x_1 = -1,\\\\ x_2 = 6$",
            E: "$x_1 = 2,\\\\ x_2 = -3$"
        },
        correctOption: "A",
        solutionText: "Factorizamos:\\n$$(x - 2)(x - 3) = 0$$\\nDe donde las raíces son $x_1 = 2$ y $x_2 = 3$.",
        imageType: "none",
        imageUrl: "",
        solutionImageType: "none",
        solutionImageUrl: "",
        order: 2
    },
    // EXAM 3: Avanzado
    {
        id: "q-3-1",
        examId: "exam-3",
        text: "Un auto de carreras arranca desde el reposo y acelera a razón constante de $4\\\\text{ m/s}^2$. ¿Qué distancia habrá recorrido al cabo de $5\\\\text{ segundos}$?",
        options: {
            A: "$50\\\\text{ m}$",
            B: "$100\\\\text{ m}$",
            C: "$20\\\\text{ m}$",
            D: "$75\\\\text{ m}$",
            E: "$25\\\\text{ m}$"
        },
        correctOption: "A",
        solutionText: "Por MRUV:\\n$$d = v_0 t + \\\\frac{1}{2} a t^2$$\\nComo arranca del reposo ($v_0 = 0$):\\n$$d = \\\\frac{1}{2} (4) (5^2) = 50\\\\text{ m}$$",
        imageType: "none",
        imageUrl: "",
        solutionImageType: "none",
        solutionImageUrl: "",
        order: 1
    },
    {
        id: "q-3-2",
        examId: "exam-3",
        text: "Calcule el valor simplificado de la siguiente expresión trigonométrica:\\n$$M = \\\\frac{\\\\operatorname{sen}(2\\\\theta)}{\\\\operatorname{sen}(\\\\theta)} - 2\\\\cos(\\\\theta)$$",
        options: {
            A: "$0$",
            B: "$1$",
            C: "$2\\\\cos(\\\\theta)$",
            D: "$\\\\operatorname{sen}(\\\\theta)$",
            E: "$-1$"
        },
        correctOption: "A",
        solutionText: "Por ángulo doble:\\n$$\\\\operatorname{sen}(2\\\\theta) = 2\\\\operatorname{sen}(\\\\theta)\\\\cos(\\\\theta)$$\\nSustituyendo:\\n$$M = \\\\frac{2\\\\operatorname{sen}(\\\\theta)\\\\cos(\\\\theta)}{\\\\operatorname{sen}(\\\\theta)} - 2\\\\cos(\\\\theta) = 0$$",
        imageType: "none",
        imageUrl: "",
        solutionImageType: "none",
        solutionImageUrl: "",
        order: 2
    }
];
function App() {
    // --- ESTADOS DE LA APLICACIÓN ---
    const [user, setUser] = (0, react_1.useState)(null);
    const [currentView, setCurrentView] = (0, react_1.useState)('student-home'); // student-home, student-exam, student-results, admin-panel
    // Base de datos sincronizada
    const [exams, setExams] = (0, react_1.useState)([]);
    const [questions, setQuestions] = (0, react_1.useState)([]);
    const [loadingData, setLoadingData] = (0, react_1.useState)(true);
    const [isOfflineMode, setIsOfflineMode] = (0, react_1.useState)(false);
    // Estado del Examen Activo (Estudiante)
    const [selectedExam, setSelectedExam] = (0, react_1.useState)(null);
    const [studentAnswers, setStudentAnswers] = (0, react_1.useState)({}); // { questionId: selectedOptionLetter }
    const [activeQuestionIndex, setActiveQuestionIndex] = (0, react_1.useState)(0);
    const [examFinished, setExamFinished] = (0, react_1.useState)(false);
    const [startTime, setStartTime] = (0, react_1.useState)(null);
    const [elapsedTime, setElapsedTime] = (0, react_1.useState)(0);
    const [timerIntervalId, setTimerIntervalId] = (0, react_1.useState)(null);
    // Estado del Panel de Administración
    const [isAdminAuthenticated, setIsAdminAuthenticated] = (0, react_1.useState)(false);
    const [adminPasswordInput, setAdminPasswordInput] = (0, react_1.useState)('');
    const [adminTab, setAdminTab] = (0, react_1.useState)('exams'); // exams, questions
    const [selectedAdminExamId, setSelectedAdminExamId] = (0, react_1.useState)('all');
    // Modales y Notificaciones
    const [toast, setToast] = (0, react_1.useState)({ show: false, message: '', type: 'info' });
    const [modalConfirm, setModalConfirm] = (0, react_1.useState)({ show: false, title: '', message: '', onConfirm: null });
    const [showAdminLoginModal, setShowAdminLoginModal] = (0, react_1.useState)(false);
    const [showFlyerModal, setShowFlyerModal] = (0, react_1.useState)(false);
    // Estado del Banner Dinámico Interactivo (Flyer)
    const [activeBannerTab, setActiveBannerTab] = (0, react_1.useState)('concurso'); // concurso, grados, cronograma, beneficios
    const [selectedBannerGrade, setSelectedBannerGrade] = (0, react_1.useState)('1-2'); // 1-2, 3, 4-5
    // Formularios de Administración
    const [examForm, setExamForm] = (0, react_1.useState)({ id: null, name: '', description: '' });
    const [questionForm, setQuestionForm] = (0, react_1.useState)({
        id: null,
        examId: '',
        text: '',
        imageType: 'none',
        imageUrl: '',
        options: {
            A: '',
            B: '',
            C: '',
            D: '',
            E: ''
        },
        correctOption: 'A',
        solutionText: '',
        solutionImageType: 'none',
        solutionImageUrl: '',
        order: 0
    });
    // Filtros y Buscadores en Admin
    const [searchQuestionQuery, setSearchQuestionQuery] = (0, react_1.useState)('');
    // Estado para el convertidor de imágenes a Base64 en el panel de administración
    const [converterBase64Result, setConverterBase64Result] = (0, react_1.useState)('');
    const [converterFileName, setConverterFileName] = (0, react_1.useState)('');
    // Estado de registro de estudiante y lista de resultados para rankings
    const [studentForm, setStudentForm] = (0, react_1.useState)({
        name: '',
        school: '',
        grade: '3° de Secundaria',
        tutor: '',
        dni: '',
        phone: '',
        dataConsent: false,
        registrationSource: 'simulacro'
    });
    const [showStudentRegisterModal, setShowStudentRegisterModal] = (0, react_1.useState)(false);
    const [isStudentRegistered, setIsStudentRegistered] = (0, react_1.useState)(false);
    const [results, setResults] = (0, react_1.useState)([]);
    const [activeRankingTab, setActiveRankingTab] = (0, react_1.useState)('general');
    const [showRankingInResults, setShowRankingInResults] = (0, react_1.useState)(false);
    // --- CARGA DINÁMICA DE MATHJAX ---
    (0, react_1.useEffect)(() => {
        window.MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                processEscapes: true
            },
            options: {
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
            },
            startup: {
                pageReady: () => {
                    return window.MathJax.startup.defaultPageReady();
                }
            }
        };
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
        script.async = true;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);
    // Cargar estado de registro local al montar
    (0, react_1.useEffect)(() => {
        const registered = localStorage.getItem('appu_student_registered') === 'true';
        setIsStudentRegistered(registered);
        const savedName = localStorage.getItem('appu_student_name');
        const savedSchool = localStorage.getItem('appu_student_school');
        const savedGrade = localStorage.getItem('appu_student_grade');
        const savedDni = localStorage.getItem('appu_student_dni');
        const savedPhone = localStorage.getItem('appu_student_phone');
        const savedTutor = localStorage.getItem('appu_student_tutor');
        if (savedName || savedSchool || savedDni || savedPhone) {
            setStudentForm(prev => ({
                ...prev,
                name: savedName || '',
                school: savedSchool || '',
                grade: savedGrade || '3° de Secundaria',
                dni: savedDni || '',
                phone: savedPhone || '',
                tutor: savedTutor || '',
                dataConsent: true
            }));
        }
    }, []);
    // Función para re-procesar las fórmulas LaTeX en la pantalla actual
    const triggerMathJax = () => {
        setTimeout(() => {
            if (window.MathJax && window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise()
                    .catch((err) => console.warn("MathJax typeset error: ", err));
            }
        }, 150);
    };
    // Re-procesar LaTeX cada vez que cambie la vista, pregunta o pestaña del banner
    (0, react_1.useEffect)(() => {
        triggerMathJax();
    }, [currentView, activeQuestionIndex, examFinished, adminTab, questionForm, activeBannerTab, selectedBannerGrade]);
    // --- AUTENTICACIÓN FIREBASE (REGLA 3) ---
    (0, react_1.useEffect)(() => {
        const initAuth = async () => {
            try {
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    await (0, auth_1.signInWithCustomToken)(auth, __initial_auth_token);
                }
                else {
                    await (0, auth_1.signInAnonymously)(auth);
                }
            }
            catch (error) {
                console.error("Error al autenticar (activando modo local):", error);
                setIsOfflineMode(true);
                showToast("Modo local activado: Sin conexión a base de datos.", "warning");
            }
        };
        if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "AIzaSyDummyKeyForAppuLocalDevOnly") {
            setIsOfflineMode(true);
            setLoadingData(false);
        }
        else {
            initAuth();
        }
        const unsubscribe = (0, auth_1.onAuthStateChanged)(auth, (u) => {
            setUser(u);
        });
        return () => unsubscribe();
    }, []);
    // --- CARGA Y SINCRONIZACIÓN DE DATOS CON VERCEL KV ---
    const saveKVData = async (key, data) => {
        try {
            // Guardado local (caché/optimista)
            localStorage.setItem(`appu_${key}`, JSON.stringify(data));
            // Guardado remoto (Vercel KV)
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key, data })
            });
            if (!response.ok) {
                console.error(`Error al guardar ${key} en Vercel KV: HTTP ${response.status}`);
            }
        }
        catch (error) {
            console.error(`Error de red al guardar ${key} en Vercel KV:`, error);
        }
    };
    const loadKVData = async () => {
        setLoadingData(true);
        try {
            const response = await fetch('/api/data');
            if (response.ok) {
                const data = await response.json();
                const finalExams = data.exams && data.exams.length > 0 ? data.exams : defaultExams;
                const finalQuestions = data.questions && data.questions.length > 0 ? data.questions : defaultQuestions;
                const finalResults = data.results || [];
                setExams(finalExams);
                setQuestions(finalQuestions);
                setResults(finalResults);
                localStorage.setItem('appu_exams', JSON.stringify(finalExams));
                localStorage.setItem('appu_questions', JSON.stringify(finalQuestions));
                localStorage.setItem('appu_results', JSON.stringify(finalResults));
            }
            else {
                throw new Error(`Error de servidor: ${response.status}`);
            }
        }
        catch (error) {
            console.warn("No se pudo conectar con Vercel KV. Usando caché local:", error);
            const storedExams = localStorage.getItem('appu_exams');
            const storedQuestions = localStorage.getItem('appu_questions');
            const storedResults = localStorage.getItem('appu_results');
            setExams(storedExams ? JSON.parse(storedExams) : defaultExams);
            setQuestions(storedQuestions ? JSON.parse(storedQuestions) : defaultQuestions);
            setResults(storedResults ? JSON.parse(storedResults) : []);
        }
        finally {
            setLoadingData(false);
            triggerMathJax();
        }
    };
    (0, react_1.useEffect)(() => {
        loadKVData();
    }, []);
    // --- CONTROL DEL TEMPORIZADOR DEL EXAMEN ---
    (0, react_1.useEffect)(() => {
        if (currentView === 'student-exam' && !examFinished) {
            const interval = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
            setTimerIntervalId(interval);
            return () => clearInterval(interval);
        }
        else {
            if (timerIntervalId) {
                clearInterval(timerIntervalId);
                setTimerIntervalId(null);
            }
        }
    }, [currentView, examFinished]);
    const showToast = (message, type = 'info') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'info' });
        }, 4000);
    };
    const confirmAction = (title, message, onConfirm) => {
        setModalConfirm({
            show: true,
            title,
            message,
            onConfirm: () => {
                onConfirm();
                setModalConfirm({ show: false, title: '', message: '', onConfirm: null });
            }
        });
    };
    const handleImageUpload = (file, callback) => {
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                let width = img.width;
                let height = img.height;
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const base64Str = canvas.toDataURL('image/jpeg', 0.7);
                    callback(base64Str);
                }
            };
            if (e.target && e.target.result) {
                img.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    };
    const handleSelectExam = (exam) => {
        const examQuestions = questions.filter((q) => q.examId === exam.id);
        if (examQuestions.length === 0) {
            showToast("Este examen aún no contiene preguntas. Por favor, selecciona otro o contacta con el administrador.", "warning");
            return;
        }
        setSelectedExam(exam);
        const registered = localStorage.getItem('appu_student_registered') === 'true';
        if (registered) {
            const savedName = localStorage.getItem('appu_student_name') || '';
            const savedSchool = localStorage.getItem('appu_student_school') || '';
            const savedGrade = localStorage.getItem('appu_student_grade') || '3° de Secundaria';
            const savedDni = localStorage.getItem('appu_student_dni') || '';
            const savedPhone = localStorage.getItem('appu_student_phone') || '';
            const savedTutor = localStorage.getItem('appu_student_tutor') || '';
            setStudentForm({
                name: savedName,
                school: savedSchool,
                grade: savedGrade,
                dni: savedDni,
                phone: savedPhone,
                tutor: savedTutor,
                dataConsent: true,
                registrationSource: 'simulacro'
            });
            setStudentAnswers({});
            setActiveQuestionIndex(0);
            setExamFinished(false);
            setElapsedTime(0);
            setShowRankingInResults(false);
            setCurrentView('student-exam');
            showToast(`¡Bienvenido de nuevo, ${savedName}! Iniciando simulacro.`, "success");
        }
        else {
            setStudentForm({
                name: '',
                school: '',
                grade: '3° de Secundaria',
                tutor: '',
                dni: '',
                phone: '',
                dataConsent: false,
                registrationSource: 'simulacro'
            });
            setShowStudentRegisterModal(true);
        }
    };
    const handleRegisterDirect = (source) => {
        setSelectedExam(null);
        setStudentForm({
            name: '',
            school: '',
            grade: '3° de Secundaria',
            tutor: '',
            dni: '',
            phone: '',
            dataConsent: false,
            registrationSource: source
        });
        setShowStudentRegisterModal(true);
    };
    const handleExportCSV = () => {
        if (results.length === 0)
            return;
        const headers = ['Estudiante', 'DNI', 'Teléfono', 'Colegio', 'Grado', 'Tutor', 'Examen', 'Puntaje', 'Etiqueta'];
        const rows = results.map(res => [
            `"${res.studentName || ''}"`,
            `"${res.dni || ''}"`,
            `"${res.phone || ''}"`,
            `"${res.school || ''}"`,
            `"${res.grade || ''}"`,
            `"${res.tutor || ''}"`,
            `"${res.examName || ''}"`,
            `"${res.score || ''}"`,
            `"${res.tag || '-'}"`
        ]);
        const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `registro_datos_appu_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleDeleteResult = async (resultId) => {
        confirmAction("¿Eliminar registro?", "Esta acción eliminará el registro de este estudiante de forma permanente.", async () => {
            const updatedResults = results.filter(res => res.id !== resultId);
            setResults(updatedResults);
            await saveKVData('results', updatedResults);
            showToast("Registro de estudiante eliminado.", "success");
        });
    };
    const handleClearAllResults = async () => {
        confirmAction("¿Limpiar todos los datos?", "¡ATENCIÓN! Se eliminarán de forma permanente todos los registros y resultados de los estudiantes. Esta acción no se puede deshacer.", async () => {
            setResults([]);
            await saveKVData('results', []);
            showToast("Todos los registros han sido limpiados.", "success");
        });
    };
    const handleStartExamAfterRegister = async (e) => {
        e.preventDefault();
        if (!studentForm.name.trim() || !studentForm.school.trim() || !studentForm.dni.trim() || !studentForm.phone.trim() || !studentForm.grade.trim()) {
            showToast("Por favor, completa todos los campos obligatorios del formulario.", "warning");
            return;
        }
        if (!studentForm.dataConsent) {
            showToast("Debes aceptar el Uso de Datos para continuar.", "warning");
            return;
        }
        // Guardar registro localmente para otorgar acceso
        localStorage.setItem('appu_student_registered', 'true');
        localStorage.setItem('appu_student_name', studentForm.name);
        localStorage.setItem('appu_student_school', studentForm.school);
        localStorage.setItem('appu_student_grade', studentForm.grade);
        localStorage.setItem('appu_student_dni', studentForm.dni);
        localStorage.setItem('appu_student_phone', studentForm.phone);
        localStorage.setItem('appu_student_tutor', studentForm.tutor);
        setIsStudentRegistered(true);
        if (studentForm.registrationSource !== 'simulacro') {
            const newResult = {
                id: "res-" + Date.now(),
                examId: "N/A",
                examName: studentForm.registrationSource === 'concurso' ? 'Inscripción: Concurso de Becas' : 'Inscripción: Reforzamiento',
                studentName: studentForm.name,
                dni: studentForm.dni,
                phone: studentForm.phone,
                school: studentForm.school,
                grade: studentForm.grade,
                tutor: studentForm.tutor || "",
                score: "N/A",
                createdAt: new Date().toISOString(),
                tag: studentForm.registrationSource
            };
            const updatedResults = [...results, newResult];
            setResults(updatedResults);
            await saveKVData('results', updatedResults);
            setShowStudentRegisterModal(false);
            showToast("¡Inscripción exitosa! Nos pondremos en contacto contigo y ya tienes acceso a los simulacros.", "success");
            return;
        }
        setShowStudentRegisterModal(false);
        setStudentAnswers({});
        setActiveQuestionIndex(0);
        setExamFinished(false);
        setElapsedTime(0);
        setShowRankingInResults(false);
        setCurrentView('student-exam');
    };
    const handleSelectOption = (questionId, optionLetter) => {
        setStudentAnswers((prev) => ({
            ...prev,
            [questionId]: optionLetter
        }));
    };
    const handleFinishExam = () => {
        confirmAction("¿Finalizar simulacro?", "Se procesarán tus respuestas y verás los resultados de inmediato.", async () => {
            const resultsData = calculateResults();
            const score = resultsData.score;
            const maxScore = resultsData.maxScore;
            const correct = resultsData.correct;
            const incorrect = resultsData.incorrect;
            const omitted = resultsData.omitted;
            const newResult = {
                id: "res-" + Date.now(),
                examId: selectedExam?.id || "",
                examName: selectedExam?.name || "",
                studentName: studentForm.name,
                dni: studentForm.dni,
                phone: studentForm.phone,
                school: studentForm.school,
                grade: studentForm.grade,
                tutor: studentForm.tutor || "",
                score: score,
                maxScore: maxScore,
                correctCount: correct,
                incorrectCount: incorrect,
                omittedCount: omitted,
                timeSpent: elapsedTime,
                createdAt: new Date().toISOString(),
                tag: 'simulacro'
            };
            const updatedResults = [...results, newResult];
            setResults(updatedResults);
            await saveKVData('results', updatedResults);
            showToast("¡Resultado registrado con éxito!", "success");
            setExamFinished(true);
            setCurrentView('student-results');
        });
    };
    const restartExam = () => {
        setStudentAnswers({});
        setActiveQuestionIndex(0);
        setExamFinished(false);
        setElapsedTime(0);
        setShowRankingInResults(false);
        setCurrentView('student-exam');
    };
    const activeExamQuestions = selectedExam
        ? questions.filter((q) => q.examId === selectedExam.id)
        : [];
    const calculateResults = () => {
        let correct = 0;
        let incorrect = 0;
        let omitted = 0;
        activeExamQuestions.forEach((q) => {
            const studentAns = studentAnswers[q.id];
            if (!studentAns) {
                omitted++;
            }
            else if (studentAns === q.correctOption) {
                correct++;
            }
            else {
                incorrect++;
            }
        });
        const score = (correct * 10) - (incorrect * 2);
        const maxScore = activeExamQuestions.length * 10;
        const percentage = maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * 100)) : 0;
        return { correct, incorrect, omitted, score, maxScore, percentage };
    };
    const handleAdminLoginSubmit = (e) => {
        e.preventDefault();
        if (adminPasswordInput === 'appuconcursodebecas2026$') {
            setIsAdminAuthenticated(true);
            setCurrentView('admin-panel');
            setShowAdminLoginModal(false);
            setAdminPasswordInput('');
            showToast("¡Autenticación de administrador exitosa!", "success");
        }
        else {
            showToast("Contraseña incorrecta. Inténtelo de nuevo.", "error");
        }
    };
    const handleAdminLogout = () => {
        setIsAdminAuthenticated(false);
        setAdminPasswordInput('');
        setCurrentView('student-home');
        showToast("Sesión de administrador finalizada.", "info");
    };
    // --- CARGA DE EXÁMENES DESDE JSON Y CONVERSIÓN DE IMÁGENES A BASE64 ---
    const handleJsonImport = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const fileContent = event.target?.result;
                const data = JSON.parse(fileContent);
                const examsToImport = Array.isArray(data) ? data : [data];
                if (examsToImport.length === 0) {
                    showToast("El archivo JSON está vacío o no es válido.", "error");
                    return;
                }
                for (const item of examsToImport) {
                    if (!item.name) {
                        showToast("Cada examen debe tener al menos un campo 'name'.", "error");
                        return;
                    }
                }
                let importedCount = 0;
                let questionsCount = 0;
                let updatedExams = [...exams];
                let updatedQuestions = [...questions];
                for (const examData of examsToImport) {
                    const newExamId = "exam-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5);
                    const newExam = {
                        id: newExamId,
                        name: examData.name,
                        description: examData.description || "",
                        createdAt: new Date().toISOString()
                    };
                    updatedExams.push(newExam);
                    importedCount++;
                    if (Array.isArray(examData.questions)) {
                        examData.questions.forEach((qData, idx) => {
                            const imgVal = qData.imageUrl || "";
                            const imgType = qData.imageType || (imgVal ? (imgVal.startsWith('data:') ? 'file' : 'url') : 'none');
                            const solImgVal = qData.solutionImageUrl || "";
                            const solImgType = qData.solutionImageType || (solImgVal ? (solImgVal.startsWith('data:') ? 'file' : 'url') : 'none');
                            const newQuestion = {
                                id: "q-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
                                examId: newExamId,
                                text: qData.text || "Pregunta sin texto",
                                imageType: imgType,
                                imageUrl: imgVal,
                                options: {
                                    A: qData.options?.A || "",
                                    B: qData.options?.B || "",
                                    C: qData.options?.C || "",
                                    D: qData.options?.D || "",
                                    E: qData.options?.E || ""
                                },
                                correctOption: qData.correctOption || "A",
                                solutionText: qData.solutionText || "",
                                solutionImageType: solImgType,
                                solutionImageUrl: solImgVal,
                                order: qData.order !== undefined ? Number(qData.order) : idx + 1,
                                createdAt: new Date().toISOString()
                            };
                            updatedQuestions.push(newQuestion);
                            questionsCount++;
                        });
                    }
                }
                setExams(updatedExams);
                setQuestions(updatedQuestions);
                await saveKVData('exams', updatedExams);
                await saveKVData('questions', updatedQuestions);
                showToast(`Importación exitosa: ${importedCount} examen(es) y ${questionsCount} pregunta(s).`, "success");
                if (e.target)
                    e.target.value = '';
                triggerMathJax();
            }
            catch (err) {
                console.error("Error al procesar el archivo JSON:", err);
                showToast("Error al procesar el archivo JSON. Verifique el formato.", "error");
            }
        };
        reader.readAsText(file);
    };
    const handleConverterImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setConverterFileName(file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                let width = img.width;
                let height = img.height;
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const base64Str = canvas.toDataURL('image/jpeg', 0.7);
                    setConverterBase64Result(base64Str);
                    showToast("Imagen convertida a Base64 con éxito.", "success");
                }
            };
            if (event.target && event.target.result) {
                img.src = event.target.result;
            }
        };
        reader.readAsDataURL(file);
    };
    const handleCopyBase64 = () => {
        if (!converterBase64Result)
            return;
        navigator.clipboard.writeText(converterBase64Result)
            .then(() => showToast("¡Código Base64 copiado al portapapeles!", "success"))
            .catch(() => showToast("No se pudo copiar el código al portapapeles.", "error"));
    };
    const handleSaveExam = async (e) => {
        e.preventDefault();
        if (!examForm.name.trim()) {
            showToast("El nombre del examen es obligatorio", "error");
            return;
        }
        let updatedExams = [...exams];
        if (examForm.id) {
            updatedExams = updatedExams.map(ex => ex.id === examForm.id ? { ...ex, name: examForm.name, description: examForm.description, updatedAt: new Date().toISOString() } : ex);
            showToast("Examen actualizado correctamente.", "success");
        }
        else {
            const newExam = {
                id: "exam-" + Date.now(),
                name: examForm.name,
                description: examForm.description,
                createdAt: new Date().toISOString()
            };
            updatedExams.push(newExam);
            showToast("Examen creado con éxito.", "success");
        }
        setExams(updatedExams);
        await saveKVData('exams', updatedExams);
        setExamForm({ id: null, name: '', description: '' });
    };
    const handleEditExam = (exam) => {
        setExamForm({
            id: exam.id,
            name: exam.name,
            description: exam.description || ''
        });
    };
    const handleDeleteExam = async (examId) => {
        confirmAction("¿Eliminar Examen?", "Se eliminará el examen y perderás la agrupación de sus preguntas de manera permanente.", async () => {
            const updatedExams = exams.filter(ex => ex.id !== examId);
            const updatedQuestions = questions.map(q => q.examId === examId ? { ...q, examId: '' } : q);
            setExams(updatedExams);
            setQuestions(updatedQuestions);
            await saveKVData('exams', updatedExams);
            await saveKVData('questions', updatedQuestions);
            showToast("Examen eliminado y preguntas desvinculadas.", "info");
            if (examForm.id === examId) {
                setExamForm({ id: null, name: '', description: '' });
            }
        });
    };
    const handleSaveQuestion = async (e) => {
        e.preventDefault();
        if (!questionForm.examId) {
            showToast("Debes vincular esta pregunta a un examen.", "error");
            return;
        }
        if (!questionForm.text.trim()) {
            showToast("El enunciado de la pregunta es obligatorio.", "error");
            return;
        }
        const questionData = {
            examId: questionForm.examId,
            text: questionForm.text,
            imageType: questionForm.imageType,
            imageUrl: questionForm.imageUrl,
            options: {
                A: questionForm.options.A || '',
                B: questionForm.options.B || '',
                C: questionForm.options.C || '',
                D: questionForm.options.D || '',
                E: questionForm.options.E || ''
            },
            correctOption: questionForm.correctOption,
            solutionText: questionForm.solutionText,
            solutionImageType: questionForm.solutionImageType,
            solutionImageUrl: questionForm.solutionImageUrl,
            order: Number(questionForm.order) || 0,
            updatedAt: new Date().toISOString()
        };
        let updatedQuestions = [...questions];
        if (questionForm.id) {
            updatedQuestions = updatedQuestions.map(q => q.id === questionForm.id ? { ...q, ...questionData } : q);
            showToast("Pregunta actualizada exitosamente.", "success");
        }
        else {
            const newQuestion = {
                id: "q-" + Date.now(),
                ...questionData,
                createdAt: new Date().toISOString()
            };
            updatedQuestions.push(newQuestion);
            showToast("Pregunta añadida correctamente.", "success");
        }
        updatedQuestions.sort((a, b) => (a.order || 0) - (b.order || 0));
        setQuestions(updatedQuestions);
        await saveKVData('questions', updatedQuestions);
        setQuestionForm({
            id: null,
            examId: questionForm.examId,
            text: '',
            imageType: 'none',
            imageUrl: '',
            options: { A: '', B: '', C: '', D: '', E: '' },
            correctOption: 'A',
            solutionText: '',
            solutionImageType: 'none',
            solutionImageUrl: '',
            order: (Number(questionForm.order) || 0) + 1
        });
        triggerMathJax();
    };
    const handleEditQuestion = (q) => {
        setQuestionForm({
            id: q.id,
            examId: q.examId || '',
            text: q.text || '',
            imageType: q.imageType || 'none',
            imageUrl: q.imageUrl || '',
            options: {
                A: q.options?.A || '',
                B: q.options?.B || '',
                C: q.options?.C || '',
                D: q.options?.D || '',
                E: q.options?.E || ''
            },
            correctOption: q.correctOption || 'A',
            solutionText: q.solutionText || '',
            solutionImageType: q.solutionImageType || 'none',
            solutionImageUrl: q.solutionImageUrl || '',
            order: q.order || 0
        });
        document.getElementById('question-form-section')?.scrollIntoView({ behavior: 'smooth' });
        triggerMathJax();
    };
    const handleDeleteQuestion = async (qId) => {
        confirmAction("¿Eliminar Pregunta?", "Esta acción es irreversible y eliminará la pregunta del simulacro.", async () => {
            const updatedQuestions = questions.filter(q => q.id !== qId);
            setQuestions(updatedQuestions);
            await saveKVData('questions', updatedQuestions);
            showToast("Pregunta eliminada.", "info");
            if (questionForm.id === qId) {
                setQuestionForm(prev => ({ ...prev, id: null }));
            }
        });
    };
    const handleShiftQuestionOrder = async (questionIndex, direction) => {
        const examQuestionsFiltered = questions.filter((q) => q.examId === selectedAdminExamId);
        if (questionIndex + direction < 0 || questionIndex + direction >= examQuestionsFiltered.length)
            return;
        const q1 = examQuestionsFiltered[questionIndex];
        const q2 = examQuestionsFiltered[questionIndex + direction];
        const tempOrder = q1.order || 0;
        const updatedQuestions = questions.map(q => {
            if (q.id === q1.id)
                return { ...q, order: q2.order || 0 };
            if (q.id === q2.id)
                return { ...q, order: tempOrder };
            return q;
        });
        updatedQuestions.sort((a, b) => (a.order || 0) - (b.order || 0));
        setQuestions(updatedQuestions);
        await saveKVData('questions', updatedQuestions);
        showToast("Orden actualizado.", "success");
    };
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    // --- CÁLCULO DE RANKINGS DINÁMICOS ---
    const getGeneralRanking = () => {
        return [...results]
            .sort((a, b) => {
            if (b.score !== a.score)
                return b.score - a.score;
            return a.timeSpent - b.timeSpent;
        })
            .slice(0, 10);
    };
    const getRankingsByGroup = (field, n) => {
        const groups = {};
        results.forEach(res => {
            const val = (res[field] || '').trim();
            if (!val)
                return;
            if (!groups[val])
                groups[val] = [];
            groups[val].push(res);
        });
        const groupedRankings = [];
        Object.keys(groups).forEach(name => {
            const topResults = groups[name]
                .sort((a, b) => {
                if (b.score !== a.score)
                    return b.score - a.score;
                return a.timeSpent - b.timeSpent;
            })
                .slice(0, n);
            groupedRankings.push({ name, topResults });
        });
        return groupedRankings.sort((a, b) => a.name.localeCompare(b.name));
    };
    const filteredAdminQuestions = questions.filter((q) => {
        const matchesExam = selectedAdminExamId === 'all' || q.examId === selectedAdminExamId;
        const matchesSearch = q.text.toLowerCase().includes(searchQuestionQuery.toLowerCase()) ||
            Object.values(q.options || {}).some((o) => typeof o === 'string' && o.toLowerCase().includes(searchQuestionQuery.toLowerCase()));
        return matchesExam && matchesSearch;
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased", children: [(0, jsx_runtime_1.jsx)("style", { children: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
        @keyframes floatSeal {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-6px) rotate(8deg); }
        }
        .animate-float-seal {
          animation: floatSeal 4s ease-in-out infinite;
        }
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float-gentle {
          animation: floatGentle 6s ease-in-out infinite;
        }
        .hover-card-trigger {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-card-trigger:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px -10px rgba(15, 44, 89, 0.15);
          border-color: rgba(99, 102, 241, 0.35);
        }
      ` }), toast.show && ((0, jsx_runtime_1.jsxs)("div", { className: "fixed top-5 right-5 z-50 flex items-center p-4 rounded-xl shadow-2xl transition-all duration-300 bg-white border-l-4 border-violet-600 animate-bounce", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mr-3", children: [toast.type === 'success' && ((0, jsx_runtime_1.jsx)("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600", children: "\u2713" })), toast.type === 'error' && ((0, jsx_runtime_1.jsx)("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600", children: "\u2715" })), toast.type === 'warning' && ((0, jsx_runtime_1.jsx)("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600", children: "!" })), toast.type === 'info' && ((0, jsx_runtime_1.jsx)("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600", children: "i" }))] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-sm text-slate-800", children: toast.message }) })] })), showStudentRegisterModal && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden p-6 md:p-8 animate-fade-in border border-slate-100", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-2 mb-6", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl block", children: "\uD83D\uDCDD" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-2xl font-black text-slate-900 leading-tight", children: "Registro de Participante" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-slate-500 max-w-sm mx-auto", children: ["Para ", selectedExam ? "iniciar el simulacro de " : "completar tu inscripción en el ", (0, jsx_runtime_1.jsx)("strong", { className: "text-violet-700 font-bold", children: selectedExam ? selectedExam.name : (studentForm.registrationSource === 'concurso' ? 'Concurso de Becas' : 'Programa de Reforzamiento') }), ", por favor ingresa tus datos."] })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleStartExamAfterRegister, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-[10px] font-bold uppercase text-slate-400 mb-1 tracking-wider", children: "Nombre Completo" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Ej. Juan P\u00E9rez Quispe", value: studentForm.name, onChange: (e) => setStudentForm({ ...studentForm, name: e.target.value }), className: "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:outline-none text-sm font-semibold text-slate-800", required: true, autoFocus: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-[10px] font-bold uppercase text-slate-400 mb-1 tracking-wider", children: "Colegio de Procedencia" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Ej. I.E. Jorge Basadre", value: studentForm.school, onChange: (e) => setStudentForm({ ...studentForm, school: e.target.value }), className: "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:outline-none text-sm font-semibold text-slate-800", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-[10px] font-bold uppercase text-slate-400 mb-1 tracking-wider", children: "Grado Escolar" }), (0, jsx_runtime_1.jsx)("select", { value: studentForm.grade, onChange: (e) => setStudentForm({ ...studentForm, grade: e.target.value }), className: "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:outline-none text-sm font-bold text-slate-800 bg-white", children: ['1° de Secundaria', '2° de Secundaria', '3° de Secundaria', '4° de Secundaria', '5° de Secundaria'].map(g => ((0, jsx_runtime_1.jsx)("option", { value: g, children: g }, g))) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-[10px] font-bold uppercase text-slate-400 mb-1 tracking-wider", children: "DNI" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Ej. 76543210", value: studentForm.dni, onChange: (e) => setStudentForm({ ...studentForm, dni: e.target.value }), className: "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:outline-none text-sm font-semibold text-slate-800", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-[10px] font-bold uppercase text-slate-400 mb-1 tracking-wider", children: "Tel\u00E9fono de Contacto" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Ej. 987654321", value: studentForm.phone, onChange: (e) => setStudentForm({ ...studentForm, phone: e.target.value }), className: "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:outline-none text-sm font-semibold text-slate-800", required: true })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start mt-4", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "dataConsent", checked: studentForm.dataConsent, onChange: (e) => setStudentForm({ ...studentForm, dataConsent: e.target.checked }), className: "mt-1 h-4 w-4 text-violet-600 focus:ring-violet-500 border-slate-300 rounded", required: true }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: "dataConsent", className: "ml-2 block text-[11px] text-slate-600 leading-tight", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-bold", children: "Uso de Datos:" }), " Autorizo a APPU a tratar los datos consignados para enviarme informes de resultados, ciclos de inter\u00E9s, asesor\u00EDa y el seguimiento de sus simulacros. Tambi\u00E9n acepto recibir promociones, descuentos y nuevos inicios de clases por WhatsApp, llamadas o SMS."] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end space-x-3 pt-4 border-t border-slate-100", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                                setShowStudentRegisterModal(false);
                                                setSelectedExam(null);
                                            }, className: "px-5 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition text-xs font-semibold", children: "Cancelar" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition text-xs font-bold shadow-md hover:shadow-lg shadow-violet-100", children: selectedExam ? "Iniciar Simulacro 🚀" : "Confirmar Inscripción 🚀" })] })] })] }) })), showAdminLoginModal && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold text-slate-900 mb-2", children: "Ingresar al Panel de Administrador" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-500 mb-4", children: "Ingresa la clave de administraci\u00F3n para gestionar preguntas, ex\u00E1menes y ver solucionarios." }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleAdminLoginSubmit, className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "Contrase\u00F1a de Administrador", value: adminPasswordInput, onChange: (e) => setAdminPasswordInput(e.target.value), className: "w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none text-sm font-semibold", autoFocus: true }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end space-x-3 pt-2", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                                setShowAdminLoginModal(false);
                                                setAdminPasswordInput('');
                                            }, className: "px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 transition text-sm font-medium", children: "Cancelar" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition text-sm font-semibold shadow-md", children: "Confirmar e Ingresar" })] })] })] }) })), modalConfirm.show && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden transform transition-all scale-100 p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold text-slate-900 mb-2", children: modalConfirm.title }), (0, jsx_runtime_1.jsx)("div", { className: "text-slate-600 mb-6 text-sm", children: modalConfirm.message }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end space-x-3", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setModalConfirm({ show: false, title: '', message: '', onConfirm: null }), className: "px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100 transition text-sm font-medium", children: "Cancelar" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => modalConfirm.onConfirm?.(), className: "px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition text-sm font-medium", children: "Confirmar" })] })] }) })), showFlyerModal && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-fade-in", children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-4 bg-slate-900 text-white flex justify-between items-center border-b border-slate-800", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-bold text-sm tracking-wide uppercase", children: "Volante Oficial del Concurso de Becas APPU" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setShowFlyerModal(false), className: "h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition text-lg font-bold", children: "\u2715" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-2 flex-grow overflow-auto max-h-[80vh] flex items-center justify-center bg-slate-950", children: (0, jsx_runtime_1.jsx)("img", { src: "flyer_original.jpg", alt: "Volante Original", className: "max-w-full max-h-[75vh] object-contain rounded-lg shadow-inner" }) })] }) })), (0, jsx_runtime_1.jsx)("header", { className: "sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3 cursor-pointer", onClick: () => { setCurrentView('student-home'); triggerMathJax(); }, children: [(0, jsx_runtime_1.jsx)("img", { src: "logo_appu.png", alt: "Logo Academia APPU", className: "h-12 w-auto object-contain" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "font-extrabold text-base sm:text-lg tracking-tight text-slate-900 leading-tight", children: "ACADEMIA APPU" }), (0, jsx_runtime_1.jsx)("p", { className: "text-[9px] sm:text-xs font-semibold text-violet-600 tracking-wide leading-none", children: "Practica y asegura el inicio de tu vida pre, aqu\u00ED!" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [currentView.startsWith('student-') && ((0, jsx_runtime_1.jsxs)("button", { onClick: () => {
                                        if (isAdminAuthenticated) {
                                            setCurrentView('admin-panel');
                                            triggerMathJax();
                                        }
                                        else {
                                            setShowAdminLoginModal(true);
                                        }
                                    }, className: "flex items-center px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-sm font-semibold text-slate-700", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 mr-2 text-violet-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }), isAdminAuthenticated ? 'Panel Admin' : 'Acceso Docente'] })), currentView === 'admin-panel' && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                setCurrentView('student-home');
                                                triggerMathJax();
                                            }, className: "px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition text-sm font-semibold", children: "Vista Estudiante" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleAdminLogout, className: "px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition text-sm font-semibold", children: "Salir" })] }))] })] }) }), (0, jsx_runtime_1.jsxs)("main", { className: "flex-grow w-full bg-[#f8fafc]", children: [loadingData && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center py-20", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-4 text-slate-600 font-medium", children: "Cargando material acad\u00E9mico y simulacros..." })] })), !loadingData && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [currentView === 'student-home' && ((0, jsx_runtime_1.jsxs)("div", { className: "animate-fade-in w-full text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative bg-gradient-to-br from-[#0f2c59] via-[#163b73] to-[#0f2c59] text-white pt-8 pb-14 overflow-hidden shadow-inner", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-4 right-8 w-24 h-24 opacity-15 pointer-events-none hidden md:block", children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-6 gap-1.5", children: Array.from({ length: 36 }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: "w-1 h-1 rounded-full bg-white" }, i))) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-7 text-left space-y-4 pb-2 relative z-30", children: [(0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center space-x-1.5 bg-[#e1251b] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm animate-pulse", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-2 w-2 rounded-full bg-white animate-ping" }), (0, jsx_runtime_1.jsx)("span", { children: "EXAMEN OFICIAL 2026" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-sm font-bold text-yellow-400 uppercase tracking-widest leading-none", children: "ACADEMIA APPU PRESENTA" }), (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none uppercase tracking-tight", children: "CONCURSO DE BECAS" })] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-blue-100 text-sm md:text-base font-medium max-w-xl leading-relaxed", children: ["\u00A1Practica en nuestro simulador oficial y prep\u00E1rate para ganar una ", (0, jsx_runtime_1.jsx)("strong", { className: "text-yellow-400 font-extrabold", children: "BECA COMPLETA" }), " de estudios! Dirigido a estudiantes de 3ero, 4to y 5to de secundaria de colegios p\u00FAblicos de El Agustino."] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-3 max-w-md pt-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-9 w-9 rounded-xl bg-yellow-400 text-[#0f2c59] flex items-center justify-center text-base font-bold flex-shrink-0", children: "\uD83D\uDCC5" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-blue-200 uppercase font-bold tracking-wider leading-none", children: "FECHA" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-extrabold text-white mt-1", children: "20 de Junio" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-9 w-9 rounded-xl bg-orange-400 text-white flex items-center justify-center text-base font-bold flex-shrink-0", children: "\u23F0" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-blue-200 uppercase font-bold tracking-wider leading-none", children: "HORA" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-extrabold text-white mt-1", children: "10:00 AM" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-3 pt-3 items-center", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: () => {
                                                                            const exams = document.getElementById('exams-section');
                                                                            exams?.scrollIntoView({ behavior: 'smooth' });
                                                                        }, className: "px-6 py-3 bg-[#ffc000] hover:bg-[#e6ad00] text-[#0f2c59] font-black rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-102 transform duration-150 flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD83D\uDCDD EMPEZAR SIMULACRO AHORA" }), (0, jsx_runtime_1.jsx)("span", { children: "\u2192" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleRegisterDirect('concurso'), className: "px-6 py-3 bg-[#e1251b] hover:bg-red-700 text-white font-black rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-102 transform duration-150 flex items-center space-x-2", children: (0, jsx_runtime_1.jsx)("span", { children: "\u2705 INSCRIBIRSE PARA EL CONCURSO DE BECAS" }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0 z-10", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/15 rounded-full blur-3xl pointer-events-none" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative max-w-[320px] md:max-w-[400px] w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative z-10 transform hover:scale-105 transition duration-300 rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.35)] border-2 border-white/10 bg-slate-900", children: (0, jsx_runtime_1.jsx)("img", { src: "appu_becas_banner.png", alt: "Concurso de Becas APPU 2025", className: "w-full h-auto object-cover" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute -bottom-4 z-20 bg-[#e1251b] text-white px-5 py-2 font-black text-xs uppercase rounded-xl shadow-xl tracking-wider transform -rotate-2 border-2 border-white text-center left-1/2 -translate-x-1/2 w-[220px]", children: ["BECA COMPLETA", (0, jsx_runtime_1.jsx)("p", { className: "text-[7.5px] font-bold text-yellow-300 uppercase mt-0.5 tracking-widest leading-none", children: "Ciclos de Preparaci\u00F3n APPU" })] })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20", children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 1440 100", preserveAspectRatio: "none", className: "relative block w-full h-[20px] md:h-[30px]", children: [(0, jsx_runtime_1.jsx)("path", { d: "M0,80 Q360,100 720,60 T1440,40 L1440,100 L0,100 Z", fill: "#ffd400" }), (0, jsx_runtime_1.jsx)("path", { d: "M0,88 Q360,108 720,68 T1440,48 L1440,100 L0,100 Z", fill: "#f8fafc" })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-[#f8fafc] -mt-4 relative z-20", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-lg relative overflow-hidden mb-8 max-w-6xl mx-auto text-left", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 right-0 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl -z-10 pointer-events-none" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute -bottom-10 left-10 w-48 h-48 bg-violet-100/30 rounded-full blur-3xl -z-10 pointer-events-none" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col lg:flex-row gap-8 items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "lg:w-1/3 flex justify-center relative", children: (0, jsx_runtime_1.jsxs)("div", { onClick: () => setShowFlyerModal(true), className: "cursor-pointer max-w-[280px] w-full transform hover:scale-105 transition duration-500 relative animate-float-gentle", children: [(0, jsx_runtime_1.jsx)("img", { src: "appu_students_hero.png", alt: "Estudiantes Academia APPU", className: "w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(15,44,89,0.1)]" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute -bottom-2 -right-2 w-20 h-20 bg-[#ffcc00] rounded-full flex items-center justify-center text-center p-2 shadow-lg border-2 border-white transform rotate-12 animate-float-seal cursor-pointer hover:scale-110 transition duration-300", children: (0, jsx_runtime_1.jsxs)("div", { className: "leading-tight", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[7px] font-black text-[#0f2c59] uppercase tracking-wider leading-none", children: "SIRVIENDO" }), (0, jsx_runtime_1.jsx)("p", { className: "text-[8px] font-black text-[#0f2c59] uppercase tracking-wider leading-none mt-0.5", children: "AL PUEBLO" }), (0, jsx_runtime_1.jsx)("p", { className: "text-[#e1251b] text-sm mt-0.5 leading-none", children: "\u2764\uFE0F" })] }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "lg:w-2/3 text-left space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase tracking-wider rounded-full border border-blue-100", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-1.5 w-1.5 rounded-full bg-blue-500 mr-0.5 animate-ping" }), (0, jsx_runtime_1.jsx)("span", { children: "Programa de Reforzamiento" })] }), (0, jsx_runtime_1.jsxs)("h2", { className: "text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0f2c59]", children: ["Reforzamiento Escolar ", (0, jsx_runtime_1.jsx)("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700", children: "Gratuito 2026" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-600 text-sm md:text-base leading-relaxed", children: "Clases de reforzamiento gratuitas todos los s\u00E1bados para potenciar el rendimiento escolar de los j\u00F3venes de colegios p\u00FAblicos de nuestro distrito de El Agustino. \u00A1Una iniciativa de la Academia APPU al servicio de la educaci\u00F3n!" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { id: "details-section", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative pt-6 pb-6 px-6 bg-white rounded-2xl border border-slate-200/70 shadow-sm hover-card-trigger overflow-hidden flex flex-col justify-between text-left transition duration-300 hover:shadow-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#e1251b] to-red-500" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3 mb-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-11 w-11 rounded-xl bg-rose-50 flex items-center justify-center text-[#e1251b] text-xl border border-rose-100 flex-shrink-0", children: "\uD83C\uDFAF" }), (0, jsx_runtime_1.jsx)("h4", { className: "font-extrabold text-sm sm:text-base text-[#0f2c59] tracking-wider uppercase", children: "OBJETIVO" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-slate-600 text-xs sm:text-sm leading-relaxed space-y-2.5", children: [(0, jsx_runtime_1.jsxs)("p", { children: ["Reforzar a los estudiantes de ", (0, jsx_runtime_1.jsx)("strong", { className: "text-slate-800 font-extrabold", children: "1ero a 5to" }), " en las \u00E1reas de ", (0, jsx_runtime_1.jsx)("strong", { className: "text-blue-900 font-black", children: "Matem\u00E1ticas y CTA" }), "."] }), (0, jsx_runtime_1.jsx)("p", { className: "border-t border-slate-100 pt-2.5 mt-2.5 text-slate-500 font-medium text-[11px] sm:text-xs", children: "Desarrollar habilidades y estrategias para el mejor aprendizaje y para la soluci\u00F3n de problemas." })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative pt-6 pb-6 px-6 bg-white rounded-2xl border border-slate-200/70 shadow-sm hover-card-trigger overflow-hidden flex flex-col justify-between text-left transition duration-300 hover:shadow-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#385723] to-emerald-500" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3 mb-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-11 w-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl border border-emerald-100 flex-shrink-0", children: "\uD83D\uDCDA" }), (0, jsx_runtime_1.jsx)("h4", { className: "font-extrabold text-sm sm:text-base text-[#0f2c59] tracking-wider uppercase", children: "GRADO Y \u00C1REAS" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3 pt-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start space-x-2.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "bg-[#e2f0d9] text-[#385723] font-bold text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full w-20 text-center leading-none flex items-center justify-center flex-shrink-0 mt-0.5", children: "1\u00B0 a 2\u00B0 sec." }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-[#385723] font-extrabold leading-tight", children: "Aritm\u00E9tica, \u00C1lgebra, Geometr\u00EDa y Biolog\u00EDa" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start space-x-2.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "bg-[#fff2cc] text-[#c65911] font-bold text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full w-20 text-center leading-none flex items-center justify-center flex-shrink-0 mt-0.5", children: "3ero sec." }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-[#c65911] font-extrabold leading-tight", children: "Aritm\u00E9tica, \u00C1lgebra, Geometr\u00EDa, Qu\u00EDmica y Biolog\u00EDa" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start space-x-2.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "bg-[#fce4d6] text-[#c00000] font-bold text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full w-20 text-center leading-none flex items-center justify-center flex-shrink-0 mt-0.5", children: "4to y 5to sec." }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-[#c00000] font-extrabold leading-tight", children: "Aritm\u00E9tica, \u00C1lgebra, Geometr\u00EDa, Trigonometr\u00EDa, F\u00EDsica y Qu\u00EDmica" })] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative pt-6 pb-6 px-6 bg-white rounded-2xl border border-slate-200/70 shadow-sm hover-card-trigger overflow-hidden flex flex-col justify-between text-left transition duration-300 hover:shadow-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 to-indigo-600" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3 mb-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-11 w-11 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 text-xl border border-violet-100 flex-shrink-0", children: "\uD83C\uDF93" }), (0, jsx_runtime_1.jsx)("h4", { className: "font-extrabold text-sm sm:text-base text-[#0f2c59] tracking-wider uppercase", children: "BENEFICIOS" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-650 text-xs sm:text-sm leading-relaxed text-center", children: "La Academia APPU otorgar\u00E1 el beneficio de:" }), (0, jsx_runtime_1.jsx)("div", { className: "my-3 py-2 px-4 bg-gradient-to-r from-[#e1251b] to-red-500 text-white rounded-full text-center font-black text-xs sm:text-sm tracking-wider uppercase shadow-sm", children: "\u2605 MEDIA BECA \u2605" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-slate-500 text-[10px] sm:text-xs leading-normal text-center", children: ["para los ciclos ", (0, jsx_runtime_1.jsx)("strong", { className: "text-blue-900 font-extrabold", children: "BECA 18" }), ", ", (0, jsx_runtime_1.jsx)("strong", { className: "text-blue-900 font-extrabold", children: "ANUAL SAN MARCOS Turno MA\u00D1ANA O TARDE" }), " y ", (0, jsx_runtime_1.jsx)("strong", { className: "text-blue-900 font-extrabold", children: "ESCOLAR UNI Turno MA\u00D1ANA O TARDE" }), ". \u00A1A todos los alumnos de colegios p\u00FAblicos de El Agustino!"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative pt-6 pb-6 px-6 bg-white rounded-2xl border border-slate-200/70 shadow-sm hover-card-trigger overflow-hidden flex flex-col justify-between text-left transition duration-300 hover:shadow-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-500" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3 mb-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-11 w-11 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 text-xl border border-cyan-100 flex-shrink-0", children: "\u23F0" }), (0, jsx_runtime_1.jsx)("h4", { className: "font-extrabold text-sm sm:text-base text-[#0f2c59] tracking-wider uppercase", children: "HORARIOS" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-yellow-50 border border-yellow-200/60 rounded-xl py-2 px-3 flex items-center justify-center space-x-2 mb-3.5 shadow-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs sm:text-sm", children: "\uD83D\uDCC5" }), (0, jsx_runtime_1.jsx)("p", { className: "text-[10.5px] sm:text-xs font-black text-[#c65911] uppercase tracking-wider", children: "S\u00E1bados: 8:30 am - 1:00 pm" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border border-slate-150 rounded-xl overflow-hidden shadow-sm bg-white", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-12 bg-slate-50 border-b border-slate-100 text-slate-500 text-[8.5px] sm:text-[9.5px] font-bold uppercase text-center py-1.5", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-span-5 border-r border-slate-100", children: "Etapas" }), (0, jsx_runtime_1.jsx)("div", { className: "col-span-7", children: "Duraci\u00F3n" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-12 border-b border-slate-100 items-center py-2 px-1 bg-white hover:bg-slate-50/50 transition", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-span-5 flex justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "bg-[#e1251b] text-white text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full leading-none", children: "1\u00AA Etapa" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "col-span-7 flex items-center justify-center space-x-1 text-[9px] sm:text-[10.5px] font-bold text-slate-600", children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD83D\uDCC5" }), (0, jsx_runtime_1.jsx)("span", { children: "13 Jun al 25 Jul" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-12 items-center py-2 px-1 bg-slate-50/20 hover:bg-slate-50/50 transition", children: [(0, jsx_runtime_1.jsx)("div", { className: "col-span-5 flex justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "bg-[#0f2c59] text-white text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full leading-none", children: "2\u00AA Etapa" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "col-span-7 flex items-center justify-center space-x-1 text-[9px] sm:text-[10.5px] font-bold text-slate-600", children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD83D\uDCC5" }), (0, jsx_runtime_1.jsx)("span", { children: "29 Ago al 05 Dic" })] })] })] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { id: "exams-section", className: "max-w-5xl mx-auto my-12 p-6 sm:p-8 bg-[#fff59d] rounded-3xl border-2 border-yellow-400 shadow-lg space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "border-b border-yellow-400/50 pb-3 flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm sm:text-base md:text-lg font-black text-slate-800 flex items-center uppercase tracking-wider gap-2", children: "\uD83D\uDCDD EX\u00C1MENES Y SIMULACROS PARA RENDIR" }), (0, jsx_runtime_1.jsxs)("span", { className: "px-3.5 py-1.5 bg-violet-600 text-white rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm", children: [exams.length, " Simulacros"] })] }), exams.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 w-12 bg-violet-50 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl", children: "\uD83D\uDD0D" }), (0, jsx_runtime_1.jsx)("h4", { className: "text-base font-bold text-slate-800", children: "No hay simulacros cargados actualmente" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-slate-650 mt-2 max-w-md mx-auto text-sm", children: ["Pide al docente administrador que cargue las preguntas del examen y configure las claves desde el ", (0, jsx_runtime_1.jsx)("strong", { children: "Acceso Docente" }), " en la parte superior derecha."] })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: exams.map((exam) => {
                                                            const examQuestions = questions.filter((q) => q.examId === exam.id);
                                                            const examQCount = examQuestions.length;
                                                            return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-violet-300 transition duration-300 flex flex-col justify-between group text-left", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "px-3 py-1 bg-violet-50 text-violet-700 text-[10px] sm:text-[11px] font-bold rounded-full uppercase tracking-wider border border-violet-100", children: "Simulacro Oficial" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-[11.5px] sm:text-xs text-slate-500 font-bold flex items-center", children: ["\uD83D\uDCDD ", examQCount, " Preguntas"] })] }), (0, jsx_runtime_1.jsx)("h4", { className: "text-sm sm:text-base md:text-lg font-black text-slate-900 group-hover:text-violet-650 transition leading-snug", children: exam.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-650 text-xs sm:text-[13px] leading-relaxed line-clamp-3", children: exam.description || "Simulación cronometrada oficial del examen de admisión APPU." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-5 pt-3.5 border-t border-slate-150 flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-[10px] sm:text-[11px] font-extrabold text-slate-500 uppercase tracking-wider", children: ["M\u00E1ximo: ", examQCount * 10, " Ptos"] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleSelectExam(exam), className: "px-5 py-2 bg-violet-600 text-white rounded-full text-xs sm:text-sm font-extrabold hover:bg-violet-700 shadow-sm hover:shadow transition-all duration-200 uppercase tracking-wider", children: "Comenzar Examen" })] })] }, exam.id));
                                                        }) }))] })] })] })), currentView === 'student-exam' && selectedExam && ((0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-violet-600 tracking-wider uppercase", children: "Simulacro en progreso" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-extrabold text-slate-900 mt-1", children: selectedExam.name })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 flex items-center", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5 text-slate-500 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[10px] uppercase font-bold text-slate-400", children: "Tiempo Transcurrido" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-slate-800 font-mono leading-none mt-0.5", children: formatTime(elapsedTime) })] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleFinishExam, className: "px-5 py-3 bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-100 hover:bg-rose-700 hover:shadow-none transition text-sm flex items-center", children: "Finalizar Simulacro" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6 items-start", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider", children: "Progreso del Examen" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-5 gap-2.5", children: activeExamQuestions.map((q, idx) => {
                                                            const isAnswered = studentAnswers[q.id] !== undefined;
                                                            const isActive = idx === activeQuestionIndex;
                                                            return ((0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                                    setActiveQuestionIndex(idx);
                                                                    triggerMathJax();
                                                                }, className: `h-10 rounded-xl font-bold text-sm transition flex items-center justify-center border-2 ${isActive
                                                                    ? 'border-violet-600 bg-violet-50 text-violet-700'
                                                                    : isAnswered
                                                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'}`, children: idx + 1 }, q.id));
                                                        }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-3.5 h-3.5 rounded-md border-2 border-emerald-500 bg-emerald-50 mr-2" }), (0, jsx_runtime_1.jsx)("span", { children: "Respondida" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-3.5 h-3.5 rounded-md border-2 border-slate-200 bg-slate-50 mr-2" }), (0, jsx_runtime_1.jsx)("span", { children: "Sin responder" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-3.5 h-3.5 rounded-md border-2 border-violet-600 bg-violet-50 mr-2" }), (0, jsx_runtime_1.jsx)("span", { children: "Pregunta Actual" })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-3 space-y-6", children: activeExamQuestions[activeQuestionIndex] && ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100 mb-6", children: (0, jsx_runtime_1.jsxs)("span", { className: "px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs", children: ["Pregunta ", activeQuestionIndex + 1, " de ", activeExamQuestions.length] }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-lg font-medium text-slate-950 mb-6 leading-relaxed whitespace-pre-line overflow-auto", children: activeExamQuestions[activeQuestionIndex].text }), activeExamQuestions[activeQuestionIndex].imageType !== 'none' && activeExamQuestions[activeQuestionIndex].imageUrl && ((0, jsx_runtime_1.jsx)("div", { className: "my-6 p-4 border border-slate-100 bg-slate-50 rounded-xl flex justify-center max-h-96 overflow-hidden", children: (0, jsx_runtime_1.jsx)("img", { src: activeExamQuestions[activeQuestionIndex].imageUrl, alt: `Gráfico Pregunta ${activeQuestionIndex + 1}`, className: "max-h-80 object-contain rounded-lg", onError: (e) => {
                                                                    e.currentTarget.style.display = 'none';
                                                                    showToast("No se pudo cargar la imagen del gráfico.", "warning");
                                                                } }) })), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3 mt-6", children: ['A', 'B', 'C', 'D', 'E'].map((letter) => {
                                                                const optionText = activeExamQuestions[activeQuestionIndex].options?.[letter];
                                                                if (!optionText && optionText !== '0')
                                                                    return null;
                                                                const isSelected = studentAnswers[activeExamQuestions[activeQuestionIndex].id] === letter;
                                                                return ((0, jsx_runtime_1.jsxs)("button", { onClick: () => handleSelectOption(activeExamQuestions[activeQuestionIndex].id, letter), className: `w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${isSelected
                                                                        ? 'border-violet-600 bg-violet-50 text-violet-900 shadow-sm'
                                                                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center pr-4 overflow-auto", children: [(0, jsx_runtime_1.jsx)("span", { className: `h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 transition-colors ${isSelected
                                                                                        ? 'bg-violet-600 text-white'
                                                                                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'}`, children: letter }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-medium", children: optionText })] }), (0, jsx_runtime_1.jsx)("div", { className: `h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-violet-600 bg-violet-600' : 'border-slate-300'}`, children: isSelected && (0, jsx_runtime_1.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-white" }) })] }, letter));
                                                            }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mt-10 pt-6 border-t border-slate-100", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: () => {
                                                                        if (activeQuestionIndex > 0) {
                                                                            setActiveQuestionIndex(activeQuestionIndex - 1);
                                                                            triggerMathJax();
                                                                        }
                                                                    }, disabled: activeQuestionIndex === 0, className: `px-5 py-2.5 rounded-xl text-sm font-semibold border flex items-center transition ${activeQuestionIndex === 0
                                                                        ? 'border-slate-150 text-slate-300 cursor-not-allowed'
                                                                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`, children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) }), "Anterior"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: () => {
                                                                        if (studentAnswers[activeExamQuestions[activeQuestionIndex].id] === undefined) {
                                                                            showToast("No olvides que puedes omitir o responder después.", "info");
                                                                        }
                                                                        if (activeQuestionIndex < activeExamQuestions.length - 1) {
                                                                            setActiveQuestionIndex(activeQuestionIndex + 1);
                                                                            triggerMathJax();
                                                                        }
                                                                    }, disabled: activeQuestionIndex === activeExamQuestions.length - 1, className: `px-5 py-2.5 rounded-xl text-sm font-semibold border flex items-center transition ${activeQuestionIndex === activeExamQuestions.length - 1
                                                                        ? 'border-slate-150 text-slate-300 cursor-not-allowed'
                                                                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`, children: ["Siguiente", (0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 ml-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })] })] })] })) })] })] })), currentView === 'student-results' && selectedExam && ((0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm mb-8 animate-fade-in", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-gradient-to-r from-violet-600 to-indigo-700 text-white p-8 text-center md:text-left md:flex md:items-center md:justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "px-3 py-1 bg-violet-500/30 text-violet-100 text-xs font-bold uppercase rounded-lg", children: "Simulacro Finalizado" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-black mt-2", children: selectedExam.name }), (0, jsx_runtime_1.jsxs)("p", { className: "text-violet-200 text-sm mt-1", children: ["Tiempo de resoluci\u00F3n: ", formatTime(elapsedTime)] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 md:mt-0 bg-white/10 rounded-2xl p-4 backdrop-blur-sm inline-block", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs uppercase font-bold tracking-wider text-violet-200", children: "Puntaje Obtenido" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-4xl font-black mt-1 font-mono", children: [calculateResults().score, " ", (0, jsx_runtime_1.jsxs)("span", { className: "text-lg font-normal text-violet-200", children: ["/ ", calculateResults().maxScore, " pts"] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-50 border-t border-slate-100", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-5 rounded-2xl border border-slate-200 flex items-center space-x-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "h-12 w-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 font-bold text-xl", children: [calculateResults().percentage, "%"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-400 font-bold uppercase", children: "Efectividad" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-slate-800", children: "Rendimiento" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-5 rounded-2xl border border-slate-200 flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xl", children: calculateResults().correct }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-400 font-bold uppercase", children: "Buenas (+10pts)" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-slate-800", children: "Correctas" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-5 rounded-2xl border border-slate-200 flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 w-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 font-bold text-xl", children: calculateResults().incorrect }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-400 font-bold uppercase", children: "Malas (-2pts)" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-slate-800", children: "Incorrectas" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-5 rounded-2xl border border-slate-200 flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-xl", children: calculateResults().omitted }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-400 font-bold uppercase", children: "Omitidas (0pts)" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-slate-800", children: "Sin responder" })] })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center my-6", children: (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                setShowRankingInResults(true);
                                                setTimeout(() => {
                                                    const rankingSec = document.getElementById('results-ranking-section');
                                                    rankingSec?.scrollIntoView({ behavior: 'smooth' });
                                                }, 100);
                                            }, className: "px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-750 hover:to-indigo-750 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 transform duration-155 flex items-center space-x-2 text-sm sm:text-base tracking-wider uppercase", children: (0, jsx_runtime_1.jsx)("span", { children: "\uD83C\uDFC6 VER MI POSICI\u00D3N EN EL RANKING DE PARTICIPANTES" }) }) }), showRankingInResults && ((0, jsx_runtime_1.jsxs)("div", { id: "results-ranking-section", className: "max-w-7xl mx-auto my-8 p-6 sm:p-8 bg-[#e0f2fe]/90 rounded-3xl border-2 border-blue-400 shadow-lg space-y-6 text-left animate-fade-in", children: [(0, jsx_runtime_1.jsxs)("div", { className: "border-b border-blue-300 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-base sm:text-lg md:text-xl font-black text-slate-900 flex items-center uppercase tracking-wider gap-2", children: "\uD83C\uDFC6 CUADRO DE HONOR Y CLASIFICACIONES" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs sm:text-sm text-slate-650 mt-1", children: "Sigue los mejores puntajes y el desempe\u00F1o acad\u00E9mico en tiempo real." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex bg-white/80 p-1.5 rounded-xl border border-blue-300/80 self-start sm:self-center shadow-sm", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => { setActiveRankingTab('general'); triggerMathJax(); }, className: `px-5 py-2 rounded-lg text-xs sm:text-sm font-extrabold transition-all duration-150 ${activeRankingTab === 'general'
                                                                    ? 'bg-blue-600 text-white shadow-md font-black'
                                                                    : 'text-slate-650 hover:text-slate-900 hover:bg-slate-100/50'}`, children: "Top 10 General" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => { setActiveRankingTab('schools'); triggerMathJax(); }, className: `px-5 py-2 rounded-lg text-xs sm:text-sm font-extrabold transition-all duration-150 ${activeRankingTab === 'schools'
                                                                    ? 'bg-blue-600 text-white shadow-md font-black'
                                                                    : 'text-slate-650 hover:text-slate-900 hover:bg-slate-100/50'}`, children: "Colegios (Top 3)" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => { setActiveRankingTab('grades'); triggerMathJax(); }, className: `px-5 py-2 rounded-lg text-xs sm:text-sm font-extrabold transition-all duration-150 ${activeRankingTab === 'grades'
                                                                    ? 'bg-blue-600 text-white shadow-md font-black'
                                                                    : 'text-slate-650 hover:text-slate-900 hover:bg-slate-100/50'}`, children: "Grados (Top 3)" })] })] }), results.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-4xl block mb-2", children: "\u2B50" }), (0, jsx_runtime_1.jsx)("h4", { className: "text-base font-bold text-slate-800", children: "A\u00FAn no se registran resultados" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-500 mt-1 max-w-sm mx-auto text-sm", children: "\u00A1S\u00E9 el primero en dar un simulacro y liderar el ranking general! Completa una de las pruebas de arriba." })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [activeRankingTab === 'general' && ((0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-2xl border border-blue-200/80 shadow-md overflow-hidden animate-fade-in", children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full text-left border-collapse text-xs sm:text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "bg-blue-50/60 border-b border-blue-100 text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-700", children: [(0, jsx_runtime_1.jsx)("th", { className: "py-3.5 px-5 text-center w-20", children: "Puesto" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3.5 px-5", children: "Estudiante" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3.5 px-5", children: "Colegio" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3.5 px-5", children: "Grado" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3.5 px-5 text-center", children: "Tiempo" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3.5 px-5 text-right pr-8", children: "Puntaje" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-blue-50 font-medium text-slate-700 bg-white", children: getGeneralRanking().map((res, index) => {
                                                                            const rank = index + 1;
                                                                            return ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-blue-50/20 transition", children: [(0, jsx_runtime_1.jsxs)("td", { className: "py-4 px-5 text-center font-bold text-sm sm:text-base", children: [rank === 1 && (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", title: "1\u00B0 Puesto", children: "\uD83E\uDD47" }), rank === 2 && (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", title: "2\u00B0 Puesto", children: "\uD83E\uDD48" }), rank === 3 && (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", title: "3\u00B0 Puesto", children: "\uD83E\uDD49" }), rank > 3 && (0, jsx_runtime_1.jsx)("span", { className: "text-slate-500 font-extrabold", children: rank })] }), (0, jsx_runtime_1.jsxs)("td", { className: "py-4 px-5 font-black text-slate-900 text-sm sm:text-base", children: [res.studentName, (0, jsx_runtime_1.jsxs)("span", { className: "block text-[10px] sm:text-[11px] text-slate-500 font-bold mt-0.5", children: ["Tutor: ", res.tutor] })] }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-5 text-slate-700 font-semibold text-xs sm:text-sm", children: res.school }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-5", children: (0, jsx_runtime_1.jsx)("span", { className: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-[10px] sm:text-xs font-extrabold border border-blue-200/50", children: res.grade }) }), (0, jsx_runtime_1.jsx)("td", { className: "py-4 px-5 text-center text-slate-700 font-mono text-xs sm:text-sm font-bold", children: formatTime(res.timeSpent || 0) }), (0, jsx_runtime_1.jsxs)("td", { className: "py-4 px-5 text-right pr-8 font-mono font-black text-violet-700 text-base sm:text-lg", children: [res.score, " ", (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-slate-500", children: "pts" })] })] }, res.id));
                                                                        }) })] }) }) })), activeRankingTab === 'schools' && ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in", children: getRankingsByGroup('school', 3).map((schoolGroup) => ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-blue-200/80 shadow-md p-5 flex flex-col justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-blue-100 pb-2 mb-3", children: (0, jsx_runtime_1.jsxs)("h4", { className: "font-black text-slate-900 text-sm sm:text-base flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg mr-2", children: "\uD83C\uDFEB" }), schoolGroup.name] }) }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-2.5", children: schoolGroup.topResults.map((res, idx) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-3 rounded-xl bg-blue-50/30 border border-blue-100/70 hover:bg-blue-50/60 transition", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3 overflow-hidden", children: [(0, jsx_runtime_1.jsx)("span", { className: `h-7 w-7 rounded-lg font-black text-sm flex items-center justify-center flex-shrink-0 ${idx === 0 ? 'bg-yellow-100 text-yellow-800' :
                                                                                            idx === 1 ? 'bg-slate-200 text-slate-700' : 'bg-orange-100 text-orange-850'}`, children: idx + 1 }), (0, jsx_runtime_1.jsxs)("div", { className: "truncate", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-black text-slate-900 truncate", children: res.studentName }), (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] sm:text-xs font-semibold text-slate-500 truncate", children: res.grade })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right flex-shrink-0 ml-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm sm:text-base font-black text-violet-750 font-mono", children: res.score }), (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-slate-500 font-mono mt-0.5 font-bold", children: formatTime(res.timeSpent || 0) })] })] }, res.id))) })] }, schoolGroup.name))) })), activeRankingTab === 'grades' && ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in", children: getRankingsByGroup('grade', 3).map((gradeGroup) => ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-blue-200/80 shadow-md p-5 flex flex-col justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-blue-100 pb-2 mb-3", children: (0, jsx_runtime_1.jsxs)("h4", { className: "font-black text-slate-900 text-sm sm:text-base flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg mr-2", children: "\uD83C\uDF93" }), gradeGroup.name] }) }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-2.5", children: gradeGroup.topResults.map((res, idx) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-3 rounded-xl bg-blue-50/30 border border-blue-100/70 hover:bg-blue-50/60 transition", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3 overflow-hidden", children: [(0, jsx_runtime_1.jsx)("span", { className: `h-7 w-7 rounded-lg font-black text-sm flex items-center justify-center flex-shrink-0 ${idx === 0 ? 'bg-yellow-100 text-yellow-800' :
                                                                                            idx === 1 ? 'bg-slate-200 text-slate-700' : 'bg-orange-100 text-orange-850'}`, children: idx + 1 }), (0, jsx_runtime_1.jsxs)("div", { className: "truncate", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-black text-slate-900 truncate", children: res.studentName }), (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] sm:text-xs font-semibold text-slate-500 truncate", children: res.school })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right flex-shrink-0 ml-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm sm:text-base font-black text-violet-750 font-mono", children: res.score }), (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] text-slate-500 font-mono mt-0.5 font-bold", children: formatTime(res.timeSpent || 0) })] })] }, res.id))) })] }, gradeGroup.name))) }))] }))] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row items-center justify-between mb-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold text-slate-800 mb-4 sm:mb-0", children: "Revisi\u00F3n de Preguntas y Solucionario" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3", children: [(0, jsx_runtime_1.jsx)("button", { onClick: restartExam, className: "px-5 py-2.5 border border-slate-200 hover:bg-slate-100 rounded-xl font-semibold text-sm transition text-slate-700", children: "Volver a Intentar" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                            setSelectedExam(null);
                                                            setCurrentView('student-home');
                                                            triggerMathJax();
                                                        }, className: "px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl text-sm transition", children: "Ir al Inicio" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-6", children: activeExamQuestions.map((q, idx) => {
                                            const studentAns = studentAnswers[q.id];
                                            const isCorrect = studentAns === q.correctOption;
                                            const isOmitted = !studentAns;
                                            return ((0, jsx_runtime_1.jsxs)("div", { className: `bg-white rounded-2xl border overflow-hidden shadow-sm transition ${isCorrect
                                                    ? 'border-emerald-200'
                                                    : isOmitted
                                                        ? 'border-amber-200'
                                                        : 'border-rose-200'}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: `px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b gap-3 ${isCorrect
                                                            ? 'bg-emerald-50/50 border-emerald-100'
                                                            : isOmitted
                                                                ? 'bg-amber-50/50 border-amber-100'
                                                                : 'bg-rose-50/50 border-rose-100'}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsxs)("span", { className: "font-bold text-slate-800 text-base", children: ["Pregunta ", idx + 1] }), isCorrect && ((0, jsx_runtime_1.jsxs)("span", { className: "px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: "\u2713" }), " Correcta"] })), !isCorrect && !isOmitted && ((0, jsx_runtime_1.jsxs)("span", { className: "px-2.5 py-0.5 bg-rose-100 text-rose-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: "\u2715" }), " Incorrecta"] })), isOmitted && ((0, jsx_runtime_1.jsxs)("span", { className: "px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: "!" }), " Omitida"] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm font-semibold", children: [isOmitted ? ((0, jsx_runtime_1.jsx)("span", { className: "text-slate-500", children: "No respondiste esta pregunta" })) : ((0, jsx_runtime_1.jsxs)("span", { children: ["Tu respuesta: ", (0, jsx_runtime_1.jsx)("strong", { className: isCorrect ? 'text-emerald-700' : 'text-rose-700', children: studentAns })] })), (0, jsx_runtime_1.jsx)("span", { className: "mx-2 text-slate-300", children: "|" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-emerald-700", children: ["Respuesta correcta: ", (0, jsx_runtime_1.jsx)("strong", { children: q.correctOption })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-slate-900 font-medium mb-4 leading-relaxed whitespace-pre-line overflow-auto", children: q.text }), q.imageType !== 'none' && q.imageUrl && ((0, jsx_runtime_1.jsx)("div", { className: "my-4 p-4 border border-slate-100 bg-slate-50 rounded-xl flex justify-center max-h-72 overflow-hidden", children: (0, jsx_runtime_1.jsx)("img", { src: q.imageUrl, alt: "Gr\u00E1fico del ejercicio", className: "max-h-64 object-contain rounded-lg" }) })), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-4", children: ['A', 'B', 'C', 'D', 'E'].map(l => {
                                                                    const opt = q.options?.[l];
                                                                    if (!opt && opt !== '0')
                                                                        return null;
                                                                    const isCurrentOptCorrect = l === q.correctOption;
                                                                    const isCurrentOptStudent = l === studentAns;
                                                                    return ((0, jsx_runtime_1.jsxs)("div", { className: `p-3 rounded-xl border text-sm flex items-center font-medium ${isCurrentOptCorrect
                                                                            ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                                                                            : isCurrentOptStudent
                                                                                ? 'border-rose-300 bg-rose-50 text-rose-900'
                                                                                : 'border-slate-200 text-slate-600'}`, children: [(0, jsx_runtime_1.jsx)("span", { className: `h-6 w-6 rounded flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 ${isCurrentOptCorrect
                                                                                    ? 'bg-emerald-600 text-white'
                                                                                    : isCurrentOptStudent
                                                                                        ? 'bg-rose-600 text-white'
                                                                                        : 'bg-slate-100 text-slate-500'}`, children: l }), (0, jsx_runtime_1.jsx)("span", { className: "truncate", children: opt })] }, l));
                                                                }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 pt-6 border-t border-slate-100 bg-violet-50/30 rounded-2xl p-5", children: [(0, jsx_runtime_1.jsxs)("h5", { className: "font-extrabold text-violet-800 flex items-center mb-3", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }), "Solucionario Oficial APPU:"] }), q.solutionText ? ((0, jsx_runtime_1.jsx)("p", { className: "text-slate-700 text-sm leading-relaxed whitespace-pre-line overflow-auto", children: q.solutionText })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-slate-400 text-sm italic", children: "El docente administrador no especific\u00F3 una explicaci\u00F3n escrita." })), q.solutionImageType !== 'none' && q.solutionImageUrl && ((0, jsx_runtime_1.jsx)("div", { className: "mt-4 p-4 border border-violet-100 bg-white rounded-xl flex justify-center max-h-96 overflow-hidden", children: (0, jsx_runtime_1.jsx)("img", { src: q.solutionImageUrl, alt: "Gr\u00E1fico Solucionario", className: "max-h-80 object-contain rounded-lg" }) }))] })] })] }, q.id));
                                        }) })] })), currentView === 'admin-panel' && isAdminAuthenticated && ((0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "px-3 py-1 bg-violet-600 text-xs font-bold tracking-wider uppercase rounded-lg", children: "Panel Administrativo Docente" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-extrabold mt-2 tracking-tight", children: "Gestor de Ex\u00E1menes y Preguntas APPU" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-400 text-sm mt-1", children: "Crea evaluaciones, gestiona claves, formatea en LaTeX y sube gr\u00E1ficos." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex bg-slate-800 p-1.5 rounded-2xl border border-slate-700 overflow-x-auto whitespace-nowrap", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setAdminTab('exams'), className: `px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${adminTab === 'exams'
                                                            ? 'bg-violet-600 text-white shadow'
                                                            : 'text-slate-400 hover:text-white'}`, children: "1. Gestionar Ex\u00E1menes" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                            setAdminTab('questions');
                                                            triggerMathJax();
                                                        }, className: `px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${adminTab === 'questions'
                                                            ? 'bg-violet-600 text-white shadow'
                                                            : 'text-slate-400 hover:text-white'}`, children: "2. Banco de Preguntas" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setAdminTab('results'), className: `px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${adminTab === 'results'
                                                            ? 'bg-violet-600 text-white shadow'
                                                            : 'text-slate-400 hover:text-white'}`, children: "3. Registros de Datos" })] })] }), adminTab === 'exams' && ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-start", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-6 lg:col-span-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-sm", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2 flex items-center", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5 mr-2 text-violet-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" }) }), examForm.id ? "Editar Examen / Agrupador" : "Nuevo Examen / Agrupador"] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSaveExam, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-xs font-bold uppercase text-slate-500 mb-1", children: "Nombre del Examen / Grupo" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Ej. Examen General de Becas 2026 - I", value: examForm.name, onChange: (e) => setExamForm({ ...examForm, name: e.target.value }), className: "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none text-sm font-medium" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-xs font-bold uppercase text-slate-500 mb-1", children: "Descripci\u00F3n corta" }), (0, jsx_runtime_1.jsx)("textarea", { rows: 3, placeholder: "Ej. Simulacro oficial de 10 preguntas que eval\u00FAa \u00E1lgebra, trigonometr\u00EDa y razonamiento matem\u00E1tico.", value: examForm.description, onChange: (e) => setExamForm({ ...examForm, description: e.target.value }), className: "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none text-sm" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 pt-2", children: [(0, jsx_runtime_1.jsx)("button", { type: "submit", className: "flex-grow py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl text-sm transition", children: examForm.id ? "Guardar Cambios" : "Crear Examen" }), examForm.id && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setExamForm({ id: null, name: '', description: '' }), className: "px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-sm", children: "Cancelar" }))] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-2", children: "\uD83D\uDCE5" }), "Importar Examen desde JSON"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-505", children: "Carga un examen completo con sus preguntas y gr\u00E1ficos desde un archivo JSON estructurado." }), (0, jsx_runtime_1.jsxs)("div", { className: "border-2 border-dashed border-slate-200 hover:border-violet-400 rounded-2xl p-4 text-center cursor-pointer transition relative group bg-slate-50/50 hover:bg-violet-50/10", children: [(0, jsx_runtime_1.jsx)("input", { type: "file", accept: ".json", onChange: handleJsonImport, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl block group-hover:scale-110 transform transition duration-200", children: "\uD83D\uDCC4" }), (0, jsx_runtime_1.jsx)("span", { className: "block text-xs font-bold text-slate-700", children: "Selecciona o arrastra el archivo .json" }), (0, jsx_runtime_1.jsx)("span", { className: "block text-[10px] text-slate-400", children: "Tama\u00F1o m\u00E1ximo recomendado: 10MB" })] })] }), (0, jsx_runtime_1.jsxs)("details", { className: "group border border-slate-200 rounded-xl overflow-hidden bg-slate-50", children: [(0, jsx_runtime_1.jsxs)("summary", { className: "flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer hover:bg-slate-100 select-none", children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD83D\uDCCB Ver Estructura del JSON de Ejemplo" }), (0, jsx_runtime_1.jsx)("span", { className: "transition-transform group-open:rotate-180 text-[10px]", children: "\u25BC" })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 border-t border-slate-200 bg-slate-905 text-slate-200 text-[10px] font-mono rounded-b-xl max-h-60 overflow-y-auto whitespace-pre", children: `{
  "name": "Simulacro Especial de Becas",
  "description": "Examen de entrenamiento",
  "questions": [
    {
      "text": "¿Cuánto es $2x + 5 = 15$?",
      "options": {
        "A": "3",
        "B": "5",
        "C": "7",
        "D": "9",
        "E": "10"
      },
      "correctOption": "B",
      "solutionText": "Restamos 5 de ambos lados...",
      "imageUrl": "data:image/jpeg;base64,...",
      "order": 1
    }
  ]
}` })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-2", children: "\uD83D\uDDBC\uFE0F" }), "Conversor de Im\u00E1genes a Base64"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-505", children: "Convierte diagramas y figuras locales a c\u00F3digo Base64 para incrustarlos en tus preguntas JSON." }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative border border-slate-300 rounded-xl px-3 py-2 hover:border-slate-400 transition bg-white", children: [(0, jsx_runtime_1.jsx)("span", { className: "block text-[10px] font-bold text-slate-400 uppercase", children: "Seleccionar Imagen" }), (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "image/*", onChange: handleConverterImageUpload, className: "mt-1 block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer cursor-pointer" })] }), converterBase64Result && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 border border-violet-100 bg-violet-50/20 rounded-xl p-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[10px] font-bold text-slate-500 uppercase truncate max-w-[150px]", children: converterFileName || "imagen.jpg" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: handleCopyBase64, className: "px-2.5 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-[9px] font-bold transition shadow-sm", children: "Copiar C\u00F3digo" })] }), (0, jsx_runtime_1.jsx)("div", { className: "border rounded-lg overflow-hidden bg-white p-1.5 flex justify-center max-h-24", children: (0, jsx_runtime_1.jsx)("img", { src: converterBase64Result, alt: "Convertida", className: "max-h-20 object-contain" }) }), (0, jsx_runtime_1.jsx)("textarea", { readOnly: true, rows: 2, value: converterBase64Result, className: "w-full p-2 border border-slate-200 rounded-lg text-[9px] font-mono bg-white text-slate-600 focus:outline-none", onClick: (e) => e.target.select() }), (0, jsx_runtime_1.jsx)("span", { className: "text-[8px] text-slate-400 block text-right", children: "Haz clic en la caja para seleccionar todo el texto." })] }))] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2", children: "Ex\u00E1menes Configurados en la Plataforma" }), exams.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-slate-400 text-sm text-center py-10 italic", children: "A\u00FAn no has creado ning\u00FAn examen grupal para enlazar las preguntas." })) : ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: exams.map((exam) => {
                                                            const qCount = questions.filter((q) => q.examId === exam.id).length;
                                                            return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-slate-300 transition", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-bold text-slate-900 text-base", children: exam.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-500 mt-1 line-clamp-1", children: exam.description || "Sin descripción corta agregada." }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4 mt-2", children: [(0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-0.5 bg-violet-50 text-violet-700 rounded text-[11px] font-bold", children: [qCount, " Preguntas asociadas"] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-[10px] text-slate-400 font-medium", children: ["ID: ", exam.id] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 self-end sm:self-center", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => handleEditExam(exam), className: "p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition", title: "Editar examen", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }) }) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleDeleteExam(exam.id), className: "p-2 border border-slate-200 rounded-lg hover:bg-rose-50 text-rose-600 hover:border-rose-200 transition", title: "Eliminar examen", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) })] })] }, exam.id));
                                                        }) }))] })] })), adminTab === 'questions' && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-8", children: [(0, jsx_runtime_1.jsxs)("div", { id: "question-form-section", className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "border-b border-slate-100 pb-4 mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold text-slate-800", children: questionForm.id ? "Modificando Pregunta Existente" : "Crear / Añadir Nueva Pregunta de Opción Múltiple" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-500 mt-1", children: "Configura el enunciado, alternativas, soluci\u00F3n, orden e im\u00E1genes." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-amber-50 border border-amber-200 rounded-xl p-3 max-w-sm text-[11px] text-amber-900 leading-normal", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-extrabold uppercase text-amber-800 block mb-1", children: "Gu\u00EDa LaTeX para F\u00F3rmulas:" }), "Usa un solo ", (0, jsx_runtime_1.jsx)("code", { className: "bg-white/70 px-1 rounded font-bold", children: "$" }), " para f\u00F3rmulas en l\u00EDnea y doble ", (0, jsx_runtime_1.jsx)("code", { className: "bg-white/70 px-1 rounded font-bold", children: "$$" }), " para centrado.", (0, jsx_runtime_1.jsx)("br", {}), "Ejemplos: ", (0, jsx_runtime_1.jsx)("code", { className: "bg-white/70 px-1 rounded font-mono", children: "$\\frac{a}{b}$" }), ", ", (0, jsx_runtime_1.jsx)("code", { className: "bg-white/70 px-1 rounded font-mono", children: "$\\sqrt{x}$" }), ", ", (0, jsx_runtime_1.jsx)("code", { className: "bg-white/70 px-1 rounded font-mono", children: "$x^2$" }), ", ", (0, jsx_runtime_1.jsx)("code", { className: "bg-white/70 px-1 rounded font-mono", children: "$\\alpha$" }), "."] })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSaveQuestion, className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-xs font-bold uppercase text-slate-500 mb-1.5", children: "1. Agrupar en Examen (Obligatorio)" }), (0, jsx_runtime_1.jsxs)("select", { value: questionForm.examId, onChange: (e) => setQuestionForm({ ...questionForm, examId: e.target.value }), className: "w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none text-sm font-semibold bg-white", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "-- Seleccionar Examen --" }), exams.map((e) => ((0, jsx_runtime_1.jsx)("option", { value: e.id, children: e.name }, e.id)))] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-xs font-bold uppercase text-slate-500 mb-1.5", children: "2. Posici\u00F3n / Orden num\u00E9rico" }), (0, jsx_runtime_1.jsx)("input", { type: "number", min: "0", value: questionForm.order, onChange: (e) => setQuestionForm({ ...questionForm, order: Number(e.target.value) }), className: "w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none text-sm" }), (0, jsx_runtime_1.jsx)("span", { className: "text-[10px] text-slate-400 block mt-1", children: "Sirve para ordenar el orden del simulacro." })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-xs font-bold uppercase text-slate-500 mb-1.5", children: "3. Respuesta Clave" }), (0, jsx_runtime_1.jsx)("select", { value: questionForm.correctOption, onChange: (e) => setQuestionForm({ ...questionForm, correctOption: e.target.value }), className: "w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none text-sm font-bold bg-white text-emerald-700", children: ['A', 'B', 'C', 'D', 'E'].map(l => ((0, jsx_runtime_1.jsxs)("option", { value: l, children: ["Opci\u00F3n ", l] }, l))) })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-xs font-bold uppercase text-slate-500 mb-1.5", children: "4. Enunciado de la Pregunta (Soporta LaTeX)" }), (0, jsx_runtime_1.jsx)("textarea", { rows: 4, placeholder: "Escribe el problema aqu\u00ED. Puedes agregar s\u00EDmbolos, ej: Hallar el valor de $x$ en la ecuaci\u00F3n: $2x^2 + 5x - 3 = 0$", value: questionForm.text, onChange: (e) => setQuestionForm({ ...questionForm, text: e.target.value }), className: "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none text-sm font-medium" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center mt-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[10px] text-slate-400", children: "Presiona \"Visualizar F\u00F3rmulas\" abajo para renderizar lo escrito." }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: triggerMathJax, className: "px-3 py-1 bg-violet-100 hover:bg-violet-200 text-violet-700 text-xs font-bold rounded-lg transition", children: "Visualizar F\u00F3rmulas (LaTeX)" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-50 p-4 rounded-2xl border border-slate-200", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-xs font-bold uppercase text-slate-600 mb-2", children: "5. \u00BFLleva Imagen/Gr\u00E1fico el Enunciado?" }), (0, jsx_runtime_1.jsx)("div", { className: "flex space-x-4 mb-3", children: [['none', 'Sin gráfico'], ['url', 'Por Enlace (URL)'], ['file', 'Cargar Imagen Local']].map(([val, label]) => ((0, jsx_runtime_1.jsxs)("label", { className: "flex items-center text-sm font-medium text-slate-700 cursor-pointer", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "imageType", value: val, checked: questionForm.imageType === val, onChange: (e) => setQuestionForm({ ...questionForm, imageType: e.target.value }), className: "mr-1.5 text-violet-600 focus:ring-violet-500" }), label] }, val))) }), questionForm.imageType === 'url' && ((0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Pega la URL de la imagen aqu\u00ED (Ej: https://sitio.com/grafico.png)", value: questionForm.imageUrl, onChange: (e) => setQuestionForm({ ...questionForm, imageUrl: e.target.value }), className: "w-full px-3 py-2 border border-slate-300 rounded-xl text-xs" })), questionForm.imageType === 'file' && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "file", accept: "image/*", onChange: (e) => {
                                                                                    const file = e.target.files?.[0];
                                                                                    if (file) {
                                                                                        handleImageUpload(file, (base64Str) => {
                                                                                            setQuestionForm({ ...questionForm, imageUrl: base64Str });
                                                                                        });
                                                                                    }
                                                                                }, className: "text-xs text-slate-600 block" }), questionForm.imageUrl && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-3 max-w-xs border rounded-lg overflow-hidden bg-white p-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[9px] text-slate-400 font-bold uppercase mb-1", children: "Previsualizaci\u00F3n de Gr\u00E1fico:" }), (0, jsx_runtime_1.jsx)("img", { src: questionForm.imageUrl, alt: "Cargada", className: "max-h-32 object-contain" })] }))] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-xs font-bold uppercase text-slate-500", children: "6. Alternativas (Soportan LaTeX)" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-4", children: ['A', 'B', 'C', 'D', 'E'].map((letter) => ((0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-3 top-3 h-6 w-6 rounded bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center border", children: letter }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: `Alternativa ${letter}`, value: questionForm.options[letter], onChange: (e) => {
                                                                                        const opts = { ...questionForm.options };
                                                                                        opts[letter] = e.target.value;
                                                                                        setQuestionForm({ ...questionForm, options: opts });
                                                                                    }, className: "w-full pl-11 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none text-xs font-semibold" })] }, letter))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border-t border-slate-150 pt-6 space-y-4", children: [(0, jsx_runtime_1.jsxs)("h4", { className: "font-bold text-slate-800 text-base flex items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-6 w-6 rounded bg-violet-100 text-violet-700 text-xs font-bold inline-flex items-center justify-center mr-2", children: "i" }), "Configuraci\u00F3n del Solucionario (Explicaci\u00F3n del ejercicio)"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-xs font-bold uppercase text-slate-500 mb-1.5", children: "Explicaci\u00F3n Paso a Paso (Soporta LaTeX)" }), (0, jsx_runtime_1.jsx)("textarea", { rows: 3, placeholder: "Ej: Despejamos $x$ de la ecuaci\u00F3n cuadr\u00E1tica por f\u00F3rmula general: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.", value: questionForm.solutionText, onChange: (e) => setQuestionForm({ ...questionForm, solutionText: e.target.value }), className: "w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none text-sm" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-50 p-4 rounded-2xl border border-slate-200", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-xs font-bold uppercase text-slate-600 mb-2", children: "\u00BFLa Soluci\u00F3n lleva alg\u00FAn gr\u00E1fico explicativo?" }), (0, jsx_runtime_1.jsx)("div", { className: "flex space-x-4 mb-3", children: [
                                                                                    ['none', 'Sin gráfico de solución'],
                                                                                    ['url', 'Por Enlace (URL)'],
                                                                                    ['file', 'Cargar Imagen Local']
                                                                                ].map(([val, label]) => ((0, jsx_runtime_1.jsxs)("label", { className: "flex items-center text-sm font-medium text-slate-700 cursor-pointer", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "solutionImageType", value: val, checked: questionForm.solutionImageType === val, onChange: (e) => setQuestionForm({ ...questionForm, solutionImageType: e.target.value }), className: "mr-1.5 text-violet-600 focus:ring-violet-500" }), label] }, val))) }), questionForm.solutionImageType === 'url' && ((0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Enlace URL de la soluci\u00F3n", value: questionForm.solutionImageUrl, onChange: (e) => setQuestionForm({ ...questionForm, solutionImageUrl: e.target.value }), className: "w-full px-3 py-2 border border-slate-300 rounded-lg text-xs" })), questionForm.solutionImageType === 'file' && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "file", accept: "image/*", onChange: (e) => {
                                                                                            const file = e.target.files?.[0];
                                                                                            if (file) {
                                                                                                handleImageUpload(file, (base64Str) => {
                                                                                                    setQuestionForm({ ...questionForm, solutionImageUrl: base64Str });
                                                                                                });
                                                                                            }
                                                                                        }, className: "text-xs text-slate-600 block" }), questionForm.solutionImageUrl && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-3 max-w-xs border rounded-lg overflow-hidden bg-white p-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[9px] text-slate-400 font-bold uppercase mb-1", children: "Previsualizaci\u00F3n del gr\u00E1fico de la soluci\u00F3n:" }), (0, jsx_runtime_1.jsx)("img", { src: questionForm.solutionImageUrl, alt: "Soluci\u00F3n cargada", className: "max-h-32 object-contain" })] }))] }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3 pt-4 border-t", children: [(0, jsx_runtime_1.jsx)("button", { type: "submit", className: "px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-sm transition shadow-md hover:shadow-lg", children: questionForm.id ? "Guardar Pregunta Modificada" : "Guardar e Incrementar Pregunta" }), questionForm.id && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setQuestionForm({
                                                                            id: null,
                                                                            examId: questionForm.examId,
                                                                            text: '',
                                                                            imageType: 'none',
                                                                            imageUrl: '',
                                                                            options: { A: '', B: '', C: '', D: '', E: '' },
                                                                            correctOption: 'A',
                                                                            solutionText: '',
                                                                            solutionImageType: 'none',
                                                                            solutionImageUrl: '',
                                                                            order: 0
                                                                        }), className: "px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold", children: "Cancelar Modificaci\u00F3n" }))] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "border-b border-slate-150 pb-4 mb-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold text-slate-800", children: "Banco de Preguntas Registradas" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-slate-400 mt-1", children: "Busca, edita, ordena y elimina preguntas cargadas." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-[10px] font-bold text-slate-400 uppercase mb-1", children: "Filtrar por Examen" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedAdminExamId, onChange: (e) => {
                                                                            setSelectedAdminExamId(e.target.value);
                                                                            triggerMathJax();
                                                                        }, className: "w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-semibold bg-white", children: [(0, jsx_runtime_1.jsx)("option", { value: "all", children: "-- Todos los Ex\u00E1menes --" }), exams.map((e) => ((0, jsx_runtime_1.jsx)("option", { value: e.id, children: e.name }, e.id)))] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-[10px] font-bold text-slate-400 uppercase mb-1", children: "Buscar por Texto" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Buscar en enunciados...", value: searchQuestionQuery, onChange: (e) => setSearchQuestionQuery(e.target.value), className: "w-full px-3 py-2 border border-slate-300 rounded-xl text-sm" })] })] }), filteredAdminQuestions.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-center text-slate-400 py-12 italic text-sm", children: "No se encontraron preguntas que coincidan con los criterios de b\u00FAsqueda." })) : ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: filteredAdminQuestions.map((q, idx) => {
                                                            const parentExam = exams.find((e) => e.id === q.examId);
                                                            return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 border border-slate-200 rounded-2xl hover:border-slate-300 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-grow overflow-auto pr-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2.5 flex-wrap gap-y-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-extrabold text-[10px] uppercase", children: ["Pregunta #", q.order || 0] }), (0, jsx_runtime_1.jsx)("span", { className: "px-2 py-0.5 bg-violet-100 text-violet-700 rounded font-bold text-[10px] uppercase", children: parentExam ? parentExam.name : "Sin Examen Asignado" }), (0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px] uppercase", children: ["Clave: ", q.correctOption] })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-800 font-medium text-sm mt-3 line-clamp-3 overflow-auto", children: q.text }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3 mt-2", children: [q.imageType !== 'none' && ((0, jsx_runtime_1.jsx)("span", { className: "text-[10px] text-blue-600 font-bold flex items-center", children: "\uD83D\uDCCE Gr\u00E1fico Enunciado" })), q.solutionImageType !== 'none' && ((0, jsx_runtime_1.jsx)("span", { className: "text-[10px] text-indigo-600 font-bold flex items-center", children: "\uD83D\uDCCE Gr\u00E1fico Soluci\u00F3n" }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 flex-shrink-0 self-end md:self-center", children: [selectedAdminExamId !== 'all' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => handleShiftQuestionOrder(idx, -1), disabled: idx === 0, className: `p-1.5 rounded-lg border text-slate-500 hover:bg-slate-100 ${idx === 0 ? 'opacity-30 cursor-not-allowed' : ''}`, title: "Subir posici\u00F3n", children: "\u25B2" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleShiftQuestionOrder(idx, 1), disabled: idx === filteredAdminQuestions.length - 1, className: `p-1.5 rounded-lg border text-slate-500 hover:bg-slate-100 ${idx === filteredAdminQuestions.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`, title: "Bajar posici\u00F3n", children: "\u25BC" })] })), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleEditQuestion(q), className: "p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 transition", title: "Editar", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }) }) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleDeleteQuestion(q.id), className: "p-2 border border-slate-200 rounded-lg hover:bg-rose-50 hover:border-rose-200 text-rose-600 transition", title: "Eliminar", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) })] })] }, q.id));
                                                        }) }))] })] })), adminTab === 'results' && ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-b border-slate-100 pb-2 mb-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold text-slate-800", children: "Registros de Estudiantes y Resultados" }), (0, jsx_runtime_1.jsxs)("button", { onClick: handleExportCSV, className: "px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-xs font-bold transition flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u2B07\uFE0F" }), (0, jsx_runtime_1.jsx)("span", { children: "Exportar CSV" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full text-left border-collapse text-xs sm:text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500", children: [(0, jsx_runtime_1.jsx)("th", { className: "py-3 px-4", children: "Estudiante" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3 px-4", children: "DNI" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3 px-4", children: "Tel\u00E9fono" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3 px-4", children: "Colegio" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3 px-4", children: "Grado" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3 px-4", children: "Tutor" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3 px-4", children: "Examen/Registro" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3 px-4", children: "Etiqueta" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3 px-4 text-right", children: "Puntaje" }), (0, jsx_runtime_1.jsx)("th", { className: "py-3 px-4 text-center", children: "Acci\u00F3n" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-slate-100 font-medium text-slate-700", children: results.length === 0 ? ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: 10, className: "py-8 text-center text-slate-400 italic", children: "No hay registros de datos a\u00FAn." }) })) : (results.map((res) => ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-slate-50 transition", children: [(0, jsx_runtime_1.jsx)("td", { className: "py-3 px-4 font-bold text-slate-900", children: res.studentName }), (0, jsx_runtime_1.jsx)("td", { className: "py-3 px-4", children: res.dni || '-' }), (0, jsx_runtime_1.jsx)("td", { className: "py-3 px-4", children: res.phone || '-' }), (0, jsx_runtime_1.jsx)("td", { className: "py-3 px-4", children: res.school }), (0, jsx_runtime_1.jsx)("td", { className: "py-3 px-4", children: res.grade }), (0, jsx_runtime_1.jsx)("td", { className: "py-3 px-4", children: res.tutor }), (0, jsx_runtime_1.jsx)("td", { className: "py-3 px-4 text-[10px] sm:text-xs", children: res.examName }), (0, jsx_runtime_1.jsx)("td", { className: "py-3 px-4 text-[10px] sm:text-xs", children: res.tag === 'concurso' ? ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-0.5 bg-red-100 text-red-800 rounded-full font-bold", children: "Concurso" })) : res.tag === 'reforzamiento' ? ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold", children: "Reforzamiento" })) : ((0, jsx_runtime_1.jsx)("span", { className: "px-2 py-0.5 bg-violet-100 text-violet-800 rounded-full font-bold", children: "Simulacro" })) }), (0, jsx_runtime_1.jsxs)("td", { className: "py-3 px-4 text-right font-black text-violet-700", children: [res.score, res.score !== 'N/A' ? ' pts' : ''] }), (0, jsx_runtime_1.jsx)("td", { className: "py-3 px-4 text-center", children: (0, jsx_runtime_1.jsx)("button", { onClick: () => handleDeleteResult(res.id), className: "p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition inline-flex items-center justify-center", title: "Eliminar registro", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) }) })] }, res.id)))) })] }) }), results.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "mt-4 flex justify-end border-t border-slate-100 pt-4", children: (0, jsx_runtime_1.jsxs)("button", { onClick: handleClearAllResults, className: "px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 rounded-lg text-xs font-bold border border-rose-200 transition flex items-center space-x-1.5 shadow-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD83D\uDDD1\uFE0F" }), (0, jsx_runtime_1.jsx)("span", { children: "Limpiar Todos los Datos" })] }) }))] }))] }))] }))] }), (0, jsx_runtime_1.jsx)("footer", { className: "bg-[#070f22] text-slate-350 py-12 border-t border-slate-900 text-xs mt-16", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-start gap-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start space-y-4 max-w-md text-left", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 text-white", children: [(0, jsx_runtime_1.jsxs)("svg", { className: "w-5 h-5 text-red-500 fill-current", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("path", { d: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" }), (0, jsx_runtime_1.jsx)("path", { d: "M4.14 12.18l7.86 4.29 7.86-4.29v3c0 2.5-3.5 4.82-7.86 4.82S4.14 17.68 4.14 14.68v-3z" })] }), (0, jsx_runtime_1.jsx)("h3", { className: "font-extrabold text-sm sm:text-base tracking-wider uppercase", children: "Colegios y Academia APPU" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-400 text-xs leading-relaxed", children: "\u00A9 2026 Academia APPU. Comprometidos con el desarrollo educativo de los talentos peruanos para Beca 18." }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("a", { href: "#", className: "text-slate-500 hover:text-slate-350 text-xs block transition", children: "Pol\u00EDtica de privacidad y tratamiento de datos" }), (0, jsx_runtime_1.jsx)("a", { href: "#", className: "text-slate-500 hover:text-slate-350 text-xs block transition", children: "T\u00E9rminos de uso" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3 pt-4", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-extrabold text-white text-sm", children: "S\u00EDguenos" }), (0, jsx_runtime_1.jsx)("a", { href: "https://www.facebook.com/colegiosyacademiaappu/", target: "_blank", rel: "noreferrer", className: "w-9 h-9 rounded-xl bg-[#131a31] border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:border-slate-700 transition duration-150 group", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 text-slate-300 group-hover:text-white transition", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" }) }) }), (0, jsx_runtime_1.jsx)("a", { href: "https://www.instagram.com/colegiosyacademiaappu/", target: "_blank", rel: "noreferrer", className: "w-9 h-9 rounded-xl bg-[#131a31] border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:border-slate-700 transition duration-150 group", children: (0, jsx_runtime_1.jsxs)("svg", { className: "w-4 h-4 text-slate-300 group-hover:text-white transition", fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" }), (0, jsx_runtime_1.jsx)("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }), (0, jsx_runtime_1.jsx)("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })] }) }), (0, jsx_runtime_1.jsx)("a", { href: "https://www.tiktok.com/@colegiosyacademiaappu", target: "_blank", rel: "noreferrer", className: "w-9 h-9 rounded-xl bg-[#131a31] border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:border-slate-700 transition duration-150 group", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 text-slate-300 group-hover:text-white transition", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08-.07-.15-.15-.22-.23v6.33c-.05 2.11-.83 4.16-2.32 5.64-1.61 1.61-3.98 2.45-6.26 2.18-2.67-.32-5.06-2.19-5.94-4.75-.97-2.83-.24-6.13 1.88-8.24 1.61-1.61 3.99-2.39 6.25-2.06V11.2c-1.23-.12-2.52.22-3.39 1.15-.89.96-1.12 2.41-.6 3.61.53 1.22 1.83 2.05 3.16 1.97 1.48-.09 2.69-1.37 2.69-2.86V.02z" }) }) }), (0, jsx_runtime_1.jsx)("a", { href: "https://linktr.ee/colegiosyacademiaappu", target: "_blank", rel: "noreferrer", className: "w-9 h-9 rounded-xl bg-[#131a31] border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:border-slate-700 transition duration-150 group", children: (0, jsx_runtime_1.jsxs)("svg", { className: "w-4 h-4 text-slate-300 group-hover:text-white transition", fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "10" }), (0, jsx_runtime_1.jsx)("line", { x1: "2", y1: "12", x2: "22", y2: "12" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })] }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start lg:items-end w-full lg:w-auto mt-6 lg:mt-0", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-extrabold text-white text-sm mb-4 lg:text-right w-full", children: "Nuestras sedes:" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-4 w-full sm:w-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-[#081026] border border-slate-800/80 rounded-2xl p-5 w-full sm:w-72 flex flex-col justify-between items-center text-center shadow-lg hover:border-slate-700 transition duration-300", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center space-x-1.5 mb-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "\uD83D\uDCCD" }), (0, jsx_runtime_1.jsx)("h5", { className: "font-black text-white text-xs tracking-wider uppercase", children: "Sede Santa Anita" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-400 text-[10.5px] leading-normal px-2", children: "Cruce de Av. Metropolitana con Av. Las Vegas" })] }), (0, jsx_runtime_1.jsxs)("a", { href: "https://wa.me/937475882", target: "_blank", rel: "noreferrer", className: "w-full py-2.5 bg-[#12b76a] hover:bg-[#10a35e] text-[#050b18] font-bold text-xs uppercase tracking-wider rounded-xl transition duration-150 flex items-center justify-center space-x-2 shadow-sm", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 flex-shrink-0", fill: "none", stroke: "currentColor", strokeWidth: "2.5", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }), (0, jsx_runtime_1.jsx)("span", { children: "Informes Sede Santa Anita" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-[#081026] border border-slate-800/80 rounded-2xl p-5 w-full sm:w-72 flex flex-col justify-between items-center text-center shadow-lg hover:border-slate-700 transition duration-300", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center space-x-1.5 mb-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "\uD83D\uDCCD" }), (0, jsx_runtime_1.jsx)("h5", { className: "font-black text-white text-xs tracking-wider uppercase", children: "Sede El Agustino" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-400 text-[10.5px] leading-normal px-2", children: "Av. Riva Ag\u00FCero 1137" })] }), (0, jsx_runtime_1.jsxs)("a", { href: "https://wa.me/933019983", target: "_blank", rel: "noreferrer", className: "w-full py-2.5 bg-[#12b76a] hover:bg-[#10a35e] text-[#050b18] font-bold text-xs uppercase tracking-wider rounded-xl transition duration-150 flex items-center justify-center space-x-2 shadow-sm", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 flex-shrink-0", fill: "none", stroke: "currentColor", strokeWidth: "2.5", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }), (0, jsx_runtime_1.jsx)("span", { children: "Informes Sede El Agustino" })] })] })] })] })] }) })] }));
}
