import { useAppStore } from '@/stores/useAppStore';
import { ChangeEvent } from 'react';

export default function EmailTemplateFooter() {
  const footer = useAppStore((store) => store.footer);
  const setFooter = useAppStore((store) => store.setFooter);

  const handleInputChange = (
    ev: ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const value = ev.target.value;
    const { name } = ev.target;
    if (name === 'title' || name === 'location') {
      setFooter(name, value);
    } else if (
      name === 'locationButtons' ||
      name === 'href' ||
      name === 'locationHref'
    ) {
      setFooter(name, value, index);
    }
  };

  return (
    <div className='space-y-4'>
      <h4 className='font-bold text-2xl text-center'>Footer Content</h4>
      <label htmlFor='' className='block'>
        Footer Title
        <input
          type='text'
          className='w-full border outline-primary border-gray-200 p-2 rounded-md'
          name='title'
          value={footer.title}
          onChange={(ev) => handleInputChange(ev)}
        />
      </label>

      {footer.buttons.map((button, index) => (
        <div className='flex gap-4'>
          <label htmlFor='' className='block flex-1'>
            Button {index + 1}
            <input
              type='text'
              className='w-full border outline-primary border-gray-200 p-2 rounded-md'
              name='buttons'
              value={button.title}
              onChange={(ev) => handleInputChange(ev, index)}
            />
          </label>

          <label htmlFor='' className='block flex-1'>
            Link {index + 1}
            <input
              type='text'
              className='w-full border outline-primary border-gray-200 p-2 rounded-md'
              name='href'
              value={button.href}
              onChange={(ev) => handleInputChange(ev, index)}
            />
          </label>
        </div>
      ))}

      <h4 className='font-bold text-2xl text-center'>Privacy & Location</h4>
      <label htmlFor='' className='block'>
        Location
        <input
          type='text'
          className='w-full border outline-primary border-gray-200 p-2 rounded-md'
          name='location'
          value={footer.location}
          onChange={(ev) => handleInputChange(ev)}
        />
      </label>
      {footer.locationButtons.map((button, index) => (
        <div className='flex gap-4'>
          <label htmlFor='' className='block flex-1'>
            Button {index + 1}
            <input
              type='text'
              className='w-full border outline-primary border-gray-200 p-2 rounded-md'
              name='locationButtons'
              value={button.title}
              onChange={(ev) => handleInputChange(ev, index)}
            />
          </label>

          <label htmlFor='' className='block flex-1'>
            Link {index + 1}
            <input
              type='text'
              className='w-full border outline-primary border-gray-200 p-2 rounded-md'
              name='locationHref'
              value={button.href}
              onChange={(ev) => handleInputChange(ev, index)}
            />
          </label>
        </div>
      ))}
    </div>
  );
}
