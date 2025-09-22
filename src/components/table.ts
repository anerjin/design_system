/**
 * BRICKS Design System - Table Component
 * 테이블 기능을 제공하는 컴포넌트
 */

import type { AlertOptions, ToastOptions } from '../types/index';

interface TableComponent {
    init(): void;
    initSortable(table: HTMLElement): void;
    sortTable(table: HTMLElement, columnIndex: number, header: HTMLElement): void;
    getCellValue(row: HTMLElement, columnIndex: number): string | number;
    isNumeric(str: string): boolean;
}



(function(global: Window) {
    "use strict";

    global.BRICKS = global.BRICKS || {} as any;

    /**
     * Table Component
     */
    global.BRICKS.Table = {
        // 초기화
        init: function(): void {
            // Sortable 테이블 초기화
            document.querySelectorAll('[data-sortable="true"]').forEach((table: Element) => {
                const tableEl = table as HTMLElement;
                if (!tableEl.hasAttribute('data-table-initialized')) {
                    this.initSortable(tableEl);
                    tableEl.setAttribute('data-table-initialized', 'true');
                }
            });
        },

        // Sortable 테이블 초기화
        initSortable: function(table: HTMLElement): void {
            const headers = table.querySelectorAll('thead th') as NodeListOf<HTMLElement>;

            headers.forEach((header: HTMLElement, index: number) => {
                // 이미 sort 클래스가 있으면 클릭 가능하게 설정
                if (header.classList.contains('table__sort')) {
                    header.style.cursor = 'pointer';
                    header.setAttribute('role', 'columnheader');
                    header.setAttribute('aria-sort', 'none');
                    header.setAttribute('tabindex', '0');

                    header.addEventListener('click', () => this.sortTable(table, index, header));

                    // 키보드 접근성 추가
                    header.addEventListener('keydown', (e: KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            this.sortTable(table, index, header);
                        }
                    });
                }
            });
        },

        // 테이블 정렬
        sortTable: function(table: HTMLElement, columnIndex: number, header: HTMLElement): void {
            const tbody = table.querySelector('tbody') as HTMLElement | null;
            if (!tbody) return;

            const rows = Array.from(tbody.querySelectorAll('tr')) as HTMLElement[];
            const isAscending: boolean = header.classList.contains('table__sort--asc');

            // 현재 헤더의 정렬 상태 토글
            table.querySelectorAll('.table__sort').forEach((th: Element) => {
                const thEl = th as HTMLElement;
                thEl.classList.remove('table__sort--asc', 'table__sort--desc');
                thEl.setAttribute('aria-sort', 'none');
            });

            let sortDirection: 'asc' | 'desc';
            if (isAscending) {
                header.classList.add('table__sort--desc');
                header.setAttribute('aria-sort', 'descending');
                sortDirection = 'desc';
            } else {
                header.classList.add('table__sort--asc');
                header.setAttribute('aria-sort', 'ascending');
                sortDirection = 'asc';
            }

            // 행 정렬
            rows.sort((a: HTMLElement, b: HTMLElement) => {
                const aValue = this.getCellValue(a, columnIndex);
                const bValue = this.getCellValue(b, columnIndex);

                let comparison: number = 0;

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    comparison = aValue - bValue;
                } else {
                    comparison = String(aValue).localeCompare(String(bValue), 'ko-KR', { numeric: true });
                }

                return sortDirection === 'asc' ? comparison : -comparison;
            });

            // 정렬된 행들을 tbody에 다시 추가
            rows.forEach((row: HTMLElement) => {
                tbody.appendChild(row);
            });

            // 커스텀 이벤트 발생
            const event = new CustomEvent('tableSort', {
                detail: {
                    table: table,
                    columnIndex: columnIndex,
                    direction: sortDirection,
                    header: header
                }
            });
            table.dispatchEvent(event);
        },

        // 셀 값 가져오기
        getCellValue: function(row: HTMLElement, columnIndex: number): string | number {
            const cell = row.children[columnIndex] as HTMLElement | undefined;
            if (!cell) return '';

            const cellText = cell.textContent?.trim() || '';

            // 숫자인지 확인
            if (this.isNumeric(cellText)) {
                return parseFloat(cellText.replace(/[^\d.-]/g, ''));
            }

            return cellText;
        },

        // 숫자 여부 확인
        isNumeric: function(str: string): boolean {
            const cleanedStr = str.replace(/[^\d.-]/g, '');
            return !isNaN(parseFloat(cleanedStr)) && isFinite(parseFloat(cleanedStr));
        }
    };

})(window);

export { TableComponent };