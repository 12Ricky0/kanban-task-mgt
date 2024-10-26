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
  const [showDelete, setShowDelete] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);

  return (
    <KanbanContext.Provider
      value={{
        displayMenu,
        setDisplayMenu,
        displayTaskForm,
        setDisplayTaskForm,
        userboard,
        setUserBoard,
        showDelete,
        setShowDelete,
        showActionButtons,
        setShowActionButtons,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
