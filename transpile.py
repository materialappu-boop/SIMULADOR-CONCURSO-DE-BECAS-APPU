import re
import os

source_path = r"c:\Users\User\Videos\MARKETING APPU\DESARROLLOS PROYECTOS\SIMULADORES\CONCURSO DE BECAS\simulador_de_examen_appu.jsx"
output_path = r"c:\Users\User\Videos\MARKETING APPU\DESARROLLOS PROYECTOS\SIMULADORES\CONCURSO DE BECAS\simulador_de_examen_appu.html"

with open(source_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Remove module imports
code = re.sub(r"import React,[\s\S]*?from 'firebase/firestore';", "", code)

# 2. Change export default function App() to function App()
code = code.replace("export default function App()", "function App()")

# 3. Convert modular Firebase to compat Firebase
code = re.sub(r"const app\s*=\s*initializeApp\(firebaseConfig\);", "const app = firebase.initializeApp(firebaseConfig);", code)
code = re.sub(r"const auth\s*=\s*getAuth\(app\);", "const auth = firebase.auth();", code)
code = re.sub(r"const db\s*=\s*getFirestore\(app\);", "const db = firebase.firestore();", code)

# Auth functions
code = re.sub(r"await\s+signInWithCustomToken\(auth,\s*([^\)]+)\)", r"await auth.signInWithCustomToken(\1)", code)
code = re.sub(r"await\s+signInAnonymously\(auth\)", "await auth.signInAnonymously()", code)
code = re.sub(r"onAuthStateChanged\(auth,\s*", "auth.onAuthStateChanged(", code)

# Firestore Collections
code = re.sub(
    r"collection\(db,\s*'artifacts',\s*appId,\s*'public',\s*'data',\s*'exams'\)",
    "db.collection('artifacts').doc(appId).collection('public').doc('data').collection('exams')",
    code
)
code = re.sub(
    r"collection\(db,\s*'artifacts',\s*appId,\s*'public',\s*'data',\s*'questions'\)",
    "db.collection('artifacts').doc(appId).collection('public').doc('data').collection('questions')",
    code
)
code = re.sub(
    r"collection\(db,\s*'artifacts',\s*appId,\s*'public',\s*'data',\s*'results'\)",
    "db.collection('artifacts').doc(appId).collection('public').doc('data').collection('results')",
    code
)

# doc(...) references
code = re.sub(
    r"doc\(db,\s*'artifacts',\s*appId,\s*'public',\s*'data',\s*'exams',\s*([^\)]+)\)",
    r"db.collection('artifacts').doc(appId).collection('public').doc('data').collection('exams').doc(\1)",
    code
)
code = re.sub(
    r"doc\(db,\s*'artifacts',\s*appId,\s*'public',\s*'data',\s*'questions',\s*([^\)]+)\)",
    r"db.collection('artifacts').doc(appId).collection('public').doc('data').collection('questions').doc(\1)",
    code
)

# Firestore operation methods
code = re.sub(r"onSnapshot\((examsCollection|questionsCollection),\s*", r"\1.onSnapshot(", code)
code = re.sub(r"await\s+updateDoc\(([^,]+),\s*([^\)]+)\)", r"await \1.update(\2)", code)
code = re.sub(r"await\s+addDoc\(([^,]+),\s*([^\)]+)\)", r"await \1.add(\2)", code)
code = re.sub(r"await\s+deleteDoc\(([^)]+)\)", r"await \1.delete()", code)
code = re.sub(r"writeBatch\(db\)", "db.batch()", code)

# Wrap HTML around the code
html_template = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simulador de Examen APPU</title>
  
  <!-- TailwindCSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- React and ReactDOM CDNs -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin="anonymous"></script>
  
  <!-- Babel Standalone for JSX parsing in browser -->
  <script src="https://unpkg.com/@babel/standalone@7.24.7/babel.min.js" crossorigin="anonymous"></script>
  
  <!-- Firebase Compat SDKs -->
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js" crossorigin="anonymous"></script>
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js" crossorigin="anonymous"></script>
  <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js" crossorigin="anonymous"></script>

  <!-- MathJax Configuration and Script -->
  <script>
    window.MathJax = {{
      tex: {{
        inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
        processEscapes: true
      }},
      options: {{
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
      }}
    }};
  </script>
  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" id="MathJax-script" async></script>
</head>
<body class="bg-slate-50 text-slate-800 font-sans min-h-screen flex flex-col antialiased">
  <script>
    window.addEventListener('error', function(e) {{
      console.error("GLOBAL ERROR CAPTURED: ", e.message, " at ", e.filename, ":", e.lineno);
      var errDiv = document.getElementById('global-error-box');
      if (!errDiv) {{
        errDiv = document.createElement('div');
        errDiv.id = 'global-error-box';
        errDiv.style.color = 'red';
        errDiv.style.padding = '20px';
        errDiv.style.background = '#fee2e2';
        errDiv.style.border = '1px solid #fecaca';
        errDiv.style.margin = '20px';
        errDiv.style.fontFamily = 'monospace';
        errDiv.style.whiteSpace = 'pre-wrap';
        document.body.insertBefore(errDiv, document.body.firstChild);
      }}
      errDiv.innerText += "Error: " + e.message + "\\nStack: " + (e.error ? e.error.stack : "") + "\\n\\n";
    }});
  </script>

  <div id="root"></div>

  <script type="text/plain" id="react-code">
    try {{
      const {{ useState, useEffect, useRef }} = React;

{code}

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
    }} catch (runtimeError) {{
      console.error("RUNTIME ERROR IN REACT APP:", runtimeError);
      var errDiv = document.getElementById('global-error-box');
      if (!errDiv) {{
        errDiv = document.createElement('div');
        errDiv.id = 'global-error-box';
        errDiv.style.color = 'red';
        errDiv.style.padding = '20px';
        errDiv.style.background = '#fee2e2';
        errDiv.style.border = '1px solid #fecaca';
        errDiv.style.margin = '20px';
        errDiv.style.fontFamily = 'monospace';
        errDiv.style.whiteSpace = 'pre-wrap';
        document.body.insertBefore(errDiv, document.body.firstChild);
      }}
      errDiv.innerText += "React Runtime Error: " + runtimeError.message + "\\nStack: " + runtimeError.stack + "\\n\\n";
    }}
  </script>

  <script>
    window.addEventListener('DOMContentLoaded', () => {{
      try {{
        const code = document.getElementById('react-code').textContent;
        const compiled = Babel.transform(code, {{ presets: [['react', {{runtime: 'classic'}}], 'env'] }}).code;
        const script = document.createElement('script');
        script.textContent = compiled;
        document.head.appendChild(script);
      }} catch (err) {{
        console.error("COMPILATION ERROR:", err);
        var errDiv = document.getElementById('global-error-box');
        if (!errDiv) {{
          errDiv = document.createElement('div');
          errDiv.id = 'global-error-box';
          errDiv.style.color = 'red';
          errDiv.style.padding = '20px';
          errDiv.style.background = '#fee2e2';
          errDiv.style.border = '1px solid #fecaca';
          errDiv.style.margin = '20px';
          errDiv.style.fontFamily = 'monospace';
          errDiv.style.whiteSpace = 'pre-wrap';
          document.body.insertBefore(errDiv, document.body.firstChild);
        }}
        errDiv.innerText += "Babel Compilation Error: " + err.message + "\\nStack: " + err.stack + "\\n\\n";
      }}
    }});
  </script>
</body>
</html>
"""

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html_template)

# Also write to index.html for direct GitHub Pages entry point
index_path = os.path.join(os.path.dirname(output_path), "index.html")
with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html_template)

print("Transpilation and HTML conversion successful!")
