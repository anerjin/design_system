/* ========================================
   BRICKS - Navigation System
   Dynamic page navigation and routing
======================================== */

(function() {
  'use strict';
  
  // Navigation state
  const state = {
    currentPage: 'introduction',
    menuOpen: false
  };
  
  // Page configurations
  const pages = {
    // Getting Started
    'introduction': {
      title: 'Introduction',
      description: 'Welcome to BRICKS Design System',
      content: 'pages/introduction.html'
    },
    'getting-started': {
      title: 'Getting Started',
      description: 'Quick start guide for BRICKS',
      content: 'pages/getting-started.html'
    },
    'design-tokens': {
      title: 'Design Tokens',
      description: 'Colors, typography, spacing, and more',
      content: 'pages/design-tokens.html'
    },
    
    // Elements
    'button': {
      title: 'Button',
      description: 'Button component with various styles and states',
      content: 'pages/elements/button.html'
    },
    'input': {
      title: 'Input',
      description: 'Form input elements and controls',
      content: 'pages/elements/input.html'
    },
    'badge': {
      title: 'Badge',
      description: 'Badges, labels, and tags',
      content: 'pages/elements/badge.html'
    },
    'typography': {
      title: 'Typography',
      description: 'Text styles and typography system',
      content: 'pages/elements/typography.html'
    },
    
    // Components
    'alert': {
      title: 'Alert',
      description: 'Alert and notification messages',
      content: 'pages/components/alert.html'
    },
    'card': {
      title: 'Card',
      description: 'Card layout component',
      content: 'pages/components/card.html'
    },
    'modal': {
      title: 'Modal',
      description: 'Modal dialogs and overlays',
      content: 'pages/components/modal.html'
    },
    'dropdown': {
      title: 'Dropdown',
      description: 'Dropdown menus and selects',
      content: 'pages/components/dropdown.html'
    },
    
    // Forms
    'form-layout': {
      title: 'Form Layout',
      description: 'Form structure and layouts',
      content: 'pages/forms/form-layout.html'
    },
    'form-validation': {
      title: 'Form Validation',
      description: 'Form validation patterns',
      content: 'pages/forms/form-validation.html'
    },
    
    // Patterns
    'navigation': {
      title: 'Navigation',
      description: 'Navigation patterns and menus',
      content: 'pages/patterns/navigation.html'
    },
    'tables': {
      title: 'Tables',
      description: 'Data tables and lists',
      content: 'pages/patterns/tables.html'
    },
    'loading': {
      title: 'Loading',
      description: 'Loading states and skeletons',
      content: 'pages/patterns/loading.html'
    }
  };
  
  // Load page content
  async function loadPage(pageId) {
    const page = pages[pageId];
    if (!page) {
      console.error('Page not found:', pageId);
      return;
    }
    
    // Update state
    state.currentPage = pageId;
    
    // Update URL
    window.history.pushState({ page: pageId }, page.title, `#${pageId}`);
    
    // Update active menu item
    updateActiveMenuItem(pageId);
    
    // Update page header
    updatePageHeader(page);
    
    // Load content
    const contentArea = document.querySelector('.app-content');
    if (contentArea) {
      try {
        // Check if content file exists
        if (page.content) {
          const response = await fetch(page.content);
          if (response.ok) {
            const html = await response.text();
            contentArea.innerHTML = html;
          } else {
            // Fallback to generated content
            contentArea.innerHTML = generatePageContent(pageId, page);
          }
        } else {
          // Use generated content for pages without files
          contentArea.innerHTML = generatePageContent(pageId, page);
        }
        
        // Scroll to top
        document.querySelector('.app-main').scrollTop = 0;
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Initialize any components on the page
        initializePageComponents();
      } catch (error) {
        console.error('Error loading page:', error);
        contentArea.innerHTML = '<div class="alert alert--danger">Error loading page content</div>';
      }
    }
  }
  
  // Generate page content (placeholder for now)
  function generatePageContent(pageId, page) {
    // This is a placeholder. In production, this would load actual HTML files
    return `
      <div class="page-header">
        <nav class="page-header__breadcrumb" aria-label="Breadcrumb">
          <span class="page-header__breadcrumb-item">
            <a href="#introduction" class="page-header__breadcrumb-link">Home</a>
          </span>
          <span class="page-header__breadcrumb-separator">/</span>
          <span class="page-header__breadcrumb-item">
            <span>${page.title}</span>
          </span>
        </nav>
        <h1 class="page-header__title">${page.title}</h1>
        <p class="page-header__description">${page.description}</p>
      </div>
      
      <div class="content-section">
        <div class="content-section__header">
          <h2 class="content-section__title">Overview</h2>
          <p class="content-section__subtitle">Basic usage and examples</p>
        </div>
        <div class="component-preview">
          <div class="component-preview__demo">
            <!-- Component demo would go here -->
            <p>Component preview for ${page.title}</p>
          </div>
          <div class="component-preview__toolbar">
            <div class="component-preview__tabs">
              <button class="component-preview__tab component-preview__tab--active">Preview</button>
              <button class="component-preview__tab">HTML</button>
              <button class="component-preview__tab">CSS</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  // Update active menu item
  function updateActiveMenuItem(pageId) {
    // Remove all active classes
    document.querySelectorAll('.app-sidebar__link').forEach(link => {
      link.classList.remove('app-sidebar__link--active');
    });
    
    // Add active class to current page
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
      activeLink.classList.add('app-sidebar__link--active');
    }
  }
  
  // Update page header
  function updatePageHeader(page) {
    document.title = `${page.title} - BRICKS Design System`;
  }
  
  // Initialize page components
  function initializePageComponents() {
    // Initialize any interactive components
    // This would include things like tabs, copy buttons, etc.
    
    // Initialize tabs
    const tabs = document.querySelectorAll('.component-preview__tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        const preview = e.target.closest('.component-preview');
        
        // Update active tab
        preview.querySelectorAll('.component-preview__tab').forEach(t => {
          t.classList.remove('component-preview__tab--active');
        });
        e.target.classList.add('component-preview__tab--active');
        
        // Show/hide content
        if (tabName === 'preview') {
          preview.querySelector('.component-preview__demo').style.display = '';
          const codeBlocks = preview.querySelectorAll('.component-preview__code');
          codeBlocks.forEach(block => block.style.display = 'none');
        } else {
          preview.querySelector('.component-preview__demo').style.display = 'none';
          const codeBlocks = preview.querySelectorAll('.component-preview__code');
          codeBlocks.forEach(block => {
            if (block.dataset.tabContent === tabName) {
              block.style.display = '';
            } else {
              block.style.display = 'none';
            }
          });
        }
      });
    });
    
    // Initialize copy buttons
    const copyButtons = document.querySelectorAll('.component-preview__copy');
    copyButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const preview = e.target.closest('.component-preview');
        const activeTab = preview.querySelector('.component-preview__tab--active').dataset.tab;
        const codeBlock = preview.querySelector(`.component-preview__code[data-tab-content="${activeTab}"] code`);
        
        if (codeBlock) {
          navigator.clipboard.writeText(codeBlock.textContent);
          
          // Show feedback
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2000);
        }
      });
    });
  }
  
  // Handle navigation clicks
  function handleNavClick(e) {
    const link = e.target.closest('[data-page]');
    if (link) {
      e.preventDefault();
      const pageId = link.dataset.page;
      loadPage(pageId);
    }
  }
  
  // Handle browser back/forward
  function handlePopState(e) {
    const pageId = e.state?.page || 'introduction';
    loadPage(pageId);
  }
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    state.menuOpen = !state.menuOpen;
    const sidebar = document.querySelector('.app-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('app-sidebar--open', state.menuOpen);
    }
  }
  
  // Close mobile menu
  function closeMobileMenu() {
    state.menuOpen = false;
    const sidebar = document.querySelector('.app-sidebar');
    if (sidebar) {
      sidebar.classList.remove('app-sidebar--open');
    }
  }
  
  // Initialize navigation
  function init() {
    // Add click handlers
    document.addEventListener('click', handleNavClick);
    
    // Handle browser navigation
    window.addEventListener('popstate', handlePopState);
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('[data-menu-toggle]');
    if (menuToggle) {
      menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Mobile menu backdrop
    const backdrop = document.querySelector('.app-sidebar__backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeMobileMenu);
    }
    
    // Load initial page
    const hash = window.location.hash.slice(1);
    const initialPage = hash && pages[hash] ? hash : 'introduction';
    loadPage(initialPage);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export for use in other scripts
  window.BricksNav = {
    loadPage,
    pages,
    state
  };
})();