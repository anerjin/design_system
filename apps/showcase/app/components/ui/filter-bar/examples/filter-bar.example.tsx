'use client';

import { useState } from 'react';
import { Input, Select, Button, Icon } from '@bricks/core/bundle';
import '../filter-bar.css';

export default function FilterBarExample() {
  const [searchValue, setSearchValue] = useState('');
  const [status, setStatus] = useState('all');
  const [tag, setTag] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleReset = () => {
    setSearchValue('');
    setStatus('all');
    setTag('');
  };

  const hasFilters = searchValue || status !== 'all' || tag;

  return (
    <div className="filter-bar">
      <div className="filter-bar__search">
        <Input
          placeholder="Search by name or link"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          leftIcon={<Icon name="search" size={18} color="var(--ds-gray-400)" />}
          size="sm"
        />
      </div>

      <Select
        size="sm"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={[
          { value: 'all', label: 'All Status' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'draft', label: 'Draft' },
        ]}
      />

      <Select
        size="sm"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Filter by tag"
        options={[
          { value: '', label: 'Filter by tag' },
          { value: 'marketing', label: 'Marketing' },
          { value: 'sales', label: 'Sales' },
          { value: 'product', label: 'Product' },
        ]}
      />

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <Icon name="x-circle" size={16} />
          Reset filters
        </Button>
      )}

      <div className="filter-bar__view-toggle">
        <Button
          variant={viewMode === 'list' ? 'secondary' : 'ghost'}
          size="sm"
          iconOnly
          onClick={() => setViewMode('list')}
          aria-label="List view"
        >
          <Icon name="list-ul" size={18} />
        </Button>
        <Button
          variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
          size="sm"
          iconOnly
          onClick={() => setViewMode('grid')}
          aria-label="Grid view"
        >
          <Icon name="grid-alt" size={18} />
        </Button>
      </div>
    </div>
  );
}
