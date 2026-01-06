'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale'
}

const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }
}

const componentMap = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
  div: motion.div
}

export default function AnimatedText({
  children,
  className = '',
  delay = 0,
  duration = 1.0,
  as = 'div',
  variant = 'slideUp'
}: AnimatedTextProps) {
  const MotionComponent = componentMap[as] || motion.div

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}

