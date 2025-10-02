"use client";

import { useState } from 'react';
import { addProduct } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [inStock, setInStock] = useState(true);
  const [badge, setBadge] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !price || !category || !imageFile) {
      setError("Nome, Preço, Categoria e Imagem são obrigatórios.");
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload image to Cloudinary via our API
      const formData = new FormData();
      formData.append('file', imageFile);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Falha no upload da imagem.');
      }

      const { secure_url } = await uploadResponse.json();

      // 2. Add product to Firebase with the Cloudinary URL
      const newProduct = {
        name,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        description,
        image: secure_url, // Use the URL from Cloudinary
        brand,
        category,
        sizes: sizes.split(',').map(s => s.trim()),
        colors: colors.split(',').map(c => c.trim()),
        inStock,
        badge,
        rating: 0,
        reviews: 0,
      };
      
      await addProduct(newProduct);
      setSuccess("Produto adicionado com sucesso!");

      // Clear form
      setName('');
      setPrice('');
      setOriginalPrice('');
      setDescription('');
      setImageFile(null);
      setBrand('');
      setCategory('');
      setSizes('');
      setColors('');
      setInStock(true);
      setBadge('');

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
          <Label htmlFor="image">Imagem do Produto</Label>
          <Input id="image" type="file" onChange={handleImageChange} required disabled={isUploading} />
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
          <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required disabled={isUploading} />
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
