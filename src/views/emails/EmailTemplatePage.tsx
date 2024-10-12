import { useMutation } from '@tanstack/react-query';
import EmailTemplateContent from './components/EmailTemplateContent';
import EmailTemplateEditable from './components/EmailTemplateEditable';
import EmailGroupList from './components/EmailGroupList';
import { createTemplate } from '@/api/EmailTemplateApi';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import { useAppStore } from '@/stores/useAppStore';

export default function EmailTemplatePage() {
  const getDataAsJSON = useAppStore((store) => store.getDataAsJSON);

  const { mutate: mutateCreation } = useMutation({
    mutationFn: createTemplate,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const handleForm = (formData: { name: string }) => {
    const data = {
      ...formData,
      data: getDataAsJSON(),
      content: document.getElementById('templateContent')!.innerHTML,
    };
    mutateCreation(data);
  };

  return (
    <div className='container mx-auto px-8'>
      <h2 className='text-4xl text-primary font-bold'>Template Mail </h2>
      <p className='text-xl'>Create or edit some resource</p>
      <div className='grid grid-cols-3 gap-4 mt-8 '>
        <form
          onSubmit={handleSubmit(handleForm)}
          className='p-6 col-span-2 shadow-md bg-white rounded-lg h-fit'
        >
          <label htmlFor='name'>
            Template Name
            <input
              type='text'
              id='name'
              className='w-full border outline-primary border-gray-200 p-2 rounded-md'
              {...register('name', { required: 'This filed is required' })}
            />
          </label>
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          <div className='grid grid-cols-2 mt-4 gap-4 '>
            <div className='relative'>
              <EmailTemplateEditable />
            </div>
            <div id='templateContent'>
              <EmailTemplateContent />
            </div>
          </div>
          <div className='text-center mt-8'>
            <button className='px-10 py-2 bg-primary font-bold text-white rounded-lg'>
              Save
            </button>
          </div>
        </form>
        <EmailGroupList />
      </div>
    </div>
  );
}
