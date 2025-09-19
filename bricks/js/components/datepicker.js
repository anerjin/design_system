/**
 * BRICKS Design System - Datepicker Component
 * 접근성을 준수하는 달력 선택기
 */

(function(global) {
    "use strict";

    global.BRICKS = global.BRICKS || {};

    const DAY_MS = 24 * 60 * 60 * 1000;
    const WEEK_LENGTH = 7;
    const WEEKDAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];
    const MONTH_LABELS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

    function createDate(year, month, day) {
        return new Date(year, month, day, 12, 0, 0, 0);
    }

    function toISODate(date) {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function isSameDate(a, b) {
        if (!a || !b) return false;
        return a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate();
    }

    function isBetween(date, start, end) {
        if (!date || !start || !end) return false;
        const time = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
        const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
        return time > startTime && time < endTime;
    }

    function clampDate(date, min, max) {
        if (min && date < min) return new Date(min.getTime());
        if (max && date > max) return new Date(max.getTime());
        return date;
    }

    function addMonths(date, amount) {
        const newDate = new Date(date.getTime());
        newDate.setMonth(newDate.getMonth() + amount);
        return newDate;
    }

    function startOfMonth(date) {
        return createDate(date.getFullYear(), date.getMonth(), 1);
    }

    function startOfWeek(date) {
        const day = date.getDay() === 0 ? 7 : date.getDay();
        const diff = day - 1;
        return new Date(date.getTime() - diff * DAY_MS);
    }

    function endOfMonth(date) {
        return createDate(date.getFullYear(), date.getMonth() + 1, 0);
    }

    function parseISO(value) {
        if (!value) return null;
        const parsed = new Date(value);
        return isNaN(parsed.getTime()) ? null : parsed;
    }

    class Datepicker {
        constructor(root) {
            this.root = root;
            this.id = root.getAttribute('id') || `datepicker-${Math.random().toString(36).slice(2, 8)}`;
            this.root.setAttribute('id', this.id);

            this.inline = root.hasAttribute('data-inline');
            this.mode = root.getAttribute('data-mode') || 'single';
            this.minDate = parseISO(root.getAttribute('data-min'));
            this.maxDate = parseISO(root.getAttribute('data-max'));
            this.initialDate = parseISO(root.getAttribute('data-initial')) || new Date();

            this.focusedDate = clampDate(new Date(this.initialDate), this.minDate, this.maxDate);
            this.viewDate = startOfMonth(this.focusedDate);

            this.inputs = Array.from(root.querySelectorAll('.datepicker__input'));
            this.toggle = root.querySelector('[data-datepicker-toggle]');
            this.popover = root.querySelector('.datepicker__popover');
            this.grid = root.querySelector('.datepicker__grid');
            this.label = root.querySelector('.datepicker__current');
            this.prevBtn = root.querySelector('[data-datepicker-prev]');
            this.nextBtn = root.querySelector('[data-datepicker-next]');
            this.todayBtn = root.querySelector('[data-datepicker-today]');
            this.clearBtn = root.querySelector('[data-datepicker-clear]');
            this.monthSelect = root.querySelector('[data-datepicker-month]');
            this.yearSelect = root.querySelector('[data-datepicker-year]');

            this.selected = this.mode === 'range'
                ? { start: parseISO(root.getAttribute('data-start')), end: parseISO(root.getAttribute('data-end')) }
                : parseISO(root.getAttribute('data-value'));

            this.clampViewDate();
            this.populateControls();
            this.bindEvents();
            this.render();
        }

        bindEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => {
                    this.changeMonth(-1);
                });
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => {
                    this.changeMonth(1);
                });
            }

            if (this.todayBtn) {
                this.todayBtn.addEventListener('click', () => {
                    const today = clampDate(new Date(), this.minDate, this.maxDate);
                    this.focusedDate = today;
                    this.viewDate = startOfMonth(today);
                    this.selectDate(today, true);
                    if (!this.inline) {
                        this.close();
                    } else {
                        this.focusActiveCell(true);
                    }
                });
            }

            if (this.clearBtn) {
                this.clearBtn.addEventListener('click', () => {
                    this.clearSelection();
                    if (!this.inline) {
                        this.close();
                    } else {
                        this.focusActiveCell(true);
                    }
                });
            }

            if (!this.inline && this.toggle) {
                this.toggle.addEventListener('click', () => {
                    this.root.classList.contains('is-open') ? this.close() : this.open();
                });
            }

            if (!this.inline && this.popover) {
                document.addEventListener('click', (event) => {
                    if (!this.root.contains(event.target)) {
                        this.close();
                    }
                });
            }

            if (this.monthSelect) {
                this.monthSelect.addEventListener('change', () => {
                    const month = parseInt(this.monthSelect.value, 10);
                    if (isNaN(month)) {
                        return;
                    }
                    const viewYear = this.viewDate.getFullYear();
                    const day = this.focusedDate.getDate();
                    this.viewDate = startOfMonth(createDate(viewYear, month, 1));
                    this.clampViewDate();
                    const adjustedYear = this.viewDate.getFullYear();
                    const candidate = clampDate(createDate(adjustedYear, month, day), this.minDate, this.maxDate);
                    this.focusedDate = candidate;
                    this.render();
                    this.focusActiveCell(true);
                });
            }

            if (this.yearSelect) {
                this.yearSelect.addEventListener('change', () => {
                    const year = parseInt(this.yearSelect.value, 10);
                    if (isNaN(year)) {
                        return;
                    }
                    const month = this.viewDate.getMonth();
                    const day = this.focusedDate.getDate();
                    this.viewDate = startOfMonth(createDate(year, month, 1));
                    this.clampViewDate();
                    const adjustedYear = this.viewDate.getFullYear();
                    const candidate = clampDate(createDate(adjustedYear, this.focusedDate.getMonth(), day), this.minDate, this.maxDate);
                    this.focusedDate = candidate;
                    this.render();
                    this.focusActiveCell(true);
                });
            }

            this.grid.addEventListener('click', (event) => {
                const target = event.target.closest('[data-date]');
                if (!target || target.classList.contains('datepicker__cell--disabled')) return;

                const date = parseISO(target.getAttribute('data-date'));
                this.selectDate(date);
                if (!this.inline && this.mode === 'single') {
                    this.close();
                }

                if (this.inline || this.root.classList.contains('is-open')) {
                    this.focusActiveCell(true);
                }
            });

            this.grid.addEventListener('keydown', (event) => {
                const handled = this.handleGridKeydown(event);
                if (handled) {
                    event.preventDefault();
                }
            });
        }

        handleGridKeydown(event) {
            const key = event.key;
            let newFocus = new Date(this.focusedDate.getTime());
            let handled = false;

            switch (key) {
                case 'ArrowUp':
                    newFocus.setDate(newFocus.getDate() - WEEK_LENGTH);
                    handled = true;
                    break;
                case 'ArrowDown':
                    newFocus.setDate(newFocus.getDate() + WEEK_LENGTH);
                    handled = true;
                    break;
                case 'ArrowLeft':
                    newFocus.setDate(newFocus.getDate() - 1);
                    handled = true;
                    break;
                case 'ArrowRight':
                    newFocus.setDate(newFocus.getDate() + 1);
                    handled = true;
                    break;
                case 'PageUp':
                    newFocus = addMonths(newFocus, event.shiftKey ? -12 : -1);
                    handled = true;
                    break;
                case 'PageDown':
                    newFocus = addMonths(newFocus, event.shiftKey ? 12 : 1);
                    handled = true;
                    break;
                case 'Home':
                    newFocus.setDate(newFocus.getDate() - ((newFocus.getDay() || 7) - 1));
                    handled = true;
                    break;
                case 'End':
                    newFocus.setDate(newFocus.getDate() + (7 - (newFocus.getDay() || 7)));
                    handled = true;
                    break;
                case 'Enter':
                case ' ': {
                    const active = this.grid.querySelector('[tabindex="0"]');
                    if (active && !active.classList.contains('datepicker__cell--disabled')) {
                        const date = parseISO(active.getAttribute('data-date'));
                        this.selectDate(date);
                        if (!this.inline && this.mode === 'single') {
                            this.close();
                        }
                    }
                    handled = true;
                    break;
                }
                case 'Escape':
                    if (!this.inline) {
                        this.close();
                        this.toggle?.focus();
                    }
                    handled = true;
                    break;
            }

            newFocus = clampDate(newFocus, this.minDate, this.maxDate);

            if (handled && !isNaN(newFocus.getTime())) {
                this.focusedDate = newFocus;
                this.viewDate = startOfMonth(this.focusedDate);
                this.render();
                this.focusActiveCell(true);
            }

            return handled;
        }

        changeMonth(diff) {
            this.viewDate = addMonths(this.viewDate, diff);
            this.focusedDate = clampDate(addMonths(this.focusedDate, diff), this.minDate, this.maxDate);
            this.render();
            this.focusActiveCell(true);
        }

        render() {
            this.clampViewDate();
            this.populateControls();

            if (this.label) {
                const formatter = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' });
                this.label.textContent = formatter.format(this.viewDate);
            }

            const start = startOfWeek(startOfMonth(this.viewDate));
            const end = endOfMonth(this.viewDate);
            const cells = [];
            let current = new Date(start.getTime());

            while (cells.length < 42) {
                cells.push(new Date(current.getTime()));
                current.setDate(current.getDate() + 1);
            }

            this.grid.innerHTML = '';

            const today = new Date();
            const range = this.mode === 'range' ? this.selected : {};

            cells.forEach(date => {
                const iso = toISODate(date);
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'datepicker__cell';
                button.setAttribute('data-date', iso);
                button.setAttribute('role', 'gridcell');
                button.textContent = String(date.getDate());

                const isOtherMonth = date.getMonth() !== this.viewDate.getMonth();
                if (isOtherMonth) {
                    button.classList.add('datepicker__cell--muted');
                }

                if (this.minDate && date < this.minDate || this.maxDate && date > this.maxDate) {
                    button.classList.add('datepicker__cell--disabled');
                    button.setAttribute('aria-disabled', 'true');
                }

                if (isSameDate(date, today)) {
                    button.setAttribute('aria-current', 'date');
                }

                if (this.mode === 'single') {
                    if (isSameDate(date, this.selected)) {
                        button.setAttribute('aria-selected', 'true');
                        button.classList.add('datepicker__cell--range-start');
                    }
                } else {
                    const { start: startDate, end: endDate } = range || {};
                    if (startDate && isSameDate(date, startDate)) {
                        button.classList.add('datepicker__cell--range-start');
                        button.setAttribute('aria-selected', 'true');
                    }
                    if (endDate && isSameDate(date, endDate)) {
                        button.classList.add('datepicker__cell--range-end');
                        button.setAttribute('aria-selected', 'true');
                    }
                    if (isBetween(new Date(date), startDate, endDate)) {
                        button.classList.add('datepicker__cell--in-range');
                    }
                }

                if (isSameDate(date, this.focusedDate)) {
                    button.setAttribute('tabindex', '0');
                } else {
                    button.setAttribute('tabindex', '-1');
                }

                this.grid.appendChild(button);
            });

            if (!this.inline) {
                this.root.classList.toggle('is-open', this.popover?.getAttribute('aria-hidden') === 'false');
            }

            this.updateInputs();
            this.updateLiveRegion();
        }

        selectDate(date, silent) {
            if (!date) return;
            date = clampDate(date, this.minDate, this.maxDate);

            if (this.mode === 'single') {
                this.selected = new Date(date.getTime());
                this.focusedDate = new Date(date.getTime());
            } else {
                if (!this.selected || !this.selected.start || this.selected.end) {
                    this.selected = { start: new Date(date.getTime()), end: null };
                } else if (date < this.selected.start) {
                    this.selected = { start: new Date(date.getTime()), end: new Date(this.selected.start.getTime()) };
                } else {
                    this.selected.end = new Date(date.getTime());
                }
                this.focusedDate = new Date(date.getTime());
            }

            this.viewDate = startOfMonth(this.focusedDate);
            this.render();

            if (!silent) {
                this.announceSelection();
            }

            const shouldFocus = this.inline || this.root.classList.contains('is-open');
            if (shouldFocus) {
                this.focusActiveCell(true);
            }
        }

        clearSelection() {
            this.selected = this.mode === 'range' ? { start: null, end: null } : null;
            this.updateInputs();
            this.render();
        }

        updateInputs() {
            if (!this.inputs.length) return;

            if (this.mode === 'single') {
                const value = toISODate(this.selected);
                const label = this.inputs[0]?.getAttribute('data-format') || 'date';
                if (this.inputs[0]) {
                    this.inputs[0].value = value;
                    this.inputs[0].setAttribute('aria-live', 'polite');
                    this.inputs[0].setAttribute('aria-label', `${label}: ${value || '선택되지 않음'}`);
                }
            } else {
                const start = this.selected?.start ? toISODate(this.selected.start) : '';
                const end = this.selected?.end ? toISODate(this.selected.end) : '';
                if (this.inputs[0]) {
                    this.inputs[0].value = start;
                    this.inputs[0].setAttribute('aria-label', `시작일: ${start || '선택되지 않음'}`);
                }
                if (this.inputs[1]) {
                    this.inputs[1].value = end;
                    this.inputs[1].setAttribute('aria-label', `종료일: ${end || '선택되지 않음'}`);
                }
            }
        }

        updateLiveRegion() {
            let region = this.root.querySelector('.datepicker__live');
            if (!region) {
                region = document.createElement('div');
                region.className = 'datepicker__live';
                region.setAttribute('aria-live', 'polite');
                region.setAttribute('aria-atomic', 'true');
                region.style.position = 'absolute';
                region.style.width = '1px';
                region.style.height = '1px';
                region.style.margin = '-1px';
                region.style.clip = 'rect(0, 0, 0, 0)';
                region.style.overflow = 'hidden';
                this.root.appendChild(region);
            }

            const formatter = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' });
            if (this.mode === 'single') {
                region.textContent = this.selected ? `선택된 날짜 ${formatter.format(this.selected)}` : '선택된 날짜 없음';
            } else {
                const start = this.selected?.start ? formatter.format(this.selected.start) : '미정';
                const end = this.selected?.end ? formatter.format(this.selected.end) : '미정';
                region.textContent = `선택된 기간 ${start} - ${end}`;
            }
        }

        announceSelection() {
            const formatter = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' });
            if (this.mode === 'single' && this.selected) {
                this.root.dispatchEvent(new CustomEvent('datepicker:change', {
                    detail: {
                        value: toISODate(this.selected),
                        label: formatter.format(this.selected)
                    }
                }));
            } else if (this.mode === 'range') {
                this.root.dispatchEvent(new CustomEvent('datepicker:change', {
                    detail: {
                        start: this.selected?.start ? toISODate(this.selected.start) : null,
                        end: this.selected?.end ? toISODate(this.selected.end) : null
                    }
                }));
            }
        }

        open() {
            if (this.inline) return;
            this.root.classList.add('is-open');
            this.popover?.setAttribute('aria-hidden', 'false');
            this.toggle?.setAttribute('aria-expanded', 'true');
            this.inputs.forEach(input => input.setAttribute('aria-expanded', 'true'));
            const activeCell = this.grid.querySelector('[aria-selected="true"]') || this.grid.querySelector('[tabindex="0"]');
            activeCell?.focus();
        }

        close() {
            if (this.inline) return;
            const shouldReturnFocus = this.popover?.contains(document.activeElement);
            this.root.classList.remove('is-open');
            this.popover?.setAttribute('aria-hidden', 'true');
            this.toggle?.setAttribute('aria-expanded', 'false');
            this.inputs.forEach(input => input.setAttribute('aria-expanded', 'false'));
            if (shouldReturnFocus) {
                const target = this.toggle || this.inputs[0];
                target?.focus();
            }
        }

        populateControls() {
            const viewYear = this.viewDate.getFullYear();

            if (this.monthSelect) {
                const currentMonth = this.viewDate.getMonth();
                this.monthSelect.innerHTML = '';
                MONTH_LABELS.forEach((label, index) => {
                    const option = document.createElement('option');
                    option.value = String(index);
                    option.textContent = label;

                    const monthStart = startOfMonth(createDate(viewYear, index, 1));
                    const monthEnd = endOfMonth(monthStart);
                    const disabled = (this.minDate && monthEnd < this.minDate) || (this.maxDate && monthStart > this.maxDate);
                    option.disabled = !!disabled;
                    this.monthSelect.appendChild(option);
                });
                this.monthSelect.value = String(currentMonth);
            }

            if (this.yearSelect) {
                let minYear = this.minDate ? this.minDate.getFullYear() : viewYear - 5;
                let maxYear = this.maxDate ? this.maxDate.getFullYear() : viewYear + 5;

                if (viewYear < minYear) {
                    minYear = viewYear - 5;
                }
                if (viewYear > maxYear) {
                    maxYear = viewYear + 5;
                }

                this.yearSelect.innerHTML = '';
                for (let year = minYear; year <= maxYear; year++) {
                    const option = document.createElement('option');
                    option.value = String(year);
                    option.textContent = `${year}년`;
                    this.yearSelect.appendChild(option);
                }
                this.yearSelect.value = String(viewYear);
            }
        }

        clampViewDate() {
            if (this.minDate) {
                const minView = startOfMonth(this.minDate);
                if (this.viewDate < minView) {
                    this.viewDate = new Date(minView.getTime());
                }
            }
            if (this.maxDate) {
                const maxView = startOfMonth(this.maxDate);
                if (this.viewDate > maxView) {
                    this.viewDate = new Date(maxView.getTime());
                }
            }
        }

        focusActiveCell(force = false) {
            if (!this.grid) return;

            const shouldFocus = force || this.grid.contains(document.activeElement);
            if (!shouldFocus) return;

            requestAnimationFrame(() => {
                const target = this.grid.querySelector('[tabindex="0"]');
                if (target) {
                    target.focus();
                }
            });
        }
    }

    global.BRICKS.Datepicker = {
        init: function() {
            document.querySelectorAll('[data-datepicker]').forEach(root => {
                if (!root.__bricksDatepicker) {
                    root.__bricksDatepicker = new Datepicker(root);
                }
            });
        }
    };

})(window);
