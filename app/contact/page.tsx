'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('contact_messages')
      .insert([formData]);

    setLoading(false);

    if (!error) {
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
            <span className="text-gradient">Get In Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to learn more? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8 mb-12">
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  content: 'hello@bukbao.com',
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  content: '+1 (555) 123-4567',
                },
                {
                  icon: MapPin,
                  title: 'Address',
                  content: '123 Beauty Lane, New York, NY 10001',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg glow-pink"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="glass-card p-8 rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Why Choose Us?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                  Expert beauty consultations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                  Fast and secure shipping
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                  30-day satisfaction guarantee
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                  Award-winning customer service
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="John Doe"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <motion.textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-shadow flex items-center justify-center gap-2 glow-pink disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {success && (
              <motion.div
                className="mt-6 p-4 glass-card rounded-2xl flex items-center gap-3 text-green-700"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
              >
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <p className="font-medium">
                  Thank you! Your message has been sent successfully.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  );
}
