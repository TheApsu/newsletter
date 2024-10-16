import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dispatch } from 'react';

type LayoutHeaderProps = {
  setSizes: Dispatch<React.SetStateAction<(string | number)[]>>;
  sizes: (string | number)[];
  type: 'close' | 'open';
};

export default function LayoutHeader({
  setSizes,
  sizes,
  type,
}: LayoutHeaderProps) {
  return (
    <div
      className={`bg-white px-12 py-4 flex items-center sticky top-0 z-[1000] ${
        type === 'open' ? 'justify-start' : 'justify-end'
      } `}
    >
      <button onClick={() => setSizes(sizes)}>
        {type === 'open' ? (
          <Bars3Icon className='w-6' />
        ) : (
          <XMarkIcon className='w-6' />
        )}
      </button>
    </div>
  );
}
