import React, { createContext, useState, useEffect } from 'react';
import { uploadResume, analyzeResume, getHistory, loginUser, signupUser, getCurrentUser, updateProfileSettings, logoutUser } from '../services/api';
import { mockAnalysisResults } from '../utils/mockData';
const safeParse = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key);

    if (!value || value === "undefined") {
      return fallback;
    }

    return JSON.parse(value);
  } catch (err) {
    console.error(`Invalid localStorage value for ${key}:`, err);
    localStorage.removeItem(key);
    return fallback;
  }
};

export const AppContext = createContext();

const normalizeAnalysisPayload = (payload = {}) => ({
  ...mockAnalysisResults,
  ...payload,
  careerSummary: {
    ...mockAnalysisResults.careerSummary,
    ...(payload.careerSummary || {})
  },
  profile: {
    ...mockAnalysisResults.profile,
    ...(payload.profile || {})
  },
  skillsAnalysis: {
    ...mockAnalysisResults.skillsAnalysis,
    ...(payload.skillsAnalysis || {})
  },
  resumeReview: {
    ...mockAnalysisResults.resumeReview,
    ...(payload.resumeReview || {})
  },
  learningRoadmap: payload.learningRoadmap?.length ? payload.learningRoadmap : mockAnalysisResults.learningRoadmap,
  courses: payload.courses?.length ? payload.courses : mockAnalysisResults.courses,
  projects: payload.projects?.length ? payload.projects : mockAnalysisResults.projects,
  interviewPreparation: payload.interviewPreparation || mockAnalysisResults.interviewPreparation
});

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

const [user, setUser] = useState(() => safeParse("user"));

  const [resume, setResume] = useState(null);

 const [analysisResults, setAnalysisResults] = useState(() =>
  safeParse("analysis")
);
  const [history, setHistory] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [settings, setSettings] = useState(() =>
  safeParse("settings", {
    notificationsEnabled: true,
    weeklyDigest: false,
    language: "en",
  })
);

  useEffect(() => {
    const initializeSession = async () => {
      const savedToken = localStorage.getItem('authToken');
      if (!savedToken) return;

      try {
        const session = await getCurrentUser();
        const sessionUser = session?.user || session?.data?.user || null;
        const sessionSettings = session?.settings || session?.data?.settings || {};

        if (sessionUser) {
          setUser(sessionUser);
          localStorage.setItem('user', JSON.stringify(sessionUser));
        }

        if (sessionSettings && Object.keys(sessionSettings).length) {
          setSettings(sessionSettings);
          localStorage.setItem('settings', JSON.stringify(sessionSettings));
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    };

    const initializeHistory = async () => {
      const savedToken = localStorage.getItem('authToken');
      if (!savedToken) {
        setHistory([]);
        return;
      }

      try {
        const historyData = await getHistory();
        if (Array.isArray(historyData)) {
          setHistory(historyData);
        }
      } catch (error) {
        console.warn('History unavailable. Continuing with empty history state.', error);
        setHistory([]);
      }
    };

    initializeSession();
    initializeHistory();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      addToast(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} Mode`, 'info');
      return nextTheme;
    });
  };

  const login = async (email, password) => {
  try {
    console.log("Sending:", {
      email,
      password,
    });

    const response = await loginUser(email, password);

    console.log("Success:", response);
const token = response.data.token;
const sessionUser = response.data.user;
    // const token = response.token;
    // const sessionUser = response.user;

    localStorage.setItem("authToken", token);
    setUser(sessionUser);
    localStorage.setItem("user", JSON.stringify(sessionUser));

    addToast("Logged in!", "success");
    return true;

  } catch (error) {

    console.log("FULL ERROR");
    console.log(error);

    console.log("STATUS");
    console.log(error.response?.status);

    console.log("DATA");
    console.log(error.response?.data);

    addToast("Login failed", "error");
    return false;
  }
};

  const signup = async (name, email, password) => {
    try {
      const response = await signupUser(name, email, password);
      const token = response?.token || response?.data?.token;
      const sessionUser = response?.user || response?.data?.user;

      if (!token || !sessionUser) {
        throw new Error('Invalid signup response');
      }

      localStorage.setItem('authToken', token);
      setUser(sessionUser);
      localStorage.setItem('user', JSON.stringify(sessionUser));
      addToast('Account created successfully!', 'success');
      return true;
    } catch (error) {
      addToast(error?.response?.data?.detail || 'Signup failed. Please try again.', 'error');
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout API error:', error);
    }

    setUser(null);
    setResume(null);
    setAnalysisResults(null);
    setHistory([]);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('analysis');
    addToast('Logged out successfully', 'info');
  };

  const uploadResumeFile = async (file) => {
    try {
      await uploadResume(file);
      setResume({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        rawFile: file
      });
      addToast('Resume uploaded successfully!', 'success');
    } catch (error) {
      addToast('Resume upload failed. Please try again.', 'error');
    }
  };
const runAnalysis = async (targetRole, industry) => {
  if (!resume) {
    addToast("Please upload a resume first", "error");
    return false;
  }

  try {
    const analysis = await analyzeResume(
      resume.rawFile,
      targetRole,
      industry
    );

    const normalizedAnalysis = normalizeAnalysisPayload(analysis);

    setAnalysisResults(normalizedAnalysis);

    localStorage.setItem(
      "analysis",
      JSON.stringify(normalizedAnalysis)
    );

    const newHistoryItem = {
      id: `analysis-${Date.now()}`,
      filename: resume.name,
      date: new Date().toISOString().split("T")[0],
      score: normalizedAnalysis.atsScore,
      role: targetRole
    };

    setHistory((prev) => [newHistoryItem, ...prev]);

    addToast("Resume analyzed successfully!", "success");

    return true;

  } catch (error) {
    console.error(error);

    addToast(
      "Failed to analyze resume.",
      "error"
    );

    return false;
  }
};

  const persistSettings = async (nextSettings) => {
    const resolvedSettings = typeof nextSettings === 'function'
      ? nextSettings(settings)
      : nextSettings;

    const mergedSettings = { ...settings, ...resolvedSettings };
    setSettings(mergedSettings);

    try {
      await updateProfileSettings(mergedSettings);
    } catch (error) {
      console.error('Failed to persist settings:', error);
    }
  };

  const clearResume = () => {
    setResume(null);
    setAnalysisResults(null);
    localStorage.removeItem('analysis');
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      user,
      login,
      signup,
      logout,
      resume,
      uploadResumeFile,
      clearResume,
      analysisResults,
      runAnalysis,
      history,
      toasts,
      addToast,
      settings,
      setSettings: persistSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};
