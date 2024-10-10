import { uploadImage } from '@/api/EmailApi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { useAppStore } from '@/stores/useAppStore';
import { ChangeEvent } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function EmailTemplateEditableCards() {
  const listCard = useAppStore((state) => state.listCard);
  const setListCardImage = useAppStore((state) => state.setListCardImage);
  const setListCardTitle = useAppStore((state) => state.setListCardTitle);
  const setListCardContent = useAppStore((state) => state.setListCardContent);
  const setListCardButton = useAppStore((state) => state.setListCardButton);
  const setListCardButtonHref = useAppStore(
    (state) => state.setListCardButtonHref
  );
  const addOtherCardToList = useAppStore((state) => state.addOtherCardToList);
  const removeCardFromList = useAppStore((state) => state.removeCardFromList);

  const { mutate } = useMutation({
    mutationFn: uploadImage,
  });

  const handleInputFileChange = (
    ev: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    mutate(ev.target.files![0], {
      onSuccess: (data) => {
        if (data) setListCardImage(data, index);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  const handleInputChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = ev.target.value;
    const { name } = ev.target;
    if (name === 'card_title') {
      setListCardTitle(value, index);
    } else if (name === 'card_content') {
      setListCardContent(value, index);
    } else if (name === 'card_button') {
      setListCardButton(value, index);
    } else if (name === 'card_button_href') {
      setListCardButtonHref(value, index);
    }
  };

  return (
    <div className='space-y-4'>
      <h4 className='font-bold'>Click to Action Cards</h4>
      {listCard.map((card, index) => (
        <div key={index} className='space-y-4'>
          <div className='flex justify-between'>
            <h4 className='font-bold'>Card {index + 1}</h4>
            {index > 0 && (
              <button onClick={() => removeCardFromList(index)}>
                <TrashIcon className='w-6' />
              </button>
            )}
          </div>
          <label htmlFor='' className='block'>
            Card Image
            <input
              type='file'
              className='w-full border outline-primary border-gray-200 p-2 rounded-md'
              onChange={(ev) => handleInputFileChange(ev, index)}
            />
          </label>
          <label htmlFor='' className='block'>
            Card Title
            <input
              type='text'
              className='w-full border outline-primary border-gray-200 p-2 rounded-md'
              name='card_title'
              value={card.header.title}
              onChange={(ev) => handleInputChange(ev, index)}
            />
          </label>
          <label htmlFor='' className='block'>
            Content
            <textarea
              value={card.content.title}
              className=' resize-none min-h-40 w-full border outline-primary border-gray-200 p-2 rounded-md'
              name='card_content'
              onChange={(ev) => handleInputChange(ev, index)}
            />
          </label>
          <label htmlFor='' className='block'>
            Button Text
            <input
              type='text'
              className='w-full border outline-primary border-gray-200 p-2 rounded-md'
              value={card.button.title}
              name='card_button'
              onChange={(ev) => handleInputChange(ev, index)}
            />
          </label>
          <label htmlFor='' className='block'>
            Button Link
            <input
              type='text'
              className='w-full border outline-primary border-gray-200 p-2 rounded-md'
              value={card.button.href}
              name='card_button_href'
              onChange={(ev) => handleInputChange(ev, index)}
            />
          </label>
          <hr />
        </div>
      ))}
      <button
        onClick={addOtherCardToList}
        className='bg-secondary text-white py-1 px-4 rounded-md'
        type='button'
      >
        Add More
      </button>
    </div>
  );
}
