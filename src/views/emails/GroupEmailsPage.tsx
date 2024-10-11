import {
  createEmailGroup,
  CreateEmailGroup,
  getAllGroups,
} from '@/api/EmailGroupApi';
import ConfirmDialog from '@/components/ConfirmDialog';
import ErrorMessage from '@/components/ErrorMessage';
import { DeleteItem, IndexQueryFilters } from '@/types/index';
import {
  EnvelopeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { Pagination } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function GroupEmailsPage() {
  const [alert, setAlert] = useState<DeleteItem>({
    id: undefined,
    show: false,
  });

  const [filters] = useState<IndexQueryFilters>({
    name: '',
    pag: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['emailGroups'],
    queryFn: () => getAllGroups(filters),
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();

  const handleAcceptBtn = () => {
    setAlert({
      id: undefined,
      show: false,
    });
  };

  const handleDeleteBtn = (id: number) => {
    setAlert({
      id,
      show: true,
    });
  };

  // FORMULARIO

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEmailGroup>({
    defaultValues: {
      name: '',
    },
  });

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

  const handleForm = (data: CreateEmailGroup) => mutate(data);

  if (!isLoading)
    return (
      <div className='container mx-auto px-8'>
        <h2 className='text-4xl text-primary font-bold'>Group Emails </h2>
        <p className='text-xl'>Create or edit some resource</p>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <form
            onSubmit={handleSubmit(handleForm)}
            className='p-6 col-span-2 shadow-md bg-white rounded-lg h-fit'
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
            {errors.name && (
              <ErrorMessage> {errors.name.message} </ErrorMessage>
            )}
            <div className='text-center mt-8'>
              <button className='px-10 py-2 bg-primary font-bold text-white rounded-lg'>
                Save
              </button>
            </div>
          </form>
          {data && (
            <div className='shadow-md bg-white rounded-lg p-6 overflow-auto max-h-[calc(100vh-150px)] h-fit'>
              <div>
                <label htmlFor='groupSearch'>Search</label>
                <div className='border outline-primary border-gray-200 p-2 rounded-md flex gap-2'>
                  <MagnifyingGlassIcon className='w-6' />
                  <input
                    type='text'
                    id='groupSearch'
                    className='w-full outline-none border-none'
                    placeholder='Search by group name'
                  />
                </div>
              </div>
              <div className='mt-4 space-y-2  overflow-auto'>
                {data.data.map((group) => (
                  <div className='item flex justify-between p-3 items-center border-gray-300 border rounded-lg '>
                    <div className='flex gap-4 items-center'>
                      <EnvelopeIcon className='w-6' />
                      <p>{group.name}</p>
                    </div>
                    <div className='space-x-2'>
                      <button className='rounded-full p-2 hover:bg-primary hover:text-white transition-colors'>
                        <PencilSquareIcon className='w-5' />
                      </button>
                      <button
                        onClick={() => handleDeleteBtn(10)}
                        className='rounded-full p-2 hover:bg-red-500 hover:text-white transition-colors'
                      >
                        <TrashIcon className='w-5' />
                      </button>
                    </div>
                  </div>
                ))}

                <div className='flex justify-center'>
                  <Pagination
                    onChange={() => {}}
                    count={data.meta.totalPage}
                    size='small'
                    className='text-sm'
                    variant='outlined'
                    shape='rounded'
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <ConfirmDialog
          alert={alert}
          setAlert={setAlert}
          callback={handleAcceptBtn}
        />
      </div>
    );
}
