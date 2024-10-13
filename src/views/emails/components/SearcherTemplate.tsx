import ConfirmDialog from '@/components/ConfirmDialog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DeleteItem, EmailGroup, IndexQueryFilters, Meta } from '@/types/index';
import {
  EnvelopeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Pagination } from '@mui/material';
import { ChangeEvent, Dispatch } from 'react';
import { handleChangeDebounce } from 'utils/debounceInput';
import { getAllGroups } from '@/api/EmailGroupApi';

type SearcherTemplateProps = {
  data: { id: string; name: string }[];
  meta: Meta;
  alert: DeleteItem;
  filters: IndexQueryFilters;
  queryKey: string;
  setFilters: Dispatch<React.SetStateAction<IndexQueryFilters>>;
  setAlert: Dispatch<React.SetStateAction<DeleteItem>>;
  handleDeleteBtn: (id: string) => void;
  handleEditBtn: (id: string) => void;
  handleAcceptBtn: () => void;
  filter?: boolean | false;
};

export default function SearcherTemplate({
  data,
  meta,
  alert,
  filters,
  queryKey,
  setFilters,
  setAlert,
  handleDeleteBtn,
  handleEditBtn,
  handleAcceptBtn,
  filter = false,
}: SearcherTemplateProps) {
  const queryClient = useQueryClient();
  const handleChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    const value = await handleChangeDebounce(ev);
    setFilters({
      ...filters,
      name: value,
    });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }, 100);
  };
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFilters({
      ...filters,
      groupId: selectedValue,
    });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }, 100);
    // Llama a la función que necesitas aquí
  };
  const { data: emailGroup } = useQuery({
    queryKey: ['emailGroups'],
    queryFn: () => getAllGroups({ pag: 1 }),
    refetchOnWindowFocus: false,
  });

  return (
    <>
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
              onChange={handleChange}
            />
            {filter && emailGroup && (
              <select
                id='groupId'
                defaultValue=''
                className='w-full border outline-primary border-gray-200 p-2 rounded-md'
                onChange={handleSelectChange}
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
            )}
          </div>
        </div>
        <div className='mt-4 space-y-2  overflow-auto'>
          {data.map((group) => (
            <div
              key={group.id}
              className='item flex justify-between p-3 items-center border-gray-300 border rounded-lg '
            >
              <div className='flex gap-4 items-center'>
                <EnvelopeIcon className='w-6' />
                <p>{group.name}</p>
              </div>
              <div className='space-x-2'>
                <button
                  onClick={() => handleEditBtn(group.id)}
                  className='rounded-full p-2 hover:bg-primary hover:text-white transition-colors'
                >
                  <PencilSquareIcon className='w-5' />
                </button>
                <button
                  onClick={() => handleDeleteBtn(group.id)}
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
              count={meta.totalPage}
              size='small'
              className='text-sm'
              variant='outlined'
              shape='rounded'
            />
          </div>
        </div>
      </div>
      <ConfirmDialog
        alert={alert}
        setAlert={setAlert}
        callback={handleAcceptBtn}
      />
    </>
  );
}
