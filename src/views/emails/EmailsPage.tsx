import ConfirmDialog from '@/components/ConfirmDialog';
import { DeleteItem } from '@/types/index';
import {
  EnvelopeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { Pagination } from '@mui/material';
import { useState } from 'react';

export default function EmailsPage() {
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

  const handleDeleteBtn = (id: number) => {
    setAlert({
      id,
      show: true,
    });
  };

  return (
    <div className='container mx-auto px-8'>
      <h2 className='text-4xl text-primary font-bold'>Emails </h2>
      <p className='text-xl'>Create or edit some resource</p>
      <div className='grid grid-cols-3 gap-4 mt-8'>
        <form className='p-6 col-span-2 shadow-md bg-white rounded-lg h-fit space-y-4'>
          <div>
            <label htmlFor='groupName'>
              Select a Group
              <select
                id='groupName'
                className='w-full border outline-primary border-gray-200 p-2 rounded-md'
                value=''
              >
                <option value='' disabled>
                  Select an Option
                </option>
                <option>Follow Up</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor='email'>
              Enter a valid email
              <input
                id='email'
                className='w-full border outline-primary border-gray-200 p-2 rounded-md'
                type='email'
              />
            </label>
          </div>
          <div className='text-center !mt-8'>
            <button className='px-10 py-2 bg-primary font-bold text-white rounded-lg'>
              Save
            </button>
          </div>
        </form>
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
            <div className='item flex justify-between p-3 items-center border-gray-300 border rounded-lg '>
              <div className='flex gap-4 items-center'>
                <EnvelopeIcon className='w-6' />
                <p>Follow Up</p>
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
            <div className='flex justify-center'>
              <Pagination
                onChange={() => {}}
                count={46}
                size='small'
                className='text-sm'
                variant='outlined'
                shape='rounded'
              />
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        alert={alert}
        setAlert={setAlert}
        callback={handleAcceptBtn}
      />
    </div>
  );
}
