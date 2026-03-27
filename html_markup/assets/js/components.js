/**
 * BRICKS Design System - Component Interactions
 * Auto-initializes interactive components on DOMContentLoaded
 */

(function() {
  'use strict';

  // ========================================
  // BRICKS Global Namespace
  // ========================================
  window.BRICKS = window.BRICKS || {};

  // ========================================
  // Accordion [data-accordion]
  // ========================================
  function initAccordions() {
    document.querySelectorAll('[data-accordion]').forEach(function(accordion) {
      var allowMultiple = accordion.hasAttribute('data-allow-multiple');

      accordion.querySelectorAll('.accordion__header').forEach(function(header) {
        header.addEventListener('click', function() {
          var item = this.closest('.accordion__item');
          var isOpen = item.classList.contains('accordion__item--open');

          // Close others if not multi-open
          if (!allowMultiple) {
            accordion.querySelectorAll('.accordion__item--open').forEach(function(openItem) {
              if (openItem !== item) {
                openItem.classList.remove('accordion__item--open');
                openItem.querySelector('.accordion__header').classList.remove('accordion__header--active');
                var content = openItem.querySelector('.accordion__content');
                if (content) content.classList.remove('accordion__content--open');
              }
            });
          }

          // Toggle current
          item.classList.toggle('accordion__item--open', !isOpen);
          this.classList.toggle('accordion__header--active', !isOpen);
          var content = item.querySelector('.accordion__content');
          if (content) content.classList.toggle('accordion__content--open', !isOpen);
        });
      });
    });
  }

  // ========================================
  // Tabs [data-tabs]
  // ========================================
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function(tabsContainer) {
      var buttons = tabsContainer.querySelectorAll('.tabs__button');
      var panels = tabsContainer.querySelectorAll('.tabs__panel');

      buttons.forEach(function(button) {
        button.addEventListener('click', function() {
          var targetId = this.getAttribute('data-tab') || this.getAttribute('aria-controls');

          // Deactivate all
          buttons.forEach(function(btn) {
            btn.classList.remove('tabs__button--active');
            btn.setAttribute('aria-selected', 'false');
            btn.setAttribute('tabindex', '-1');
          });
          panels.forEach(function(panel) {
            panel.classList.remove('tabs__panel--active');
            panel.setAttribute('aria-hidden', 'true');
          });

          // Activate clicked
          this.classList.add('tabs__button--active');
          this.setAttribute('aria-selected', 'true');
          this.setAttribute('tabindex', '0');

          var targetPanel = document.getElementById(targetId);
          if (targetPanel) {
            targetPanel.classList.add('tabs__panel--active');
            targetPanel.setAttribute('aria-hidden', 'false');
          }
        });

        // Keyboard navigation
        button.addEventListener('keydown', function(e) {
          var btns = Array.from(buttons);
          var idx = btns.indexOf(this);
          var next;

          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            next = btns[(idx + 1) % btns.length];
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            next = btns[(idx - 1 + btns.length) % btns.length];
          } else if (e.key === 'Home') {
            e.preventDefault();
            next = btns[0];
          } else if (e.key === 'End') {
            e.preventDefault();
            next = btns[btns.length - 1];
          }

          if (next) {
            next.click();
            next.focus();
          }
        });
      });
    });
  }

  // ========================================
  // Dropdown (.dropdown)
  // ========================================
  function initDropdowns() {
    document.querySelectorAll('.dropdown__toggle').forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        var dropdown = this.closest('.dropdown');
        var isOpen = dropdown.classList.contains('dropdown--open');

        // Close all other dropdowns
        document.querySelectorAll('.dropdown--open').forEach(function(d) {
          d.classList.remove('dropdown--open');
          var t = d.querySelector('.dropdown__toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isOpen) {
          dropdown.classList.add('dropdown--open');
          this.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Select-type dropdowns: clicking an item updates the toggle text
    document.querySelectorAll('.dropdown--select .dropdown__item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        var dropdown = this.closest('.dropdown');
        var toggle = dropdown.querySelector('.dropdown__toggle');
        if (toggle) toggle.textContent = this.textContent.trim();
        dropdown.classList.remove('dropdown--open');

        // Mark active
        dropdown.querySelectorAll('.dropdown__item').forEach(function(i) {
          i.classList.remove('dropdown__item--active');
        });
        this.classList.add('dropdown__item--active');
      });
    });

    // Close on outside click
    document.addEventListener('click', function() {
      document.querySelectorAll('.dropdown--open').forEach(function(d) {
        d.classList.remove('dropdown--open');
        var t = d.querySelector('.dropdown__toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ========================================
  // Modal (BRICKS.Modal)
  // ========================================
  BRICKS.Modal = {
    open: function(id) {
      var modal = document.getElementById(id);
      if (!modal) return;
      modal.classList.add('modal--open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Focus trap
      var focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length) focusable[0].focus();
    },
    close: function(id) {
      var modal = typeof id === 'string' ? document.getElementById(id) : id;
      if (!modal) return;
      modal.classList.remove('modal--open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  function initModals() {
    // Close button
    document.querySelectorAll('.modal__close').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var modal = this.closest('.modal');
        BRICKS.Modal.close(modal);
      });
    });

    // Cancel/close buttons in footer
    document.querySelectorAll('.modal__footer .btn--secondary, .modal__footer .btn--ghost').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var modal = this.closest('.modal');
        BRICKS.Modal.close(modal);
      });
    });

    // Backdrop click (non-static modals)
    document.querySelectorAll('.modal').forEach(function(modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === this && !this.classList.contains('modal--static')) {
          BRICKS.Modal.close(this);
        }
      });
    });

    // Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        var openModal = document.querySelector('.modal--open:not(.modal--static)');
        if (openModal) BRICKS.Modal.close(openModal);
      }
    });
  }

  // ========================================
  // Alert dismiss (.alert__close)
  // ========================================
  function initAlerts() {
    document.querySelectorAll('.alert__close').forEach(function(btn) {
      // Skip if already has onclick
      if (btn.getAttribute('onclick')) return;
      btn.addEventListener('click', function() {
        var alert = this.closest('.alert');
        if (alert) {
          alert.style.transition = 'opacity 0.3s, transform 0.3s';
          alert.style.opacity = '0';
          alert.style.transform = 'translateY(-8px)';
          setTimeout(function() { alert.style.display = 'none'; }, 300);
        }
      });
    });
  }

  // ========================================
  // Toggle (.toggle)
  // ========================================
  function initToggles() {
    document.querySelectorAll('.toggle').forEach(function(toggle) {
      // Skip if already has onclick
      if (toggle.getAttribute('onclick')) return;
      toggle.addEventListener('click', function() {
        if (this.disabled) return;
        this.classList.toggle('toggle--active');
      });
    });
  }

  // ========================================
  // Tooltip (.tooltip)
  // ========================================
  function initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        var tooltipText = this.getAttribute('data-tooltip');
        var tip = document.createElement('div');
        tip.className = 'tooltip tooltip--visible';
        tip.textContent = tooltipText;
        document.body.appendChild(tip);

        var rect = this.getBoundingClientRect();
        tip.style.position = 'fixed';
        tip.style.left = (rect.left + rect.width / 2 - tip.offsetWidth / 2) + 'px';
        tip.style.top = (rect.top - tip.offsetHeight - 8) + 'px';
        this._tooltip = tip;
      });

      el.addEventListener('mouseleave', function() {
        if (this._tooltip) {
          this._tooltip.remove();
          this._tooltip = null;
        }
      });
    });
  }

  // ========================================
  // Checkbox indeterminate
  // ========================================
  function initCheckboxes() {
    document.querySelectorAll('[data-indeterminate="true"]').forEach(function(input) {
      input.indeterminate = true;
    });
  }

  // ========================================
  // Code preview tabs (component-preview__tab)
  // ========================================
  function initPreviewTabs() {
    document.querySelectorAll('.component-preview__tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        var preview = this.closest('.component-preview');
        if (!preview) return;
        var tabName = this.getAttribute('data-tab');

        // Toggle active tab
        preview.querySelectorAll('.component-preview__tab').forEach(function(t) {
          t.classList.remove('component-preview__tab--active');
        });
        this.classList.add('component-preview__tab--active');

        // Toggle content
        if (tabName === 'preview') {
          preview.querySelectorAll('.component-preview__code').forEach(function(c) {
            c.style.display = 'none';
          });
          var demo = preview.querySelector('.component-preview__demo');
          if (demo) demo.style.display = '';
        } else {
          var demo = preview.querySelector('.component-preview__demo');
          if (demo) demo.style.display = 'none';
          preview.querySelectorAll('.component-preview__code').forEach(function(c) {
            c.style.display = c.getAttribute('data-tab-content') === tabName ? '' : 'none';
          });
        }
      });
    });

    // Copy code buttons
    document.querySelectorAll('.component-preview__copy').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var preview = this.closest('.component-preview');
        var code = preview.querySelector('.component-preview__code:not([style*="display: none"]) code, .component-preview__code:not([style*="display:none"]) code');
        if (code) {
          navigator.clipboard.writeText(code.textContent).then(function() {
            btn.innerHTML = '<i class="bx bx-check" style="font-size:16px;color:green;"></i>';
            setTimeout(function() {
              btn.innerHTML = '<i class="bx bx-copy" style="font-size:16px;"></i>';
            }, 2000);
          });
        }
      });
    });
  }

  // ========================================
  // Datepicker (BRICKS.Datepicker)
  // ========================================
  var LOCALES = {
    ko: { months: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], days: ['월','화','수','목','금','토','일'], format: 'YYYY/MM/DD' },
    en: { months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], format: 'MM/DD/YYYY' },
    zh: { months: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], days: ['一','二','三','四','五','六','日'], format: 'YYYY-MM-DD' },
    ja: { months: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], days: ['月','火','水','木','金','土','日'], format: 'YYYY/MM/DD' }
  };

  function getLocale() {
    var lang = localStorage.getItem('ds-locale') || (navigator.language || 'en').split('-')[0];
    return LOCALES[lang] || LOCALES['en'];
  }
  function getLocaleKey() {
    return localStorage.getItem('ds-locale') || (navigator.language || 'en').split('-')[0];
  }

  function formatDate(date, fmt) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var d = String(date.getDate()).padStart(2, '0');
    if (fmt === 'MM/DD/YYYY') return m + '/' + d + '/' + y;
    if (fmt === 'YYYY-MM-DD') return y + '-' + m + '-' + d;
    return y + '/' + m + '/' + d;
  }

  function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
  function firstDayOfMonth(year, month) { var d = new Date(year, month, 1).getDay(); return d === 0 ? 6 : d - 1; } // Monday=0

  function renderGrid(picker, year, month) {
    var grid = picker.querySelector('.datepicker__grid');
    if (!grid) return;
    grid.innerHTML = '';

    var locale = getLocale();
    var total = daysInMonth(year, month);
    var startDay = firstDayOfMonth(year, month);
    var today = new Date(); today.setHours(0,0,0,0);
    var minStr = picker.getAttribute('data-min');
    var maxStr = picker.getAttribute('data-max');
    var minDate = minStr ? new Date(minStr + 'T00:00:00') : null;
    var maxDate = maxStr ? new Date(maxStr + 'T00:00:00') : null;

    // Previous month filler
    var prevTotal = daysInMonth(year, month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1);
    for (var i = 0; i < startDay; i++) {
      var cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'datepicker__cell datepicker__cell--muted';
      cell.textContent = prevTotal - startDay + 1 + i;
      cell.disabled = true;
      grid.appendChild(cell);
    }

    // Current month days
    for (var day = 1; day <= total; day++) {
      var cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'datepicker__cell datepicker__cell--day';
      cell.textContent = day;
      cell.setAttribute('data-day', day);
      cell.setAttribute('role', 'gridcell');

      var cellDate = new Date(year, month, day);
      cellDate.setHours(0,0,0,0);

      if (cellDate.getTime() === today.getTime()) {
        cell.classList.add('datepicker__cell--today');
        cell.setAttribute('aria-current', 'date');
      }
      if ((minDate && cellDate < minDate) || (maxDate && cellDate > maxDate)) {
        cell.classList.add('datepicker__cell--disabled');
        cell.disabled = true;
      }

      // Check selected
      var selectedStr = picker._selectedDate;
      if (selectedStr) {
        var selDate = new Date(selectedStr + 'T00:00:00');
        if (cellDate.getTime() === selDate.getTime()) {
          cell.classList.add('datepicker__cell--selected');
          cell.setAttribute('aria-selected', 'true');
        }
      }

      // Range highlights
      if (picker._rangeStart) {
        var rs = new Date(picker._rangeStart + 'T00:00:00');
        var re = picker._rangeEnd ? new Date(picker._rangeEnd + 'T00:00:00') : null;
        if (cellDate.getTime() === rs.getTime()) cell.classList.add('datepicker__cell--selected', 'datepicker__cell--range-start');
        if (re && cellDate.getTime() === re.getTime()) cell.classList.add('datepicker__cell--selected', 'datepicker__cell--range-end');
        if (re && cellDate > rs && cellDate < re) cell.classList.add('datepicker__cell--in-range');
      }

      cell.addEventListener('click', (function(picker, year, month, day) {
        return function() {
          onDateSelect(picker, year, month, day);
        };
      })(picker, year, month, day));

      grid.appendChild(cell);
    }

    // Next month filler
    var remaining = (7 - ((startDay + total) % 7)) % 7;
    for (var i = 1; i <= remaining; i++) {
      var cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'datepicker__cell datepicker__cell--muted';
      cell.textContent = i;
      cell.disabled = true;
      grid.appendChild(cell);
    }
  }

  function onDateSelect(picker, year, month, day) {
    var locale = getLocale();
    var dateStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
    var dateObj = new Date(year, month, day);
    var mode = picker.getAttribute('data-mode') || 'single';

    if (mode === 'range') {
      if (!picker._rangeStart || picker._rangeEnd) {
        picker._rangeStart = dateStr;
        picker._rangeEnd = null;
        var inputs = picker.querySelectorAll('.datepicker__input');
        if (inputs[0]) inputs[0].value = formatDate(dateObj, locale.format);
        if (inputs[1]) inputs[1].value = '';
      } else {
        var startDate = new Date(picker._rangeStart + 'T00:00:00');
        if (dateObj < startDate) {
          picker._rangeStart = dateStr;
          var inputs = picker.querySelectorAll('.datepicker__input');
          if (inputs[0]) inputs[0].value = formatDate(dateObj, locale.format);
        } else {
          picker._rangeEnd = dateStr;
          var inputs = picker.querySelectorAll('.datepicker__input');
          if (inputs[1]) inputs[1].value = formatDate(dateObj, locale.format);
          closePopover(picker);
        }
      }
      renderGrid(picker, picker._year, picker._month);
      picker.dispatchEvent(new CustomEvent('datepicker:change', { detail: { start: picker._rangeStart, end: picker._rangeEnd } }));
    } else {
      picker._selectedDate = dateStr;
      var input = picker.querySelector('.datepicker__input');
      if (input) input.value = formatDate(dateObj, locale.format);
      renderGrid(picker, picker._year, picker._month);
      closePopover(picker);
      picker.dispatchEvent(new CustomEvent('datepicker:change', { detail: { value: dateStr } }));
    }
  }

  function populateSelects(picker, year, month) {
    var locale = getLocale();
    var monthSel = picker.querySelector('[data-datepicker-month]');
    var yearSel = picker.querySelector('[data-datepicker-year]');

    if (monthSel) {
      monthSel.innerHTML = '';
      for (var i = 0; i < 12; i++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.textContent = locale.months[i];
        if (i === month) opt.selected = true;
        monthSel.appendChild(opt);
      }
    }
    if (yearSel) {
      yearSel.innerHTML = '';
      for (var y = year - 10; y <= year + 10; y++) {
        var opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        if (y === year) opt.selected = true;
        yearSel.appendChild(opt);
      }
    }
  }

  function openPopover(picker) {
    var pop = picker.querySelector('.datepicker__popover');
    if (pop) { pop.setAttribute('aria-hidden', 'false'); }
    picker.classList.add('datepicker--open');
    var input = picker.querySelector('.datepicker__input');
    if (input) input.setAttribute('aria-expanded', 'true');
  }

  function closePopover(picker) {
    var pop = picker.querySelector('.datepicker__popover');
    if (pop) { pop.setAttribute('aria-hidden', 'true'); }
    picker.classList.remove('datepicker--open');
    var input = picker.querySelector('.datepicker__input');
    if (input) input.setAttribute('aria-expanded', 'false');
  }

  function navigateMonth(picker, delta) {
    picker._month += delta;
    if (picker._month > 11) { picker._month = 0; picker._year++; }
    if (picker._month < 0) { picker._month = 11; picker._year--; }
    populateSelects(picker, picker._year, picker._month);
    renderGrid(picker, picker._year, picker._month);
  }

  BRICKS.Datepicker = {
    setLocale: function(lang) { localStorage.setItem('ds-locale', lang); },
    init: function() { initDatepickers(); }
  };

  function initDatepickers() {
    document.querySelectorAll('[data-datepicker]').forEach(function(picker) {
      if (picker._dpInit) return;
      picker._dpInit = true;

      var initialStr = picker.getAttribute('data-initial');
      var startStr = picker.getAttribute('data-start');
      var now = new Date();
      var initDate = initialStr ? new Date(initialStr + 'T00:00:00') : (startStr ? new Date(startStr + 'T00:00:00') : now);

      picker._year = initDate.getFullYear();
      picker._month = initDate.getMonth();
      picker._selectedDate = initialStr || null;
      picker._rangeStart = startStr || null;
      picker._rangeEnd = picker.getAttribute('data-end') || null;

      var isInline = picker.hasAttribute('data-inline');

      // Populate selects and render
      populateSelects(picker, picker._year, picker._month);
      renderGrid(picker, picker._year, picker._month);

      // If initial date, set input value
      if (picker._selectedDate) {
        var locale = getLocale();
        var input = picker.querySelector('.datepicker__input');
        if (input && !picker.getAttribute('data-mode')) {
          input.value = formatDate(new Date(picker._selectedDate + 'T00:00:00'), locale.format);
        }
      }
      if (picker._rangeStart) {
        var locale = getLocale();
        var inputs = picker.querySelectorAll('.datepicker__input');
        if (inputs[0]) inputs[0].value = formatDate(new Date(picker._rangeStart + 'T00:00:00'), locale.format);
        if (picker._rangeEnd && inputs[1]) inputs[1].value = formatDate(new Date(picker._rangeEnd + 'T00:00:00'), locale.format);
      }

      // Toggle popover
      var toggleBtn = picker.querySelector('[data-datepicker-toggle]');
      if (toggleBtn && !isInline) {
        toggleBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          var pop = picker.querySelector('.datepicker__popover');
          var isOpen = pop && pop.getAttribute('aria-hidden') === 'false';
          if (isOpen) { closePopover(picker); } else { openPopover(picker); }
        });
      }

      // Input click also opens
      picker.querySelectorAll('.datepicker__input').forEach(function(input) {
        if (!isInline) {
          input.addEventListener('click', function(e) {
            e.stopPropagation();
            openPopover(picker);
          });
        }
      });

      // Month/Year select change
      var monthSel = picker.querySelector('[data-datepicker-month]');
      var yearSel = picker.querySelector('[data-datepicker-year]');
      if (monthSel) {
        monthSel.addEventListener('change', function() {
          picker._month = parseInt(this.value);
          renderGrid(picker, picker._year, picker._month);
        });
      }
      if (yearSel) {
        yearSel.addEventListener('change', function() {
          picker._year = parseInt(this.value);
          renderGrid(picker, picker._year, picker._month);
        });
      }

      // Nav buttons
      var prevBtn = picker.querySelector('[data-datepicker-prev]');
      var nextBtn = picker.querySelector('[data-datepicker-next]');
      if (prevBtn) prevBtn.addEventListener('click', function() { navigateMonth(picker, -1); });
      if (nextBtn) nextBtn.addEventListener('click', function() { navigateMonth(picker, 1); });

      // Today button
      var todayBtn = picker.querySelector('[data-datepicker-today]');
      if (todayBtn) {
        todayBtn.addEventListener('click', function() {
          var today = new Date();
          picker._year = today.getFullYear();
          picker._month = today.getMonth();
          populateSelects(picker, picker._year, picker._month);
          onDateSelect(picker, picker._year, picker._month, today.getDate());
        });
      }

      // Clear button
      var clearBtn = picker.querySelector('[data-datepicker-clear]');
      if (clearBtn) {
        clearBtn.addEventListener('click', function() {
          picker._selectedDate = null;
          picker._rangeStart = null;
          picker._rangeEnd = null;
          picker.querySelectorAll('.datepicker__input').forEach(function(inp) { inp.value = ''; });
          renderGrid(picker, picker._year, picker._month);
        });
      }

      // Close on outside click (for non-inline)
      if (!isInline) {
        picker.querySelector('.datepicker__popover').addEventListener('click', function(e) { e.stopPropagation(); });
        document.addEventListener('click', function() { closePopover(picker); });
      }

      // Inline: show popover permanently
      if (isInline) {
        var pop = picker.querySelector('.datepicker__popover');
        if (pop) pop.setAttribute('aria-hidden', 'false');
      }

      // Update weekday labels
      var locale = getLocale();
      var weekdaysEl = picker.querySelector('.datepicker__weekdays');
      if (weekdaysEl) {
        var spans = weekdaysEl.querySelectorAll('span');
        if (spans.length === 7) {
          for (var i = 0; i < 7; i++) spans[i].textContent = locale.days[i];
        }
      }
    });
  }

  // ========================================
  // Initialize All
  // ========================================
  function initAll() {
    initAccordions();
    initTabs();
    initDropdowns();
    initModals();
    initAlerts();
    initToggles();
    initTooltips();
    initCheckboxes();
    initPreviewTabs();
    initDatepickers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
