'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import CTA from '@/components/CTA';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      title: 'Email',
      content: 'info@marketingagency.com',
      icon: '✉️',
    },
    {
      title: 'Phone',
      content: '+1 (555) 123-4567',
      icon: '📞',
    },
    {
      title: 'Address',
      content: '123 Tech Street, San Francisco, CA 94105',
      icon: '📍',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Page Hero - White Background */}
      <section className="bg-gradient-light px-4 py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h1 className="mb-6 text-5xl font-heading text-foreground sm:text-6xl lg:text-7xl">
            Get In Touch
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Ready to transform your marketing? Let's start a conversation.
          </p>
        </div>
      </section>

      {/* Contact Methods - Black Background */}
      <section className="bg-gradient-dark px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-8 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center floating" depth="4" variant="dark">
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="mb-2 text-xl font-heading text-white">{method.title}</h3>
                <p className="text-gray-300">{method.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Info - White Background */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <Card title="Send us a Message" className="floating" depth="3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-heading text-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-heading text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="mb-2 block text-sm font-heading text-foreground">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    >
                      <option value="">Select service</option>
                      <option value="seo">SEO Optimization</option>
                      <option value="content">Content Marketing</option>
                      <option value="ppc">PPC Advertising</option>
                      <option value="social">Social Media Marketing</option>
                      <option value="automation">Marketing Automation</option>
                      <option value="package">Service Package</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-heading text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full border border-border bg-white px-4 py-3 rounded-xl text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                      placeholder="Enter your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent text-white px-6 py-4 rounded-xl font-heading transition-all duration-300 hover:bg-accent-hover shadow-depth-3 hover:shadow-depth-4 hover:scale-[1.02]"
                  >
                    Send Message
                  </button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <Card title="Contact Information" className="h-full floating" depth="3">
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-3 text-lg font-heading text-foreground">Business Hours</h3>
                    <p className="text-secondary leading-relaxed">
                      Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                      Saturday: 10:00 AM - 4:00 PM PST<br />
                      Sunday: Closed
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-heading text-foreground">Response Time</h3>
                    <p className="text-secondary leading-relaxed">
                      We typically respond within 24 hours during business days. 
                      For urgent matters, please call us directly.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h3 className="mb-3 text-lg font-heading text-foreground">Social Media</h3>
                    <div className="space-y-2 text-secondary">
                      <p>Twitter: @marketingagency</p>
                      <p>LinkedIn: /company/marketingagency</p>
                      <p>GitHub: /marketingagency</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        headline="Let's Build Something Great Together"
        description="We're here to help you achieve your marketing goals."
        primaryCtaText="Schedule a Call"
        primaryCtaLink="/contact"
      />
    </main>
  );
}
