/**
 * BRICKS Design System - Code Highlighter Component
 * 간단한 코드 하이라이팅 및 복사 기능
 */

(function(global) {
    "use strict";

    global.BRICKS = global.BRICKS || {};

    /**
     * Code Highlighter Component
     * HTML 엔티티 처리 및 복사 기능
     */
    global.BRICKS.CodeHighlighter = {
        // 초기화
        init: function(options = {}) {
            // 모든 코드 블록 처리
            this.processAllCodeBlocks();

            // 동적으로 추가되는 코드 블록 감지
            this.setupObserver();
        },

        // 모든 코드 블록 처리
        processAllCodeBlocks: function() {
            const codeBlocks = document.querySelectorAll('pre code[class*="language-"]');
            codeBlocks.forEach(block => this.processCodeBlock(block));
        },

        // 개별 코드 블록 처리
        processCodeBlock: function(element) {
            if (element.dataset.processed) return;

            // 처리됨 표시
            element.dataset.processed = 'true';

            // HTML 엔티티 디코딩 및 재인코딩
            this.fixHTMLEntities(element);

            // 복사 버튼 추가
            this.addCopyButton(element);

            // 기본 스타일 적용
            this.applyBasicStyling(element);
        },

        // HTML 엔티티 문제 해결
        fixHTMLEntities: function(element) {
            // 현재 내용 가져오기
            let content = element.innerHTML;

            // 이미 엔티티로 변환된 경우 그대로 유지
            if (content.includes('&lt;') || content.includes('&gt;')) {
                // 텍스트로 디코딩
                const temp = document.createElement('div');
                temp.innerHTML = content;
                const decodedText = temp.textContent || temp.innerText || '';

                // 원본 텍스트 저장 (복사용)
                element.dataset.originalCode = decodedText;

                // HTML로 다시 표시 (< > 를 엔티티로 변환)
                element.textContent = decodedText;
            } else {
                // 원본 텍스트 저장
                element.dataset.originalCode = element.textContent;
            }
        },

        // 기본 스타일링 적용
        applyBasicStyling: function(element) {
            const language = this.getLanguage(element);

            // 언어별 간단한 하이라이팅
            if (language === 'html' || language === 'xml') {
                this.highlightHTML(element);
            } else if (language === 'css') {
                this.highlightCSS(element);
            } else if (language === 'javascript' || language === 'js') {
                this.highlightJavaScript(element);
            }
        },

        // HTML 하이라이팅
        highlightHTML: function(element) {
            let code = element.innerHTML;

            // 태그 하이라이팅
            code = code.replace(/(&lt;\/?)([a-zA-Z0-9]+)(.*?)(&gt;)/g,
                '$1<span class="tag">$2</span>$3$4');

            // 속성명 하이라이팅
            code = code.replace(/(\s)([a-zA-Z-]+)(=)/g,
                '$1<span class="attr">$2</span>$3');

            // 속성값 하이라이팅
            code = code.replace(/(=)(&quot;|")([^"]*?)(&quot;|")/g,
                '$1$2<span class="string">$3</span>$4');

            element.innerHTML = code;
        },

        // CSS 하이라이팅
        highlightCSS: function(element) {
            let code = element.innerHTML;

            // 선택자 하이라이팅
            code = code.replace(/([.#]?[a-zA-Z0-9_-]+)(\s*{)/g,
                '<span class="selector">$1</span>$2');

            // 속성명 하이라이팅
            code = code.replace(/([a-zA-Z-]+)(:)/g,
                '<span class="property">$1</span>$2');

            // 값 하이라이팅
            code = code.replace(/:\s*([^;}\n]+)/g, function(match, value) {
                return ': <span class="value">' + value + '</span>';
            });

            element.innerHTML = code;
        },

        // JavaScript 하이라이팅
        highlightJavaScript: function(element) {
            let code = element.innerHTML;

            // 키워드 하이라이팅
            const keywords = ['const', 'let', 'var', 'function', 'class', 'if', 'else', 'for', 'while', 'return', 'new', 'this', 'async', 'await'];
            keywords.forEach(keyword => {
                const regex = new RegExp('\\b(' + keyword + ')\\b', 'g');
                code = code.replace(regex, '<span class="keyword">$1</span>');
            });

            // 문자열 하이라이팅 (간단한 버전)
            code = code.replace(/(['"`])([^'"`]*)(['"`])/g,
                '<span class="string">$1$2$3</span>');

            // 숫자 하이라이팅
            code = code.replace(/\b(\d+)\b/g,
                '<span class="number">$1</span>');

            element.innerHTML = code;
        },

        // 언어 감지
        getLanguage: function(element) {
            const className = element.className;
            const match = className.match(/language-(\w+)/);
            return match ? match[1] : 'text';
        },

        // 복사 버튼 추가
        addCopyButton: function(element) {
            const pre = element.closest('pre');
            if (!pre || pre.querySelector('.code-copy-button')) return;

            const button = document.createElement('button');
            button.className = 'code-copy-button';
            button.innerHTML = '📋 복사';
            button.onclick = () => {
                // 원본 코드 가져오기
                const code = element.dataset.originalCode || element.textContent;

                navigator.clipboard.writeText(code).then(() => {
                    button.innerHTML = '✅ 복사됨!';
                    setTimeout(() => {
                        button.innerHTML = '📋 복사';
                    }, 2000);
                }).catch(err => {
                    console.error('복사 실패:', err);
                    button.innerHTML = '❌ 실패';
                    setTimeout(() => {
                        button.innerHTML = '📋 복사';
                    }, 2000);
                });
            };

            pre.style.position = 'relative';
            pre.appendChild(button);
        },

        // MutationObserver 설정
        setupObserver: function() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            const codeBlocks = node.querySelectorAll ?
                                node.querySelectorAll('pre code[class*="language-"]') : [];
                            codeBlocks.forEach(block => this.processCodeBlock(block));

                            // 노드 자체가 코드 블록인 경우
                            if (node.matches && node.matches('pre code[class*="language-"]')) {
                                this.processCodeBlock(node);
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

        // 모든 코드 블록 다시 하이라이팅
        highlightAll: function() {
            // 기존 processed 마크 제거
            document.querySelectorAll('[data-processed]').forEach(el => {
                delete el.dataset.processed;
            });

            // 다시 처리
            this.processAllCodeBlocks();
        }
    };

})(window);

// 스타일 추가
const style = document.createElement('style');
style.textContent = `
    /* 코드 블록 기본 스타일 */
    pre code[class*="language-"] {
        display: block;
        padding: 1rem;
        overflow-x: auto;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.5;
    }

    /* 복사 버튼 스타일 */
    .code-copy-button {
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px 12px;
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        color: #666;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s;
        opacity: 0;
    }

    pre:hover .code-copy-button {
        opacity: 1;
    }

    .code-copy-button:hover {
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(0, 0, 0, 0.3);
    }

    /* 다크 모드 복사 버튼 */
    [data-theme="dark"] .code-copy-button {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #d4d4d4;
    }

    [data-theme="dark"] .code-copy-button:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
    }

    /* 간단한 구문 하이라이팅 스타일 */
    code .keyword {
        color: #0070f3;
        font-weight: bold;
    }

    code .string {
        color: #22863a;
    }

    code .number {
        color: #e36209;
    }

    code .tag {
        color: #22863a;
        font-weight: bold;
    }

    code .attr {
        color: #6f42c1;
    }

    code .selector {
        color: #6f42c1;
        font-weight: bold;
    }

    code .property {
        color: #005cc5;
    }

    code .value {
        color: #22863a;
    }

    /* 다크 모드 하이라이팅 색상 */
    [data-theme="dark"] code .keyword {
        color: #7dd3fc;
    }

    [data-theme="dark"] code .string {
        color: #86efac;
    }

    [data-theme="dark"] code .number {
        color: #fbbf24;
    }

    [data-theme="dark"] code .tag {
        color: #86efac;
    }

    [data-theme="dark"] code .attr {
        color: #c084fc;
    }

    [data-theme="dark"] code .selector {
        color: #c084fc;
    }

    [data-theme="dark"] code .property {
        color: #7dd3fc;
    }

    [data-theme="dark"] code .value {
        color: #86efac;
    }

    /* 코드 블록 스크롤바 스타일 */
    pre::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    pre::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }

    pre::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }

    pre::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
    }

    [data-theme="dark"] pre::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
    }

    [data-theme="dark"] pre::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
    }

    [data-theme="dark"] pre::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
    }
`;
document.head.appendChild(style);