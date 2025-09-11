/* ========================================
   BRICKS - Theme Toggle Functionality
   다크모드/라이트모드 토글 기능
======================================== */

(function() {
  'use strict';
  
  // Theme constants
  const THEME_KEY = 'ds-theme';
  const LIGHT_THEME = 'light';
  const DARK_THEME = 'dark';
  const DEFAULT_THEME = LIGHT_THEME;
  
  // Get stored theme or default
  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    } catch (e) {
      return DEFAULT_THEME;
    }
  }
  
  // Store theme preference
  function storeTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('Unable to save theme preference');
    }
  }
  
  // Apply theme to document
  function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === DARK_THEME) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    
    // Update theme toggle button icons
    updateThemeToggleIcons(theme);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme } 
    }));
  }
  
  // Update theme toggle button icons
  function updateThemeToggleIcons(theme) {
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    
    toggleButtons.forEach(button => {
      const sunIcon = button.querySelector('.theme-toggle__sun');
      const moonIcon = button.querySelector('.theme-toggle__moon');
      
      if (sunIcon && moonIcon) {
        if (theme === DARK_THEME) {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    });
  }
  
  // Toggle theme
  function toggleTheme() {
    const currentTheme = getStoredTheme();
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    
    applyTheme(newTheme);
    storeTheme(newTheme);
  }
  
  // Initialize theme on page load
  function initTheme() {
    // Apply stored theme immediately to prevent flash
    const theme = getStoredTheme();
    applyTheme(theme);
    
    // Check for system preference if no stored theme
    if (!localStorage.getItem(THEME_KEY)) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        applyTheme(DARK_THEME);
        storeTheme(DARK_THEME);
      }
    }
    
    // Add event listeners to all theme toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.addEventListener('click', toggleTheme);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        const newTheme = e.matches ? DARK_THEME : LIGHT_THEME;
        applyTheme(newTheme);
      }
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
  
  // Export for use in other scripts
  window.ThemeToggle = {
    toggle: toggleTheme,
    getTheme: getStoredTheme,
    setTheme: (theme) => {
      if (theme === LIGHT_THEME || theme === DARK_THEME) {
        applyTheme(theme);
        storeTheme(theme);
      }
    }
  };
})();