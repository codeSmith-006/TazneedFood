"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useAdminStore } from '@/hooks/useAdminStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
const ProductsPage = () => {
    const { products, categories, addProduct, updateProduct, deleteProduct, isLoading } = useAdminStore();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        category: '',
        categorySlug: '',
        price: '',
        oldPrice: '',
        description: '',
        details: '',
        images: '',
        inStock: true,
        isBestSeller: false,
        isOffer: false,
    });
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const resetForm = () => {
        setFormData({
            name: '',
            slug: '',
            category: '',
            categorySlug: '',
            price: '',
            oldPrice: '',
            description: '',
            details: '',
            images: '',
            inStock: true,
            isBestSeller: false,
            isOffer: false,
        });
        setEditingProduct(null);
    };
    const openAddDialog = () => {
        resetForm();
        setIsDialogOpen(true);
    };
    const openEditDialog = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            slug: product.slug,
            category: product.category,
            categorySlug: product.categorySlug,
            price: product.price.toString(),
            oldPrice: product.oldPrice?.toString() || '',
            description: product.description,
            details: product.details.join('\n'),
            images: product.images.join('\n'),
            inStock: product.inStock,
            isBestSeller: product.isBestSeller || false,
            isOffer: product.isOffer || false,
        });
        setIsDialogOpen(true);
    };
    const handleCategoryChange = (categorySlug) => {
        const category = categories.find(c => c.slug === categorySlug);
        if (category) {
            setFormData(prev => ({
                ...prev,
                category: category.name,
                categorySlug: category.slug
            }));
        }
    };
    const generateSlug = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };
    const handleNameChange = (name) => {
        setFormData(prev => ({
            ...prev,
            name,
            slug: generateSlug(name)
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            name: formData.name,
            slug: formData.slug,
            category: formData.category,
            categorySlug: formData.categorySlug,
            price: parseFloat(formData.price),
            oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
            description: formData.description,
            details: formData.details.split('\n').filter(d => d.trim()),
            images: formData.images.split('\n').filter(i => i.trim()),
            inStock: formData.inStock,
            isBestSeller: formData.isBestSeller,
            isOffer: formData.isOffer,
        };
        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
            toast({ title: 'Product updated successfully!' });
        }
        else {
            addProduct(productData);
            toast({ title: 'Product added successfully!' });
        }
        setIsDialogOpen(false);
        resetForm();
    };
    const handleDelete = () => {
        if (deleteProductId) {
            deleteProduct(deleteProductId);
            toast({ title: 'Product deleted successfully!' });
            setDeleteProductId(null);
        }
    };
    if (isLoading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>);
    }
    return (<>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
          <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <PlusOutlined /> Add Product
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredProducts.map((product, index) => (<motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: index * 0.05 }} className="bg-card rounded-xl shadow-soft overflow-hidden group">
              <div className="aspect-square relative">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" onClick={() => openEditDialog(product)}>
                    <EditOutlined />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => setDeleteProductId(product.id)}>
                    <DeleteOutlined />
                  </Button>
                </div>
                {!product.inStock && (<div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                  </div>)}
                {product.isOffer && product.inStock && (<div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                    Offer
                  </div>)}
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                <h3 className="font-medium text-foreground line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-primary">৳{product.price}</span>
                  {product.oldPrice && (<span className="text-sm text-muted-foreground line-through">৳{product.oldPrice}</span>)}
                </div>
              </div>
            </motion.div>))}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (<div className="text-center py-16">
          <p className="text-muted-foreground">No products found</p>
        </div>)}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => handleNameChange(e.target.value)} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={formData.slug} onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))} required/>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={formData.categorySlug} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category"/>
                </SelectTrigger>
                <SelectContent>
                  {categories
            .filter(c => !['offer', 'best-seller'].includes(c.slug))
            .map(category => (<SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (৳)</Label>
                <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="oldPrice">Old Price (৳) - Optional</Label>
                <Input id="oldPrice" type="number" value={formData.oldPrice} onChange={(e) => setFormData(prev => ({ ...prev, oldPrice: e.target.value }))}/>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={3} required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Details (one per line)</Label>
              <Textarea id="details" value={formData.details} onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))} rows={4} placeholder="100% Pure & Natural&#10;Rich in antioxidants&#10;Net Weight: 500g"/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Image URLs (one per line)</Label>
              <Textarea id="images" value={formData.images} onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value }))} rows={3} placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" required/>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Switch id="inStock" checked={formData.inStock} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked }))}/>
                <Label htmlFor="inStock">In Stock</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="isBestSeller" checked={formData.isBestSeller} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isBestSeller: checked }))}/>
                <Label htmlFor="isBestSeller">Best Seller</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="isOffer" checked={formData.isOffer} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isOffer: checked }))}/>
                <Label htmlFor="isOffer">On Offer</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>);
};
export default ProductsPage;
