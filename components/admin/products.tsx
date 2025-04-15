"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Search, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getProducts, getCategories } from "@/lib/api"
import type { Product, Category, ProductSpecification } from "@/types"
import { Badge } from "@/components/ui/badge"

export function AdminProducts() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    discount: "",
    category: "",
    featured: false,
    image: null as File | null,
    imagePreview: "",
    specifications: [] as ProductSpecification[],
  })

  // Specifications state
  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")

  // Load products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
        toast({
          title: "Error",
          description: "Failed to load products and categories.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Add specification
  const addSpecification = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return

    const newSpec: ProductSpecification = {
      key: newSpecKey,
      value: newSpecValue,
    }

    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, newSpec],
    }))

    setNewSpecKey("")
    setNewSpecValue("")
  }

  // Remove specification
  const removeSpecification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }))
  }

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      discount: "",
      category: "",
      featured: false,
      image: null,
      imagePreview: "",
      specifications: [],
    })
    setCurrentProduct(null)
    setNewSpecKey("")
    setNewSpecValue("")
  }

  // Open edit product dialog
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      discount: product.discount.toString(),
      category: product.category,
      featured: product.featured || false,
      image: null,
      imagePreview: product.image || "",
      specifications: product.specifications || [],
    })
    setIsEditProductOpen(true)
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle add product
  const handleAddProduct = () => {
    // Validate form
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new product
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      discount: Number.parseInt(formData.discount) || 0,
      category: formData.category,
      featured: formData.featured,
      image: formData.imagePreview || "/placeholder.svg?height=300&width=300",
      specifications: formData.specifications,
    }

    // Add to products
    const updatedProducts = [...products, newProduct]
    setProducts(updatedProducts)

    // Save to localStorage for persistence
    localStorage.setItem("products", JSON.stringify(updatedProducts))

    // Close dialog and reset form
    setIsAddProductOpen(false)
    resetForm()

    toast({
      title: "Product Added",
      description: "The product has been added successfully.",
    })
  }

  // Handle update product
  const handleUpdateProduct = () => {
    if (!currentProduct) return

    // Validate form
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Update product
    const updatedProduct: Product = {
      ...currentProduct,
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      discount: Number.parseInt(formData.discount) || 0,
      category: formData.category,
      featured: formData.featured,
      image: formData.imagePreview || currentProduct.image,
      specifications: formData.specifications,
    }

    // Update products array
    const updatedProducts = products.map((p) => (p.id === currentProduct.id ? updatedProduct : p))
    setProducts(updatedProducts)

    // Update localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts))

    // Close dialog and reset form
    setIsEditProductOpen(false)
    resetForm()

    toast({
      title: "Product Updated",
      description: "The product has been updated successfully.",
    })
  }

  // Handle delete product
  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const filteredProducts = products.filter((p) => p.id !== productId)
      setProducts(filteredProducts)

      // Update localStorage
      localStorage.setItem("products", JSON.stringify(filteredProducts))

      toast({
        title: "Product Deleted",
        description: "The product has been deleted successfully.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the details to add a new product to your store.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center gap-4">
                  {formData.imagePreview && (
                    <div className="w-20 h-20 border rounded">
                      <img
                        src={formData.imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (EGP)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>

              {/* Product Specifications */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Product Specifications</Label>
                </div>

                <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                  <Input
                    placeholder="Specification name"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                  />
                  <Input
                    placeholder="Specification value"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                  />
                  <Button type="button" onClick={addSpecification}>
                    Add
                  </Button>
                </div>

                {formData.specifications.length > 0 && (
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Added Specifications</h4>
                    <div className="space-y-2">
                      {formData.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between items-center bg-muted p-2 rounded-md">
                          <div>
                            <span className="font-medium">{spec.key}:</span> {spec.value}
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeSpecification(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddProductOpen(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update the details of the selected product.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Product Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center gap-4">
                  {formData.imagePreview && (
                    <div className="w-20 h-20 border rounded">
                      <img
                        src={formData.imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price (EGP)</Label>
                  <Input
                    id="edit-price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-stock">Stock</Label>
                  <Input
                    id="edit-stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-discount">Discount (%)</Label>
                  <Input
                    id="edit-discount"
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="edit-featured">Featured Product</Label>
              </div>

              {/* Product Specifications */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Product Specifications</Label>
                </div>

                <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                  <Input
                    placeholder="Specification name"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                  />
                  <Input
                    placeholder="Specification value"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                  />
                  <Button type="button" onClick={addSpecification}>
                    Add
                  </Button>
                </div>

                {formData.specifications.length > 0 && (
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Added Specifications</h4>
                    <div className="space-y-2">
                      {formData.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between items-center bg-muted p-2 rounded-md">
                          <div>
                            <span className="font-medium">{spec.key}:</span> {spec.value}
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeSpecification(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditProductOpen(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateProduct}>Update Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your store's products. You can add, edit, or delete products.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No products found. Try adjusting your search or add a new product.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Specifications</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const category = categories.find((c) => c.id === product.category)

                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="w-10 h-10">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{category?.name || product.category}</TableCell>
                        <TableCell>EGP {product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.discount}%</TableCell>
                        <TableCell>{product.featured ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          {product.specifications && product.specifications.length > 0 ? (
                            <Badge variant="outline">{product.specifications.length} specs</Badge>
                          ) : (
                            "None"
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
