import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';
import { Icon } from './Icon';
import { Badge } from './Badge';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'away', 'busy', 'offline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'John Doe',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar src="https://i.pravatar.cc/150?img=2" alt="User" size="xs" />
      <Avatar src="https://i.pravatar.cc/150?img=3" alt="User" size="sm" />
      <Avatar src="https://i.pravatar.cc/150?img=4" alt="User" size="md" />
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="User" size="lg" />
      <Avatar src="https://i.pravatar.cc/150?img=6" alt="User" size="xl" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar src="https://i.pravatar.cc/150?img=7" alt="Circle" shape="circle" />
      <Avatar src="https://i.pravatar.cc/150?img=8" alt="Rounded" shape="rounded" />
      <Avatar src="https://i.pravatar.cc/150?img=9" alt="Square" shape="square" />
    </div>
  ),
};

export const Initials: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar initials="JD" variant="default" />
      <Avatar initials="AB" variant="primary" />
      <Avatar initials="CD" variant="success" />
      <Avatar initials="EF" variant="warning" />
      <Avatar initials="GH" variant="danger" />
      <Avatar initials="IJ" variant="info" />
      <Avatar initials="KL" variant="secondary" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://i.pravatar.cc/150?img=10" alt="Online" status="online" size="lg" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Online</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://i.pravatar.cc/150?img=11" alt="Away" status="away" size="lg" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Away</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://i.pravatar.cc/150?img=12" alt="Busy" status="busy" size="lg" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Busy</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar src="https://i.pravatar.cc/150?img=13" alt="Offline" status="offline" size="lg" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Offline</p>
      </div>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar
        src="https://i.pravatar.cc/150?img=14"
        alt="Click me"
        onClick={() => alert('Avatar clicked!')}
      />
      <Avatar
        initials="CL"
        variant="primary"
        onClick={() => alert('Initials avatar clicked!')}
      />
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Avatar
        src="https://i.pravatar.cc/150?img=15"
        alt="User"
        badge={<Badge size="sm" variant="danger">5</Badge>}
        badgePosition="top-right"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=16"
        alt="User"
        badge={<Icon name="check-circle" size={16} color="green" />}
        badgePosition="bottom-right"
      />
      <Avatar
        initials="NB"
        variant="primary"
        badge={<Badge size="sm" variant="warning">!</Badge>}
        badgePosition="top-left"
      />
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar>
        <Icon name="user" size={24} />
      </Avatar>
      <Avatar variant="primary">
        <Icon name="star" size={24} color="white" />
      </Avatar>
      <Avatar variant="success" shape="square">
        <Icon name="check" size={24} color="white" />
      </Avatar>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar loading size="xs" />
      <Avatar loading size="sm" />
      <Avatar loading size="md" />
      <Avatar loading size="lg" />
      <Avatar loading size="xl" />
    </div>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar src="invalid-url.jpg" alt="Broken image" />
      <Avatar alt="No src or initials" />
      <Avatar />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <AvatarGroup max={3}>
        <Avatar src="https://i.pravatar.cc/150?img=17" alt="User 1" />
        <Avatar src="https://i.pravatar.cc/150?img=18" alt="User 2" />
        <Avatar src="https://i.pravatar.cc/150?img=19" alt="User 3" />
        <Avatar src="https://i.pravatar.cc/150?img=20" alt="User 4" />
        <Avatar src="https://i.pravatar.cc/150?img=21" alt="User 5" />
      </AvatarGroup>

      <AvatarGroup max={4} size="sm">
        <Avatar src="https://i.pravatar.cc/150?img=22" alt="User 1" />
        <Avatar src="https://i.pravatar.cc/150?img=23" alt="User 2" />
        <Avatar src="https://i.pravatar.cc/150?img=24" alt="User 3" />
        <Avatar src="https://i.pravatar.cc/150?img=25" alt="User 4" />
        <Avatar src="https://i.pravatar.cc/150?img=26" alt="User 5" />
        <Avatar src="https://i.pravatar.cc/150?img=27" alt="User 6" />
      </AvatarGroup>

      <AvatarGroup max={5} size="lg" spacing={-12}>
        <Avatar initials="JD" variant="primary" />
        <Avatar initials="AS" variant="success" />
        <Avatar initials="BW" variant="warning" />
        <Avatar initials="CL" variant="danger" />
        <Avatar initials="DM" variant="info" />
        <Avatar initials="EK" variant="secondary" />
        <Avatar initials="FG" />
      </AvatarGroup>
    </div>
  ),
};

export const GroupWithCustomMore: Story = {
  render: () => (
    <AvatarGroup
      max={3}
      renderMore={(count) => (
        <Avatar variant="secondary">
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>+{count}</span>
        </Avatar>
      )}
    >
      <Avatar src="https://i.pravatar.cc/150?img=28" alt="User 1" />
      <Avatar src="https://i.pravatar.cc/150?img=29" alt="User 2" />
      <Avatar src="https://i.pravatar.cc/150?img=30" alt="User 3" />
      <Avatar src="https://i.pravatar.cc/150?img=31" alt="User 4" />
      <Avatar src="https://i.pravatar.cc/150?img=32" alt="User 5" />
    </AvatarGroup>
  ),
};

export const UserCards: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        minWidth: '250px'
      }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=33"
          alt="John Doe"
          size="lg"
          status="online"
        />
        <div>
          <div style={{ fontWeight: '600' }}>John Doe</div>
          <div style={{ fontSize: '13px', color: '#666' }}>Product Designer</div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        minWidth: '250px'
      }}>
        <Avatar
          initials="JS"
          variant="primary"
          size="lg"
          status="away"
        />
        <div>
          <div style={{ fontWeight: '600' }}>Jane Smith</div>
          <div style={{ fontSize: '13px', color: '#666' }}>Frontend Developer</div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        minWidth: '250px'
      }}>
        <Avatar
          size="lg"
          badge={<Badge size="sm" variant="success">Pro</Badge>}
          badgePosition="bottom-right"
        >
          <Icon name="user-circle" size={32} />
        </Avatar>
        <div>
          <div style={{ fontWeight: '600' }}>Guest User</div>
          <div style={{ fontSize: '13px', color: '#666' }}>Premium Member</div>
        </div>
      </div>
    </div>
  ),
};

export const TeamList: Story = {
  render: () => {
    const team = [
      { id: 1, name: 'Alice Cooper', role: 'Team Lead', status: 'online' as const, avatar: 'https://i.pravatar.cc/150?img=34' },
      { id: 2, name: 'Bob Wilson', role: 'Developer', status: 'online' as const, initials: 'BW' },
      { id: 3, name: 'Charlie Brown', role: 'Designer', status: 'away' as const, avatar: 'https://i.pravatar.cc/150?img=35' },
      { id: 4, name: 'Diana Prince', role: 'QA Engineer', status: 'busy' as const, initials: 'DP' },
      { id: 5, name: 'Edward Norton', role: 'DevOps', status: 'offline' as const, avatar: 'https://i.pravatar.cc/150?img=36' },
    ];

    return (
      <div style={{ width: '400px' }}>
        <h3 style={{ marginBottom: '16px' }}>Team Members</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {team.map(member => (
            <div
              key={member.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e8e8e8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f5f5f5';
              }}
            >
              <Avatar
                src={member.avatar}
                initials={member.initials}
                alt={member.name}
                status={member.status}
                variant={member.initials ? 'primary' : 'default'}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500' }}>{member.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{member.role}</div>
              </div>
              <Icon name="chevron-right" size={20} color="#999" />
            </div>
          ))}
        </div>
      </div>
    );
  },
};