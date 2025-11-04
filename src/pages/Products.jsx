import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import ProductGrid from '../components/product/ProductGrid';
import ProductModal from '../components/product/ProductModal';
import { useProducts } from '../hooks/useProducts';

const Products = () => {
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(product => product.category))];
    return cats.sort();
  }, [products]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    return filtered;
  }, [products, searchQuery, selectedCategory]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-chocolate-primary mb-3 sm:mb-4">
              Our International Menu
            </h1>
            <p className="text-base sm:text-lg text-chocolate-primary/80 max-w-2xl mx-auto">
              Discover our authentic international dishes, each recipe crafted with passion and the finest ingredients
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chocolate-primary/50 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border-chocolate-primary/20 focus:border-chocolate-accent"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <div className="flex justify-center sm:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Category Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <Button
                  variant={selectedCategory === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('')}
                  className={selectedCategory === '' 
                    ? 'bg-chocolate-accent text-chocolate-primary hover:bg-chocolate-accent/90' 
                    : 'border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary'
                  }
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? 'bg-chocolate-accent text-chocolate-primary hover:bg-chocolate-accent/90' 
                      : 'border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <p className="text-chocolate-primary/70 text-sm sm:text-base">
            {loading ? 'Loading...' : `Showing ${filteredProducts.length} of ${products.length} products`}
          </p>
          {(searchQuery || selectedCategory) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
              className="text-chocolate-accent hover:text-chocolate-primary hover:bg-chocolate-accent/10"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          onProductSelect={handleProductSelect}
          loading={loading}
        />

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (searchQuery || selectedCategory) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-chocolate-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-chocolate-primary/50" />
            </div>
            <h3 className="font-serif text-xl text-chocolate-primary mb-2">No products found</h3>
            <p className="text-chocolate-primary/70 mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
              className="border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary"
            >
              View All Products
            </Button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Products;