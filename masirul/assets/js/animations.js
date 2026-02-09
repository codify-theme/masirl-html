/**
 * GSAP Animations
 * Masirul - Personal Portfolio Template
 * 
 * @package     Masirul
 * @version     1.0.0
 * @author      Masirul Islam
 * @copyright   2026
 */

(function() {
    'use strict';

    // Register GSAP plugins
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        if (typeof ScrollToPlugin !== 'undefined') {
            gsap.registerPlugin(ScrollToPlugin);
        }
    }

    /**
     * Initialize all animations
     */
    function initAnimations() {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP is not loaded');
            return;
        }

        initHeroAnimations();
        initExperienceAnimations();
        initProjectAnimations();
        initToolCardAnimations();
        initStatsAnimations();
        initContactAnimations();
        initScrollReveal();
    }

    /**
     * Hero Section Animations
     */
    function initHeroAnimations() {
        const heroContent = document.querySelector('.hero__content');
        const heroImage = document.querySelector('.hero__image-wrapper');
        const heroFloatingCards = document.querySelectorAll('.hero__floating-card');

        if (heroContent && typeof gsap !== 'undefined') {
            gsap.from(heroContent, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2
            });
        }

        if (heroImage && typeof gsap !== 'undefined') {
            gsap.from(heroImage, {
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.4
            });
        }

        // Animate floating cards with GSAP
        if (heroFloatingCards.length > 0 && typeof gsap !== 'undefined') {
            heroFloatingCards.forEach((card, index) => {
                // Check if it's a middle card (index 2 or 3)
                const isMiddleCard = index >= 2;
                
                // Initial state
                gsap.set(card, {
                    opacity: 0,
                    scale: 0.5,
                    rotation: -15,
                    x: index % 2 === 0 ? -50 : 50,
                    y: isMiddleCard ? 0 : (index < 2 ? -50 : 50),
                    yPercent: isMiddleCard ? -50 : 0
                });

                // Entrance animation with bounce effect
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    x: 0,
                    y: isMiddleCard ? 0 : 0,
                    yPercent: isMiddleCard ? -50 : 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    delay: 0.6 + (index * 0.15)
                });

                // Continuous floating animation with timeline
                const floatTimeline = gsap.timeline({ repeat: -1, yoyo: true });
                
                // Different animation patterns for each card
                if (index === 0) {
                    // Top right card - circular motion
                    floatTimeline.to(card, {
                        rotation: 5,
                        x: 10,
                        y: -15,
                        duration: 4,
                        ease: 'sine.inOut'
                    }).to(card, {
                        rotation: -5,
                        x: -5,
                        y: -25,
                        duration: 4,
                        ease: 'sine.inOut'
                    }).to(card, {
                        rotation: 0,
                        x: 0,
                        y: 0,
                        duration: 4,
                        ease: 'sine.inOut'
                    });
                } else if (index === 1) {
                    // Bottom left card - opposite motion
                    floatTimeline.to(card, {
                        rotation: -5,
                        x: -10,
                        y: 15,
                        duration: 4,
                        ease: 'sine.inOut'
                    }).to(card, {
                        rotation: 5,
                        x: 5,
                        y: 25,
                        duration: 4,
                        ease: 'sine.inOut'
                    }).to(card, {
                        rotation: 0,
                        x: 0,
                        y: 0,
                        duration: 4,
                        ease: 'sine.inOut'
                    });
                } else if (index === 2) {
                    // Right middle card - horizontal motion (using yPercent to preserve centering)
                    floatTimeline.to(card, {
                        rotation: -2,
                        x: -15,
                        yPercent: -50,
                        duration: 3.5,
                        ease: 'sine.inOut'
                    }).to(card, {
                        rotation: 2,
                        x: 10,
                        yPercent: -50,
                        duration: 3.5,
                        ease: 'sine.inOut'
                    }).to(card, {
                        rotation: 0,
                        x: 0,
                        yPercent: -50,
                        duration: 3.5,
                        ease: 'sine.inOut'
                    });
                } else if (index === 3) {
                    // Left middle card - horizontal motion (opposite, using yPercent)
                    floatTimeline.to(card, {
                        rotation: 2,
                        x: 15,
                        yPercent: -50,
                        duration: 3.5,
                        ease: 'sine.inOut'
                    }).to(card, {
                        rotation: -2,
                        x: -10,
                        yPercent: -50,
                        duration: 3.5,
                        ease: 'sine.inOut'
                    }).to(card, {
                        rotation: 0,
                        x: 0,
                        yPercent: -50,
                        duration: 3.5,
                        ease: 'sine.inOut'
                    });
                }

                // Hover animation
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        scale: 1.15,
                        rotation: 8,
                        y: isMiddleCard ? -12 : -12,
                        yPercent: isMiddleCard ? -50 : 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                    floatTimeline.pause();
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        scale: 1,
                        rotation: 0,
                        y: 0,
                        yPercent: isMiddleCard ? -50 : 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                    floatTimeline.resume();
                });

                // Pulse animation for icon
                const icon = card.querySelector('.hero__floating-card-icon');
                if (icon) {
                    gsap.to(icon, {
                        scale: 1.1,
                        duration: 1.5,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true,
                        delay: index * 0.3
                    });
                }

                // Number counter animation
                const number = card.querySelector('.hero__floating-card-number');
                if (number && number.textContent.includes('+')) {
                    gsap.from(number, {
                        scale: 0,
                        rotation: -180,
                        duration: 0.6,
                        ease: 'back.out(2)',
                        delay: 0.8 + (index * 0.15)
                    });
                }
            });
        }
    }

    /**
     * Experience Cards - Simple Animations
     */
    function initExperienceAnimations() {
        const experienceItems = document.querySelectorAll('.experience-item');
        
        if (experienceItems.length === 0 || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            return;
        }

        experienceItems.forEach((item, index) => {
            // Set initial state
            gsap.set(item, {
                opacity: 0,
                y: 50
            });

            // Simple scroll trigger animation
            ScrollTrigger.create({
                trigger: item,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(item, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        delay: index * 0.1
                    });
                },
                once: true
            });
        });
    }

    /**
     * Project Cards - Simple Animations
     */
    function initProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        if (projectCards.length === 0 || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            return;
        }

        projectCards.forEach((card, index) => {
            gsap.set(card, {
                opacity: 0,
                y: 50
            });

            ScrollTrigger.create({
                trigger: card,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(card, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        delay: index * 0.1
                    });
                },
                once: true
            });
        });
    }

    /**
     * Tool Cards Animations
     */
    function initToolCardAnimations() {
        const toolCards = document.querySelectorAll('.tool-card');
        
        if (toolCards.length === 0 || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            return;
        }

        toolCards.forEach((card, index) => {
            gsap.set(card, {
                opacity: 0,
                scale: 0.8,
                rotation: -10
            });

            ScrollTrigger.create({
                trigger: card,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        ease: 'back.out(1.7)',
                        delay: index * 0.1
                    });
                },
                once: true
            });
        });
    }

    /**
     * Stats Counter Animation
     */
    function initStatsAnimations() {
        const statsNumbers = document.querySelectorAll('.stats__number');
        
        if (statsNumbers.length === 0 || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            return;
        }

        statsNumbers.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-count')) || 0;
            
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to({ value: 0 }, {
                        value: target,
                        duration: 2,
                        ease: 'power2.out',
                        onUpdate: function() {
                            stat.textContent = Math.round(this.targets()[0].value);
                        }
                    });
                },
                once: true
            });
        });
    }

    /**
     * Contact Form Animations
     */
    function initContactAnimations() {
        const contactForm = document.querySelector('.contact__form');
        const contactFields = document.querySelectorAll('.contact__field');
        
        if (contactForm && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.set(contactForm, {
                opacity: 0,
                y: 50
            });

            ScrollTrigger.create({
                trigger: contactForm,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(contactForm, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });

                                // Animate fields
                    if (contactFields.length > 0) {
                        gsap.from(contactFields, {
                            opacity: 0,
                            x: -30,
                            duration: 0.6,
                            stagger: 0.1,
                            ease: 'power2.out',
                            delay: 0.3
                        });
                    }
                },
                once: true
            });
        }
    }

    /**
     * General Scroll Reveal Animations
     */
    function initScrollReveal() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            return;
        }

        // Section headers
        const sectionHeaders = document.querySelectorAll('.experience__header, .projects__header, .tools__header, .thoughts__header, .contact__header');
        
        sectionHeaders.forEach((header) => {
            gsap.set(header, {
                opacity: 0,
                y: 30
            });

            ScrollTrigger.create({
                trigger: header,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(header, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                },
                once: true
            });
        });

        // Blog cards in thoughts section
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach((card, index) => {
            gsap.set(card, {
                opacity: 0,
                x: -50
            });

            ScrollTrigger.create({
                trigger: card,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(card, {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        delay: index * 0.1
                    });
                },
                once: true
            });
        });
    }

    /**
     * Smooth scroll for navigation links
     */
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '') return;
                
                const target = document.querySelector(href);
                
                if (target && typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
                    e.preventDefault();
                    
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: 'power2.inOut'
                    });
                } else if (target) {
                    // Fallback to native smooth scroll
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAnimations();
            initSmoothScroll();
        });
    } else {
        initAnimations();
        initSmoothScroll();
    }

    // Refresh ScrollTrigger on window resize
    if (typeof ScrollTrigger !== 'undefined') {
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });
    }

})();
