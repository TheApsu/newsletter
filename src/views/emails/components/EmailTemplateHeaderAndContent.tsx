import { ChangeEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAppStore } from '@/stores/useAppStore';
import { uploadImage } from '@/api/EmailApi';
import { toast } from 'react-toastify';

export default function EmailTemplateHeaderAndContent() {
  const header = useAppStore((state) => state.header);
  const content = useAppStore((state) => state.content);
  const endContent = useAppStore((state) => state.endContent);
  const setHeader = useAppStore((state) => state.setHeader);
  const setContent = useAppStore((state) => state.setContent);
  const setEndContentBody = useAppStore((state) => state.setEndContentBody);
  const setEndContentHref = useAppStore((state) => state.setEndContentHref);

  const setLogo = useAppStore((state) => state.setLogo);
  const setMainImage = useAppStore((state) => state.setMainImage);

  const { mutate: mutateLogo } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      if (data) setLogo(data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: mutateMainImage } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      if (data) setMainImage(data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleInputChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = ev.target.value;
    if (ev.target.name === 'title') {
      setHeader({
        title: value,
      });
    } else if (ev.target.name === 'image_1' || ev.target.name === 'image_2') {
      const evn = ev as ChangeEvent<HTMLInputElement>;
      const file = evn.target?.files && evn.target?.files[0];
      if (file) {
        value = '';
        return ev.target.name === 'image_1'
          ? mutateLogo(file)
          : mutateMainImage(file);
      }
    } else if (ev.target.name === 'content') {
      setContent(value);
    } else if (ev.target.name === 'bottom_body') {
      setEndContentBody(value);
    } else if (ev.target.name === 'bottom_body_link') {
      setEndContentHref(value);
    }
  };

  return (
    <>
      <h4 className='font-bold text-2xl text-center'>Header & Content</h4>
      <label htmlFor='name' className='block'>
        Header
        <input
          type='text'
          id='name'
          className='w-full border outline-primary border-gray-200 p-2 rounded-md'
          placeholder='october 2024 | Issue No. 2'
          name='title'
          value={header.title}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor='' className='block'>
        Image 1
        <input
          type='file'
          className='w-full border outline-primary border-gray-200 p-2 rounded-md'
          name='image_1'
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor='' className='block'>
        Image 2
        <input
          type='file'
          className='w-full border outline-primary border-gray-200 p-2 rounded-md'
          name='image_2'
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor='' className='block'>
        Body
        <textarea
          onChange={handleInputChange}
          name='content'
          value={content}
          className=' resize-none min-h-40 w-full border outline-primary border-gray-200 p-2 rounded-md'
        />
      </label>
      <label htmlFor='' className='block'>
        Bottom Body Name
        <input
          type='text'
          className='w-full border outline-primary border-gray-200 p-2 rounded-md'
          name='bottom_body'
          value={endContent.name}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor='' className='block'>
        Bottom Body Link
        <input
          type='text'
          className='w-full border outline-primary border-gray-200 p-2 rounded-md'
          name='bottom_body_link'
          value={endContent.href}
          onChange={handleInputChange}
        />
      </label>
    </>
  );
}
