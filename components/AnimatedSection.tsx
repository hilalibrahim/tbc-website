'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
  staggerChildren?: boolean
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15
    }
  }
}

const getItemVariants = (direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 }
  }
  
  return {
    hidden: { opacity: 0, ...directions[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = '',
  staggerChildren = false,
  staggerDelay = 0.15,
  direction = 'up'
}: AnimatedSectionProps) {
  const itemVariants = getItemVariants(direction)
  
  if (staggerChildren) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className={className}
      >
        {Array.isArray(children) 
          ? children.map((child, index) => (
              <motion.div key={index} variants={itemVariants}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={itemVariants}>{children}</motion.div>
        }
      </motion.div>
    )
  }

  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

