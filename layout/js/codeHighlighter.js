/**
 * BRICKS Design System - Code Highlighter Component
 * 코드 하이라이팅을 위한 Prism.js 통합 컴포넌트
 */

(function(global) {
    "use strict";

    global.BRICKS = global.BRICKS || {};

    /**
     * Code Highlighter Component
     * Prism.js를 사용한 코드 구문 강조 기능
     */
    global.BRICKS.CodeHighlighter = {
        // 지원되는 언어 목록
        supportedLanguages: ['html', 'css', 'javascript', 'json', 'bash', 'typescript', 'jsx', 'tsx', 'scss', 'yaml'],

        // 테마 옵션
        themes: {
            'vscode-dark': 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-vsc-dark-plus.min.css',
            'tomorrow': 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css',
            'okaidia': 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.min.css',
            'solarized': 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.min.css'
        },

        // 현재 로드된 컴포넌트 추적
        loadedComponents: new Set(),

        init: function(options = {}) {
            const theme = options.theme || 'vscode-dark';
            const autoLoad = options.autoLoad !== false;

            // Prism.js 로드 확인
            if (typeof Prism === 'undefined') {
                console.warn('Prism.js is not loaded. Loading from CDN...');
                this.loadPrismCore(theme, () => {
                    if (autoLoad) {
                        this.highlightAll();
                    }
                });
            } else {
                // 테마 로드
                this.loadTheme(theme);

                if (autoLoad) {
                    this.highlightAll();
                }
            }

            // 자동 언어 감지 및 컴포넌트 로드
            this.setupAutoLoader();
        },

        // Prism.js 코어 로드
        loadPrismCore: function(theme, callback) {
            // 테마 CSS 로드
            this.loadTheme(theme);

            // Prism.js 코어 스크립트 로드
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js';
            script.onload = () => {
                // 기본 언어 컴포넌트 로드
                this.loadLanguage('markup', () => {
                    this.loadLanguage('css', () => {
                        this.loadLanguage('javascript', callback);
                    });
                });
            };
            document.head.appendChild(script);
        },

        // 테마 로드
        loadTheme: function(themeName) {
            // 기존 테마 제거
            const existingTheme = document.querySelector('link[data-prism-theme]');
            if (existingTheme) {
                existingTheme.remove();
            }

            // 새 테마 추가
            const themeUrl = this.themes[themeName] || this.themes['vscode-dark'];
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = themeUrl;
            link.setAttribute('data-prism-theme', themeName);
            document.head.appendChild(link);
        },

        // 언어 컴포넌트 동적 로드
        loadLanguage: function(language, callback) {
            if (this.loadedComponents.has(language)) {
                if (callback) callback();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-${language}.min.js`;
            script.onload = () => {
                this.loadedComponents.add(language);
                if (callback) callback();
            };
            script.onerror = () => {
                console.warn(`Failed to load Prism language: ${language}`);
                if (callback) callback();
            };
            document.head.appendChild(script);
        },

        // 자동 언어 감지 및 로더 설정
        setupAutoLoader: function() {
            // MutationObserver로 동적으로 추가되는 코드 블록 감지
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            const codeBlocks = node.querySelectorAll('pre code[class*="language-"]');
                            if (codeBlocks.length > 0) {
                                this.highlightElements(codeBlocks);
                            }
                        }
                    });
                });
            });

            // body 관찰 시작
            if (document.body) {
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        },

        // 모든 코드 블록 하이라이팅
        highlightAll: function() {
            const codeBlocks = document.querySelectorAll('pre code[class*="language-"]');
            this.highlightElements(codeBlocks);
        },

        // 특정 요소들 하이라이팅
        highlightElements: function(elements) {
            elements.forEach(element => {
                // 언어 추출
                const className = element.className;
                const match = className.match(/language-(\w+)/);
                if (match) {
                    const language = match[1];

                    // 언어 컴포넌트 로드 후 하이라이팅
                    this.loadLanguage(language, () => {
                        if (typeof Prism !== 'undefined') {
                            Prism.highlightElement(element);
                        }
                    });
                }
            });
        },

        // 단일 코드 블록 하이라이팅
        highlight: function(element, language) {
            if (!element) return;

            // 언어 클래스 추가
            element.className = `language-${language}`;

            // 언어 컴포넌트 로드 후 하이라이팅
            this.loadLanguage(language, () => {
                if (typeof Prism !== 'undefined') {
                    Prism.highlightElement(element);
                }
            });
        },

        // 라인 번호 추가
        addLineNumbers: function(element) {
            if (!element) return;

            const pre = element.closest('pre');
            if (pre) {
                pre.classList.add('line-numbers');

                // Line numbers 플러그인 로드
                if (!this.loadedComponents.has('line-numbers')) {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.js';
                    script.onload = () => {
                        this.loadedComponents.add('line-numbers');

                        // Line numbers CSS 로드
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.css';
                        document.head.appendChild(link);

                        // 다시 하이라이팅
                        if (typeof Prism !== 'undefined') {
                            Prism.highlightElement(element);
                        }
                    };
                    document.head.appendChild(script);
                }
            }
        },

        // 복사 버튼 추가
        addCopyButton: function(element) {
            if (!element) return;

            const pre = element.closest('pre');
            if (pre && !pre.querySelector('.code-copy-button')) {
                const button = document.createElement('button');
                button.className = 'code-copy-button';
                button.innerHTML = '📋 복사';
                button.onclick = () => {
                    const code = element.textContent;
                    navigator.clipboard.writeText(code).then(() => {
                        button.innerHTML = '✅ 복사됨!';
                        setTimeout(() => {
                            button.innerHTML = '📋 복사';
                        }, 2000);
                    });
                };

                pre.style.position = 'relative';
                pre.appendChild(button);
            }
        },

        // 테마 변경
        changeTheme: function(themeName) {
            if (this.themes[themeName]) {
                this.loadTheme(themeName);
                this.highlightAll();
            }
        }
    };

})(window);

// 스타일 추가
const style = document.createElement('style');
style.textContent = `
    /* 복사 버튼 스타일 */
    .code-copy-button {
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        color: #d4d4d4;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s;
        backdrop-filter: blur(10px);
    }

    .code-copy-button:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
    }

    /* 코드 블록 스크롤바 스타일 */
    .code-block::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    .code-block::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }

    .code-block::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }

    .code-block::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
    }
`;
document.head.appendChild(style);