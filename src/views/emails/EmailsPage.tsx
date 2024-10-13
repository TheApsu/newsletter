import ConfirmDialog from '@/components/ConfirmDialog';
// import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { DeleteItem, EmailGroup } from '@/types/index';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import {
//   getAllGroups,
// } from '@/api/EmailGroupApi';
import { useEffect, useState } from 'react';
import { createEmail, CreateEmail, updateEmail } from '@/api/EmailApi';
import ErrorMessage from '@/components/ErrorMessage';
import { emailAppStore } from '@/stores/useAppStore';
import { toast } from 'react-toastify';
import EmailList from './components/EmailList';
import { getAllGroups } from '@/api/EmailGroupApi';

export default function EmailsPage() {
  const email = emailAppStore((store) => store.name);
  const setEmail = emailAppStore((store) => store.setEmail);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateEmail>({
    defaultValues: {
      name: '',
      groupId: '',
    },
  });

  useEffect(() => {
    if (email) {
      setValue('name', email.name);
      setValue('groupId', email.groupId);
    }
  }, [email]);

  const [alert, setAlert] = useState<DeleteItem>({
    id: undefined,
    show: false,
  });

  const handleAcceptBtn = () => {
    setAlert({
      id: undefined,
      show: false,
    });
  };

  // const { emailGroup: emailGroup } = useQuery({
  //   queryFn: () => getEmailGroup(editingId!),
  // });
  // console.log('emailGroup :>> ', emailGroup);
  const { data: emailGroup } = useQuery({
    queryKey: ['emailGroups'],
    queryFn: () => getAllGroups({ pag: 1 }),
    refetchOnWindowFocus: false,
  });
  // let emailGroup = []
  // if (data?.error === null) {
  //   emailGroup = data.data
  // }
  // console.log('data :>> ', data);

  const { mutate } = useMutation({
    mutationFn: createEmail,
    onSuccess: () => {
      toast.success('Created Succesfully');
      reset();
      queryClient.invalidateQueries({ queryKey: ['emails'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const clearForm = () => {
    const backupId = email?.id;
    setEmail(undefined);
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ['email', backupId],
      });
    });
    reset();
  };
  const { mutate: updateItem } = useMutation({
    mutationFn: updateEmail,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Updated Succesfully');
      clearForm();
      queryClient.invalidateQueries({ queryKey: ['emails'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleForm = (data: CreateEmail) => {
    console.log('data :>> ', data);
    if (email?.id) {
      updateItem({ ...data, id: email.id });
    } else {
      mutate(data);
    }
  };
  if (emailGroup) {
    return (
      <div className='container mx-auto px-8'>
        <h2 className='text-4xl text-primary font-bold'>Emails </h2>
        <p className='text-xl'>Create or edit some resource</p>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <form
            onSubmit={handleSubmit(handleForm)}
            className='p-6 col-span-2 shadow-md bg-white rounded-lg h-fit space-y-4'
          >
            <div>
              <label htmlFor='groupId'>
                Select a Group
                <select
                  id='groupId'
                  className='w-full border outline-primary border-gray-200 p-2 rounded-md'
                  {...register('groupId', {
                    required: 'This field is required',
                  })}
                >
                  <option value='' disabled>
                    Select an Option
                  </option>
                  {emailGroup.data.map((emailGroup: EmailGroup) => (
                    <option value={emailGroup.id} key={emailGroup.id}>
                      {emailGroup.name}
                    </option>
                  ))}
                </select>
              </label>
              {errors.groupId && (
                <ErrorMessage> {errors.groupId.message} </ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor='email'>
                Enter a valid email
                <input
                  id='name'
                  className='w-full border outline-primary border-gray-200 p-2 rounded-md'
                  type='name'
                  {...register('name', { required: 'This field is required' })}
                />
              </label>
              {errors.name && (
                <ErrorMessage> {errors.name.message} </ErrorMessage>
              )}
            </div>
            <div className='text-center mt-8 space-x-4'>
              <button className='px-10 py-2 bg-primary font-bold text-white rounded-lg'>
                Save
              </button>
              <button
                onClick={clearForm}
                type='button'
                className='px-10 py-2  text-primary font-bold border border-primary rounded-lg'
              >
                Clear
              </button>
            </div>
          </form>
          <EmailList />
        </div>
        <ConfirmDialog
          alert={alert}
          setAlert={setAlert}
          callback={handleAcceptBtn}
        />
      </div>
    );
  }
}
