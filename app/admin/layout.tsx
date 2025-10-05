"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app as firebaseApp } from "@/lib/firebase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthChecked(true);
        setIsAdmin(false);
        return;
      }
      // Busca userType no Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().userType === "adm") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return (
      <div className="container py-8">
        <div>Verificando permissão...</div>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="container py-8">
        <div className="text-red-600 text-xl font-bold">Acesso restrito: apenas administradores podem acessar esta área.</div>
      </div>
    );
  }

  return <>{children}</>;
}
