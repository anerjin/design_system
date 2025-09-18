# BRICKS Design System - 접근성 구현 노트

## Checkbox 및 Radio 컴포넌트의 라벨 구조

### 현재 구조 (올바름 ✅)

```html
<label class="checkbox">
    <input type="checkbox" class="checkbox__input" role="checkbox" aria-checked="false">
    <span class="checkbox__box">
        <span class="checkbox__checkmark"></span>
    </span>
    <span class="checkbox__label">텍스트</span>
</label>
```

### 이 구조의 장점

1. **암묵적 라벨 연결 (Implicit Label Association)**
   - `<label>` 요소 안에 `<input>`이 있으면 자동으로 연결됨
   - `for` 속성이나 `aria-labelledby`가 필요 없음
   - W3C와 WCAG가 권장하는 패턴 중 하나

2. **더 넓은 클릭 영역**
   - 라벨 전체 영역이 클릭 가능
   - 사용자 경험 향상 (특히 모바일)
   - 운동 장애가 있는 사용자에게 유용

3. **코드 간결성**
   - ID 생성/관리 불필요
   - HTML과 접근성이 자연스럽게 통합

### ARIA 속성 구현

#### Native HTML 요소와 ARIA

```html
<!-- Native checkbox는 ARIA 속성이 불필요 -->
<input type="checkbox" class="checkbox__input">

<!-- Indeterminate 상태에서만 aria-checked 필요 -->
<input type="checkbox"
       class="checkbox__input"
       aria-checked="mixed">
```

**중요 원칙:**
- Native HTML 요소는 이미 시맨틱 정보를 가지고 있음
- `role="checkbox"`는 `<input type="checkbox">`에 불필요 (중복)
- `aria-checked`는 native checked 속성이 있으므로 불필요
- `aria-disabled`는 native disabled 속성이 있으므로 불필요
- **예외**: Indeterminate 상태는 `aria-checked="mixed"` 필요

#### JavaScript의 역할

JavaScript는 다음을 담당합니다:
- 동적 상태 변경 (`aria-checked` 업데이트)
- 키보드 내비게이션 향상
- 복잡한 패턴 구현 (Select All, Indeterminate 등)

### 대안 구조 (명시적 라벨)

만약 디자인상 라벨과 체크박스를 분리해야 한다면:

```html
<div class="checkbox-wrapper">
    <input type="checkbox"
           id="checkbox-1"
           class="checkbox__input"
           role="checkbox"
           aria-checked="false">
    <label for="checkbox-1" class="checkbox__label">
        텍스트
    </label>
</div>
```

또는 ARIA를 사용:

```html
<div class="checkbox-wrapper">
    <input type="checkbox"
           class="checkbox__input"
           role="checkbox"
           aria-checked="false"
           aria-labelledby="label-1">
    <span id="label-1" class="checkbox__label">
        텍스트
    </span>
</div>
```

### 권장사항

1. **현재 구조 유지**: `<label>` 안에 `<input>`을 포함하는 구조는 완벽히 유효하고 권장됨

2. **HTML에 ARIA 기본값 포함**: Progressive Enhancement 원칙 적용

3. **JavaScript는 향상만 담당**: 기본 기능은 HTML/CSS로, JavaScript는 부가 기능만

4. **중복 ARIA 피하기**:
   - `<label>` 안에 `<input>`이 있으면 `aria-labelledby` 불필요
   - Native `<input type="checkbox">`에 `role="checkbox"` 불필요
   - Native checked/disabled 속성이 있으면 aria-checked/aria-disabled 불필요

## Radio 컴포넌트

Radio도 동일한 원칙 적용:

```html
<label class="radio">
    <input type="radio"
           class="radio__input"
           name="group">
    <span class="radio__circle">
        <span class="radio__dot"></span>
    </span>
    <span class="radio__label">옵션</span>
</label>
```

**참고**: Native `<input type="radio">`는 이미 role="radio"를 가지고 있으며, checked 상태도 자체적으로 전달합니다.

## 테스트 방법

1. **스크린 리더 테스트**
   - NVDA (Windows)
   - JAWS (Windows)
   - VoiceOver (macOS/iOS)
   - TalkBack (Android)

2. **키보드 내비게이션**
   - Tab 키로 이동
   - Space/Enter로 선택
   - 방향키로 그룹 내 이동 (Radio)

3. **자동화 테스트**
   - axe-core
   - Pa11y
   - Lighthouse

## 참고 자료

- [W3C - Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/)
- [MDN - Label Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
- [ARIA Authoring Practices - Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)
- [WebAIM - Creating Accessible Forms](https://webaim.org/techniques/forms/controls)