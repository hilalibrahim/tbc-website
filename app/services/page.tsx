'use client';

import ServiceCard from '@/components/ServiceCard';
import Card from '@/components/Card';
import CTA from '@/components/CTA';
import { Target, Search, Megaphone, Users, BarChart3, Zap, Mail, Globe, TrendingUp, Clock, Shield, Brain, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const servicePackages = [
    {
      title: 'Growth Starter',
      description: 'Perfect for early-stage businesses beginning their digital transformation journey.',
      price: '₹99,999/mo',
      features: [
        'SEO Audit & Optimization',
        '5 Strategic Content Pieces',
        'Social Media Management (3 platforms)',
        'Monthly Performance Analytics',
        'Basic Growth Strategy',
        'Email & Chat Support'
      ],
      featured: false,
      icon: <Target className="w-6 h-6" />,
      color: 'from-[#D9D9D9] to-[#BFBFBF]'
    },
    {
      title: 'Growth Accelerator',
      description: 'Comprehensive solution for businesses ready to scale their digital presence.',
      price: '₹2,49,999/mo',
      features: [
        'Everything in Growth Starter',
        'Advanced SEO & Technical Optimization',
        '10 Strategic Content Pieces',
        'Social Media Management (5 platforms)',
        'PPC Campaign Management',
        'Content Strategy Development',
        'Weekly Analytics Reports',
        'Performance Optimization',
        'Priority Support',
        'Bi-weekly Strategy Calls'
      ],
      featured: true,
      icon: <Zap className="w-6 h-6" />,
      color: 'from-[#BFBFBF] to-[#8C8C8C]'
    },
    {
      title: 'Growth Enterprise',
      description: 'Full-service marketing partnership for established companies.',
      price: 'Custom Quote',
      features: [
        'Everything in Growth Accelerator',
        'Unlimited Strategic Content',
        'Full Social Media Ecosystem',
        'Multi-Channel PPC Campaigns',
        'Marketing Automation Setup',
        'Custom Analytics Dashboards',
        'Advanced Growth Hacking',
        'Competitor Analysis',
        'Dedicated Account Manager',
        'Weekly Strategy Sessions',
        'Custom Technology Integration'
      ],
      featured: false,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-[#8C8C8C] to-[#737373]'
    },
  ];

  const coreServices = [
    {
      title: 'Digital Strategy & Consulting',
      description: 'Comprehensive growth roadmaps backed by market intelligence and data analytics.',
      icon: <Brain className="w-8 h-8" />,
      features: ['Market Analysis', 'Competitive Research', 'Growth Planning', 'Performance Tracking'],
      color: 'from-[#D9D9D9] to-[#BFBFBF]'
    },
    {
      title: 'Performance Marketing',
      description: 'Data-driven campaigns that deliver measurable ROI and sustainable growth.',
      icon: <BarChart3 className="w-8 h-8" />,
      features: ['Paid Media', 'Conversion Optimization', 'ROI Tracking', 'A/B Testing'],
      color: 'from-[#BFBFBF] to-[#8C8C8C]'
    },
    {
      title: 'Content & SEO',
      description: 'Strategic content creation and optimization for search engines and user engagement.',
      icon: <Search className="w-8 h-8" />,
      features: ['Content Strategy', 'SEO Optimization', 'Keyword Research', 'Technical SEO'],
      color: 'from-[#8C8C8C] to-[#737373]'
    },
    {
      title: 'Social Media Marketing',
      description: 'Build authentic brand presence and community engagement across platforms.',
      icon: <Megaphone className="w-8 h-8" />,
      features: ['Strategy Development', 'Content Creation', 'Community Management', 'Performance Analytics'],
      color: 'from-[#737373] to-[#D9D9D9]'
    },
  ];

  const processSteps = [
    { 
      step: '01', 
      title: 'Discovery & Analysis', 
      description: 'Deep dive into your business, goals, and current digital presence.',
      icon: <Search className="w-6 h-6" />,
      color: 'from-[#D9D9D9] to-[#BFBFBF]'
    },
    { 
      step: '02', 
      title: 'Strategy Development', 
      description: 'Customized digital marketing strategy tailored to your specific needs.',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-[#BFBFBF] to-[#8C8C8C]'
    },
    { 
      step: '03', 
      title: 'Execution & Implementation', 
      description: 'Deployment of campaigns and strategies with precision and expertise.',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-[#8C8C8C] to-[#737373]'
    },
    { 
      step: '04', 
      title: 'Optimization & Growth', 
      description: 'Continuous monitoring, analysis, and improvement for maximum results.',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-[#737373] to-[#D9D9D9]'
    },
  ];

  const industriesWeServe = [
    { name: 'Travel & Hospitality', icon: '✈️' },
    { name: 'Technology & SaaS', icon: '💻' },
    { name: 'E-commerce & Retail', icon: '🛒' },
    { name: 'Professional Services', icon: '🏢' },
    { name: 'Healthcare', icon: '🏥' },
    { name: 'Education', icon: '🎓' },
    { name: 'Finance', icon: '💰' },
    { name: 'Real Estate', icon: '🏠' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#151515] to-[#0A0A0A]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, #BFBFBF 1px, transparent 1px),
                             radial-gradient(circle at 70% 70%, #8C8C8C 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-[#D9D9D9] to-transparent"></div>
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Our Solutions</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D9D9D9]"></div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-[#D9D9D9]">DIGITAL GROWTH</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                SOLUTIONS
              </span>
            </h1>
            
            <p className="text-xl text-[#BFBFBF] max-w-2xl mx-auto mb-8">
              Comprehensive digital marketing services designed to connect your brand with growth, regardless of your industry.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden border border-[#D9D9D9]/30"
              >
                <span className="relative z-10">Start Your Growth Journey</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#151515] py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="servicePattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30,0 L60,30 L30,60 L0,30 Z" fill="none" stroke="#BFBFBF" strokeWidth="1" opacity="0.1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#servicePattern)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#D9D9D9]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Growth Packages</span>
              <Sparkles className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                Tailored Solutions
              </span>
            </h2>
            <p className="text-xl text-[#BFBFBF] max-w-2xl mx-auto">
              Choose the package that aligns with your growth stage and objectives
            </p>
          </div>
          
          {/* Package Comparison */}
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {servicePackages.map((pkg, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-500 hover:translate-y-[-8px] ${
                  pkg.featured ? 'md:-mt-4' : ''
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`h-full rounded-2xl overflow-hidden border ${
                  pkg.featured 
                    ? 'border-[#D9D9D9]/30 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] ring-2 ring-[#D9D9D9]/30 shadow-2xl' 
                    : 'border-[#BFBFBF]/10 bg-gradient-to-br from-[#0A0A0A] to-[#151515] shadow-xl'
                }`}>
                  {/* Header */}
                  <div className="p-6 border-b border-[#BFBFBF]/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${pkg.color} bg-opacity-20`}>
                        <div className="text-[#D9D9D9]">
                          {pkg.icon}
                        </div>
                      </div>
                      {pkg.featured && (
                        <span className="px-3 py-1 text-xs font-semibold tracking-widest bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] rounded-full border border-[#D9D9D9]/30">
                          MOST POPULAR
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-[#D9D9D9] mb-2">{pkg.title}</h3>
                    <p className="text-[#8C8C8C] text-sm">{pkg.description}</p>
                  </div>
                  
                  {/* Pricing */}
                  <div className="p-6 border-b border-[#BFBFBF]/10">
                    <div className="text-3xl font-bold text-[#D9D9D9] mb-1">{pkg.price}</div>
                    <div className="text-sm text-[#8C8C8C]">{pkg.price === 'Custom Quote' ? 'Tailored to your needs' : 'Monthly investment'}</div>
                  </div>
                  
                  {/* Features */}
                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-[#D9D9D9] mb-4 uppercase tracking-wider">What's Included</h4>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-[#BFBFBF]">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#D9D9D9]/10 to-[#BFBFBF]/10 border border-[#BFBFBF]/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#D9D9D9] to-[#BFBFBF]"></div>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA */}
                    <Link
                      href="/contact"
                      className="group relative inline-flex items-center justify-center w-full px-6 py-4 rounded-lg font-semibold transition-all duration-300 overflow-hidden border border-[#BFBFBF]/20 hover:border-[#D9D9D9]/30"
                    >
                      <div className={`absolute inset-0 rounded-lg ${
                        pkg.featured 
                          ? 'bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A]' 
                          : 'bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A]'
                      }`}></div>
                      <span className={`relative z-10 flex items-center gap-2 ${
                        pkg.featured ? 'text-[#D9D9D9]' : 'text-[#BFBFBF]'
                      } group-hover:text-[#D9D9D9]`}>
                        Get Started
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Solutions Note */}
          <div className="text-center">
            <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10">
              <p className="text-lg text-[#BFBFBF] mb-2">
                <span className="text-[#D9D9D9] font-semibold">Need something custom?</span> We can tailor a solution specifically for your business.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#8C8C8C] hover:text-[#D9D9D9] transition-colors duration-300 text-sm"
              >
                Schedule a custom strategy session
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#151515] to-[#0A0A0A] py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent"></div>
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Core Services</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                Our Expertise
              </span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {coreServices.map((service, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10 group-hover:border-[#D9D9D9]/30 transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-br opacity-0 group-hover:opacity-20 rounded-xl blur transition-opacity duration-300"></div>
                    <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-10`}>
                      <div className="text-[#D9D9D9]">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#D9D9D9] mb-3">{service.title}</h3>
                  <p className="text-[#BFBFBF] text-sm mb-6">{service.description}</p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-[#8C8C8C]">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#D9D9D9] to-[#BFBFBF] mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#151515] py-32">
        {/* Connection Lines */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {[...Array(4)].map((_, i) => (
              <path
                key={i}
                d={`M${20 + i * 20},100 Q500,${50 + i * 100} 980,${200 + i * 50}`}
                stroke="#BFBFBF"
                strokeWidth="1"
                fill="none"
                opacity="0.2"
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-[#D9D9D9]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Our Process</span>
              <Clock className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                How We Deliver Results
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Process Timeline Line */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D9D9D9]/20 to-transparent"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  className="group relative"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative text-center">
                    {/* Step Number */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border-4 border-[#0A0A0A] mb-6 z-20 relative">
                      <div className={`absolute -inset-1 bg-gradient-to-br ${step.color} rounded-full blur opacity-20`}></div>
                      <span className="text-2xl font-bold text-[#D9D9D9] relative z-10">{step.step}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10 group-hover:border-[#D9D9D9]/30 transition-all duration-300">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${step.color} bg-opacity-10 mb-4`}>
                        <div className="text-[#D9D9D9]">
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-[#D9D9D9] mb-3">{step.title}</h3>
                      <p className="text-[#BFBFBF] text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#151515] to-[#0A0A0A] py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-[#D9D9D9]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Industries We Serve</span>
              <Globe className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                Across All Sectors
              </span>
            </h2>
            <p className="text-xl text-[#BFBFBF] max-w-2xl mx-auto">
              From travel tech to finance, we have expertise in virtually every industry
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industriesWeServe.map((industry, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="relative p-6 rounded-xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10 group-hover:border-[#D9D9D9]/30 transition-all duration-300 group-hover:scale-[1.02] text-center">
                  <div className="text-3xl mb-3">{industry.icon}</div>
                  <div className="text-sm font-semibold text-[#BFBFBF] group-hover:text-[#D9D9D9] transition-colors duration-300">
                    {industry.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 pt-12 border-t border-[#BFBFBF]/10">
            <p className="text-lg text-[#BFBFBF]">
              <span className="text-[#D9D9D9] font-semibold">Your industry not listed?</span> Our strategies are adaptable to any business model.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTA
        headline="Ready to Accelerate Your Growth?"
        description="Whether you're just starting or looking to scale, we have the perfect solution for your business."
        primaryCtaText="Get Started Today"
        primaryCtaLink="/contact"
        secondaryCtaText="View Case Studies"
        secondaryCtaLink="/portfolio"
        variant="dark"
      />
    </main>
  );
}