import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every chocolate is handcrafted with passion and attention to detail, ensuring the perfect balance of flavor and texture.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We use only the finest ingredients sourced from around the world to create our luxury chocolate collection.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We ensure every order meets our high standards of quality and service.'
    }
  ];

  const contactInfo = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+91 98959 05758',
      link: 'https://wa.me/919895905758',
      description: 'Quick orders and support'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@chocoluxe.com',
      link: 'mailto:info@chocoluxe.com',
      description: 'Business inquiries'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Manama, Bahrain',
      description: 'Where the magic happens'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-chocolate-primary to-chocolate-primary/90 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our Story
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto">
              Crafted with passion in Bahrain, made to melt hearts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-primary mb-6">
                The ChocoluxE Journey
              </h2>
              <div className="space-y-4 text-chocolate-primary/80 text-base sm:text-lg leading-relaxed">
                <p>
                  Born from a passion for exceptional chocolate, ChocoluxE began as a dream to bring 
                  the world's finest cocoa experiences to chocolate lovers everywhere. Our journey 
                  started in the heart of Bahrain, where tradition meets innovation.
                </p>
                <p>
                  Every piece in our collection tells a story of craftsmanship, quality, and dedication. 
                  We believe that chocolate is more than just a treat—it's a moment of pure indulgence, 
                  a celebration of life's sweetest pleasures.
                </p>
                <p>
                  From selecting the finest cacao beans to the final packaging, every step is carefully 
                  orchestrated to ensure that each bite delivers an unforgettable experience. Our 
                  commitment to excellence has made us a trusted name among chocolate connoisseurs.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-chocolate-secondary to-chocolate-accent/20 rounded-2xl p-8 sm:p-12 text-center"
            >
              <div className="w-20 h-20 bg-chocolate-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-chocolate-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-chocolate-primary mb-4">
                Our Mission
              </h3>
              <p className="text-chocolate-primary/80 text-lg">
                To create extraordinary chocolate experiences that bring joy, celebrate special moments, 
                and connect people through the universal language of sweetness.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-chocolate-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-primary mb-4">
              What Makes Us Special
            </h2>
            <p className="text-chocolate-primary/80 text-lg max-w-2xl mx-auto">
              Our commitment to excellence shines through in every aspect of our chocolate creation process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="w-16 h-16 bg-chocolate-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-chocolate-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-chocolate-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-chocolate-primary/80 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate-primary mb-4">
              Get in Touch
            </h2>
            <p className="text-chocolate-primary/80 text-lg max-w-2xl mx-auto">
              Have questions about our chocolates or want to place a custom order? We'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <div className="w-12 h-12 bg-chocolate-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <contact.icon className="h-6 w-6 text-chocolate-primary" />
                </div>
                <h3 className="font-semibold text-chocolate-primary mb-2">
                  {contact.title}
                </h3>
                {contact.link ? (
                  <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-chocolate-accent hover:text-chocolate-accent/80 font-medium block mb-1"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-chocolate-accent font-medium mb-1">
                    {contact.value}
                  </p>
                )}
                <p className="text-chocolate-primary/70 text-sm">
                  {contact.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-gradient-to-r from-chocolate-primary to-chocolate-primary/90 rounded-2xl p-8 sm:p-12 text-white"
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
              Ready to Indulge?
            </h3>
            <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
              Explore our premium chocolate collection and treat yourself to something extraordinary today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-chocolate-accent hover:bg-chocolate-accent/90 text-chocolate-primary font-semibold px-8 py-3"
                onClick={() => window.location.href = '/products'}
              >
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-chocolate-primary px-8 py-3"
                onClick={() => window.open('https://wa.me/919895905758', '_blank')}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;