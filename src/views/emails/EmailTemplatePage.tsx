import { useMutation, useQueryClient } from '@tanstack/react-query';
import EmailTemplateContent from './components/EmailTemplateContent';
import EmailTemplateEditable from './components/EmailTemplateEditable';
import { createTemplate, updateTemplate } from '@/api/EmailTemplateApi';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import { useAppStore } from '@/stores/useAppStore';
import EmailTemplateList from './components/EmailTemplateList';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function EmailTemplatePage() {
  const editingId = useAppStore((store) => store.editingId);
  const name = useAppStore((store) => store.name);
  const resetTemplate = useAppStore((store) => store.resetTemplate);
  const getDataAsJSON = useAppStore((store) => store.getDataAsJSON);
  const resetToBaseTemplate = useAppStore((store) => store.resetToBaseTemplate);

  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const { mutate: mutateCreation } = useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      toast.success('Created Succesfully');
      reset();
      handleClearForm(true);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateTemplate,
    onSuccess: () => {
      toast.success('Updated Succesfully');
      handleClearForm(true);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  useEffect(() => {
    if (name) {
      console.log('?');
      setTimeout(() => {
        setValue('name', name);
      });
    }
  }, [name]);

  const handleForm = (formData: { name: string }) => {
    const data = {
      ...formData,
      data: getDataAsJSON(),
      content: document.getElementById('templateContent')!.innerHTML,
    };

    if (editingId) {
      mutateUpdate({ ...data, id: editingId });
    } else {
      mutateCreation(data);
    }
  };

  const handleClearForm = (clearTemplateQuery: boolean = false) => {
    queryClient.invalidateQueries({ queryKey: ['templates', editingId] });
    if (clearTemplateQuery) {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    }

    reset();
    resetTemplate();
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
          <div className='text-center mt-8 space-x-4'>
            <button className='px-10 py-2 bg-primary font-bold text-white rounded-lg'>
              Save
            </button>
            <button
              type='button'
              onClick={() => handleClearForm()}
              className='px-10 py-2  text-primary font-bold border border-primary rounded-lg'
            >
              Clear Form
            </button>
            <button
              type='button'
              onClick={resetToBaseTemplate}
              className='px-10 py-2  text-primary font-bold border border-primary rounded-lg'
            >
              Reset Template
            </button>
          </div>
        </form>
        <EmailTemplateList />
      </div>
    </div>
  );
}
