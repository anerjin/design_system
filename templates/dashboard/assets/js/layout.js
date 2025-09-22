// Dashboard Charts - Monochrome Theme
document.addEventListener('DOMContentLoaded', function() {
    // Chart.js Configuration
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        Chart.defaults.color = '#86868b';
        Chart.defaults.plugins.legend.display = false;

        // Get theme
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

        // Colors for monochrome theme
        const colors = {
            primary: isDarkMode ? '#f5f5f7' : '#1d1d1f',
            secondary: isDarkMode ? '#86868b' : '#86868b',
            grid: isDarkMode ? '#424245' : '#e5e5e7',
            text: isDarkMode ? '#86868b' : '#86868b',
            background: isDarkMode ? 'rgba(245, 245, 247, 0.1)' : 'rgba(29, 29, 31, 0.05)'
        };

        // Generate sample data with more realistic patterns
        function generateData(count, min, max, trend = 'neutral') {
            const data = [];
            let value = Math.random() * (max - min) + min;
            let trendFactor = trend === 'up' ? 0.02 : trend === 'down' ? -0.02 : 0;

            for (let i = 0; i < count; i++) {
                const change = (Math.random() - 0.5 + trendFactor) * ((max - min) / 10);
                value = Math.max(min, Math.min(max, value + change));
                data.push(value);
            }

            return data;
        }

        // Account Balance Chart
        const balanceCtx = document.getElementById('balanceChart');
        if (balanceCtx) {
            const gradient = balanceCtx.getContext('2d').createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, isDarkMode ? 'rgba(245, 245, 247, 0.2)' : 'rgba(29, 29, 31, 0.2)');
            gradient.addColorStop(1, isDarkMode ? 'rgba(245, 245, 247, 0)' : 'rgba(29, 29, 31, 0)');

            const balanceChart = new Chart(balanceCtx, {
                type: 'line',
                data: {
                    labels: ['20 Sep', '21 Sep', '22 Sep', '23 Sep', '24 Sep', '25 Sep'],
                    datasets: [{
                        data: [8500, 8800, 8600, 9000, 9200, 9543],
                        borderColor: colors.primary,
                        backgroundColor: gradient,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        pointBackgroundColor: colors.primary,
                        pointBorderColor: isDarkMode ? '#1d1d1f' : '#fff',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    resizeDelay: 100,
                    plugins: {
                        tooltip: {
                            backgroundColor: isDarkMode ? '#2c2c2e' : '#fff',
                            titleColor: colors.primary,
                            bodyColor: colors.secondary,
                            borderColor: colors.grid,
                            borderWidth: 1,
                            padding: 12,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return '$' + context.parsed.y.toFixed(2);
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            border: {
                                display: false
                            },
                            ticks: {
                                color: colors.text,
                                font: {
                                    size: 11
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: colors.grid,
                                drawBorder: false
                            },
                            border: {
                                display: false
                            },
                            ticks: {
                                color: colors.text,
                                font: {
                                    size: 11
                                },
                                callback: function(value) {
                                    return '$' + (value / 1000).toFixed(1) + 'k';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Mini Chart Configuration
        function createMiniChart(elementId, trend = 'up') {
            const ctx = document.getElementById(elementId);
            if (!ctx) return;

            const data = generateData(20, 80, 120, trend);

            const miniChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array(20).fill(''),
                    datasets: [{
                        data: data,
                        borderColor: colors.primary,
                        borderWidth: 1.5,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    resizeDelay: 100,
                    plugins: {
                        tooltip: {
                            enabled: false
                        }
                    },
                    scales: {
                        x: {
                            display: false
                        },
                        y: {
                            display: false
                        }
                    }
                }
            });
        }

        // Create mini charts with black color
        createMiniChart('gtbChart', 'up');
        createMiniChart('nxtChart', 'down');
        createMiniChart('btcChart', 'up');
        createMiniChart('ethChart', 'up');
    }

    // Sub navigation functionality
    const subNavItems = document.querySelectorAll('.dash-subnav__item');
    subNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            subNavItems.forEach(nav => nav.classList.remove('dash-subnav__item--active'));
            // Add active class to clicked item
            this.classList.add('dash-subnav__item--active');
        });
    });

    // Tab navigation
    const tabItems = document.querySelectorAll('.dash-tabs__item');
    tabItems.forEach(tab => {
        tab.addEventListener('click', function(e) {
            if (!this.href || (!this.href.includes('setting') && !this.href.includes('http'))) {
                e.preventDefault();
                // Remove active class from all tabs
                tabItems.forEach(t => t.classList.remove('dash-tabs__item--active'));
                // Add active class to clicked tab
                this.classList.add('dash-tabs__item--active');
            }
        });
    });

    // Business selector dropdown
    const selector = document.querySelector('.dash-selector');
    const dropdown = document.getElementById('businessDropdown');

    if (selector && dropdown) {
        // Toggle dropdown on click
        selector.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = dropdown.classList.contains('dash-dropdown--active');

            // Close all dropdowns first
            document.querySelectorAll('.dash-dropdown').forEach(dd => {
                dd.classList.remove('dash-dropdown--active');
            });
            document.querySelectorAll('.dash-selector').forEach(sel => {
                sel.classList.remove('dash-selector--active');
            });

            // Toggle current dropdown
            if (!isActive) {
                dropdown.classList.add('dash-dropdown--active');
                selector.classList.add('dash-selector--active');
            }
        });

        // Handle dropdown item clicks
        const dropdownItems = dropdown.querySelectorAll('.dash-dropdown__item:not(.dash-dropdown__divider)');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();

                // Don't select divider or action items
                const text = this.querySelector('span').textContent;
                if (text === 'Add Account' || text === 'Manage Accounts') {
                    console.log('Action:', text);
                } else {
                    // Update active state
                    dropdownItems.forEach(di => di.classList.remove('dash-dropdown__item--active'));
                    this.classList.add('dash-dropdown__item--active');

                    // Update selector text
                    const selectorText = selector.querySelector('.dash-selector__text');
                    if (selectorText) {
                        selectorText.textContent = text.replace(' Account', '');
                    }
                }

                // Close dropdown
                dropdown.classList.remove('dash-dropdown--active');
                selector.classList.remove('dash-selector--active');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!selector.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('dash-dropdown--active');
                selector.classList.remove('dash-selector--active');
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdown.classList.remove('dash-dropdown--active');
                selector.classList.remove('dash-selector--active');
            }
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.dash-search__input');
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                console.log('Search:', this.value);
            }
        });

        // Focus search on Ctrl+K
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    // Chart menu buttons
    const menuButtons = document.querySelectorAll('.dash-chart-small__menu');
    menuButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Chart menu clicked');
            // Add dropdown menu functionality here
        });
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('ds-theme', newTheme);

            // Reload to refresh charts with new theme
            setTimeout(() => {
                window.location.reload();
            }, 300);
        });
    }

    // Add hover effects to KPI cards
    const kpiCards = document.querySelectorAll('.dash-kpi-card');
    kpiCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add animation to charts on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all charts
    document.querySelectorAll('.dash-chart-large, .dash-chart-small').forEach(chart => {
        observer.observe(chart);
    });

    // Store all chart instances
    const allCharts = [];
    Chart.helpers.each(Chart.instances, function(instance) {
        allCharts.push(instance);
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Update all charts on resize
            allCharts.forEach(chart => {
                if (chart && chart.resize) {
                    chart.resize();
                }
            });
        }, 250);
    });

    // Force initial resize
    setTimeout(() => {
        allCharts.forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }, 100);
});