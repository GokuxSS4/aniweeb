"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface VideoSettingsContextType {
  settings: {
    autoSkip: boolean;
    autoPlay: boolean;
    autoNext: boolean;
    defaultLanguage: string;
  };
  setSettings: (
    settings: Partial<VideoSettingsContextType["settings"]>,
  ) => void;
}

const VideoSettingsContext = createContext<
  VideoSettingsContextType | undefined
>(undefined);

export function useSettings() {
  const context = useContext(VideoSettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

interface VideoSettingsProviderProps {
  children: ReactNode;
}

export const VideoSettingsProvider: React.FC<VideoSettingsProviderProps> = ({
  children,
}) => {
  const [settings, setSettingsState] = useState({
    autoSkip: localStorage.getItem("autoSkip") === "true",
    autoPlay: localStorage.getItem("autoPlay") === "true",
    autoNext: localStorage.getItem("autoNext") === "true",
    defaultLanguage: localStorage.getItem("defaultLanguage") || "sub",
  });

  useEffect(() => {
    localStorage.setItem("autoSkip", settings.autoSkip ? "true" : "false");
    localStorage.setItem("autoPlay", settings.autoPlay ? "true" : "false");
    localStorage.setItem("autoNext", settings.autoNext ? "true" : "false");
    localStorage.setItem("defaultLanguage", settings.defaultLanguage);
  }, [settings]);

  const setSettings = (
    newSettings: Partial<VideoSettingsContextType["settings"]>,
  ) => {
    setSettingsState((prev) => {
      const updatedSettings = { ...prev, ...newSettings };
      return updatedSettings;
    });
  };

  return (
    <VideoSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </VideoSettingsContext.Provider>
  );
};
