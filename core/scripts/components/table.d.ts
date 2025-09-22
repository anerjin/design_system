/**
 * BRICKS Design System - Table Component
 * 테이블 기능을 제공하는 컴포넌트
 */
interface TableComponent {
    init(): void;
    initSortable(table: HTMLElement): void;
    sortTable(table: HTMLElement, columnIndex: number, header: HTMLElement): void;
    getCellValue(row: HTMLElement, columnIndex: number): string | number;
    isNumeric(str: string): boolean;
}
export { TableComponent };
//# sourceMappingURL=table.d.ts.map