import {
  createEmailGroup,
  CreateEmailGroup,
  updateEmailGroup,
} from '@/api/EmailGroupApi';
import ErrorMessage from '@/components/ErrorMessage';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import EmailGroupList from './components/EmailGroupList';
import { emailGroupAppStore } from '@/stores/useAppStore';
import { useEffect } from 'react';

export default function GroupEmailsPage() {
  const emailGroup = emailGroupAppStore((store) => store.emailGroup);
  const setEmailGroup = emailGroupAppStore((store) => store.setEmailGroup);
  const queryClient = useQueryClient();

  // FORMULARIO

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateEmailGroup>({
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (emailGroup) {
      setValue('name', emailGroup.name);
    }
  }, [emailGroup]);

  const { mutate } = useMutation({
    mutationFn: createEmailGroup,
    onSuccess: () => {
      toast.success('Created Succesfully');
      reset();
      queryClient.invalidateQueries({ queryKey: ['emailGroups'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: updateGroup } = useMutation({
    mutationFn: updateEmailGroup,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Updated Succesfully');
      clearForm();
      queryClient.invalidateQueries({ queryKey: ['emailGroups'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const clearForm = () => {
    const backupId = emailGroup?.id;
    setEmailGroup(undefined);
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ['emailGroup', backupId],
      });
    });
    reset();
  };
  const handleForm = (data: CreateEmailGroup) => {
    if (emailGroup?.id) {
      updateGroup({ ...data, id: emailGroup.id });
    } else {
      mutate(data);
    }
  };

  return (
    <div className='container mx-auto px-8'>
      <h2 className='text-4xl text-primary font-bold'>Groups </h2>
      <p className='text-xl'>Create or edit some resource</p>
      <div className='grid grid-cols-3 gap-4 mt-8'>
        <form
          onSubmit={handleSubmit(handleForm)}
          className='order-2 lg:order-1 col-span-3 lg:col-span-2  p-6 col-span-2 shadow-md bg-white rounded-lg '
        >
          <label htmlFor='groupName'>
            Group Name
            <input
              type='text'
              id='groupName'
              className='w-full border outline-primary border-gray-200 p-2 rounded-md'
              {...register('name', { required: 'This field is required' })}
            />
          </label>
          {errors.name && <ErrorMessage> {errors.name.message} </ErrorMessage>}
          <div className='text-center mt-8 space-x-4'>
            <button className='px-10 py-2 bg-primary font-bold text-white rounded-lg'>
              Save
            </button>
            <button
              onClick={clearForm}
              type='button'
              className='px-10 py-2 text-primary font-bold border border-primary rounded-lg'
            >
              Clear
            </button>
          </div>
        </form>
        <EmailGroupList />
      </div>
    </div>
  );
}
