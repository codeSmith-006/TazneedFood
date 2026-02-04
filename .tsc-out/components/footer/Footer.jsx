import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookOutlined, InstagramOutlined, WhatsAppOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { categories } from '@/lib/data';
const Footer = () => {
  return (<footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl font-bold mb-4">
            Organic<span className="text-gold-light">Store</span>
          </h3>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            Premium organic products sourced from the finest natural origins.
            Quality you can trust, delivered to your doorstep.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
              <FacebookOutlined />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
              <InstagramOutlined />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors">
              <WhatsAppOutlined />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Collections</h4>
          <ul className="space-y-2">
            {categories.slice(0, 5).map((category) => (<li key={category.id}>
              <Link to={`/collections/${category.slug}`} className="text-primary-foreground/80 hover:text-gold-light transition-colors text-sm">
                {category.name}
              </Link>
            </li>))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-primary-foreground/80 hover:text-gold-light transition-colors text-sm">
                Track Order
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-foreground/80 hover:text-gold-light transition-colors text-sm">
                Return Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-foreground/80 hover:text-gold-light transition-colors text-sm">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="#" className="text-primary-foreground/80 hover:text-gold-light transition-colors text-sm">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <PhoneOutlined className="mt-0.5 text-gold-light" />
              <span className="text-primary-foreground/80 text-sm">+880 1234 567 890</span>
            </li>
            <li className="flex items-start gap-3">
              <WhatsAppOutlined className="mt-0.5 text-gold-light" />
              <span className="text-primary-foreground/80 text-sm">+880 1234 567 890</span>
            </li>
            <li className="flex items-start gap-3">
              <MailOutlined className="mt-0.5 text-gold-light" />
              <span className="text-primary-foreground/80 text-sm">info@TanzeenFood.com</span>
            </li>
            <li className="flex items-start gap-3">
              <EnvironmentOutlined className="mt-0.5 text-gold-light" />
              <span className="text-primary-foreground/80 text-sm">123 Organic Lane, Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-primary-foreground/60 text-sm">
          © 2024 TanzeenFood. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-primary-foreground/60 hover:text-gold-light transition-colors text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-primary-foreground/60 hover:text-gold-light transition-colors text-sm">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>);
};
export default Footer;
