/**
 * BRICKS Design System - Core JavaScript
 * 공통 컴포넌트 동작을 위한 핵심 스크립트
 *
 * 이 파일은 모든 컴포넌트 모듈을 로드하고 초기화합니다.
 */

(function() {
    "use strict";

    // BRICKS 네임스페이스
    window.BRICKS = window.BRICKS || {};

    // 컴포넌트 파일 목록
    const components = [
        'dropdown',
        'modal',
        'toggle',
        'alert',
        'tabs',
        'accordion',
        'pagination',
        'breadcrumb',
        'navbar',
        'table'
    ];

    // 컴포넌트 파일 동적 로드
    function loadComponent(name) {
        const script = document.createElement('script');
        script.src = `/bricks/js/components/${name}.js`;
        script.async = false;
        document.head.appendChild(script);
        return script;
    }

    // 모든 컴포넌트 로드
    let loadedCount = 0;
    const totalComponents = components.length;

    components.forEach(componentName => {
        const script = loadComponent(componentName);
        script.onload = () => {
            loadedCount++;
            console.log(`[BRICKS] Loaded component: ${componentName}`);

            // 모든 컴포넌트가 로드되면 초기화
            if (loadedCount === totalComponents) {
                initializeBRICKS();
            }
        };
        script.onerror = () => {
            console.error(`[BRICKS] Failed to load component: ${componentName}`);
            loadedCount++;

            // 에러가 있어도 나머지 초기화는 진행
            if (loadedCount === totalComponents) {
                initializeBRICKS();
            }
        };
    });

    // BRICKS 초기화 함수
    function initializeBRICKS() {
        console.log('[BRICKS] Initializing all components...');

        // 통합 초기화 함수
        BRICKS.init = function() {
            // 각 컴포넌트의 init 메서드 호출
            if (BRICKS.Dropdown && BRICKS.Dropdown.init) {
                BRICKS.Dropdown.init();
            }
            if (BRICKS.Modal && BRICKS.Modal.init) {
                BRICKS.Modal.init();
            }
            if (BRICKS.Toggle && BRICKS.Toggle.init) {
                BRICKS.Toggle.init();
            }
            if (BRICKS.Alert && BRICKS.Alert.init) {
                BRICKS.Alert.init();
            }
            if (BRICKS.Tabs && BRICKS.Tabs.init) {
                BRICKS.Tabs.init();
            }
            if (BRICKS.Accordion && BRICKS.Accordion.init) {
                BRICKS.Accordion.init();
            }
            if (BRICKS.Pagination && BRICKS.Pagination.init) {
                BRICKS.Pagination.init();
            }
            if (BRICKS.Breadcrumb && BRICKS.Breadcrumb.init) {
                BRICKS.Breadcrumb.init();
            }
            if (BRICKS.Navbar && BRICKS.Navbar.init) {
                BRICKS.Navbar.init();
            }
            if (BRICKS.Table && BRICKS.Table.init) {
                BRICKS.Table.init();
            }
        };

        // DOM 로드 시 초기화
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", BRICKS.init);
        } else {
            BRICKS.init();
        }

        // MutationObserver로 동적 콘텐츠 감지
        const observer = new MutationObserver(function(mutations) {
            // 새로운 요소가 추가되었을 때만 재초기화
            let shouldReinit = false;
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.querySelector) {
                            // BRICKS 컴포넌트 클래스를 가진 요소가 추가되었는지 확인
                            const selectors = [
                                '.dropdown', '.modal', '.toggle', '.alert',
                                '[data-tabs]', '[data-accordion]', '[data-pagination]',
                                '[data-breadcrumb]', '[data-navbar]', '[data-table]'
                            ];

                            if (selectors.some(selector => node.matches(selector) || node.querySelector(selector))) {
                                shouldReinit = true;
                            }
                        }
                    });
                }
            });

            if (shouldReinit) {
                BRICKS.init();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('[BRICKS] Initialization complete');
    }

    // 대체 로드 방식 (script 태그가 실패할 경우)
    // HTML에서 직접 컴포넌트 파일들을 로드하는 경우를 위한 대비
    window.addEventListener('load', function() {
        // 이미 로드되었는지 확인
        if (window.BRICKS && !window.BRICKS.init) {
            initializeBRICKS();
        }
    });

})();