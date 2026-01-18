import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Foundation/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'subtitle1', 'subtitle2',
        'body1', 'body2',
        'caption', 'overline',
        'display1', 'display2', 'display3', 'display4'
      ],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
    weight: {
      control: 'select',
      options: [undefined, 'light', 'regular', 'medium', 'semibold', 'bold', 'black'],
    },
    color: {
      control: 'select',
      options: [undefined, 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'muted', 'inherit'],
    },
    transform: {
      control: 'select',
      options: [undefined, 'none', 'capitalize', 'uppercase', 'lowercase'],
    },
    decoration: {
      control: 'select',
      options: [undefined, 'none', 'underline', 'line-through', 'overline'],
    },
    display: {
      control: 'select',
      options: ['inline', 'inline-block', 'block'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a typography component with default settings.',
  },
};

export const Headings: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', textAlign: 'left' }}>
      <Typography variant="h1" gutterBottom>Heading 1</Typography>
      <Typography variant="h2" gutterBottom>Heading 2</Typography>
      <Typography variant="h3" gutterBottom>Heading 3</Typography>
      <Typography variant="h4" gutterBottom>Heading 4</Typography>
      <Typography variant="h5" gutterBottom>Heading 5</Typography>
      <Typography variant="h6" gutterBottom>Heading 6</Typography>
    </div>
  ),
};

export const DisplayVariants: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', textAlign: 'left' }}>
      <Typography variant="display1" gutterBottom>Display 1</Typography>
      <Typography variant="display2" gutterBottom>Display 2</Typography>
      <Typography variant="display3" gutterBottom>Display 3</Typography>
      <Typography variant="display4" gutterBottom>Display 4</Typography>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', textAlign: 'left' }}>
      <Typography variant="subtitle1" gutterBottom>Subtitle 1</Typography>
      <Typography variant="subtitle2" gutterBottom>Subtitle 2</Typography>
      <Typography variant="body1" gutterBottom>
        Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        Caption: This is a caption text
      </Typography>
      <Typography variant="overline" display="block">
        Overline Text
      </Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', textAlign: 'left' }}>
      <Typography variant="h5" color="primary" gutterBottom>Primary Color</Typography>
      <Typography variant="h5" color="secondary" gutterBottom>Secondary Color</Typography>
      <Typography variant="h5" color="success" gutterBottom>Success Color</Typography>
      <Typography variant="h5" color="danger" gutterBottom>Danger Color</Typography>
      <Typography variant="h5" color="warning" gutterBottom>Warning Color</Typography>
      <Typography variant="h5" color="info" gutterBottom>Info Color</Typography>
      <Typography variant="h5" color="light" gutterBottom style={{ background: '#333', padding: '8px' }}>Light Color</Typography>
      <Typography variant="h5" color="dark" gutterBottom>Dark Color</Typography>
      <Typography variant="h5" color="muted" gutterBottom>Muted Color</Typography>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', textAlign: 'left' }}>
      <Typography variant="h4" weight="light" gutterBottom>Light Weight</Typography>
      <Typography variant="h4" weight="regular" gutterBottom>Regular Weight</Typography>
      <Typography variant="h4" weight="medium" gutterBottom>Medium Weight</Typography>
      <Typography variant="h4" weight="semibold" gutterBottom>Semibold Weight</Typography>
      <Typography variant="h4" weight="bold" gutterBottom>Bold Weight</Typography>
      <Typography variant="h4" weight="black" gutterBottom>Black Weight</Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Typography variant="body1" align="left" gutterBottom>
        Left aligned text: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Center aligned text: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="body1" align="right" gutterBottom>
        Right aligned text: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="body1" align="justify" gutterBottom>
        Justified text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </Typography>
    </div>
  ),
};

export const TextTransform: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', textAlign: 'left' }}>
      <Typography variant="h5" transform="none" gutterBottom>No transformation</Typography>
      <Typography variant="h5" transform="capitalize" gutterBottom>capitalize text</Typography>
      <Typography variant="h5" transform="uppercase" gutterBottom>uppercase text</Typography>
      <Typography variant="h5" transform="lowercase" gutterBottom>LOWERCASE TEXT</Typography>
    </div>
  ),
};

export const TextDecoration: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', textAlign: 'left' }}>
      <Typography variant="body1" decoration="none" gutterBottom>No decoration</Typography>
      <Typography variant="body1" decoration="underline" gutterBottom>Underlined text</Typography>
      <Typography variant="body1" decoration="line-through" gutterBottom>Line-through text</Typography>
      <Typography variant="body1" decoration="overline" gutterBottom>Overline text</Typography>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', textAlign: 'left' }}>
      <Typography variant="body1" truncate gutterBottom>
        This is a very long text that will be truncated with an ellipsis when it exceeds the container width. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <div style={{ marginTop: '20px' }}>
        <Typography variant="body1" clamp={2}>
          This text will be clamped to 2 lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </Typography>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Typography variant="body1" clamp={3}>
          This text will be clamped to 3 lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
        </Typography>
      </div>
    </div>
  ),
};

export const Italic: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', textAlign: 'left' }}>
      <Typography variant="h4" italic gutterBottom>Italic Heading</Typography>
      <Typography variant="body1" italic>
        This is italic body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </div>
  ),
};

export const InlineDisplay: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', textAlign: 'left' }}>
      <Typography variant="body1" display="inline" color="primary">This is inline </Typography>
      <Typography variant="body1" display="inline" color="secondary">text that flows </Typography>
      <Typography variant="body1" display="inline" color="success">together on the </Typography>
      <Typography variant="body1" display="inline" color="danger">same line.</Typography>
    </div>
  ),
};

export const NoSelect: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', textAlign: 'left' }}>
      <Typography variant="body1" noSelect gutterBottom>
        This text cannot be selected. Try selecting it with your mouse.
      </Typography>
      <Typography variant="body1">
        This text can be selected normally.
      </Typography>
    </div>
  ),
};

export const CustomElement: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', textAlign: 'left' }}>
      <Typography variant="h1" as="div" gutterBottom>
        H1 styled text rendered as a div
      </Typography>
      <Typography variant="body1" as="span" display="block" gutterBottom>
        Body text rendered as a span
      </Typography>
      <Typography variant="caption" as="h3" display="block">
        Caption styled text rendered as an h3
      </Typography>
    </div>
  ),
};

export const Article: Story = {
  render: () => (
    <article style={{ maxWidth: '800px' }}>
      <Typography variant="display2" gutterBottom>
        The Future of Web Development
      </Typography>
      <Typography variant="subtitle1" color="muted" gutterBottom>
        Published on December 1, 2024 • 5 min read
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      <Typography variant="h3" gutterBottom>
        Introduction
      </Typography>
      <Typography variant="body1" gutterBottom>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Key Technologies
      </Typography>
      <Typography variant="body2" gutterBottom>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </Typography>
      <Typography variant="caption" color="muted" display="block">
        Note: This is a sample article demonstrating various typography styles.
      </Typography>
    </article>
  ),
};

export const PricingCard: Story = {
  render: () => (
    <div style={{
      padding: '32px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      maxWidth: '300px',
      textAlign: 'center'
    }}>
      <Typography variant="overline" color="primary" display="block" gutterBottom>
        MOST POPULAR
      </Typography>
      <Typography variant="h3" weight="bold" gutterBottom>
        Pro Plan
      </Typography>
      <div style={{ margin: '24px 0' }}>
        <Typography variant="display3" weight="bold" display="inline">
          $29
        </Typography>
        <Typography variant="subtitle1" color="muted" display="inline">
          /month
        </Typography>
      </div>
      <Typography variant="body2" color="muted" gutterBottom>
        Perfect for growing businesses
      </Typography>
      <div style={{ marginTop: '24px', textAlign: 'left' }}>
        <Typography variant="body2" gutterBottom><i className="bx bx-check"></i> Unlimited projects</Typography>
        <Typography variant="body2" gutterBottom><i className="bx bx-check"></i> Advanced analytics</Typography>
        <Typography variant="body2" gutterBottom><i className="bx bx-check"></i> Priority support</Typography>
        <Typography variant="body2" gutterBottom><i className="bx bx-check"></i> Custom integrations</Typography>
      </div>
    </div>
  ),
};