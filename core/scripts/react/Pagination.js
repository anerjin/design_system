import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useMemo } from 'react';
import { Icon } from './Icon';
/**
 * BRICKS Pagination Component
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => console.log(page)}
 * />
 * ```
 */
export const Pagination = forwardRef(({ currentPage, totalPages, onPageChange, visiblePages = 5, showFirstLast = false, showPrevNext = true, showEllipsis = true, size = 'md', shape = 'default', variant = 'primary', align = 'center', showPageInfo = false, showJumpTo = false, prevLabel = _jsx(Icon, { name: "chevron-left" }), nextLabel = _jsx(Icon, { name: "chevron-right" }), firstLabel = _jsx(Icon, { name: "chevrons-left" }), lastLabel = _jsx(Icon, { name: "chevrons-right" }), disabled = false, className, 'aria-label': ariaLabel = 'Pagination Navigation', ...props }, ref) => {
    const pageNumbers = useMemo(() => {
        const pages = [];
        const half = Math.floor(visiblePages / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);
        // Adjust if at the beginning or end
        if (currentPage <= half) {
            end = Math.min(totalPages, visiblePages);
        }
        else if (currentPage + half >= totalPages) {
            start = Math.max(1, totalPages - visiblePages + 1);
        }
        // Add first page and ellipsis
        if (showEllipsis && start > 1) {
            pages.push(1);
            if (start > 2) {
                pages.push('...');
            }
        }
        // Add page numbers
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        // Add ellipsis and last page
        if (showEllipsis && end < totalPages) {
            if (end < totalPages - 1) {
                pages.push('...');
            }
            pages.push(totalPages);
        }
        return pages;
    }, [currentPage, totalPages, visiblePages, showEllipsis]);
    const handlePageChange = (page) => {
        if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };
    const handleJumpToPage = (e) => {
        if (e.key === 'Enter') {
            const input = e.target;
            const page = parseInt(input.value, 10);
            if (!isNaN(page)) {
                handlePageChange(Math.min(Math.max(1, page), totalPages));
                input.value = '';
            }
        }
    };
    const paginationClasses = [
        'pagination',
        size !== 'md' ? `pagination--${size}` : '',
        shape !== 'default' ? `pagination--${shape}` : '',
        variant !== 'primary' ? `pagination--${variant}` : '',
        align !== 'center' ? `pagination--align-${align}` : '',
        disabled ? 'pagination--disabled' : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("nav", { ref: ref, className: paginationClasses, "aria-label": ariaLabel, ...props, children: [showPageInfo && (_jsxs("div", { className: "pagination__info", children: ["Page ", currentPage, " of ", totalPages] })), _jsxs("ul", { className: "pagination__list", children: [showFirstLast && (_jsx("li", { className: "pagination__item", children: _jsx("button", { className: `pagination__link pagination__link--first ${currentPage === 1 ? 'pagination__link--disabled' : ''}`, onClick: () => handlePageChange(1), disabled: disabled || currentPage === 1, "aria-label": "First page", children: firstLabel }) })), showPrevNext && (_jsx("li", { className: "pagination__item", children: _jsx("button", { className: `pagination__link pagination__link--prev ${currentPage === 1 ? 'pagination__link--disabled' : ''}`, onClick: () => handlePageChange(currentPage - 1), disabled: disabled || currentPage === 1, "aria-label": "Previous page", children: prevLabel }) })), pageNumbers.map((page, index) => (_jsx("li", { className: "pagination__item", children: page === '...' ? (_jsx("span", { className: "pagination__ellipsis", children: page })) : (_jsx("button", { className: `pagination__link ${page === currentPage ? 'pagination__link--active' : ''}`, onClick: () => handlePageChange(page), disabled: disabled, "aria-label": `Page ${page}`, "aria-current": page === currentPage ? 'page' : undefined, children: page })) }, index))), showPrevNext && (_jsx("li", { className: "pagination__item", children: _jsx("button", { className: `pagination__link pagination__link--next ${currentPage === totalPages ? 'pagination__link--disabled' : ''}`, onClick: () => handlePageChange(currentPage + 1), disabled: disabled || currentPage === totalPages, "aria-label": "Next page", children: nextLabel }) })), showFirstLast && (_jsx("li", { className: "pagination__item", children: _jsx("button", { className: `pagination__link pagination__link--last ${currentPage === totalPages ? 'pagination__link--disabled' : ''}`, onClick: () => handlePageChange(totalPages), disabled: disabled || currentPage === totalPages, "aria-label": "Last page", children: lastLabel }) }))] }), showJumpTo && (_jsx("div", { className: "pagination__jump", children: _jsxs("label", { className: "pagination__jump-label", children: ["Go to:", _jsx("input", { type: "number", min: "1", max: totalPages, className: "pagination__jump-input", onKeyDown: handleJumpToPage, disabled: disabled, placeholder: "#" })] }) }))] }));
});
Pagination.displayName = 'Pagination';
export default Pagination;
//# sourceMappingURL=Pagination.js.map