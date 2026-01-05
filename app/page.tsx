import React from 'react';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import CTA from '@/components/CTA';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Clock, Target, Award, Star, Sparkles, Zap, BarChart3, Globe, Palette, Megaphone } from 'lucide-react';

export const metadata = {
  title: 'Home - The Big Connection | Digital Growth Architects',
  description: 'Transform your digital presence with data-driven marketing solutions. Strategic connections for exceptional growth.',
};

export default function Home() {
  const services = [
    {
      title: 'Digital Strategy & Consulting',
      description: 'Comprehensive growth roadmaps backed by data analytics and market intelligence.',
      features: ['Market Analysis', 'Competitive Research', 'Growth Planning'],
      icon: <Target className="w-6 h-6" />,
      color: 'from-[#D9D9D9] to-[#BFBFBF]'
    },
    {
      title: 'Brand Development & Design',
      description: 'Craft compelling brand identities that resonate with your target audience.',
      features: ['Brand Strategy', 'Visual Identity', 'Messaging Framework'],
      icon: <Palette className="w-6 h-6" />,
      color: 'from-[#BFBFBF] to-[#8C8C8C]'
    },
    {
      title: 'Performance Marketing',
      description: 'Data-driven campaigns that deliver measurable ROI and sustainable growth.',
      features: ['Paid Media', 'Conversion Optimization', 'ROI Tracking'],
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-[#8C8C8C] to-[#737373]',
      featured: true
    },
  ];

  const features = [
    { 
      title: 'Data-Intelligent', 
      description: 'Every strategy powered by deep analytics and market insights', 
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: 'from-[#D9D9D9] to-[#BFBFBF]'
    },
    { 
      title: 'Rapid Execution', 
      description: 'Agile implementation with 30% faster project delivery', 
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-[#BFBFBF] to-[#8C8C8C]'
    },
    { 
      title: 'Transparent Process', 
      description: 'Real-time dashboards and weekly performance reviews', 
      icon: <Globe className="w-8 h-8" />,
      gradient: 'from-[#8C8C8C] to-[#737373]'
    },
    { 
      title: 'Expert Collective', 
      description: '15+ years combined experience across digital disciplines', 
      icon: <Users className="w-8 h-8" />,
      gradient: 'from-[#737373] to-[#D9D9D9]'
    },
  ];

  const caseStudies = [
    {
      title: 'E-commerce Transformation',
      client: 'Luxe Fashion Co.',
      results: '+320% Revenue Growth',
      timeline: '6 Months',
      description: 'Complete digital overhaul resulting in 5x customer acquisition',
      metrics: [
        { label: 'Conversion Rate', value: '+84%' },
        { label: 'Customer LTV', value: '+65%' },
        { label: 'ROAS', value: '4.2x' }
      ]
    },
    {
      title: 'SaaS Platform Launch',
      client: 'TechFlow Solutions',
      results: '2,500+ Early Users',
      timeline: '4 Months',
      description: 'Go-to-market strategy for successful product launch',
      metrics: [
        { label: 'User Growth', value: '+215%' },
        { label: 'Activation Rate', value: '+92%' },
        { label: 'Retention', value: '89%' }
      ]
    },
  ];

  const testimonials = [
    {
      quote: 'The Big Connection transformed our approach to digital marketing. Their data-driven strategies delivered a 300% ROI increase within the first quarter.',
      author: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CEO',
      avatar: 'SJ'
    },
    {
      quote: 'Exceptional strategic thinking combined with flawless execution. They understand the connection between brand and growth like no one else.',
      author: 'Michael Chen',
      company: 'Digital Solutions',
      role: 'Marketing Director',
      avatar: 'MC'
    },
    {
      quote: 'Working with The Big Connection was a game-changer. They don\'t just execute campaigns; they architect growth ecosystems.',
      author: 'Emily Rodriguez',
      company: 'CodeCraft',
      role: 'Founder',
      avatar: 'ER'
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        headline="Architecting Digital Growth"
        subheadline="We connect brands to audiences through data-driven strategies, creating sustainable growth ecosystems."
        ctaText="Start Your Journey"
        ctaLink="/contact"
      />

      {/* Services Section */}
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
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Our Expertise</span>
              <Sparkles className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                Strategic Services
              </span>
            </h2>
            <p className="text-xl text-[#BFBFBF] max-w-2xl mx-auto">
              Comprehensive solutions designed to architect sustainable growth
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                features={service.features}
                ctaText="Learn More"
                ctaLink="/services"
                featured={service.featured}
                variant="dark"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#151515] to-[#0A0A0A] py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent"></div>
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Why We're Different</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                The Big Difference
              </span>
            </h2>
            <p className="text-xl text-[#BFBFBF] max-w-3xl mx-auto">
              We don't just execute campaigns—we architect growth ecosystems that deliver sustainable results
            </p>
          </div>

          {/* Features Grid with Hover Effects */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Floating Card Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#FF8E3C]/20 to-[#FF6B35]/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur"></div>
                <div className="relative h-full p-6 rounded-xl bg-gradient-to-br from-[#0A0A0A] via-[#151515] to-[#0A0A0A] border border-[#BFBFBF]/10 group-hover:border-[#FF8E3C]/30 transition-all duration-300 group-hover:scale-[1.02]">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#FF8E3C]/20 to-[#FF6B35]/20 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity duration-300"></div>
                    <div className="relative p-4 rounded-lg bg-gradient-to-br from-[#FF6B35]/10 to-[#FF8E3C]/10 inline-flex border border-[#FF8E3C]/20">
                      <div className="text-[#FF8E3C]">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#BFBFBF] mb-3 group-hover:text-[#FF8E3C] transition-colors">{feature.title}</h3>
                  <p className="text-[#8C8C8C]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#151515] py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="caseStudyPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30,0 L60,30 L30,60 L0,30 Z" fill="none" stroke="#BFBFBF" strokeWidth="1" opacity="0.1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#caseStudyPattern)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[#D9D9D9]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Success Stories</span>
              <TrendingUp className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                Impactful Results
              </span>
            </h2>
            <p className="text-xl text-[#BFBFBF] max-w-2xl mx-auto mb-8">
              Real results from real clients across multiple industries
            </p>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-[#BFBFBF] hover:text-[#D9D9D9] font-semibold transition-colors"
            >
              View All Studies
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Case Studies Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D9D9D9]/20 to-transparent"></div>
            
            {caseStudies.map((study, index) => (
              <div 
                key={index}
                className={`relative mb-16 md:mb-24 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:pl-0 md:text-right' : 'md:pl-1/2 md:pr-0'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#D9D9D9] to-[#BFBFBF] border-4 border-[#0A0A0A] z-10"></div>
                
                {/* Content Card */}
                <div className={`md:w-[calc(50%-4rem)] transform transition-all duration-500 hover:scale-[1.02] ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}>
                  <div className="rounded-2xl overflow-hidden border border-[#BFBFBF]/10 hover:border-[#D9D9D9]/30 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] shadow-2xl transition-all duration-300">
                    {/* Card Header */}
                    <div className="p-6 border-b border-[#BFBFBF]/10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-[#D9D9D9]">{study.title}</h3>
                          <p className="text-[#8C8C8C] mt-1">{study.client}</p>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] rounded-lg border border-[#D9D9D9]/30">
                          <span className="text-sm font-semibold text-[#D9D9D9]">{study.results}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Metrics Grid */}
                    <div className="p-6">
                      <p className="text-[#BFBFBF] mb-6">{study.description}</p>
                      <div className="grid grid-cols-3 gap-4">
                        {study.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-[#D9D9D9] to-[#BFBFBF] bg-clip-text text-transparent">{metric.value}</div>
                            <div className="text-xs text-[#8C8C8C] mt-1">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#151515] to-[#0A0A0A] py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-[#D9D9D9]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Client Love</span>
              <Star className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                Trusted Voices
              </span>
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#D9D9D9]/20 to-[#BFBFBF]/20 opacity-0 group-hover:opacity-30 rounded-2xl blur transition-opacity duration-300"></div>
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10 group-hover:border-[#D9D9D9]/30 transition-all duration-300">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <svg className="w-12 h-12 text-[#D9D9D9]" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8h4v12H10zM18 8h4v12h-4z"/>
                    </svg>
                  </div>
                  
                  {/* Quote */}
                  <p className="text-lg text-[#BFBFBF] italic mb-8">"{testimonial.quote}"</p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#D9D9D9]/30 flex items-center justify-center">
                      <span className="font-bold text-[#D9D9D9]">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#D9D9D9]">{testimonial.author}</div>
                      <div className="text-sm text-[#8C8C8C]">{testimonial.role}</div>
                      <div className="text-sm text-[#8C8C8C]">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#151515] py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="statsPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30,0 L60,30 L30,60 L0,30 Z" fill="none" stroke="#BFBFBF" strokeWidth="1" opacity="0.1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#statsPattern)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-[#D9D9D9]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Our Impact</span>
              <BarChart3 className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                By The Numbers
              </span>
            </h2>
          </div>

          {/* Stats Grid with Animated Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Brands Connected', value: '250+', icon: <Users className="w-6 h-6" /> },
              { label: 'Growth Multiplier', value: '3.2x', icon: <TrendingUp className="w-6 h-6" /> },
              { label: 'Client Retention', value: '98%', icon: <Award className="w-6 h-6" /> },
              { label: 'Project Success', value: '100%', icon: <Target className="w-6 h-6" /> },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#BFBFBF]/10 mb-6 group-hover:border-[#D9D9D9]/30 transition-all duration-300">
                  <div className="text-[#D9D9D9]">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C] bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-[#8C8C8C] font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Split Screen Design */}
      <CTA
        headline="Ready to Architect Your Growth?"
        description="Let's connect and build something extraordinary together."
        primaryCtaText="Start Your Journey"
        primaryCtaLink="/contact"
        secondaryCtaText="Explore Our Work"
        secondaryCtaLink="/portfolio"
      />
    </main>
  );
}