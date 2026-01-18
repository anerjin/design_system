import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Pagination } from './Pagination';
const meta = {
    title: 'Navigation/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        shape: {
            control: 'select',
            options: ['default', 'rounded', 'circle'],
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right'],
        },
    },
};
export default meta;
export const Default = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        return (_jsx(Pagination, { currentPage: currentPage, totalPages: 10, onPageChange: setCurrentPage }));
    },
};
export const WithFirstLast = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(5);
        return (_jsx(Pagination, { currentPage: currentPage, totalPages: 20, onPageChange: setCurrentPage, showFirstLast: true }));
    },
};
export const WithPageInfo = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(3);
        return (_jsx(Pagination, { currentPage: currentPage, totalPages: 15, onPageChange: setCurrentPage, showPageInfo: true }));
    },
};
export const WithJumpTo = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        return (_jsx(Pagination, { currentPage: currentPage, totalPages: 50, onPageChange: setCurrentPage, showJumpTo: true, showFirstLast: true }));
    },
};
export const Sizes = {
    render: () => {
        const [page1, setPage1] = useState(1);
        const [page2, setPage2] = useState(1);
        const [page3, setPage3] = useState(1);
        return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsx(Pagination, { currentPage: page1, totalPages: 10, onPageChange: setPage1, size: "sm" }), _jsx(Pagination, { currentPage: page2, totalPages: 10, onPageChange: setPage2, size: "md" }), _jsx(Pagination, { currentPage: page3, totalPages: 10, onPageChange: setPage3, size: "lg" })] }));
    },
};
export const Shapes = {
    render: () => {
        const [page1, setPage1] = useState(5);
        const [page2, setPage2] = useState(5);
        const [page3, setPage3] = useState(5);
        return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsx(Pagination, { currentPage: page1, totalPages: 10, onPageChange: setPage1, shape: "default" }), _jsx(Pagination, { currentPage: page2, totalPages: 10, onPageChange: setPage2, shape: "rounded" }), _jsx(Pagination, { currentPage: page3, totalPages: 10, onPageChange: setPage3, shape: "circle" })] }));
    },
};
export const Variants = {
    render: () => {
        const [page1, setPage1] = useState(3);
        const [page2, setPage2] = useState(3);
        const [page3, setPage3] = useState(3);
        const [page4, setPage4] = useState(3);
        const [page5, setPage5] = useState(3);
        const [page6, setPage6] = useState(3);
        return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsx(Pagination, { currentPage: page1, totalPages: 10, onPageChange: setPage1, variant: "primary" }), _jsx(Pagination, { currentPage: page2, totalPages: 10, onPageChange: setPage2, variant: "secondary" }), _jsx(Pagination, { currentPage: page3, totalPages: 10, onPageChange: setPage3, variant: "success" }), _jsx(Pagination, { currentPage: page4, totalPages: 10, onPageChange: setPage4, variant: "danger" }), _jsx(Pagination, { currentPage: page5, totalPages: 10, onPageChange: setPage5, variant: "warning" }), _jsx(Pagination, { currentPage: page6, totalPages: 10, onPageChange: setPage6, variant: "info" })] }));
    },
};
export const ManyPages = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(50);
        return (_jsx(Pagination, { currentPage: currentPage, totalPages: 100, onPageChange: setCurrentPage, showFirstLast: true, visiblePages: 7 }));
    },
};
export const FewPages = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        return (_jsx(Pagination, { currentPage: currentPage, totalPages: 3, onPageChange: setCurrentPage }));
    },
};
export const NoEllipsis = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(5);
        return (_jsx(Pagination, { currentPage: currentPage, totalPages: 10, onPageChange: setCurrentPage, showEllipsis: false, visiblePages: 10 }));
    },
};
export const CustomLabels = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(5);
        return (_jsx(Pagination, { currentPage: currentPage, totalPages: 10, onPageChange: setCurrentPage, showFirstLast: true, prevLabel: "Prev", nextLabel: "Next", firstLabel: "<<", lastLabel: ">>" }));
    },
};
export const Disabled = {
    render: () => {
        return (_jsx(Pagination, { currentPage: 5, totalPages: 10, onPageChange: () => { }, disabled: true }));
    },
};
export const CompleteExample = {
    render: () => {
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 10;
        const totalItems = 248;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return (_jsxs("div", { style: { width: '600px' }, children: [_jsxs("div", { style: {
                        padding: '20px',
                        background: '#f5f5f5',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }, children: [_jsx("h3", { style: { margin: '0 0 10px 0' }, children: "Product List" }), _jsxs("p", { style: { margin: '0 0 10px 0', color: '#666' }, children: ["Showing ", (currentPage - 1) * itemsPerPage + 1, " to ", Math.min(currentPage * itemsPerPage, totalItems), " of ", totalItems, " products"] }), _jsx("div", { style: { display: 'grid', gap: '10px' }, children: [...Array(itemsPerPage)].map((_, i) => (_jsxs("div", { style: {
                                    padding: '10px',
                                    background: 'white',
                                    borderRadius: '4px',
                                    border: '1px solid #e0e0e0'
                                }, children: ["Product ", (currentPage - 1) * itemsPerPage + i + 1] }, i))) })] }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: setCurrentPage, showFirstLast: true, showPageInfo: true, showJumpTo: true })] }));
    },
};
//# sourceMappingURL=Pagination.stories.js.map