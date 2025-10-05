"use client";


import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app as firebaseApp } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { fetchProductById, fetchCategories, ensureDefaultCategories, Product, Category } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { X, Plus } from "lucide-react";



export default function EditProductPage({ params }: { params: { id: string } }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [product, setProduct] = useState<Product & { images: string[]; image?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Campos editáveis
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [badge, setBadge] = useState("");
  const [inStock, setInStock] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

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
        setLoadingCategories(true);
        await ensureDefaultCategories();
        const cats = await fetchCategories();
        setCategories(cats);
        setLoadingCategories(false);

        const data = await fetchProductById(params.id);
        if (!data) throw new Error("Produto não encontrado");
        setProduct(data as Product & { images: string[]; image?: string });
        setName((data as any).name || "");
        setPrice((data as any).price?.toString() || "");
        setDescription((data as any).description || "");
        setBrand((data as any).brand || "");
        setCategory((data as any).category || "");
        setBadge((data as any).badge || "");
        setInStock(!!(data as any).inStock);
        setImages(Array.isArray((data as any).images) ? (data as any).images : (data as any).image ? [(data as any).image] : []);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar produto");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [authChecked, isAdmin, params.id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const { db } = await import("@/lib/firebase");
      const { doc, updateDoc } = await import("firebase/firestore");
  await updateDoc(doc(db, "produtos", params.id), {
        name,
        price: parseFloat(price),
        description,
        brand,
        category,
        badge,
        inStock,
        images,
      });
      router.push("/admin/manage-products");
    } catch (err) {
      setError("Erro ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="container py-8 max-w-xl mx-auto">
        <div>Verificando permissão...</div>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="container py-8 max-w-xl mx-auto">
        <div className="text-red-500 text-xl font-bold">Acesso restrito: apenas administradores podem acessar esta página.</div>
      </div>
    );
  }
  return (
    <div className="container py-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label>Nome</Label>
            <Input value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <Label>Preço</Label>
            <Input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
          </div>
          <div>
            <Label>Descrição</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <Label>Marca</Label>
            <Input value={brand} onChange={e => setBrand(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="category">Categoria</Label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              disabled={loadingCategories}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Badge</Label>
            <Input value={badge} onChange={e => setBadge(e.target.value)} />
          </div>
          <div>
            <Label>Em estoque</Label>
            <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} />
          </div>
          <div>
            <Label>Imagens do Produto</Label>
            <div className="flex flex-wrap gap-4 mt-2">
              {images.map((img, idx) => (
                <Card key={idx} className="relative w-28 h-28 flex items-center justify-center p-1 group">
                  <img src={img} alt="img" className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-red-200 transition"
                    title="Remover imagem"
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </Card>
              ))}
              {/* Card para adicionar nova imagem */}
              <Card className="w-28 h-28 flex items-center justify-center cursor-pointer hover:bg-muted/50 transition relative">
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const files = Array.from(e.target.files);
                        const newUrls: string[] = [];
                        for (const file of files) {
                          const formData = new FormData();
                          formData.append('file', file);
                          const res = await fetch('/api/upload', {
                            method: 'POST',
                            body: formData,
                          });
                          if (res.ok) {
                            const { secure_url } = await res.json();
                            newUrls.push(secure_url);
                          } else {
                            alert('Erro ao fazer upload de uma das imagens.');
                          }
                        }
                        setImages([...images, ...newUrls]);
                        e.target.value = '';
                      }
                    }}
                  />
                  <Plus className="w-8 h-8 text-primary mb-1" />
                  <span className="text-xs text-muted-foreground">Adicionar</span>
                </label>
              </Card>
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/manage-products")}>Cancelar</Button>
          </div>
        </form>
      )}
    </div>
  );
}
