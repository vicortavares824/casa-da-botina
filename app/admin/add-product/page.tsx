"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { addProduct, fetchCategories, Category, ensureDefaultCategories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function AddProductPage() {
  const searchParams = useSearchParams();
  const urlPassword = searchParams.get('senha');
  const URL_REQUIRED_PASSWORD = "admin123";
  if (urlPassword !== URL_REQUIRED_PASSWORD) {
    return (
      <div className="container mx-auto p-8 text-center text-red-600 text-xl font-bold">
        Acesso negado. Adicione ?senha correta para acessar esta página.
      </div>
    );
  }
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [inStock, setInStock] = useState(true);
  const [badge, setBadge] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      setLoadingCategories(true);
      await ensureDefaultCategories(); // Garante categorias padrão
      const cats = await fetchCategories();
      setCategories(cats);
      setLoadingCategories(false);
    }
    loadCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFiles(Array.from(e.target.files));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validação de senha simples
    if (password !== "admin123") {
      setError("Senha incorreta para cadastrar produto.");
      return;
    }

    if (!name || !price || !category || imageFiles.length === 0) {
      setError("Nome, Preço, Categoria e pelo menos uma imagem são obrigatórios.");
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload de todas as imagens para Cloudinary via nossa API
      const imageUrls: string[] = [];
      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!uploadResponse.ok) {
          throw new Error('Falha no upload de uma das imagens.');
        }
        const { secure_url } = await uploadResponse.json();
        imageUrls.push(secure_url);
      }

      // 2. Adiciona produto ao Firebase com array de imagens
      const newProduct: any = {
        name,
        price: parseFloat(price),
        description,
        images: imageUrls, // Array de URLs das imagens
        brand,
        category,
        sizes: sizes.split(',').map(s => s.trim()),
        colors: colors.split(',').map(c => c.trim()),
        inStock,
        badge,
        rating: 0,
        reviews: 0,
      };
      if (originalPrice) {
        newProduct.originalPrice = parseFloat(originalPrice);
      } else {
        newProduct.originalPrice = null;
      }
      await addProduct(newProduct);
      setSuccess("Produto adicionado com sucesso!");

  // Clear form
  setName('');
  setPrice('');
  setOriginalPrice('');
  setDescription('');
  setImageFiles([]);
  setBrand('');
  setCategory('');
  setSizes('');
  setColors('');
  setInStock(true);
  setBadge('');
  setPassword("");

    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Adicionar Novo Produto</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div>
          <Label htmlFor="password">Senha para cadastrar produto</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={isUploading}
          />
        </div>
        <div>
          <Label htmlFor="name">Nome do Produto</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isUploading} />
        </div>
        <div>
          <Label htmlFor="price">Preço</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required disabled={isUploading} />
        </div>
        <div>
          <Label htmlFor="originalPrice">Preço Original (Opcional)</Label>
          <Input id="originalPrice" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} disabled={isUploading} />
        </div>
        <div>
          <Label htmlFor="image">Imagens do Produto</Label>
          <Input id="image" type="file" multiple onChange={handleImageChange} required disabled={isUploading} />
          {imageFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {imageFiles.map((file, idx) => (
                <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">{file.name}</span>
              ))}
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isUploading} />
        </div>
        <div>
          <Label htmlFor="brand">Marca</Label>
          <Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} disabled={isUploading} />
        </div>
        <div>
          <Label htmlFor="category">Categoria</Label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            disabled={isUploading || loadingCategories}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="sizes">Tamanhos (separados por vírgula)</Label>
          <Input id="sizes" value={sizes} onChange={(e) => setSizes(e.target.value)} disabled={isUploading} />
        </div>
        <div>
          <Label htmlFor="colors">Cores (separadas por vírgula)</Label>
          <Input id="colors" value={colors} onChange={(e) => setColors(e.target.value)} disabled={isUploading} />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="inStock" checked={inStock} onCheckedChange={(checked) => setInStock(Boolean(checked))} disabled={isUploading} />
          <Label htmlFor="inStock">Em estoque</Label>
        </div>
        <div>
          <Label htmlFor="badge">Badge (Ex: Destaque, Novo, Promoção)</Label>
          <Input id="badge" value={badge} onChange={(e) => setBadge(e.target.value)} disabled={isUploading} />
        </div>
        
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" disabled={isUploading}>
          {isUploading ? 'Enviando...' : 'Adicionar Produto'}
        </Button>
      </form>
    </div>
  );
}
