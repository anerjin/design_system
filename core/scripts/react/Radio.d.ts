import React from 'react';
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * 라디오 버튼 크기
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * 라디오 버튼 변형 스타일
     */
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'dark';
    /**
     * 라디오 버튼 레이블
     */
    label?: React.ReactNode;
    /**
     * 라디오 버튼 변경 이벤트
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface RadioGroupProps {
    /**
     * 그룹 이름 (name 속성)
     */
    name: string;
    /**
     * 그룹 레이블
     */
    label?: React.ReactNode;
    /**
     * 인라인 배치
     * @default false
     */
    inline?: boolean;
    /**
     * 선택된 값
     */
    value?: string;
    /**
     * 값 변경 이벤트
     */
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * 자식 요소
     */
    children: React.ReactNode;
    /**
     * 추가 CSS 클래스
     */
    className?: string;
    /**
     * 필수 선택
     */
    required?: boolean;
    /**
     * 비활성화
     */
    disabled?: boolean;
}
/**
 * BRICKS 디자인 시스템 Radio 컴포넌트
 *
 * @example
 * ```tsx
 * <Radio
 *   name="gender"
 *   value="male"
 *   label="남성"
 *   checked={gender === 'male'}
 *   onChange={(e) => setGender(e.target.value)}
 * />
 * ```
 */
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
/**
 * BRICKS 디자인 시스템 RadioGroup 컴포넌트
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   name="theme"
 *   label="테마 선택"
 *   value={theme}
 *   onChange={(value) => setTheme(value)}
 * >
 *   <Radio value="light" label="라이트 모드" />
 *   <Radio value="dark" label="다크 모드" />
 *   <Radio value="auto" label="시스템 설정" />
 * </RadioGroup>
 * ```
 */
export declare const RadioGroup: React.FC<RadioGroupProps>;
export default Radio;
//# sourceMappingURL=Radio.d.ts.map