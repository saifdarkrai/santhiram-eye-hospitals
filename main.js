// Santhiram Laser Eye Hospitals - Main JavaScript

// Global variables
let currentQuizQuestion = 0;
let quizAnswers = [];
let particleSystem;

// Quiz questions data
const quizQuestions = [
    {
        question: "Do you experience blurry vision when reading or driving?",
        options: [
            { text: "Yes, frequently", value: "yes" },
            { text: "Sometimes", value: "sometimes" },
            { text: "No, never", value: "no" }
        ]
    },
    {
        question: "Do you have difficulty seeing at night or in low light?",
        options: [
            { text: "Yes, significant difficulty", value: "yes" },
            { text: "Mild difficulty", value: "mild" },
            { text: "No difficulty", value: "no" }
        ]
    },
    {
        question: "Do you see halos or glare around lights?",
        options: [
            { text: "Yes, often", value: "yes" },
            { text: "Occasionally", value: "sometimes" },
            { text: "Never", value: "no" }
        ]
    },
    {
        question: "Do you experience eye strain or headaches after reading?",
        options: [
            { text: "Yes, frequently", value: "yes" },
            { text: "Sometimes", value: "sometimes" },
            { text: "No, never", value: "no" }
        ]
    },
    {
        question: "How old are you?",
        options: [
            { text: "Under 40", value: "young" },
            { text: "40-60 years", value: "middle" },
            { text: "Over 60", value: "senior" }
        ]
    }
];

// Initialize page when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeParticles();
    initializeTestimonialSlider();
    initializeStatCounters();
    initializeServiceCards();
});

// Initialize animations
function initializeAnimations() {
    // Animate hero elements
    anime({
        targets: '.hero-title',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 300,
        easing: 'easeOutExpo'
    });

    // Animate service cards
    anime({
        targets: '.service-card',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100, {start: 500}),
        easing: 'easeOutExpo'
    });
}

// Initialize particle system for hero background
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particlesContainer.appendChild(particle);

        // Animate particles
        anime({
            targets: particle,
            translateY: [0, -20, 0],
            translateX: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1],
            duration: 3000 + Math.random() * 2000,
            loop: true,
            easing: 'easeInOutSine',
            delay: Math.random() * 2000
        });
    }
}

// Initialize testimonial slider
function initializeTestimonialSlider() {
    const slider = document.getElementById('testimonialSlider');
    if (!slider) return;

    new Splide(slider, {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 5000,
        breakpoints: {
            1024: { perPage: 2 },
            640: { perPage: 1 }
        }
    }).mount();
}

// Initialize stat counters
function initializeStatCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Animate counter numbers
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Initialize service cards hover effects
function initializeServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Vision Quiz Functions
function startVisionQuiz() {
    document.getElementById('visionQuiz').classList.remove('hidden');
    currentQuizQuestion = 0;
    quizAnswers = [];
    showQuizQuestion();
}

function closeVisionQuiz() {
    document.getElementById('visionQuiz').classList.add('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizContent').classList.remove('hidden');
}

function showQuizQuestion() {
    const question = quizQuestions[currentQuizQuestion];
    const container = document.getElementById('questionContainer');
    const progress = document.getElementById('quizProgress');
    const currentQ = document.getElementById('currentQuestion');
    
    // Update progress
    const progressPercent = ((currentQuizQuestion + 1) / quizQuestions.length) * 100;
    progress.style.width = progressPercent + '%';
    currentQ.textContent = currentQuizQuestion + 1;
    
    // Update question content
    container.innerHTML = `
        <h3 class="text-xl font-semibold mb-4 text-gray-800">${question.question}</h3>
        <div class="space-y-3">
            ${question.options.map(option => `
                <button onclick="selectAnswer('${option.value}')" class="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors">
                    ${option.text}
                </button>
            `).join('')}
        </div>
    `;
}

function selectAnswer(answer) {
    quizAnswers.push(answer);
    
    if (currentQuizQuestion < quizQuestions.length - 1) {
        currentQuizQuestion++;
        showQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    document.getElementById('quizContent').classList.add('hidden');
    document.getElementById('quizResults').classList.remove('hidden');
    
    const recommendation = generateRecommendation();
    document.getElementById('recommendation').innerHTML = recommendation;
}

function generateRecommendation() {
    // Simple recommendation logic based on answers
    const hasVisionProblems = quizAnswers.some(answer => answer === 'yes');
    const ageGroup = quizAnswers[quizAnswers.length - 1];
    
    let recommendation = '';
    let suggestedService = '';
    
    if (hasVisionProblems) {
        if (ageGroup === 'young') {
            recommendation = 'Based on your responses, you may benefit from LASIK or PRK laser vision correction. These procedures are highly effective for young adults with stable vision.';
            suggestedService = 'LASIK Surgery';
        } else if (ageGroup === 'middle') {
            recommendation = 'Your symptoms suggest you may have presbyopia or early cataracts. We recommend a comprehensive eye exam to determine the best treatment option.';
            suggestedService = 'Cataract Evaluation';
        } else {
            recommendation = 'Regular eye exams are crucial at your age. Your symptoms may indicate cataracts or other age-related eye conditions that require professional evaluation.';
            suggestedService = 'Comprehensive Eye Exam';
        }
    } else {
        recommendation = 'Great news! You don\'t seem to have significant vision problems. However, regular eye exams are still important for maintaining eye health.';
        suggestedService = 'Routine Eye Exam';
    }
    
    return `
        <h4 class="font-bold text-teal-800 mb-2">Recommended Service: ${suggestedService}</h4>
        <p class="text-gray-700">${recommendation}</p>
    `;
}

function bookConsultation() {
    closeVisionQuiz();
    window.location.href = 'contact.html';
}

// Service selection functions
function selectService(serviceId) {
    // Store selected service for booking
    localStorage.setItem('selectedService', serviceId);
    window.location.href = 'contact.html';
}

// Doctor filtering functions
function filterDoctors(specialty) {
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    doctorCards.forEach(card => {
        const doctorSpecialty = card.dataset.specialty;
        if (specialty === 'all' || doctorSpecialty === specialty) {
            card.style.display = 'block';
            anime({
                targets: card,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });
        } else {
            anime({
                targets: card,
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 300,
                easing: 'easeOutQuad',
                complete: () => {
                    card.style.display = 'none';
                }
            });
        }
    });
}

// Appointment booking functions
function initializeBookingForm() {
    const form = document.getElementById('appointmentForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitAppointment();
    });
}

function submitAppointment() {
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showBookingConfirmation();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showBookingConfirmation() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">✓</span>
            </div>
            <h3 class="text-2xl font-bold text-blue-900 mb-4">Appointment Confirmed!</h3>
            <p class="text-gray-600 mb-6">Your appointment has been successfully booked. You will receive a confirmation SMS shortly.</p>
            <button onclick="this.parentElement.parentElement.remove()" class="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                Close
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export functions for global access
window.startVisionQuiz = startVisionQuiz;
window.closeVisionQuiz = closeVisionQuiz;
window.selectAnswer = selectAnswer;
window.bookConsultation = bookConsultation;
window.selectService = selectService;
window.filterDoctors = filterDoctors;
window.submitAppointment = submitAppointment;