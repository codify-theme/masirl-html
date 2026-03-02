/**
 * Main JavaScript File
 * Masirul - Personal Portfolio and CV Resume HTML Template
 * 
 * @package     Masirul
 * @version     1.0.0
 * @author      Masirul Islam
 * @copyright   2026
 */

(function ($) {
    'use strict';

    /**
     * Document Ready
     */
    $(document).ready(function () {
        initNavigation();
        initSmoothScroll();
        initCounterAnimation();
        initScrollAnimations();
        initContactForm();
        initParallax();
        initPortfolioFilter();
        initThoughtsSwiper();
    });

    /**
     * Navigation Functions
     */
    function initNavigation() {
        const $nav = $('.nav');
        const $navToggle = $('.nav__toggle');
        const $navMenu = $('.nav__menu');
        const $navLinks = $('.nav__link');

        // Mobile menu toggle
        $navToggle.on('click', function () {
            $navMenu.toggleClass('nav__menu--active');
            $(this).toggleClass('nav__toggle--active');
        });

        // Close mobile menu when clicking on a link
        $navLinks.on('click', function () {
            if ($(window).width() <= 768) {
                $navMenu.removeClass('nav__menu--active');
                $navToggle.removeClass('nav__toggle--active');
            }
        });

        // Active navigation link on scroll
        $(window).on('scroll', function () {
            const scrollPos = $(window).scrollTop() + 100;

            $navLinks.each(function () {
                const $link = $(this);
                const href = $link.attr('href');

                if (href && href.startsWith('#')) {
                    const target = $(href);
                    if (target.length) {
                        const targetTop = target.offset().top;
                        const targetBottom = targetTop + target.outerHeight();

                        if (scrollPos >= targetTop && scrollPos <= targetBottom) {
                            $navLinks.removeClass('nav__link--active');
                            $link.addClass('nav__link--active');
                        }
                    }
                }
            });
        });

        // Navbar background on scroll
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 50) {
                $nav.addClass('nav--scrolled');
            } else {
                $nav.removeClass('nav--scrolled');
            }
        });
    }

    /**
     * Smooth Scroll
     */
    function initSmoothScroll() {
        $('a[href^="#"]').on('click', function (e) {
            const target = $(this.getAttribute('href'));

            if (target.length) {
                e.preventDefault();
                const offset = $('.nav').outerHeight() || 0;

                $('html, body').animate({
                    scrollTop: target.offset().top - offset
                }, 800, 'swing');
            }
        });
    }

    /**
     * Counter Animation
     */
    function initCounterAnimation() {
        const $counters = $('.stats__number');
        let animated = false;

        function animateCounter($counter) {
            const $this = $counter;
            const target = parseInt($this.attr('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(function () {
                current += increment;
                if (current >= target) {
                    $this.text('+' + target);
                    clearInterval(timer);
                } else {
                    $this.text('+' + Math.floor(current));
                }
            }, 16);
        }

        $(window).on('scroll', function () {
            if (!animated) {
                const statsSection = $('.stats');
                const statsTop = statsSection.offset().top;
                const statsBottom = statsTop + statsSection.outerHeight();
                const windowTop = $(window).scrollTop();
                const windowBottom = windowTop + $(window).height();

                if (windowBottom >= statsTop && windowTop <= statsBottom) {
                    $counters.each(function () {
                        animateCounter($(this));
                    });
                    animated = true;
                }
            }
        });

        // Trigger on page load if stats section is visible
        if ($(window).scrollTop() + $(window).height() >= $('.stats').offset().top) {
            $counters.each(function () {
                animateCounter($(this));
            });
            animated = true;
        }
    }

    /**
     * Scroll Animations
     */
    function initScrollAnimations() {
        const animatedElements = $('.stats__item--animated, .project-card--animated, .experience-item--animated, .tool-card--animated, .thought-card--animated');

        function checkAnimation() {
            const windowTop = $(window).scrollTop();
            const windowBottom = windowTop + $(window).height();

            animatedElements.each(function () {
                const $element = $(this);
                if (!$element.hasClass('animated')) {
                    const elementTop = $element.offset().top;
                    const elementBottom = elementTop + $element.outerHeight();

                    // Trigger earlier by checking if windowBottom passes elementTop minus a small offset
                    if (windowBottom >= elementTop - 50 && windowTop <= elementBottom) {
                        $element.addClass('animated');
                    }
                }
            });
        }

        $(window).on('scroll', checkAnimation);
        checkAnimation(); // Check on page load
    }

    /**
     * Contact Form
     */
    function initContactForm() {
        $('#contactForm').on('submit', function (e) {
            e.preventDefault();

            const $form = $(this);
            const $submit = $form.find('.contact__submit');
            const originalText = $submit.text();

            // Simulate form submission
            $submit.text('Sending...').prop('disabled', true);

            setTimeout(function () {
                $submit.text('Sent!').prop('disabled', false);
                $form[0].reset();

                setTimeout(function () {
                    $submit.text(originalText);
                }, 2000);
            }, 1500);
        });
    }

    /**
     * Parallax Effect
     */
    function initParallax() {
        if (!window.matchMedia('(min-width: 769px)').matches) {
            return;
        }

        $(window).on('scroll', function () {
            const scrolled = $(window).scrollTop();
            const speed = 0.5;

            $('.hero').each(function () {
                const yPos = -(scrolled * speed);
                $(this).css('transform', 'translateY(' + yPos + 'px)');
            });
        });
    }


    /**
     * Portfolio Filter
     */
    function initPortfolioFilter() {
        const $filterBtns = $('.filter-btn');
        const $projectCards = $('.project-card');

        $filterBtns.on('click', function () {
            const $this = $(this);
            const filterValue = $this.attr('data-filter');

            // Update active button
            $filterBtns.removeClass('filter-btn--active');
            $this.addClass('filter-btn--active');

            // Filter projects
            if (filterValue === 'all') {
                $projectCards.each(function (index) {
                    const $card = $(this);
                    setTimeout(function () {
                        $card.removeClass('filter-hidden');
                    }, index * 50);
                });
            } else {
                $projectCards.each(function (index) {
                    const $card = $(this);
                    const category = $card.attr('data-category');

                    setTimeout(function () {
                        if (category === filterValue) {
                            $card.removeClass('filter-hidden');
                        } else {
                            $card.addClass('filter-hidden');
                        }
                    }, index * 50);
                });
            }
        });
    }

    /**
     * Thoughts Swiper Slider
     */
    function initThoughtsSwiper() {
        if (typeof Swiper !== 'undefined') {
            const thoughtsSwiper = new Swiper('.thoughts-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                speed: 800,
                effect: 'slide',
                grabCursor: true,
                centeredSlides: false,
                navigation: {
                    nextEl: '.thoughts-swiper-button-next',
                    prevEl: '.thoughts-swiper-button-prev',
                },
                pagination: {
                    el: '.thoughts-swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 3,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                },
            });
        }
    }

    /**
     * Window Resize Handler
     */
    $(window).on('resize', function () {
        // Close mobile menu on resize
        if ($(window).width() > 768) {
            $('.nav__menu').removeClass('nav__menu--active');
            $('.nav__toggle').removeClass('nav__toggle--active');
        }
    });

})(jQuery);
