import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/footer";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.scss";

function App() {
  const [language, setLanguage] = useState("GE");

  return (
    <ErrorBoundary language={language}>
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "var(--app-bg)", color: "var(--app-text)" }}
      >
        <div
          className="w-full flex justify-center"
          style={{ backgroundColor: "var(--app-bg)" }}
        >
          <div className="w-full">
            <Header
              language={language}
              setLanguage={setLanguage}
            />
          </div>
        </div>
        <div className="w-full flex flex-1 justify-center" style={{ marginTop: 0 }}>
          <div className="w-full">
            <Main
              language={language}
              setLanguage={setLanguage}
            />
          </div>
        </div>
        <Footer className="mt-auto" language={language} setLanguage={setLanguage}></Footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
