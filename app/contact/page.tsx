'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import { Mail, Phone, MapPin, Clock, Send, Users, Globe, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    budget: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    alert('Thank you for your message! Our team will contact you within 24 hours.');
    setFormData({ name: '', email: '', company: '', service: '', message: '', budget: '' });
    setIsSubmitting(false);
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
      content: 'hello@thebigconnection.com',
      description: 'Response within 24 hours',
      icon: <Mail className="w-6 h-6" />,
      color: 'from-[#D9D9D9] to-[#BFBFBF]'
    },
    {
      title: 'Phone',
      content: '+91 98765 43210',
      description: 'Mon-Fri, 9AM-6PM IST',
      icon: <Phone className="w-6 h-6" />,
      color: 'from-[#BFBFBF] to-[#8C8C8C]'
    },
    {
      title: 'Location',
      content: 'Kochi, Kerala, India',
      description: 'Serving clients globally',
      icon: <MapPin className="w-6 h-6" />,
      color: 'from-[#8C8C8C] to-[#737373]'
    },
  ];

  const serviceOptions = [
    'Digital Strategy & Consulting',
    'Performance Marketing',
    'Content & SEO',
    'Social Media Marketing',
    'Brand Development',
    'Marketing Automation',
    'Website Development',
    'Custom Solution',
  ];

  const budgetOptions = [
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    '₹2,50,000 - ₹5,00,000',
    '₹5,00,000+',
    'Need Consultation',
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#151515] to-[#0A0A0A]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, #BFBFBF 1px, transparent 1px), linear-gradient(180deg, #BFBFBF 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-[#D9D9D9] to-transparent"></div>
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Connect With Us</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D9D9D9]"></div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-[#D9D9D9]">LET'S BUILD YOUR</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                DIGITAL GROWTH
              </span>
            </h1>
            
            <p className="text-xl text-[#BFBFBF] max-w-2xl mx-auto">
              Ready to transform your digital presence? Let's connect and architect your growth journey together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#151515] py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur"></div>
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10 group-hover:border-[#D9D9D9]/30 transition-all duration-300 group-hover:scale-[1.02] text-center">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${method.color} bg-opacity-10 mb-6`}>
                    <div className="text-[#D9D9D9]">
                      {method.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#D9D9D9] mb-2">{method.title}</h3>
                  <p className="text-lg text-[#BFBFBF] mb-2">{method.content}</p>
                  <p className="text-sm text-[#8C8C8C]">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#151515] to-[#0A0A0A] py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#D9D9D9]/10 via-transparent to-[#BFBFBF]/10 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#D9D9D9]/20 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#D9D9D9]/30">
                    <MessageCircle className="w-6 h-6 text-[#D9D9D9]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#D9D9D9]">Start Your Growth Journey</h2>
                    <p className="text-[#8C8C8C]">Fill out the form below</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#BFBFBF]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/20 px-4 py-3 rounded-xl text-[#BFBFBF] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 transition-all placeholder-[#737373]"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#BFBFBF]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/20 px-4 py-3 rounded-xl text-[#BFBFBF] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 transition-all placeholder-[#737373]"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-[#BFBFBF]">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/20 px-4 py-3 rounded-xl text-[#BFBFBF] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 transition-all placeholder-[#737373]"
                      placeholder="Enter company name (optional)"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="service" className="mb-2 block text-sm font-medium text-[#BFBFBF]">
                        Service Interest *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/20 px-4 py-3 rounded-xl text-[#BFBFBF] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 transition-all"
                      >
                        <option value="" className="bg-[#0A0A0A]">Select service</option>
                        {serviceOptions.map((service, index) => (
                          <option key={index} value={service} className="bg-[#0A0A0A]">
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="mb-2 block text-sm font-medium text-[#BFBFBF]">
                        Project Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/20 px-4 py-3 rounded-xl text-[#BFBFBF] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 transition-all"
                      >
                        <option value="" className="bg-[#0A0A0A]">Select budget range</option>
                        {budgetOptions.map((budget, index) => (
                          <option key={index} value={budget} className="bg-[#0A0A0A]">
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#BFBFBF]">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/20 px-4 py-3 rounded-xl text-[#BFBFBF] focus:border-[#D9D9D9]/50 focus:outline-none focus:ring-1 focus:ring-[#D9D9D9]/20 transition-all resize-none placeholder-[#737373]"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden border border-[#D9D9D9]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && <Send className="w-4 h-4" />}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x rounded-xl"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* What to Expect */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#D9D9D9]/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#D9D9D9]/30">
                    <Sparkles className="w-6 h-6 text-[#D9D9D9]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#D9D9D9]">What Happens Next?</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D9D9D9] to-[#BFBFBF] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-[#0A0A0A]">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#D9D9D9]">Initial Response</p>
                      <p className="text-sm text-[#8C8C8C]">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#BFBFBF] to-[#8C8C8C] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-[#0A0A0A]">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#D9D9D9]">Discovery Call</p>
                      <p className="text-sm text-[#8C8C8C]">30-minute strategy session</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8C8C8C] to-[#737373] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-[#0A0A0A]">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#D9D9D9]">Custom Proposal</p>
                      <p className="text-sm text-[#8C8C8C]">Tailored strategy and pricing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#737373] to-[#D9D9D9] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-[#0A0A0A]">4</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#D9D9D9]">Project Kickoff</p>
                      <p className="text-sm text-[#8C8C8C]">Begin your growth journey</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#D9D9D9]/30">
                    <Clock className="w-6 h-6 text-[#D9D9D9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#D9D9D9]">Business Hours</h3>
                    <p className="text-sm text-[#8C8C8C]">Indian Standard Time (IST)</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#BFBFBF]">Monday - Friday</span>
                    <span className="text-[#D9D9D9] font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#BFBFBF]">Saturday</span>
                    <span className="text-[#D9D9D9] font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#BFBFBF]">Sunday</span>
                    <span className="text-[#D9D9D9] font-medium">By Appointment</span>
                  </div>
                </div>
              </div>

              {/* About Our Process */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#D9D9D9]/30">
                    <Users className="w-6 h-6 text-[#D9D9D9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#D9D9D9]">Our Approach</h3>
                    <p className="text-sm text-[#8C8C8C]">How we work with clients</p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-[#BFBFBF]">
                    <ArrowRight className="w-4 h-4 mr-2 text-[#D9D9D9]" />
                    Dedicated project manager
                  </li>
                  <li className="flex items-center text-sm text-[#BFBFBF]">
                    <ArrowRight className="w-4 h-4 mr-2 text-[#D9D9D9]" />
                    Transparent communication
                  </li>
                  <li className="flex items-center text-sm text-[#BFBFBF]">
                    <ArrowRight className="w-4 h-4 mr-2 text-[#D9D9D9]" />
                    Data-driven decisions
                  </li>
                  <li className="flex items-center text-sm text-[#BFBFBF]">
                    <ArrowRight className="w-4 h-4 mr-2 text-[#D9D9D9]" />
                    Regular progress reports
                  </li>
                  <li className="flex items-center text-sm text-[#BFBFBF]">
                    <ArrowRight className="w-4 h-4 mr-2 text-[#D9D9D9]" />
                    Industry-specific expertise
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTA
        headline="Ready to Architect Your Growth?"
        description="Let's connect and build something extraordinary together."
        primaryCtaText="Schedule a Strategy Call"
        primaryCtaLink="/contact"
        secondaryCtaText="View Case Studies"
        secondaryCtaLink="/portfolio"
        variant="dark"
      />
    </main>
  );
}