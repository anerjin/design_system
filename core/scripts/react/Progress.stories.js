import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Progress, CircularProgress, MultiStepProgress } from './Progress';
import { Button } from './Button';
import { Icon } from './Icon';
const meta = {
    title: 'Components/Progress',
    component: Progress,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'range', min: 0, max: 100, step: 1 },
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'],
        },
    },
};
export default meta;
export const Default = {
    args: {
        value: 60,
    },
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Extra Small (xs)" }), _jsx(Progress, { value: 30, size: "xs", variant: "dark" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Small (sm)" }), _jsx(Progress, { value: 45, size: "sm", variant: "dark" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Medium (md) - Default" }), _jsx(Progress, { value: 60, size: "md", variant: "dark" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Large (lg)" }), _jsx(Progress, { value: 75, size: "lg", variant: "dark" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Extra Large (xl)" }), _jsx(Progress, { value: 90, size: "xl", variant: "dark" })] })] })),
};
export const Variants = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Primary" }), _jsx(Progress, { value: 60, variant: "primary" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Secondary" }), _jsx(Progress, { value: 60, variant: "secondary" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Success" }), _jsx(Progress, { value: 75, variant: "success" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Warning" }), _jsx(Progress, { value: 50, variant: "warning" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Danger" }), _jsx(Progress, { value: 90, variant: "danger" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Info" }), _jsx(Progress, { value: 40, variant: "info" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Dark" }), _jsx(Progress, { value: 65, variant: "dark" })] })] })),
};
export const WithLabels = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '30px' }, children: [_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }, children: [_jsx("span", { children: "File Upload" }), _jsx("span", { children: "60%" })] }), _jsx(Progress, { value: 60, variant: "dark" })] }), _jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }, children: [_jsx("span", { children: "Download Progress" }), _jsx("span", { children: "2.4MB / 10MB" })] }), _jsx(Progress, { value: 24, variant: "success" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px' }, children: "With internal label:" }), _jsx(Progress, { value: 45, size: "lg", variant: "info", showLabel: true })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px' }, children: "Custom label format:" }), _jsx(Progress, { value: 75, size: "lg", variant: "warning", showLabel: true, formatLabel: (value, max) => `${value} of ${max}` })] })] })),
};
export const Striped = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Striped" }), _jsx(Progress, { value: 40, striped: true, variant: "dark" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px' }, children: "Striped & Animated" }), _jsx(Progress, { value: 60, striped: true, animated: true, variant: "dark" })] })] })),
};
export const Indeterminate = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px' }, children: "Loading... (Indeterminate)" }), _jsx(Progress, { indeterminate: true, variant: "dark" })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px' }, children: "Processing... (Indeterminate with animation)" }), _jsx(Progress, { indeterminate: true, animated: true, variant: "primary" })] })] })),
};
export const Interactive = {
    render: () => {
        const [progress, setProgress] = useState(0);
        const [isRunning, setIsRunning] = useState(false);
        useEffect(() => {
            let timer;
            if (isRunning && progress < 100) {
                timer = setTimeout(() => {
                    setProgress((prev) => Math.min(prev + 1, 100));
                }, 50);
            }
            else if (progress >= 100) {
                setIsRunning(false);
            }
            return () => {
                if (timer)
                    clearTimeout(timer);
            };
        }, [progress, isRunning]);
        return (_jsxs("div", { style: { width: '100%' }, children: [_jsx(Progress, { value: progress, variant: progress === 100 ? 'success' : 'primary', size: "lg", showLabel: true, striped: isRunning, animated: isRunning }), _jsxs("div", { style: { marginTop: '20px', display: 'flex', gap: '10px' }, children: [_jsxs(Button, { onClick: () => {
                                setProgress(0);
                                setIsRunning(true);
                            }, disabled: isRunning, children: [_jsx(Icon, { name: "play" }), " Start"] }), _jsxs(Button, { onClick: () => setIsRunning(false), disabled: !isRunning, variant: "secondary", children: [_jsx(Icon, { name: "pause" }), " Pause"] }), _jsxs(Button, { onClick: () => setProgress(0), variant: "ghost", children: [_jsx(Icon, { name: "reset" }), " Reset"] })] })] }));
    },
};
export const Circular = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '40px' }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(CircularProgress, { value: 25, size: "sm" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Small" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(CircularProgress, { value: 50, size: "md" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Medium" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(CircularProgress, { value: 75, size: "lg" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Large" })] })] })),
};
export const CircularVariants = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(CircularProgress, { value: 85, variant: "success" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Success" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(CircularProgress, { value: 60, variant: "warning" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Warning" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(CircularProgress, { value: 90, variant: "danger" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Danger" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(CircularProgress, { value: 45, variant: "info" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Info" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(CircularProgress, { value: 70, variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Dark" })] })] })),
};
export const CircularWithCustomLabel = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '30px' }, children: [_jsx(CircularProgress, { value: 75, variant: "success", label: _jsx(Icon, { name: "check", size: 20 }) }), _jsx(CircularProgress, { value: 50, variant: "warning", formatLabel: (value) => `${value / 100 * 10}/10` }), _jsx(CircularProgress, { value: 0, variant: "info", showLabel: false })] })),
};
export const CircularIndeterminate = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '30px' }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(CircularProgress, { indeterminate: true, size: "sm" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Loading..." })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(CircularProgress, { indeterminate: true, size: "md", variant: "primary" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Processing..." })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(CircularProgress, { indeterminate: true, size: "lg", variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Uploading..." })] })] })),
};
export const MultiStep = {
    render: () => {
        const [currentStep, setCurrentStep] = useState(1);
        const steps = ['Basics', 'Details', 'Review', 'Complete'];
        return (_jsxs("div", { style: { width: '100%' }, children: [_jsx(MultiStepProgress, { currentStep: currentStep, steps: steps, variant: "dark" }), _jsxs("div", { style: { marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }, children: [_jsxs(Button, { onClick: () => setCurrentStep(Math.max(0, currentStep - 1)), disabled: currentStep === 0, variant: "secondary", children: [_jsx(Icon, { name: "chevron-left" }), " Previous"] }), _jsxs(Button, { onClick: () => setCurrentStep(Math.min(steps.length - 1, currentStep + 1)), disabled: currentStep === steps.length - 1, children: ["Next ", _jsx(Icon, { name: "chevron-right" })] })] })] }));
    },
};
export const MultiStepWithNumbers = {
    render: () => (_jsx(MultiStepProgress, { currentStep: 2, steps: ['Account Setup', 'Personal Info', 'Preferences', 'Confirmation'], variant: "primary", showStepNumbers: true })),
};
export const FileUpload = {
    render: () => {
        const [uploadProgress, setUploadProgress] = useState(0);
        const [uploading, setUploading] = useState(false);
        const fileSize = 10.5; // MB
        const uploadedSize = (uploadProgress / 100) * fileSize;
        const startUpload = () => {
            setUploading(true);
            setUploadProgress(0);
        };
        useEffect(() => {
            let interval;
            if (uploading) {
                interval = setInterval(() => {
                    setUploadProgress((prev) => {
                        if (prev >= 100) {
                            setUploading(false);
                            return 100;
                        }
                        return prev + 2;
                    });
                }, 100);
            }
            return () => {
                if (interval)
                    clearInterval(interval);
            };
        }, [uploading]);
        return (_jsxs("div", { style: {
                padding: '20px',
                border: '2px dashed #e0e0e0',
                borderRadius: '8px',
                textAlign: 'center'
            }, children: [_jsx(Icon, { name: "cloud-upload", size: 48, color: "#666" }), _jsx("h3", { style: { margin: '10px 0' }, children: "Upload File" }), _jsxs("p", { style: { color: '#666', marginBottom: '20px' }, children: ["document.pdf (", fileSize, " MB)"] }), uploading || uploadProgress > 0 ? (_jsxs("div", { style: { textAlign: 'left' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }, children: [_jsx("span", { children: uploading ? 'Uploading...' : 'Upload Complete' }), _jsxs("span", { children: [uploadedSize.toFixed(1), " / ", fileSize, " MB"] })] }), _jsx(Progress, { value: uploadProgress, variant: uploadProgress === 100 ? 'success' : 'primary', striped: uploading, animated: uploading })] })) : (_jsxs(Button, { onClick: startUpload, children: [_jsx(Icon, { name: "upload" }), " Start Upload"] }))] }));
    },
};
export const Dashboard = {
    render: () => (_jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }, children: [_jsxs("div", { style: { padding: '20px', background: '#f5f5f5', borderRadius: '8px' }, children: [_jsx("h4", { style: { margin: '0 0 10px 0' }, children: "Storage Used" }), _jsx(CircularProgress, { value: 72, variant: "warning" }), _jsx("p", { style: { marginTop: '10px', fontSize: '14px', color: '#666' }, children: "7.2 GB of 10 GB" })] }), _jsxs("div", { style: { padding: '20px', background: '#f5f5f5', borderRadius: '8px' }, children: [_jsx("h4", { style: { margin: '0 0 10px 0' }, children: "Tasks Complete" }), _jsx(CircularProgress, { value: 85, variant: "success" }), _jsx("p", { style: { marginTop: '10px', fontSize: '14px', color: '#666' }, children: "17 of 20 tasks" })] }), _jsxs("div", { style: { padding: '20px', background: '#f5f5f5', borderRadius: '8px' }, children: [_jsx("h4", { style: { margin: '0 0 10px 0' }, children: "Project Progress" }), _jsxs("div", { style: { marginBottom: '15px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }, children: [_jsx("span", { style: { fontSize: '12px' }, children: "Design" }), _jsx("span", { style: { fontSize: '12px' }, children: "100%" })] }), _jsx(Progress, { value: 100, size: "xs", variant: "success" })] }), _jsxs("div", { style: { marginBottom: '15px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }, children: [_jsx("span", { style: { fontSize: '12px' }, children: "Development" }), _jsx("span", { style: { fontSize: '12px' }, children: "60%" })] }), _jsx(Progress, { value: 60, size: "xs", variant: "primary" })] }), _jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }, children: [_jsx("span", { style: { fontSize: '12px' }, children: "Testing" }), _jsx("span", { style: { fontSize: '12px' }, children: "25%" })] }), _jsx(Progress, { value: 25, size: "xs", variant: "warning" })] })] })] })),
};
//# sourceMappingURL=Progress.stories.js.map