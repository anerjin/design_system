import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chart } from './Chart';

const meta: Meta<typeof Chart> = {
  title: 'Data Display/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['bar', 'line', 'pie', 'doughnut', 'area', 'radar', 'polar'],
    },
    theme: {
      control: 'select',
      options: ['default', 'pastel', 'vivid', 'dark'],
    },
    showLegend: {
      control: 'boolean',
    },
    showGrid: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
    responsive: {
      control: 'boolean',
    },
    showTooltip: {
      control: 'boolean',
    },
    beginAtZero: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const monthlyData = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 59 },
  { label: 'Mar', value: 80 },
  { label: 'Apr', value: 81 },
  { label: 'May', value: 56 },
  { label: 'Jun', value: 55 },
];

const categoryData = [
  { label: 'Electronics', value: 450 },
  { label: 'Clothing', value: 320 },
  { label: 'Food', value: 280 },
  { label: 'Books', value: 180 },
  { label: 'Sports', value: 140 },
];

export const BarChart: Story = {
  args: {
    type: 'bar',
    data: monthlyData,
    title: 'Monthly Sales',
    width: 600,
    height: 400,
  },
};

export const LineChart: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    title: 'Revenue Trend',
    width: 600,
    height: 400,
  },
};

export const AreaChart: Story = {
  args: {
    type: 'area',
    data: monthlyData,
    title: 'Growth Over Time',
    width: 600,
    height: 400,
  },
};

export const PieChart: Story = {
  args: {
    type: 'pie',
    data: categoryData,
    title: 'Market Share',
    width: 500,
    height: 500,
  },
};

export const DoughnutChart: Story = {
  args: {
    type: 'doughnut',
    data: categoryData,
    title: 'Category Distribution',
    width: 500,
    height: 500,
  },
};

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '800px' }}>
      <Chart
        type="bar"
        data={[
          { label: 'Q1', value: 85 },
          { label: 'Q2', value: 72 },
          { label: 'Q3', value: 91 },
          { label: 'Q4', value: 88 },
        ]}
        title="Default Theme"
        theme="default"
        height={300}
      />
      <Chart
        type="bar"
        data={[
          { label: 'Q1', value: 85 },
          { label: 'Q2', value: 72 },
          { label: 'Q3', value: 91 },
          { label: 'Q4', value: 88 },
        ]}
        title="Pastel Theme"
        theme="pastel"
        height={300}
      />
      <Chart
        type="bar"
        data={[
          { label: 'Q1', value: 85 },
          { label: 'Q2', value: 72 },
          { label: 'Q3', value: 91 },
          { label: 'Q4', value: 88 },
        ]}
        title="Vivid Theme"
        theme="vivid"
        height={300}
      />
      <Chart
        type="bar"
        data={[
          { label: 'Q1', value: 85 },
          { label: 'Q2', value: 72 },
          { label: 'Q3', value: 91 },
          { label: 'Q4', value: 88 },
        ]}
        title="Dark Theme"
        theme="dark"
        height={300}
      />
    </div>
  ),
};

export const NoGrid: Story = {
  args: {
    type: 'bar',
    data: monthlyData,
    title: 'Without Grid',
    showGrid: false,
    width: 600,
    height: 400,
  },
};

export const NoLegend: Story = {
  args: {
    type: 'pie',
    data: categoryData,
    title: 'Without Legend',
    showLegend: false,
    width: 500,
    height: 500,
  },
};

export const CustomColors: Story = {
  args: {
    type: 'bar',
    data: [
      { label: 'Red', value: 30, color: '#FF0000' },
      { label: 'Green', value: 45, color: '#00FF00' },
      { label: 'Blue', value: 60, color: '#0000FF' },
      { label: 'Yellow', value: 35, color: '#FFFF00' },
      { label: 'Purple', value: 50, color: '#800080' },
    ],
    title: 'Custom Colors',
    width: 600,
    height: 400,
  },
};

export const RadarChart: Story = {
  args: {
    type: 'radar',
    data: [
      { label: 'Speed', value: 85 },
      { label: 'Reliability', value: 92 },
      { label: 'Comfort', value: 78 },
      { label: 'Design', value: 95 },
      { label: 'Price', value: 70 },
      { label: 'Efficiency', value: 88 },
    ],
    title: 'Product Comparison',
    width: 500,
    height: 500,
  },
};

export const PolarChart: Story = {
  args: {
    type: 'polar',
    data: [
      { label: 'North', value: 65 },
      { label: 'Northeast', value: 45 },
      { label: 'East', value: 80 },
      { label: 'Southeast', value: 55 },
      { label: 'South', value: 70 },
      { label: 'Southwest', value: 50 },
      { label: 'West', value: 75 },
      { label: 'Northwest', value: 60 },
    ],
    title: 'Regional Sales',
    width: 500,
    height: 500,
  },
};

export const SmallChart: Story = {
  args: {
    type: 'line',
    data: [
      { label: 'Mon', value: 20 },
      { label: 'Tue', value: 35 },
      { label: 'Wed', value: 25 },
      { label: 'Thu', value: 40 },
      { label: 'Fri', value: 30 },
    ],
    width: 300,
    height: 200,
    showLegend: false,
  },
};

export const Dashboard: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', width: '900px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Sales</h3>
        <Chart
          type="line"
          data={[
            { label: 'Mon', value: 120 },
            { label: 'Tue', value: 150 },
            { label: 'Wed', value: 100 },
            { label: 'Thu', value: 170 },
            { label: 'Fri', value: 140 },
          ]}
          height={200}
          showLegend={false}
          theme="pastel"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Categories</h3>
        <Chart
          type="doughnut"
          data={[
            { label: 'Product A', value: 45 },
            { label: 'Product B', value: 30 },
            { label: 'Product C', value: 25 },
          ]}
          height={200}
          showLegend={false}
          theme="vivid"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Performance</h3>
        <Chart
          type="bar"
          data={[
            { label: 'Q1', value: 85 },
            { label: 'Q2', value: 92 },
            { label: 'Q3', value: 78 },
            { label: 'Q4', value: 95 },
          ]}
          height={200}
          showLegend={false}
        />
      </div>
    </div>
  ),
};

export const Comparison: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '600' }}>
        2023 vs 2024 Comparison
      </h3>
      <div style={{ display: 'flex', gap: '40px' }}>
        <Chart
          type="bar"
          data={[
            { label: 'Q1', value: 65 },
            { label: 'Q2', value: 72 },
            { label: 'Q3', value: 58 },
            { label: 'Q4', value: 81 },
          ]}
          title="2023"
          width={320}
          height={300}
          theme="pastel"
        />
        <Chart
          type="bar"
          data={[
            { label: 'Q1', value: 85 },
            { label: 'Q2', value: 92 },
            { label: 'Q3', value: 78 },
            { label: 'Q4', value: 95 },
          ]}
          title="2024"
          width={320}
          height={300}
          theme="vivid"
        />
      </div>
    </div>
  ),
};

export const Analytics: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '600' }}>
        Website Analytics
      </h3>
      <Chart
        type="area"
        data={[
          { label: '00:00', value: 120 },
          { label: '04:00', value: 80 },
          { label: '08:00', value: 150 },
          { label: '12:00', value: 320 },
          { label: '16:00', value: 280 },
          { label: '20:00', value: 200 },
          { label: '24:00', value: 100 },
        ]}
        title="Daily Traffic"
        height={350}
        theme="default"
      />
      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <Chart
          type="pie"
          data={[
            { label: 'Direct', value: 35 },
            { label: 'Search', value: 40 },
            { label: 'Social', value: 15 },
            { label: 'Email', value: 10 },
          ]}
          title="Traffic Sources"
          height={300}
        />
        <Chart
          type="doughnut"
          data={[
            { label: 'Desktop', value: 55 },
            { label: 'Mobile', value: 35 },
            { label: 'Tablet', value: 10 },
          ]}
          title="Device Types"
          height={300}
        />
      </div>
    </div>
  ),
};