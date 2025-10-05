"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app as firebaseApp } from "@/lib/firebase";
import { fetchProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ManageProductsPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!authChecked || !isAdmin) return;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Erro ao buscar produtos.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [authChecked, isAdmin]);

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
        <div className="text-red-600 text-xl font-bold">Acesso restrito: apenas administradores podem acessar esta página.</div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      const { db } = await import("@/lib/firebase");
      const { doc, deleteDoc } = await import("firebase/firestore");
      await deleteDoc(doc(db, "produtos", id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Erro ao excluir produto.");
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Produtos</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : products.length === 0 ? (
        <div>Nenhum produto cadastrado.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4 space-y-2">
                <img
                  src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <div className="font-semibold">{product.name}</div>
                <div className="text-sm text-muted-foreground">R$ {product.price?.toFixed(2).replace(".", ",")}</div>
                <div className="flex gap-2 mt-2">
                  <Link href={`/admin/edit-product/${product.id}`}>
                    <Button size="sm" variant="outline">Editar</Button>
                  </Link>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
