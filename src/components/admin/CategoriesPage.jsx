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
import { useToast } from '@/hooks/use-toast';
const CategoriesPage = () => {
    const { categories, products, addCategory, updateCategory, deleteCategory, isLoading } = useAdminStore();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: '',
    });
    const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const getProductCount = (categorySlug) => {
        if (categorySlug === 'offer') {
            return products.filter(p => p.isOffer).length;
        }
        if (categorySlug === 'best-seller') {
            return products.filter(p => p.isBestSeller).length;
        }
        return products.filter(p => p.categorySlug === categorySlug).length;
    };
    const resetForm = () => {
        setFormData({
            name: '',
            slug: '',
            description: '',
            image: '',
        });
        setEditingCategory(null);
    };
    const openAddDialog = () => {
        resetForm();
        setIsDialogOpen(true);
    };
    const openEditDialog = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description,
            image: category.image,
        });
        setIsDialogOpen(true);
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
        const categoryData = {
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
            image: formData.image,
        };
        if (editingCategory) {
            updateCategory(editingCategory.id, categoryData);
            toast({ title: 'Category updated successfully!' });
        }
        else {
            addCategory(categoryData);
            toast({ title: 'Category added successfully!' });
        }
        setIsDialogOpen(false);
        resetForm();
    };
    const handleDelete = () => {
        if (deleteCategoryId) {
            const category = categories.find(c => c.id === deleteCategoryId);
            const productCount = category ? getProductCount(category.slug) : 0;
            if (productCount > 0) {
                toast({
                    title: 'Cannot delete category',
                    description: `This category has ${productCount} products. Remove them first.`,
                    variant: 'destructive'
                });
                setDeleteCategoryId(null);
                return;
            }
            deleteCategory(deleteCategoryId);
            toast({ title: 'Category deleted successfully!' });
            setDeleteCategoryId(null);
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
          <Input placeholder="Search categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <PlusOutlined /> Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredCategories.map((category, index) => (<motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: index * 0.05 }} className="bg-card rounded-xl shadow-soft overflow-hidden group">
              <div className="aspect-video relative">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" onClick={() => openEditDialog(category)}>
                    <EditOutlined />
                  </Button>
                  {!['offer', 'best-seller'].includes(category.slug) && (<Button size="icon" variant="destructive" onClick={() => setDeleteCategoryId(category.id)}>
                      <DeleteOutlined />
                    </Button>)}
                </div>
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  {getProductCount(category.slug)} products
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-lg">{category.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{category.description}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Slug: <code className="bg-secondary px-1 rounded">{category.slug}</code>
                </p>
              </div>
            </motion.div>))}
        </AnimatePresence>
      </div>

      {filteredCategories.length === 0 && (<div className="text-center py-16">
          <p className="text-muted-foreground">No categories found</p>
        </div>)}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g., Organic Honey" required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={formData.slug} onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))} placeholder="organic-honey" required/>
              <p className="text-xs text-muted-foreground">
                This will be used in the URL: /collections/{formData.slug || 'your-slug'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Brief description of the category" rows={3} required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" value={formData.image} onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))} placeholder="https://example.com/category-image.jpg" required/>
              {formData.image && (<div className="mt-2">
                  <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" onError={(e) => (e.currentTarget.style.display = 'none')}/>
                </div>)}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingCategory ? 'Update Category' : 'Add Category'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteCategoryId} onOpenChange={() => setDeleteCategoryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
              Make sure no products are using this category before deleting.
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
export default CategoriesPage;
