/**
 * BRICKS Design System - Component Loader
 * 컴포넌트 파일을 순차적으로 로드하는 로더 스크립트
 *
 * HTML에서 사용법:
 * <script src="/core/scripts/bricks_loader.js"></script>
 */

(function() {
    'use strict';

    // 기본 경로 설정
    const BASE_PATH = (function() {
        const scripts = document.getElementsByTagName('script');
        const currentScript = scripts[scripts.length - 1];
        const src = currentScript.src;
        return src.substring(0, src.lastIndexOf('/'));
    })();

    // 컴포넌트 파일 목록 (로드 순서대로)
    const components = [
        'components/dropdown.js',
        'components/modal.js',
        'components/toggle.js',
        'components/alert.js',
        'components/tabs.js',
        'components/accordion.js',
        'components/datepicker.js',
        'components/tooltip.js',
        'components/pagination.js',
        'components/breadcrumb.js',
        'components/navbar.js',
        'components/table.js',
        'components/checkbox.js',
        'components/chart.js'
    ];

    // 스크립트를 순차적으로 로드
    function loadScripts(scripts, callback) {
        let index = 0;

        function loadNext() {
            if (index >= scripts.length) {
                if (callback) callback();
                return;
            }

            const script = document.createElement('script');
            script.src = `${BASE_PATH}/${scripts[index]}`;
            script.onload = function() {
                console.log(`[BRICKS] Loaded: ${scripts[index]}`);
                index++;
                loadNext();
            };
            script.onerror = function() {
                console.error(`[BRICKS] Failed to load: ${scripts[index]}`);
                index++;
                loadNext(); // 에러가 발생해도 다음 스크립트 로드
            };

            document.head.appendChild(script);
        }

        loadNext();
    }

    // 초기화 함수
    function initializeBRICKS() {
        if (!window.BRICKS) {
            console.error('[BRICKS] Namespace not found');
            return;
        }

        // 통합 초기화 함수 정의
        window.BRICKS.init = function() {
            const componentNames = [
                'Dropdown', 'Modal', 'Toggle', 'Alert', 'Tabs',
                'Accordion', 'Datepicker', 'Tooltip', 'Pagination', 'Breadcrumb', 'Navbar', 'Table', 'Radio', 'Checkbox', 'Chart'
            ];

            componentNames.forEach(name => {
                if (BRICKS[name] && typeof BRICKS[name].init === 'function') {
                    BRICKS[name].init();
                    console.log(`[BRICKS] Initialized: ${name}`);
                }
            });
        };

        // DOM 준비 상태 확인 후 초기화
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', BRICKS.init);
        } else {
            BRICKS.init();
        }

        // 동적 콘텐츠를 위한 MutationObserver 설정
        setupMutationObserver();

        console.log('[BRICKS] All components loaded and initialized');
    }

    // MutationObserver 설정
    function setupMutationObserver() {
        const observer = new MutationObserver(function(mutations) {
            let shouldReinit = false;

            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        // BRICKS 컴포넌트 체크
                        const componentSelectors = [
                            '.dropdown', '.modal', '.toggle', '.alert',
                            '[data-tabs]', '[data-accordion]', '[data-datepicker]', '[data-tooltip]', '[data-pagination]',
                            '[data-breadcrumb]', '[data-navbar]', '[data-table]'
                        ];

                        const hasComponent = componentSelectors.some(selector => {
                            return node.matches && (node.matches(selector) ||
                                   node.querySelector && node.querySelector(selector));
                        });

                        if (hasComponent) {
                            shouldReinit = true;
                        }
                    }
                });
            });

            if (shouldReinit) {
                // 약간의 디바운싱
                clearTimeout(window.BRICKS._reinitTimer);
                window.BRICKS._reinitTimer = setTimeout(() => {
                    BRICKS.init();
                }, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 컴포넌트 로드 시작
    console.log('[BRICKS] Loading components...');
    loadScripts(components, initializeBRICKS);

})();
