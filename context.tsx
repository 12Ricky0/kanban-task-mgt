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
  const [displayTaskForm, setDisplayTaskForm] = useState(false);
  const [userboard, setUserBoard] = useState({ name: "", id: "" });
  const [showDelete, setShowDelete] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setUserBoard({ name: data[0].name, id: data[0]._id });
        return data;
      });
  }, []);

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
