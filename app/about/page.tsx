'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Leaf, Award, Users } from 'lucide-react';
import { useRef } from 'react';

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const values = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every product is crafted with care and attention to detail, ensuring the highest quality for our customers.',
    },
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      description: 'We source only the finest natural and organic ingredients from sustainable suppliers worldwide.',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized globally for excellence in beauty innovation and customer satisfaction.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a community of beauty enthusiasts who believe in ethical and sustainable practices.',
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
        <motion.div
          className="absolute inset-0"
          style={{ opacity }}
        >
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 blur-3xl"
            style={{ y: y1 }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl"
            style={{ y: y2 }}
          />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-8xl font-bold mb-8 font-[family-name:var(--font-playfair)]">
              <span className="text-gradient">Our Story</span>
            </h1>
            <p className="text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Founded in 2020, LuxeBeauty was born from a passion for creating
              luxurious, sustainable beauty products that celebrate natural radiance
              and individual expression.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-6 font-[family-name:var(--font-playfair)] text-gray-800">
              What We Believe In
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values guide everything we do, from product development to customer care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="group relative p-8 glass-card rounded-3xl hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg glow-pink"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gradient transition-all">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-b-3xl"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6 font-[family-name:var(--font-playfair)] text-gray-800">
                Committed to Excellence
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We believe that beauty should never come at the cost of our planet.
                That's why we're committed to sustainable practices, ethical sourcing,
                and creating products that are as kind to the earth as they are to your skin.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Every ingredient is carefully selected, every formula meticulously tested,
                and every package designed with sustainability in mind. Our mission is to
                empower you to look and feel your best while making choices that matter.
              </p>

              <motion.div
                className="flex gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div>
                  <div className="text-4xl font-bold text-gradient mb-2">100%</div>
                  <div className="text-sm text-gray-600">Cruelty-Free</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient mb-2">100%</div>
                  <div className="text-sm text-gray-600">Vegan</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient mb-2">100%</div>
                  <div className="text-sm text-gray-600">Natural</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 opacity-20" />
                <img
                  src="https://images.pexels.com/photos/5938235/pexels-photo-5938235.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Beauty products"
                  className="w-full h-full object-cover"
                />
              </div>

              <motion.div
                className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-pink-400/40 to-purple-400/40 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold mb-6 font-[family-name:var(--font-playfair)] text-gray-800">
            Join Our Journey
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Be part of a community that celebrates authentic beauty and sustainable living.
            Together, we're creating a more beautiful world, inside and out.
          </p>

          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-shadow glow-pink"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Products
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
