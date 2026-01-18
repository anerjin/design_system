import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { Progress, CircularProgress, MultiStepProgress } from './Progress';
import { Button } from './Button';
import { Icon } from './Icon';

const meta: Meta<typeof Progress> = {
  title: 'Data Display/Progress',
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Extra Small (xs)</p>
        <Progress value={30} size="xs" variant="dark" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Small (sm)</p>
        <Progress value={45} size="sm" variant="dark" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Medium (md) - Default</p>
        <Progress value={60} size="md" variant="dark" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Large (lg)</p>
        <Progress value={75} size="lg" variant="dark" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Extra Large (xl)</p>
        <Progress value={90} size="xl" variant="dark" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Primary</p>
        <Progress value={60} variant="primary" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Secondary</p>
        <Progress value={60} variant="secondary" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Success</p>
        <Progress value={75} variant="success" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Warning</p>
        <Progress value={50} variant="warning" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Danger</p>
        <Progress value={90} variant="danger" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Info</p>
        <Progress value={40} variant="info" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Dark</p>
        <Progress value={65} variant="dark" />
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>File Upload</span>
          <span>60%</span>
        </div>
        <Progress value={60} variant="dark" />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Download Progress</span>
          <span>2.4MB / 10MB</span>
        </div>
        <Progress value={24} variant="success" />
      </div>

      <div>
        <p style={{ marginBottom: '8px' }}>With internal label:</p>
        <Progress value={45} size="lg" variant="info" showLabel />
      </div>

      <div>
        <p style={{ marginBottom: '8px' }}>Custom label format:</p>
        <Progress
          value={75}
          size="lg"
          variant="warning"
          showLabel
          formatLabel={(value, max) => `${value} of ${max}`}
        />
      </div>
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Striped</p>
        <Progress value={40} striped variant="dark" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Striped & Animated</p>
        <Progress value={60} striped animated variant="dark" />
      </div>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ marginBottom: '8px' }}>Loading... (Indeterminate)</p>
        <Progress indeterminate variant="dark" />
      </div>
      <div>
        <p style={{ marginBottom: '8px' }}>Processing... (Indeterminate with animation)</p>
        <Progress indeterminate animated variant="primary" />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      let timer: NodeJS.Timeout;

      if (isRunning && progress < 100) {
        timer = setTimeout(() => {
          setProgress((prev) => Math.min(prev + 1, 100));
        }, 50);
      } else if (progress >= 100) {
        setIsRunning(false);
      }

      return () => {
        if (timer) clearTimeout(timer);
      };
    }, [progress, isRunning]);

    return (
      <div style={{ width: '100%' }}>
        <Progress
          value={progress}
          variant={progress === 100 ? 'success' : 'primary'}
          size="lg"
          showLabel
          striped={isRunning}
          animated={isRunning}
        />
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <Button
            onClick={() => {
              setProgress(0);
              setIsRunning(true);
            }}
            disabled={isRunning}
          >
            <Icon name="play" /> Start
          </Button>
          <Button
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
            variant="secondary"
          >
            <Icon name="pause" /> Pause
          </Button>
          <Button
            onClick={() => setProgress(0)}
            variant="ghost"
          >
            <Icon name="reset" /> Reset
          </Button>
        </div>
      </div>
    );
  },
};

export const Circular: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress value={25} size="sm" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress value={50} size="md" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress value={75} size="lg" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Large</p>
      </div>
    </div>
  ),
};

export const CircularVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress value={85} variant="success" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Success</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress value={60} variant="warning" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Warning</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress value={90} variant="danger" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Danger</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress value={45} variant="info" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Info</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress value={70} variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Dark</p>
      </div>
    </div>
  ),
};

export const CircularWithCustomLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
      <CircularProgress
        value={75}
        variant="success"
        label={<Icon name="check" size={20} />}
      />
      <CircularProgress
        value={50}
        variant="warning"
        formatLabel={(value) => `${value / 100 * 10}/10`}
      />
      <CircularProgress
        value={0}
        variant="info"
        showLabel={false}
      />
    </div>
  ),
};

export const CircularIndeterminate: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress indeterminate size="sm" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Loading...</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress indeterminate size="md" variant="primary" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Processing...</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress indeterminate size="lg" variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Uploading...</p>
      </div>
    </div>
  ),
};

export const MultiStep: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = ['Basics', 'Details', 'Review', 'Complete'];

    return (
      <div style={{ width: '100%' }}>
        <MultiStepProgress
          currentStep={currentStep}
          steps={steps}
          variant="dark"
        />
        <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            variant="secondary"
          >
            <Icon name="chevron-left" /> Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
          >
            Next <Icon name="chevron-right" />
          </Button>
        </div>
      </div>
    );
  },
};

export const MultiStepWithNumbers: Story = {
  render: () => (
    <MultiStepProgress
      currentStep={2}
      steps={['Account Setup', 'Personal Info', 'Preferences', 'Confirmation']}
      variant="primary"
      showStepNumbers
    />
  ),
};

export const FileUpload: Story = {
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
      let interval: NodeJS.Timeout;

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
        if (interval) clearInterval(interval);
      };
    }, [uploading]);

    return (
      <div style={{
        padding: '20px',
        border: '2px dashed #e0e0e0',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <Icon name="cloud-upload" size={48} color="#666" />
        <h3 style={{ margin: '10px 0' }}>Upload File</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>document.pdf ({fileSize} MB)</p>

        {uploading || uploadProgress > 0 ? (
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>{uploading ? 'Uploading...' : 'Upload Complete'}</span>
              <span>{uploadedSize.toFixed(1)} / {fileSize} MB</span>
            </div>
            <Progress
              value={uploadProgress}
              variant={uploadProgress === 100 ? 'success' : 'primary'}
              striped={uploading}
              animated={uploading}
            />
          </div>
        ) : (
          <Button onClick={startUpload}>
            <Icon name="upload" /> Start Upload
          </Button>
        )}
      </div>
    );
  },
};

export const Dashboard: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
      <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Storage Used</h4>
        <CircularProgress value={72} variant="warning" />
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>7.2 GB of 10 GB</p>
      </div>

      <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Tasks Complete</h4>
        <CircularProgress value={85} variant="success" />
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>17 of 20 tasks</p>
      </div>

      <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Project Progress</h4>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '12px' }}>Design</span>
            <span style={{ fontSize: '12px' }}>100%</span>
          </div>
          <Progress value={100} size="xs" variant="success" />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '12px' }}>Development</span>
            <span style={{ fontSize: '12px' }}>60%</span>
          </div>
          <Progress value={60} size="xs" variant="primary" />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '12px' }}>Testing</span>
            <span style={{ fontSize: '12px' }}>25%</span>
          </div>
          <Progress value={25} size="xs" variant="warning" />
        </div>
      </div>
    </div>
  ),
};