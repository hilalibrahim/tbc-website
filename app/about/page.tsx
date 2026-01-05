'use client';

import Card from '@/components/Card';
import CTA from '@/components/CTA';
import Link from 'next/link';
import { Users, Target, TrendingUp, Award, Sparkles, Zap, Heart, Shield, Globe, Clock, Star, ArrowRight, Building, MapPin, Search, Rocket, Brain } from 'lucide-react';

export default function AboutPage() {
  const leadershipTeam = [
    {
      name: 'Hisan Lajvardh',
      role: 'Founder of Pitstopia',
      bio: 'Visionary entrepreneur who founded Pitstopia and oversees The Big Connection strategic direction.',
      expertise: ['Strategic Vision', 'Entrepreneurship', 'Digital Innovation'],
      color: 'from-[#D9D9D9] to-[#BFBFBF]'
    },
    {
      name: 'Athuljith M S',
      role: 'Lead Developer',
      bio: 'Technical expert and lead developer building innovative digital solutions and applications.',
      expertise: ['Software Development', 'Technical Architecture', 'Digital Solutions'],
      color: 'from-[#BFBFBF] to-[#8C8C8C]'
    },
    {
      name: 'Hilal Ibrahim',
      role: 'CTO',
      bio: 'Chief Technology Officer overseeing technical strategy and innovation across all platforms.',
      expertise: ['Technology Strategy', 'System Architecture', 'Technical Leadership'],
      color: 'from-[#8C8C8C] to-[#737373]'
    },
    {
      name: 'Gautham Subash',
      role: 'COO',
      bio: 'Operational leader ensuring seamless service delivery and client satisfaction.',
      expertise: ['Operations Management', 'Client Success', 'Process Optimization'],
      color: 'from-[#737373] to-[#D9D9D9]'
    },
  ];

  const industriesWeServe = [
    {
      category: 'Travel & Hospitality',
      examples: ['Hotels', 'Travel Agencies', 'Restaurants', 'Tourism Boards'],
      icon: '✈️'
    },
    {
      category: 'Technology & SaaS',
      examples: ['Software Companies', 'Tech Startups', 'Platforms', 'Apps'],
      icon: '💻'
    },
    {
      category: 'E-commerce & Retail',
      examples: ['Online Stores', 'Marketplaces', 'Brands', 'D2C Companies'],
      icon: '🛍️'
    },
    {
      category: 'Services & Consulting',
      examples: ['Agencies', 'Consultants', 'Professionals', 'Service Providers'],
      icon: '🏢'
    },
  ];

  const values = [
    {
      title: 'Data-Driven',
      description: 'Every strategy backed by comprehensive research and analytics.',
      icon: <Brain className="w-8 h-8" />,
      gradient: 'from-[#D9D9D9] to-[#BFBFBF]'
    },
    {
      title: 'Innovation Focused',
      description: 'Constantly evolving with the latest digital marketing technologies.',
      icon: <Rocket className="w-8 h-8" />,
      gradient: 'from-[#BFBFBF] to-[#8C8C8C]'
    },
    {
      title: 'Results Guaranteed',
      description: 'Committed to delivering measurable business outcomes.',
      icon: <Target className="w-8 h-8" />,
      gradient: 'from-[#8C8C8C] to-[#737373]'
    },
    {
      title: 'Client Partnership',
      description: 'Building long-term relationships focused on mutual growth.',
      icon: <Heart className="w-8 h-8" />,
      gradient: 'from-[#737373] to-[#D9D9D9]'
    },
  ];

  const pitstopiaServices = [
    {
      title: 'Clean Restrooms',
      description: 'Finding verified clean restrooms for travelers',
      icon: '🚻'
    },
    {
      title: 'Restaurant Discovery',
      description: 'Locating quality restaurants for travelers',
      icon: '🍽️'
    },
    {
      title: 'Travel Assistance',
      description: 'Essential services for comfortable travel',
      icon: '🧳'
    },
    {
      title: 'Real-time Information',
      description: 'Live updates on facilities and services',
      icon: '📱'
    },
  ];

  const stats = [
    { 
      label: 'Journey Started', 
      value: '2025', 
      description: 'Year of establishment',
      icon: <CalendarIcon className="w-6 h-6" />,
      color: 'from-[#D9D9D9] to-[#BFBFBF]'
    },
    { 
      label: 'Industries Served', 
      value: 'Any', 
      description: 'Cross-industry expertise',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-[#BFBFBF] to-[#8C8C8C]'
    },
    { 
      label: 'Parent Company', 
      value: 'Pitstopia', 
      description: 'Our founding venture',
      icon: <Building className="w-6 h-6" />,
      color: 'from-[#8C8C8C] to-[#737373]'
    },
    { 
      label: 'Team Experts', 
      value: '20+', 
      description: 'Digital marketing specialists',
      icon: <Users className="w-6 h-6" />,
      color: 'from-[#737373] to-[#D9D9D9]'
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#151515] to-[#0A0A0A]">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - The Big Connection */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-[#D9D9D9] to-transparent"></div>
                <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">A Venture by Pitstopia</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-[#D9D9D9]">DIGITAL MARKETING</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                  FOR EVERY INDUSTRY
                </span>
              </h1>
              
              <p className="text-xl text-[#BFBFBF] max-w-xl mb-8">
                Born from Pitstopia's success in travel tech, The Big Connection now provides comprehensive digital marketing solutions to businesses across all industries.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] text-[#D9D9D9] px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden border border-[#D9D9D9]/30"
                >
                  <span className="relative z-10">Explore Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
                </Link>
                
                <Link
                  href="https://pitstopia.com"
                  target="_blank"
                  className="group inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-[#BFBFBF]/20 text-[#BFBFBF] hover:text-[#D9D9D9] hover:border-[#D9D9D9]/30 transition-all duration-300"
                >
                  <Building className="w-4 h-4" />
                  <span>Visit Pitstopia</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Pitstopia Connection */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#D9D9D9]/10 via-transparent to-[#BFBFBF]/10 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#D9D9D9]/20 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#D9D9D9]/30">
                    <Building className="w-6 h-6 text-[#D9D9D9]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#D9D9D9]">From Pitstopia to All Industries</h2>
                    <p className="text-[#8C8C8C]">Our Origin Story</p>
                  </div>
                </div>
                
                <p className="text-lg text-[#BFBFBF] mb-6 leading-relaxed">
                  We began as the digital marketing team for Pitstopia, India's premier travel utility app. Our success in growing Pitstopia led us to expand our expertise to serve businesses across all industries.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {pitstopiaServices.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#BFBFBF]/10">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-[#D9D9D9]">{service.title}</div>
                        <div className="text-xs text-[#8C8C8C]">{service.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#151515] py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-[#D9D9D9]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Our Expertise</span>
              <Globe className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                Serving All Industries
              </span>
            </h2>
            <p className="text-xl text-[#BFBFBF] max-w-2xl mx-auto mb-12">
              From our roots in travel tech to expertise across every sector, we deliver results regardless of your industry.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {industriesWeServe.map((industry, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10 group-hover:border-[#D9D9D9]/30 transition-all duration-300 group-hover:scale-[1.02] h-full">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-bold text-[#D9D9D9] mb-4">{industry.category}</h3>
                  <ul className="space-y-2">
                    {industry.examples.map((example, idx) => (
                      <li key={idx} className="text-sm text-[#BFBFBF] flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#D9D9D9] to-[#BFBFBF] mr-2"></div>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-[#8C8C8C]">
              <span className="text-[#D9D9D9] font-semibold">Don't see your industry listed?</span> We have expertise in virtually every sector.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team - Co-Founders */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#151515] to-[#0A0A0A] py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent"></div>
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">The Founders</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                Meet The Co-Founders
              </span>
            </h2>
            <p className="text-xl text-[#BFBFBF] max-w-2xl mx-auto">
              The visionary team behind both Pitstopia and The Big Connection
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {leadershipTeam.map((member, index) => (
              <div 
                key={index}
                className="group relative h-full"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card */}
                <div className="relative h-full rounded-2xl overflow-hidden border border-[#BFBFBF]/10 group-hover:border-[#FF8E3C]/30 bg-gradient-to-br from-[#0A0A0A] via-[#151515] to-[#0A0A0A] p-6 transition-all duration-300 group-hover:scale-[1.02]">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#FF8E3C]/20 to-[#FF6B35]/20 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity duration-300"></div>
                    <div className="relative inline-flex p-4 rounded-lg bg-gradient-to-br from-[#FF6B35]/10 to-[#FF8E3C]/10 border border-[#FF8E3C]/20">
                      <Users className="w-8 h-8 text-[#FF8E3C]" />
                    </div>
                  </div>
                  
                  {/* Name and Role */}
                  <h3 className="text-xl font-bold text-[#BFBFBF] mb-2 group-hover:text-[#FF8E3C] transition-colors">{member.name}</h3>
                  <p className="text-[#FF8E3C] font-medium mb-4">{member.role}</p>
                  
                  {/* Bio */}
                  <p className="text-[#8C8C8C] text-sm mb-6 leading-relaxed">{member.bio}</p>
                  
                  {/* Expertise */}
                  <div className="pt-4 border-t border-[#BFBFBF]/10">
                    <h4 className="text-sm font-semibold text-[#BFBFBF] mb-3 uppercase tracking-wider">Expertise</h4>
                    <ul className="space-y-2">
                      {member.expertise.map((item, idx) => (
                        <li key={idx} className="flex items-center text-[#8C8C8C] text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#FF8E3C] to-[#FF6B35] mr-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 pt-12 border-t border-[#BFBFBF]/10">
            <p className="text-lg text-[#BFBFBF] max-w-3xl mx-auto">
              Together, this team successfully built Pitstopia from the ground up and now brings that same expertise to help businesses across all industries achieve digital success.
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="relative overflow-hidden bg-[#0A0A0A] py-32">
        {/* Hero-style Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#120A0A] to-[#0A0A0A]"></div>
          {/* Connection pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, #FF6B35 1px, transparent 1px),
                             radial-gradient(circle at 80% 70%, #FF8E3C 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}></div>
          {/* Warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/15 via-[#FF8E3C]/10 to-[#C44536]/15 mix-blend-overlay opacity-40"></div>
          {/* Volumetric lighting */}
          <div className="absolute top-1/4 -right-10 sm:-right-20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-l from-[#FF6B35]/10 to-transparent rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/3 -left-10 sm:-left-20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-r from-[#C44536]/10 to-transparent rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#FF8E3C]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Our Evolution</span>
              <Sparkles className="w-5 h-5 text-[#FF8E3C]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BFBFBF] via-[#FF8E3C] to-[#FF6B35]">
                From One to Many
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative p-8 rounded-2xl border border-[#BFBFBF]/10 hover:border-[#FF8E3C]/30 bg-gradient-to-br from-[#0A0A0A] via-[#151515] to-[#0A0A0A] transition-all duration-300 hover:scale-[1.02]">
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#FF8E3C]/20 to-[#FF6B35]/20 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity duration-300"></div>
                <div className="relative text-4xl">🚀</div>
              </div>
              <h3 className="text-xl font-bold text-[#BFBFBF] mb-4 group-hover:text-[#FF8E3C] transition-colors">The Beginning</h3>
              <p className="text-[#8C8C8C]">
                Started as the internal marketing team for Pitstopia, mastering digital growth in the travel tech space.
              </p>
            </div>
            
            <div className="group relative p-8 rounded-2xl border border-[#BFBFBF]/10 hover:border-[#FF8E3C]/30 bg-gradient-to-br from-[#0A0A0A] via-[#151515] to-[#0A0A0A] transition-all duration-300 hover:scale-[1.02]">
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#FF8E3C]/20 to-[#FF6B35]/20 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity duration-300"></div>
                <div className="relative text-4xl">📈</div>
              </div>
              <h3 className="text-xl font-bold text-[#BFBFBF] mb-4 group-hover:text-[#FF8E3C] transition-colors">Proven Success</h3>
              <p className="text-[#8C8C8C]">
                Successfully scaled Pitstopia to become India's leading travel utility app through innovative digital strategies.
              </p>
            </div>
            
            <div className="group relative p-8 rounded-2xl border border-[#BFBFBF]/10 hover:border-[#FF8E3C]/30 bg-gradient-to-br from-[#0A0A0A] via-[#151515] to-[#0A0A0A] transition-all duration-300 hover:scale-[1.02]">
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#FF8E3C]/20 to-[#FF6B35]/20 opacity-0 group-hover:opacity-40 rounded-xl blur transition-opacity duration-300"></div>
                <div className="relative text-4xl">🌍</div>
              </div>
              <h3 className="text-xl font-bold text-[#BFBFBF] mb-4 group-hover:text-[#FF8E3C] transition-colors">Expanding Horizons</h3>
              <p className="text-[#8C8C8C]">
                Now applying our proven digital marketing expertise to help businesses across all industries achieve growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#151515] to-[#0A0A0A] py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur"></div>
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10 group-hover:border-[#D9D9D9]/30 transition-all duration-300 group-hover:scale-[1.02] text-center">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 mb-4`}>
                    <div className="text-[#D9D9D9]">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-[#D9D9D9] mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-[#BFBFBF] mb-1">{stat.label}</div>
                  <div className="text-sm text-[#8C8C8C]">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#151515] py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <Heart className="w-5 h-5 text-[#D9D9D9]" />
              <span className="text-sm font-semibold tracking-widest text-[#8C8C8C] uppercase">Our Approach</span>
              <Heart className="w-5 h-5 text-[#D9D9D9]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] via-[#BFBFBF] to-[#8C8C8C]">
                How We Deliver Results
              </span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#BFBFBF]/10 group-hover:border-[#D9D9D9]/30 transition-all duration-300 text-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-br opacity-0 group-hover:opacity-20 rounded-xl blur transition-opacity duration-300"></div>
                    <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${value.gradient} bg-opacity-10`}>
                      <div className="text-[#D9D9D9]">
                        {value.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#D9D9D9] mb-3">{value.title}</h3>
                  <p className="text-[#BFBFBF]">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
    
    </main>
  );
}

// Calendar icon component
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}