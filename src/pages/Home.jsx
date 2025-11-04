import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useProducts } from '../hooks/useProducts';

const Home = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chocolate-accent mx-auto mb-4"></div>
          <p className="text-chocolate-primary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-chocolate-primary to-chocolate-primary/90 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            Savor Authentic International Cuisine
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Discover our exquisite collection of handcrafted international dishes, 
            made with the finest ingredients and traditional recipes from around the world.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-chocolate-accent hover:bg-chocolate-accent/90 text-chocolate-primary font-semibold px-8 py-4 text-lg">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-chocolate-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-chocolate-primary mb-4">
              Featured Dishes
            </h2>
            <p className="text-lg text-chocolate-primary/80 max-w-2xl mx-auto">
              Handpicked selections from our international menu
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square bg-gradient-to-br from-chocolate-secondary to-chocolate-accent/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-chocolate-accent rounded-full flex items-center justify-center">
                    <span className="text-chocolate-primary font-bold text-xl">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-semibold text-chocolate-primary mb-2">
                    {product.name}
                  </h3>
                  <p className="text-chocolate-primary/70 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-chocolate-accent text-lg">
                      ₹{product.price}
                    </span>
                    <Link to="/products">
                      <Button size="sm" variant="outline" className="border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg" className="border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-chocolate-primary mb-6">
                Crafted with Passion
              </h2>
              <p className="text-lg text-chocolate-primary/80 mb-6">
                At Ali & Company, we believe that food is more than just sustenance—it's a journey. 
                Each dish is carefully crafted using traditional techniques and the finest ingredients 
                sourced from around the world.
              </p>
              <p className="text-lg text-chocolate-primary/80 mb-8">
                From our kitchen in Bahrain, we create dishes that tell a story of culture, 
                tradition, and passion. Every bite is designed to transport you to different 
                corners of the world through authentic flavors.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-chocolate-accent text-chocolate-accent hover:bg-chocolate-accent hover:text-chocolate-primary">
                  Learn More About Us
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-chocolate-secondary to-chocolate-accent/20 rounded-lg p-8 text-center">
              <div className="w-24 h-24 bg-chocolate-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-chocolate-primary font-bold text-3xl">♥</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-chocolate-primary mb-4">
                Made with Love
              </h3>
              <p className="text-chocolate-primary/80">
                Every dish is handcrafted with care and attention to detail, 
                ensuring the perfect balance of authentic flavors and textures.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;