
// Global Variables
let currentPage = 1;
let currentSlide = 0;
let currentTab = 'billing';
let currentCustomerTab = 'perplexity';
let isPlaying = false;
let loadingTimer;
let charts = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Start loading sequence
    startLoadingSequence();
    
    // Initialize theme
    initializeTheme();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize charts
    initializeCharts();
}

// Loading Screen
function startLoadingSequence() {
    let time = 0;
    const timerElement = document.querySelector('.timer');
    const letterL = document.querySelector('.letter-l');
    
    // Update timer
    const timer = setInterval(() => {
        time += 0.1;
        timerElement.textContent = `${time.toFixed(1)}ms`;
    }, 100);
    
    // Show letter L after 500ms
    setTimeout(() => {
        letterL.style.opacity = '1';
        letterL.style.animationPlayState = 'running';
    }, 500);
    
    // Complete loading after 3 seconds
    setTimeout(() => {
        clearInterval(timer);
        completeLoading();
    }, 3000);
}

function completeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    loadingScreen.style.display = 'none';
    mainContent.classList.remove('hidden');
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.className = savedTheme;
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
}

// Event Listeners Setup
function setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Tab switching for BSS page
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);
        });
    });
    
    // Customer tab switching
    document.querySelectorAll('.customer-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            const customer = btn.dataset.customer;
            switchCustomerTab(customer);
        });
    });
    
    // Play/pause button
    const playBtn = document.getElementById('play-pause-btn');
    if (playBtn) {
        playBtn.addEventListener('click', togglePlayPause);
    }
    
    // Chart hover events
    document.querySelectorAll('.chart-container').forEach(container => {
        const chartType = container.dataset.chart;
        container.addEventListener('mouseenter', () => showChart(chartType));
        container.addEventListener('mouseleave', () => hideChart(chartType));
    });
}

// Page Navigation
function goToPage(pageNum) {
    // Hide current page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`page-${pageNum}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageNum;
    }
    
    // Update navigation dots
    updateNavigationDots();
}

function updateNavigationDots() {
    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        if (index + 1 === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Image Slider Functions
function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Move to previous slide
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function currentSlideFunc(slideNum) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Set current slide
    currentSlide = slideNum - 1;
    
    // Add active class to target slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Tab Switching Functions
function switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked tab
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    currentTab = tabName;
    
    // You can add content switching logic here
    console.log(`Switched to ${tabName} tab`);
}

function switchCustomerTab(customerName) {
    // Remove active class from all customer tabs
    document.querySelectorAll('.customer-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked tab
    document.querySelector(`[data-customer="${customerName}"]`).classList.add('active');
    
    currentCustomerTab = customerName;
    
    // You can add content switching logic here
    console.log(`Switched to ${customerName} customer`);
}

// Play/Pause Functionality
function togglePlayPause() {
    const playBtn = document.getElementById('play-pause-btn');
    
    if (isPlaying) {
        playBtn.textContent = '▶️';
        isPlaying = false;
        console.log('Video paused');
    } else {
        playBtn.textContent = '⏸️';
        isPlaying = true;
        console.log('Video playing');
    }
}

// Chart Initialization and Management
function initializeCharts() {
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
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF'
                ]
            }]
        },
        line: {
            labels: ['2000', '2005', '2010', '2015', '2020', '2025'],
            datasets: [{
                label: 'Growth Trend',
                data: [10, 25, 40, 60, 80, 95],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                fill: true
            }]
        }
    };
    
    // Chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white'
                }
            },
            title: {
                display: true,
                color: 'white'
            }
        },
        scales: {
            y: {
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            },
            x: {
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            }
        }
    };
    
    // Initialize charts
    const barCtx = document.getElementById('bar-chart');
    const pieCtx = document.getElementById('pie-chart');
    const lineCtx = document.getElementById('line-chart');
    
    if (barCtx) {
        charts.bar = new Chart(barCtx, {
            type: 'bar',
            data: chartData.bar,
            options: {
                ...chartOptions,
                plugins: {
                    ...chartOptions.plugins,
                    title: {
                        ...chartOptions.plugins.title,
                        text: 'Population by Continent'
                    }
                }
            }
        });
    }
    
    if (pieCtx) {
        charts.pie = new Chart(pieCtx, {
            type: 'pie',
            data: chartData.pie,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'white'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Expense Breakdown',
                        color: 'white'
                    }
                }
            }
        });
    }
    
    if (lineCtx) {
        charts.line = new Chart(lineCtx, {
            type: 'line',
            data: chartData.line,
            options: {
                ...chartOptions,
                plugins: {
                    ...chartOptions.plugins,
                    title: {
                        ...chartOptions.plugins.title,
                        text: 'Decade Growth Trend'
                    }
                }
            }
        });
    }
}

function showChart(chartType) {
    // Charts are already initialized and visible on hover via CSS
    // This function can be used for additional logic if needed
    console.log(`Showing ${chartType} chart`);
}

function hideChart(chartType) {
    // Charts are hidden via CSS when not hovering
    // This function can be used for additional logic if needed
    console.log(`Hiding ${chartType} chart`);
}

// Auto-slide functionality (optional)
function startAutoSlide() {
    setInterval(() => {
        if (currentPage === 2) { // Only auto-slide on gallery page
            nextSlide();
        }
    }, 5000); // Change slide every 5 seconds
}

// Keyboard Navigation
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
            if (currentPage < 7) {
                goToPage(currentPage + 1);
            }
            break;
        case 'ArrowLeft':
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
            break;
        case ' ': // Spacebar
            event.preventDefault();
            if (currentPage === 3) {
                togglePlayPause();
            }
            break;
    }
});

// Touch/Swipe Support (basic)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next page
            if (currentPage < 7) {
                goToPage(currentPage + 1);
            }
        } else {
            // Swipe right - previous page
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        }
    }
}

// Utility Functions
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

// Window resize handler
window.addEventListener('resize', debounce(() => {
    // Resize charts if they exist
    Object.values(charts).forEach(chart => {
        if (chart) {
            chart.resize();
        }
    });
}, 250));

// Expose functions to global scope for HTML onclick handlers
window.goToPage = goToPage;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.currentSlide = currentSlideFunc;
window.togglePlayPause = togglePlayPause;
