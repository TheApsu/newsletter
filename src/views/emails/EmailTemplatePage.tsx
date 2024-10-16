import { useMutation, useQueryClient } from '@tanstack/react-query';
import EmailTemplateContent from './components/EmailTemplateContent';
import EmailTemplateEditable from './components/EmailTemplateEditable';
import { createTemplate, updateTemplate } from '@/api/EmailTemplateApi';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import { useAppStore } from '@/stores/useAppStore';
import EmailTemplateList from './components/EmailTemplateList';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ShowTemplateAsFullScreen from './components/ShowTemplateAsFullScreen';

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

  const [openTemplate, setOpenTemplate] = useState(false);

  // MEDIA QUERIES

  const [mQuery, setMQuery] = useState<{ matches: boolean }>({
    matches: window.innerWidth >= 1024 ? true : false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1023px)');
    mediaQuery.addEventListener('change', (ev) => {
      if (ev.matches) {
        setMQuery({ matches: true });
      } else {
        setMQuery({ matches: false });
      }
    });
  }, []);

  return (
    <div className='container mx-auto px-8'>
      <h2 className='text-4xl text-primary font-bold'>Template Mail </h2>
      <p className='text-xl'>Create or edit some resource</p>
      <div className='grid grid-cols-3 gap-4 mt-8 '>
        <form
          onSubmit={handleSubmit(handleForm)}
          className='order-2 lg:order-1 col-span-3 lg:col-span-2  p-6 col-span-2 shadow-md bg-white rounded-lg '
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
            <div className='relative col-span-2 lg:col-span-1'>
              <EmailTemplateEditable />
            </div>
            <div id='templateContent' className='col-span-2 lg:col-span-1'>
              {mQuery.matches ? (
                <EmailTemplateContent />
              ) : (
                <button
                  type='button'
                  onClick={() => setOpenTemplate(!openTemplate)}
                  className='bg-primary w-full text-white p-4 font-bold text-xl rounded-md'
                >
                  Show Template
                </button>
              )}
            </div>
          </div>
          <div className='text-center mt-8 lg:space-x-4 space-y-4'>
            <button className='min-w-[200px] lg:min-w-0 px-10 py-2 bg-primary font-bold text-white rounded-lg'>
              Save
            </button>
            <button
              type='button'
              onClick={() => handleClearForm()}
              className='min-w-[200px] lg:min-w-0 px-10 py-2  text-primary font-bold border border-primary rounded-lg'
            >
              Clear Form
            </button>
            <button
              type='button'
              onClick={resetToBaseTemplate}
              className='min-w-[200px] lg:min-w-0 px-10 py-2  text-primary font-bold border border-primary rounded-lg'
            >
              Reset Template
            </button>
          </div>
        </form>
        <EmailTemplateList />
        <ShowTemplateAsFullScreen
          openTemplate={openTemplate}
          setOpenTemplate={setOpenTemplate}
        />
      </div>
    </div>
  );
}
