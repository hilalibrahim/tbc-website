import Card from '@/components/Card';
import CTA from '@/components/CTA';

export const metadata = {
  title: 'About Us - Marketing Agency',
  description: 'Learn about our mission, team, and values',
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Founder',
      bio: '10+ years in digital marketing. Passionate about data-driven strategies.',
      icon: '👨‍💼',
    },
    {
      name: 'Jordan Martinez',
      role: 'Head of Strategy',
      bio: 'Expert in SEO and content marketing. Former agency director.',
      icon: '👩‍💼',
    },
    {
      name: 'Sam Chen',
      role: 'Lead Developer',
      bio: 'Full-stack developer specializing in marketing automation.',
      icon: '👨‍💻',
    },
    {
      name: 'Casey Williams',
      role: 'Creative Director',
      bio: 'Award-winning designer with focus on brand identity.',
      icon: '👩‍🎨',
    },
  ];

  const values = [
    {
      title: 'Transparency',
      description: 'Clear communication and honest reporting on all projects.',
      icon: '🔍',
    },
    {
      title: 'Innovation',
      description: 'Staying ahead with the latest marketing technologies and trends.',
      icon: '💡',
    },
    {
      title: 'Results-Driven',
      description: 'Every strategy is designed to deliver measurable outcomes.',
      icon: '📊',
    },
    {
      title: 'Client-Focused',
      description: 'Your success is our success. We partner with you for the long term.',
      icon: '🤝',
    },
  ];

  const stats = [
    { label: 'Clients Served', value: '500+', icon: '👥' },
    { label: 'Projects Completed', value: '1,200+', icon: '✅' },
    { label: 'Team Members', value: '25+', icon: '🌟' },
    { label: 'Years Experience', value: '10+', icon: '📅' },
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
            About Us
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Building digital success stories, one campaign at a time.
          </p>
        </div>
      </section>

      {/* Company Story - Black Background */}
      <section className="bg-gradient-dark px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-4xl relative z-10">
          <Card className="mb-8 floating" depth="4" variant="dark">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-3xl font-heading text-white">Our Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We help businesses transform their digital presence through data-driven marketing strategies. 
                  Our mission is to deliver measurable results that drive growth and success.
                </p>
              </div>
              <div>
                <h2 className="mb-4 text-3xl font-heading text-white">Our Vision</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To be the leading marketing agency that combines technical expertise with creative innovation, 
                  helping businesses achieve their goals in the digital landscape.
                </p>
              </div>
              <div>
                <h2 className="mb-4 text-3xl font-heading text-white">Our Story</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Founded in 2014, we started as a small team of marketing enthusiasts with a passion for 
                  technology. Over the years, we've grown into a full-service agency, working with businesses 
                  of all sizes to create impactful marketing campaigns. Our commitment to excellence and 
                  technical expertise drives everything we do.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats/Achievements - White Background */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-heading text-foreground sm:text-6xl">
              By The Numbers
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Our track record speaks for itself
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center floating" depth="3">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-6xl font-heading text-accent mb-3">{stat.value}</div>
                <div className="text-secondary text-lg">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Black Background */}
      <section className="bg-gradient-dark px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-heading text-white sm:text-6xl">
              Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Meet the experts behind your success
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Card key={index} className="h-full text-center floating" depth="4" variant="dark">
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="mb-2 text-xl font-heading text-white">{member.name}</h3>
                <p className="mb-4 text-accent font-heading">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values/Principles - White Background */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-5xl font-heading text-foreground sm:text-6xl">
              Our Values
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="h-full text-center floating" depth="3">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="mb-3 text-2xl font-heading text-foreground">{value.title}</h3>
                <p className="text-secondary leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        headline="Ready to Work Together?"
        description="Let's discuss how we can help grow your business."
        primaryCtaText="Get In Touch"
        primaryCtaLink="/contact"
        secondaryCtaText="View Services"
        secondaryCtaLink="/services"
      />
    </main>
  );
}
