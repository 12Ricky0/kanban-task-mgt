"use client";

import { createContext, useState } from "react";
export const KanbanContext = createContext({});
import { Board } from "./libs/definitions";

export default function KanbanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayTaskForm, setDisplayTaskForm] = useState(false);
  const [userboard, setUserBoard] = useState({ name: "Platform Launch" });
  return (
    <KanbanContext.Provider
      value={{
        displayMenu,
        setDisplayMenu,
        displayTaskForm,
        setDisplayTaskForm,
        userboard,
        setUserBoard,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
