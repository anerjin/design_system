/**
 * BRICKS Design System - Table Component
 * 테이블 기능을 제공하는 컴포넌트
 */

(function(global) {
    "use strict";

    global.BRICKS = global.BRICKS || {};

    /**
     * Table Component
     */
    global.BRICKS.Table = {
        // 초기화
        init: function() {
            // Sortable 테이블 초기화
            document.querySelectorAll('[data-sortable="true"]').forEach(table => {
                if (!table.hasAttribute('data-table-initialized')) {
                    this.initSortable(table);
                    table.setAttribute('data-table-initialized', 'true');
                }
            });
        },

        // Sortable 테이블 초기화
        initSortable: function(table) {
            const headers = table.querySelectorAll('thead th');

            headers.forEach((header, index) => {
                // 이미 sort 클래스가 있으면 클릭 가능하게 설정
                if (header.classList.contains('table__sort')) {
                    header.style.cursor = 'pointer';
                    header.addEventListener('click', () => this.sortTable(table, index, header));
                }
            });
        },

        // 테이블 정렬
        sortTable: function(table, columnIndex, header) {
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const isAscending = header.classList.contains('table__sort--asc');

            // 현재 헤더의 정렬 상태 토글
            table.querySelectorAll('.table__sort').forEach(th => {
                th.classList.remove('table__sort--asc', 'table__sort--desc');
            });

            if (isAscending) {
                header.classList.add('table__sort--desc');
            } else {
                header.classList.add('table__sort--asc');
            }

            // 행 정렬
            rows.sort((a, b) => {
                const aValue = a.children[columnIndex].textContent.trim();
                const bValue = b.children[columnIndex].textContent.trim();

                // 숫자 체크
                const aNum = parseFloat(aValue.replace(/[^0-9.-]/g, ''));
                const bNum = parseFloat(bValue.replace(/[^0-9.-]/g, ''));

                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return isAscending ? bNum - aNum : aNum - bNum;
                }

                // 문자열 비교
                return isAscending
                    ? bValue.localeCompare(aValue)
                    : aValue.localeCompare(bValue);
            });

            // DOM에 재배치
            rows.forEach(row => tbody.appendChild(row));

            // 커스텀 이벤트 발생
            const event = new CustomEvent('table:sorted', {
                detail: {
                    table: table,
                    column: columnIndex,
                    direction: isAscending ? 'desc' : 'asc'
                }
            });
            table.dispatchEvent(event);
        },

        // 행 선택 기능 추가
        enableRowSelection: function(table, options = {}) {
            const config = Object.assign({
                multiple: false,
                className: 'table__row--selected'
            }, options);

            const tbody = table.querySelector('tbody');
            const rows = tbody.querySelectorAll('tr');

            rows.forEach(row => {
                row.style.cursor = 'pointer';
                row.addEventListener('click', (e) => {
                    // 체크박스나 버튼 클릭 시 무시
                    if (e.target.matches('input, button, a')) return;

                    if (!config.multiple) {
                        // 단일 선택
                        rows.forEach(r => r.classList.remove(config.className));
                    }

                    row.classList.toggle(config.className);

                    // 커스텀 이벤트 발생
                    const event = new CustomEvent('table:rowSelected', {
                        detail: {
                            row: row,
                            selected: row.classList.contains(config.className),
                            selectedRows: tbody.querySelectorAll('.' + config.className)
                        }
                    });
                    table.dispatchEvent(event);
                });
            });
        },

        // 필터링 기능
        filter: function(table, searchTerm, columnIndexes = null) {
            const tbody = table.querySelector('tbody');
            const rows = tbody.querySelectorAll('tr');
            const term = searchTerm.toLowerCase();
            let visibleCount = 0;

            rows.forEach(row => {
                let shouldShow = false;
                const cells = row.querySelectorAll('td');

                if (columnIndexes) {
                    // 특정 컬럼만 검색
                    columnIndexes.forEach(index => {
                        if (cells[index] && cells[index].textContent.toLowerCase().includes(term)) {
                            shouldShow = true;
                        }
                    });
                } else {
                    // 모든 컬럼 검색
                    cells.forEach(cell => {
                        if (cell.textContent.toLowerCase().includes(term)) {
                            shouldShow = true;
                        }
                    });
                }

                row.style.display = shouldShow ? '' : 'none';
                if (shouldShow) visibleCount++;
            });

            // 결과가 없으면 빈 상태 표시
            this.toggleEmptyState(table, visibleCount === 0);

            return visibleCount;
        },

        // 빈 상태 토글
        toggleEmptyState: function(table, isEmpty) {
            let emptyRow = table.querySelector('.table__empty-row');
            const tbody = table.querySelector('tbody');

            if (isEmpty) {
                if (!emptyRow) {
                    const columnCount = table.querySelectorAll('thead th').length;
                    emptyRow = document.createElement('tr');
                    emptyRow.className = 'table__empty-row';
                    emptyRow.innerHTML = `
                        <td colspan="${columnCount}" class="table__empty">
                            <div>데이터가 없습니다</div>
                        </td>
                    `;
                    tbody.appendChild(emptyRow);
                }
                emptyRow.style.display = '';
            } else if (emptyRow) {
                emptyRow.style.display = 'none';
            }
        },

        // 페이지네이션 지원
        paginate: function(table, options = {}) {
            const config = Object.assign({
                rowsPerPage: 10,
                currentPage: 1
            }, options);

            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr')).filter(row =>
                !row.classList.contains('table__empty-row')
            );

            const totalPages = Math.ceil(rows.length / config.rowsPerPage);
            const start = (config.currentPage - 1) * config.rowsPerPage;
            const end = start + config.rowsPerPage;

            // 모든 행 숨기기
            rows.forEach((row, index) => {
                row.style.display = (index >= start && index < end) ? '' : 'none';
            });

            return {
                currentPage: config.currentPage,
                totalPages: totalPages,
                totalRows: rows.length,
                rowsPerPage: config.rowsPerPage
            };
        },

        // CSV 내보내기
        exportToCSV: function(table, filename = 'table.csv') {
            const rows = [];

            // 헤더
            const headers = Array.from(table.querySelectorAll('thead th'))
                .map(th => th.textContent.trim());
            rows.push(headers);

            // 데이터 행
            table.querySelectorAll('tbody tr').forEach(tr => {
                if (tr.style.display !== 'none' && !tr.classList.contains('table__empty-row')) {
                    const cells = Array.from(tr.querySelectorAll('td'))
                        .map(td => td.textContent.trim());
                    rows.push(cells);
                }
            });

            // CSV 문자열 생성
            const csvContent = rows.map(row =>
                row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
            ).join('\n');

            // 다운로드
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        }
    };

})(window);