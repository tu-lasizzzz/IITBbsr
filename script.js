
// Global variables
let currentPage = 1;
let darkMode = false;
let currentSlide = 0;
let currentTab = 'Billing';
let currentCustomerTab = 'PERPLEXITY';
let isPlaying = false;
let loadingTime = 0;
let charts = {};

// Slides data
const slides = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop"
];

// Chart data
const chartData = {
    bar: {
        labels: ['Asia', 'Europe', 'Americas', 'Africa', 'Oceania'],
        datasets: [{
            label: 'Population (millions)',
            data: [4641, 747, 1018, 1340, 45],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)'
            ]
        }]
    },
    pie: {
        labels: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Other'],
        datasets: [{
            data: [30, 25, 20, 15, 10],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
    },
    line: {
        labels: ['2000', '2005', '2010', '2015', '2020', '2025'],
        datasets: [{
            label: 'Growth Trend',
            data: [10, 25, 40, 60, 80, 95],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false
        }]
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeLoader();
    initializeEventListeners();
    loadTheme();
});

// Loading screen functionality
function initializeLoader() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const loadingTimeElement = document.getElementById('loading-time');
    const loadingLetter = document.getElementById('loading-letter');
    
    // Start timer
    const timer = setInterval(() => {
        loadingTime += 0.1;
        loadingTimeElement.textContent = loadingTime.toFixed(1) + 'ms';
    }, 100);

    // Show L after 500ms
    setTimeout(() => {
        loadingLetter.classList.remove('hidden');
    }, 500);

    // Complete loading after 3 seconds
    setTimeout(() => {
        clearInterval(timer);
        loadingScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        showPage(1);
        initializeCharts();
    }, 3000);
}

// Initialize event listeners
function initializeEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);

    // Navigation buttons
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const page = parseInt(e.currentTarget.getAttribute('data-page'));
            showPage(page);
        });
    });

    // Page dots
    document.querySelectorAll('.page-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const page = parseInt(e.currentTarget.getAttribute('data-page'));
            showPage(page);
        });
    });

    // Slide navigation
    document.getElementById('prev-slide')?.addEventListener('click', prevSlide);
    document.getElementById('next-slide')?.addEventListener('click', nextSlide);

    // Slide indicators
    document.querySelectorAll('.slide-indicator').forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            const slide = parseInt(e.currentTarget.getAttribute('data-slide'));
            goToSlide(slide);
        });
    });

    // Chart hover effects
    setupChartHoverEffects();
}

// Chart hover effects
function setupChartHoverEffects() {
    document.querySelectorAll('.chart-hover-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const chartType = e.currentTarget.getAttribute('data-chart');
            showHoverChart(chartType);
        });
    });
}

// Show hover chart
function showHoverChart(type) {
    const canvasId = `${type}-chart`;
    const canvas = document.getElementById(canvasId);
    
    if (canvas && !charts[canvasId]) {
        const ctx = canvas.getContext('2d');
        
        const config = {
            type: type,
            data: chartData[type],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: type.charAt(0).toUpperCase() + type.slice(1) + ' Chart'
                    }
                }
            }
        };

        charts[canvasId] = new Chart(ctx, config);
    }
}

// Initialize charts
function initializeCharts() {
    // Charts will be created on hover
}

// Theme management
function toggleDarkMode() {
    darkMode = !darkMode;
    saveTheme();
    applyTheme();
}

function loadTheme() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
        darkMode = JSON.parse(savedMode);
        applyTheme();
    }
}

function saveTheme() {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
}

function applyTheme() {
    const mainContent = document.getElementById('main-content');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    if (darkMode) {
        mainContent.classList.remove('bg-gradient-to-br', 'from-blue-900', 'via-blue-800', 'to-blue-900');
        mainContent.classList.add('bg-slate-900');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        mainContent.classList.remove('bg-slate-900');
        mainContent.classList.add('bg-gradient-to-br', 'from-blue-900', 'via-blue-800', 'to-blue-900');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
}

// Page navigation
function showPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageNumber;
    }

    // Update page dots
    updatePageDots();
}

function updatePageDots() {
    document.querySelectorAll('.page-dot').forEach(dot => {
        const page = parseInt(dot.getAttribute('data-page'));
        if (page === currentPage) {
            dot.classList.remove('bg-opacity-30', 'hover:bg-opacity-50');
            dot.classList.add('bg-white');
        } else {
            dot.classList.remove('bg-white');
            dot.classList.add('bg-opacity-30', 'hover:bg-opacity-50');
        }
    });
}

// Slide functionality
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlide();
}

function updateSlide() {
    const currentSlideImg = document.getElementById('current-slide');
    if (currentSlideImg) {
        currentSlideImg.src = slides[currentSlide];
        currentSlideImg.alt = `Slide ${currentSlide + 1}`;
    }

    // Update indicators
    document.querySelectorAll('.slide-indicator').forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.remove('bg-gray-300');
            indicator.classList.add('bg-blue-500');
        } else {
            indicator.classList.remove('bg-blue-500');
            indicator.classList.add('bg-gray-300');
        }
    });
}

// Tab functionality
function switchTab(tabName) {
    currentTab = tabName;
    // Update tab UI here if needed
}

function switchCustomerTab(tabName) {
    currentCustomerTab = tabName;
    // Update customer tab UI here if needed
}

// Video controls
function togglePlay() {
    isPlaying = !isPlaying;
    // Update play/pause UI here if needed
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPage === 2) {
                prevSlide();
            }
            break;
        case 'ArrowRight':
            if (currentPage === 2) {
                nextSlide();
            }
            break;
        case 'Escape':
            showPage(1);
            break;
    }
});

// Resize handler
window.addEventListener('resize', debounce(() => {
    // Resize charts if needed
    Object.values(charts).forEach(chart => {
        if (chart) {
            chart.resize();
        }
    });
}, 250));
