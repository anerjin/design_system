import React from 'react';
export interface ModalProps {
    /**
     * 모달 표시 여부
     */
    open?: boolean;
    /**
     * 모달 크기
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
    /**
     * 모달 제목
     */
    title?: React.ReactNode;
    /**
     * 모달 닫기 버튼 표시 여부
     * @default true
     */
    closable?: boolean;
    /**
     * 중앙 정렬
     * @default false
     */
    centered?: boolean;
    /**
     * 스크롤 가능
     * @default false
     */
    scrollable?: boolean;
    /**
     * 정적 백드롭 (외부 클릭으로 닫히지 않음)
     * @default false
     */
    staticBackdrop?: boolean;
    /**
     * ESC 키로 닫기 비활성화
     * @default false
     */
    disableEscapeKeyDown?: boolean;
    /**
     * 모달 닫기 이벤트
     */
    onClose?: () => void;
    /**
     * 모달 열기 이벤트
     */
    onOpen?: () => void;
    /**
     * 백드롭 클릭 이벤트
     */
    onBackdropClick?: () => void;
    /**
     * 모달 헤더 커스텀 렌더링
     */
    header?: React.ReactNode;
    /**
     * 모달 푸터 커스텀 렌더링
     */
    footer?: React.ReactNode;
    /**
     * 모달 내용
     */
    children: React.ReactNode;
    /**
     * 추가 CSS 클래스
     */
    className?: string;
    /**
     * 모달 다이얼로그 추가 CSS 클래스
     */
    dialogClassName?: string;
}
/**
 * BRICKS 디자인 시스템 Modal 컴포넌트
 *
 * @example
 * ```tsx
 * <ModalWithButton
 *   footer={<div style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}><Button size="sm" variant="secondary">Cancel</Button><Button size="sm" variant="primary">Confirm</Button></div>}
 *   title="Default Modal"
 * >
 *   <div>
 *     <p>
 *       This is the modal content. You can add any content here.
 *     </p>
 *   </div>
 * </ModalWithButton>
 * ```
 */
export declare const Modal: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Modal.Header 컴포넌트
 */
export declare const ModalHeader: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
/**
 * Modal.Title 컴포넌트
 */
export declare const ModalTitle: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
/**
 * Modal.Body 컴포넌트
 */
export declare const ModalBody: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
/**
 * Modal.Footer 컴포넌트
 */
export declare const ModalFooter: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
type ModalComponent = typeof Modal & {
    Header: typeof ModalHeader;
    Title: typeof ModalTitle;
    Body: typeof ModalBody;
    Footer: typeof ModalFooter;
};
declare const _default: ModalComponent;
export default _default;
//# sourceMappingURL=Modal.d.ts.map