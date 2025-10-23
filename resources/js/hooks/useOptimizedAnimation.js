import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

// Optimized animation variants for consistent performance
export const animationVariants = {
    // Fade animations
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1] 
            }
        }
    },
    fadeInUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1] 
            }
        }
    },
    fadeInDown: {
        hidden: { opacity: 0, y: -30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1] 
            }
        }
    },
    fadeInLeft: {
        hidden: { opacity: 0, x: -30 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1] 
            }
        }
    },
    fadeInRight: {
        hidden: { opacity: 0, x: 30 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
                duration: 0.6, 
                ease: [0.4, 0, 0.2, 1] 
            }
        }
    },
    
    // Scale animations
    scaleIn: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration: 0.5, 
                ease: [0.4, 0, 0.2, 1] 
            }
        }
    },
    
    // Slide animations
    slideInUp: {
        hidden: { y: 100, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
                duration: 0.5, 
                ease: [0.4, 0, 0.2, 1] 
            }
        }
    },
    
    // Stagger animations for lists
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    },
    
    // Hover animations
    hover: {
        scale: 1.05,
        transition: { 
            duration: 0.2, 
            ease: [0.4, 0, 0.2, 1] 
        }
    },
    
    tap: {
        scale: 0.95,
        transition: { 
            duration: 0.1, 
            ease: [0.4, 0, 0.2, 1] 
        }
    }
};

// Custom hook for optimized scroll-triggered animations
export const useOptimizedAnimation = (threshold = 0.1, triggerOnce = true) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ 
        threshold, 
        triggerOnce,
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element comes into view
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [inView, controls]);

    return { ref, controls, inView };
};

// Optimized transition configurations
export const transitions = {
    fast: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    medium: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    slow: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    bounce: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] },
    elastic: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }
};

// Utility function for staggered animations
export const createStaggeredAnimation = (delay = 0.1) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
            delay
        }
    }
});

// Performance-optimized motion props
export const motionProps = {
    // Enable hardware acceleration
    style: {
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
    }
};
