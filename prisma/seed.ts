import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tbc.com' },
    update: {},
    create: {
      email: 'admin@tbc.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.log('✅ Created admin user:', admin.email)

  // Create default packages
  const starterPackage = await prisma.package.upsert({
    where: { slug: 'starter' },
    update: {},
    create: {
      name: 'Starter',
      slug: 'starter',
      description: 'Perfect for small businesses getting started with digital marketing.',
      shortDescription: 'Perfect for small businesses',
      price: 999,
      priceType: 'MONTHLY',
      features: JSON.stringify([
        { name: 'SEO Audit & Optimization', included: true },
        { name: '5 Blog Posts per Month', included: true },
        { name: 'Social Media Management (3 platforms)', included: true },
        { name: 'Monthly Analytics Report', included: true },
        { name: 'Email Support', included: true },
      ]),
      isActive: true,
      isFeatured: false,
      displayOrder: 1,
    },
  })

  const professionalPackage = await prisma.package.upsert({
    where: { slug: 'professional' },
    update: {},
    create: {
      name: 'Professional',
      slug: 'professional',
      description: 'Comprehensive marketing solution for growing businesses.',
      shortDescription: 'Comprehensive marketing solution',
      price: 2499,
      priceType: 'MONTHLY',
      features: JSON.stringify([
        { name: 'Everything in Starter', included: true },
        { name: '10 Blog Posts per Month', included: true },
        { name: 'Social Media Management (5 platforms)', included: true },
        { name: 'PPC Campaign Management', included: true },
        { name: 'Content Strategy Development', included: true },
        { name: 'Weekly Analytics Report', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Monthly Strategy Call', included: true },
      ]),
      isActive: true,
      isFeatured: true,
      displayOrder: 2,
    },
  })

  console.log('✅ Created packages')

  // Create sample projects
  await prisma.project.upsert({
    where: { slug: 'techstart-inc' },
    update: {},
    create: {
      title: 'TechStart Inc.',
      slug: 'techstart-inc',
      description: 'Complete SEO overhaul resulting in 300% traffic increase.',
      category: 'seo',
      clientName: 'TechStart Inc.',
      results: JSON.stringify([
        { metric: 'Traffic Increase', value: '300%' },
        { metric: 'New Keyword Rankings', value: '50+' },
        { metric: 'Page Speed Improvement', value: '75%' },
      ]),
      services: JSON.stringify(['SEO Optimization', 'Technical Audit', 'Content Strategy']),
      isPublished: true,
      featured: true,
      displayOrder: 1,
    },
  })

  console.log('✅ Created sample projects')

  // Create sample testimonials
  await prisma.testimonial.upsert({
    where: { id: 'testimonial-1' },
    update: {},
    create: {
      id: 'testimonial-1',
      quote: 'They transformed our online presence completely. Our traffic increased by 300% in just 3 months!',
      author: 'Sarah Johnson',
      company: 'TechStart Inc.',
      rating: 5,
      isPublished: true,
      featured: true,
    },
  })

  console.log('✅ Created sample testimonials')

  // Create sample lead
  const existingLead = await prisma.lead.findFirst({
    where: { email: 'sample@example.com' },
  })
  
  if (!existingLead) {
    const sampleLead = await prisma.lead.create({
      data: {
        name: 'John Doe',
        email: 'sample@example.com',
        phone: '+1 (555) 123-4567',
        company: 'Sample Company',
        service: 'SEO Optimization',
        message: 'Interested in your services',
        status: 'NEW',
      },
    })
    console.log('✅ Created sample lead')
  } else {
    console.log('✅ Sample lead already exists')
  }

  console.log('✅ Created sample lead')

  console.log('🎉 Database seeded successfully!')
  console.log('\n📝 Admin credentials:')
  console.log('   Email: admin@tbc.com')
  console.log('   Password: admin123')
  console.log('\n⚠️  Please change the admin password after first login!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

