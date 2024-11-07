"use client";

import { createContext, useState, useEffect, use } from "react";
export const KanbanContext = createContext({});
import { Board } from "./libs/definitions";
import { fetchAllTask } from "./libs/data";

export default function KanbanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [userboard, setUserBoard] = useState({ name: "", id: "" });
  const [showDelete, setShowDelete] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setUserBoard({ name: data[0].name, id: data[0]._id });
        return data;
      });

    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (
      darkMode ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <KanbanContext.Provider
      value={{
        displayMenu,
        setDisplayMenu,
        userboard,
        setUserBoard,
        showDelete,
        setShowDelete,
        showActionButtons,
        setShowActionButtons,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
