import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';

type Filter = {
  id: string;
  title: string;
  value: string;
};

type FilterProductProps = {
  items: Filter[];
  nameType: string;
  onFilterChange?: (value: string) => void;
};

export function FilterProduct({
  items,
  nameType,
  onFilterChange
}: FilterProductProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const maxVisible = 5;

  const handleSelect = (value: string) => {
    if (selectedValue === value) {
      setSelectedValue(null);
      onFilterChange?.('');
    } else {
      setSelectedValue(value);
      onFilterChange?.(value);
    }
  };

  const showMoreItems = () => {
    setVisibleCount(items.length);
  };

  const showLessItems = () => {
    setVisibleCount(maxVisible);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="text-sm font-bold">{nameType}</div>
      {items.length > 0 &&
        items?.slice(0, visibleCount).map((item) => (
          <div key={item.id} className="flex gap-2">
            <Checkbox
              id={item.id}
              checked={selectedValue === item.value}
              onCheckedChange={() => handleSelect(item.value)}
              className="peer"
            />
            <label
              htmlFor={item.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.title}
            </label>
          </div>
        ))}

      {items.length > maxVisible && (
        <div className="mt-2">
          {visibleCount < items.length ? (
            <button
              onClick={showMoreItems}
              className="bg-blue-500 hover:bg-blue-700 flex items-center rounded px-4 py-2 text-sm"
            >
              Xem thêm
              <Icons.chevronDown className="ml-2 h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={showLessItems}
              className="bg-blue-500 hover:bg-blue-700 flex items-center rounded px-4 py-2 text-sm "
            >
              Thu lại
              <Icons.chevronUp className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
