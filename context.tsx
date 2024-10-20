"use client";

import { createContext, useState } from "react";
export const KanbanContext = createContext({});

export default function KanbanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayTaskForm, setDisplayTaskForm] = useState(false);
  return (
    <KanbanContext.Provider
      value={{
        displayMenu,
        setDisplayMenu,
        displayTaskForm,
        setDisplayTaskForm,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
