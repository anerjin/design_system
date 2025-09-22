/**
 * BRICKS Design System - Table Component
 * 테이블 기능을 제공하는 컴포넌트
 */
(function (global) {
    "use strict";
    global.BRICKS = global.BRICKS || {};
    /**
     * Table Component
     */
    global.BRICKS.Table = {
        // 초기화
        init: function () {
            // Sortable 테이블 초기화
            document.querySelectorAll('[data-sortable="true"]').forEach((table) => {
                const tableEl = table;
                if (!tableEl.hasAttribute('data-table-initialized')) {
                    this.initSortable(tableEl);
                    tableEl.setAttribute('data-table-initialized', 'true');
                }
            });
        },
        // Sortable 테이블 초기화
        initSortable: function (table) {
            const headers = table.querySelectorAll('thead th');
            headers.forEach((header, index) => {
                // 이미 sort 클래스가 있으면 클릭 가능하게 설정
                if (header.classList.contains('table__sort')) {
                    header.style.cursor = 'pointer';
                    header.setAttribute('role', 'columnheader');
                    header.setAttribute('aria-sort', 'none');
                    header.setAttribute('tabindex', '0');
                    header.addEventListener('click', () => this.sortTable(table, index, header));
                    // 키보드 접근성 추가
                    header.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            this.sortTable(table, index, header);
                        }
                    });
                }
            });
        },
        // 테이블 정렬
        sortTable: function (table, columnIndex, header) {
            const tbody = table.querySelector('tbody');
            if (!tbody)
                return;
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const isAscending = header.classList.contains('table__sort--asc');
            // 현재 헤더의 정렬 상태 토글
            table.querySelectorAll('.table__sort').forEach((th) => {
                const thEl = th;
                thEl.classList.remove('table__sort--asc', 'table__sort--desc');
                thEl.setAttribute('aria-sort', 'none');
            });
            let sortDirection;
            if (isAscending) {
                header.classList.add('table__sort--desc');
                header.setAttribute('aria-sort', 'descending');
                sortDirection = 'desc';
            }
            else {
                header.classList.add('table__sort--asc');
                header.setAttribute('aria-sort', 'ascending');
                sortDirection = 'asc';
            }
            // 행 정렬
            rows.sort((a, b) => {
                const aValue = this.getCellValue(a, columnIndex);
                const bValue = this.getCellValue(b, columnIndex);
                let comparison = 0;
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    comparison = aValue - bValue;
                }
                else {
                    comparison = String(aValue).localeCompare(String(bValue), 'ko-KR', { numeric: true });
                }
                return sortDirection === 'asc' ? comparison : -comparison;
            });
            // 정렬된 행들을 tbody에 다시 추가
            rows.forEach((row) => {
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
        getCellValue: function (row, columnIndex) {
            const cell = row.children[columnIndex];
            if (!cell)
                return '';
            const cellText = cell.textContent?.trim() || '';
            // 숫자인지 확인
            if (this.isNumeric(cellText)) {
                return parseFloat(cellText.replace(/[^\d.-]/g, ''));
            }
            return cellText;
        },
        // 숫자 여부 확인
        isNumeric: function (str) {
            const cleanedStr = str.replace(/[^\d.-]/g, '');
            return !isNaN(parseFloat(cleanedStr)) && isFinite(parseFloat(cleanedStr));
        }
    };
})(window);
export {};
//# sourceMappingURL=table.js.map