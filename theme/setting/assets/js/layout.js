// Settings page specific initialization
// Uses BRICKS components loaded by bricks_loader.js

(function() {
  'use strict';

  // Dark mode toggle functionality
  function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;

    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('ds-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    // Set initial state
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggle.classList.add('toggle--active');
      toggle.setAttribute('aria-checked', 'true');
    } else {
      document.documentElement.removeAttribute('data-theme');
      toggle.classList.remove('toggle--active');
      toggle.setAttribute('aria-checked', 'false');
    }

    // Handle toggle click
    toggle.addEventListener('click', function() {
      const isCurrentlyDark = document.documentElement.hasAttribute('data-theme');

      if (isCurrentlyDark) {
        // Switch to light mode
        document.documentElement.removeAttribute('data-theme');
        toggle.classList.remove('toggle--active');
        toggle.setAttribute('aria-checked', 'false');
        localStorage.setItem('ds-theme', 'light');
      } else {
        // Switch to dark mode
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.classList.add('toggle--active');
        toggle.setAttribute('aria-checked', 'true');
        localStorage.setItem('ds-theme', 'dark');
      }

      // Dispatch custom event for other components to react
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { dark: !isCurrentlyDark }
      }));
    });

    // Listen to system preference changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', function(e) {
        if (!localStorage.getItem('ds-theme')) {
          // Only apply system preference if user hasn't set a manual preference
          if (e.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggle.classList.add('toggle--active');
            toggle.setAttribute('aria-checked', 'true');
          } else {
            document.documentElement.removeAttribute('data-theme');
            toggle.classList.remove('toggle--active');
            toggle.setAttribute('aria-checked', 'false');
          }
        }
      });
    }
  }

  // Sidebar submenu toggle functionality
  function initSidebarSubmenu() {
    const sidebarItems = document.querySelectorAll('.sidebar__item--has-submenu');

    sidebarItems.forEach(item => {
      const link = item.querySelector('.sidebar__link');
      const submenu = item.querySelector('.sidebar__submenu');

      if (link && submenu) {
        link.addEventListener('click', function(e) {
          e.preventDefault();

          // Close other open submenus (optional - remove if you want multiple open)
          const otherOpenItems = document.querySelectorAll('.sidebar__item--open:not(.sidebar__footer .sidebar__item)');
          otherOpenItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('sidebar__item--open');
              const otherSubmenu = otherItem.querySelector('.sidebar__submenu');
              if (otherSubmenu) {
                otherSubmenu.classList.remove('sidebar__submenu--open');
              }
            }
          });

          // Toggle current submenu
          item.classList.toggle('sidebar__item--open');
          submenu.classList.toggle('sidebar__submenu--open');
        });
      }
    });

    // Handle submenu link clicks
    const submenuLinks = document.querySelectorAll('.sidebar__submenu-link');
    submenuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Remove active class from all submenu links
        submenuLinks.forEach(l => l.classList.remove('sidebar__submenu-link--active'));
        // Add active class to clicked link
        this.classList.add('sidebar__submenu-link--active');

        // Also update parent link active state
        const parentItem = this.closest('.sidebar__item');
        if (parentItem) {
          // Remove active class from all main links
          document.querySelectorAll('.sidebar__link').forEach(l => {
            l.classList.remove('sidebar__link--active');
          });
          // Add active class to parent link
          const parentLink = parentItem.querySelector('.sidebar__link');
          if (parentLink) {
            parentLink.classList.add('sidebar__link--active');
          }
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initDarkMode();
      initSidebarSubmenu();
    });
  } else {
    initDarkMode();
    initSidebarSubmenu();
  }

})();
