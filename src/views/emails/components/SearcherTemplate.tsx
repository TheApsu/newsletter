import ConfirmDialog from '@/components/ConfirmDialog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DeleteItem, EmailGroup, IndexQueryFilters, Meta } from '@/types/index';
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Pagination } from '@mui/material';
import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
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
  handleCopyBtn: (id: string) => void;
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
  handleCopyBtn,
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

  const [mQuery, setMQuery] = useState<{ matches: boolean }>({
    matches: window.innerWidth >= 1024 ? true : false,
  });

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1023px)');
    if (mediaQuery.matches) {
      setExpanded(true);
    }
    mediaQuery.addEventListener('change', (ev) => {
      if (ev.matches) {
        setExpanded(true);
        setMQuery({ matches: true });
      } else {
        setMQuery({ matches: false });
      }
    });
  }, []);

  const handleExpandBtn = () => {
    setExpanded(!expanded);
  };

  const { data: emailGroup } = useQuery({
    queryKey: ['emailGroups'],
    queryFn: () => getAllGroups({ pag: 1 }),
    refetchOnWindowFocus: false,
  });

  // HANDLERS BUTTONS

  const handleEditBtnT = (id: string) => {
    if (!mQuery.matches) {
      setExpanded(false);
    }
    handleEditBtn(id);
  };

  const handleCopyBtnT = (id: string) => {
    if (!mQuery.matches) {
      setExpanded(false);
    }
    handleCopyBtn(id);
  };

  const handleDeleteBtnT = (id: string) => {
    if (!mQuery.matches) {
      setExpanded(false);
    }
    handleDeleteBtn(id);
  };

  return (
    <>
      {!mQuery.matches && (
        <div className='col-span-2'>
          <button
            onClick={handleExpandBtn}
            className={`flex gap-2 ${
              expanded ? 'bg-primary text-white' : 'bg-white text-black'
            } px-4 py-1 rounded-lg shadow-md font-bold items-center transition-colors`}
          >
            {expanded ? 'Hidde' : 'Show'} List{' '}
            {expanded ? (
              <ArrowsPointingInIcon className='w-5' />
            ) : (
              <ArrowsPointingOutIcon className='w-5' />
            )}
          </button>
        </div>
      )}
      <div
        className={`order-1 lg:order-2 shadow-md ${
          expanded ? 'w-full h-full' : 'w-0 h-0 overflow-hidden p-0'
        } lg:block col-span-3 lg:relative transition-all lg:col-span-1 bg-white rounded-lg p-6 overflow-auto  h-fit`}
      >
        <div>
          <label htmlFor='groupSearch'>Search</label>
          <div className='border outline-primary border-gray-200 p-2 rounded-md flex gap-2'>
            <MagnifyingGlassIcon className='w-6 min-w-6' />
            <input
              type='text'
              id='groupSearch'
              className='w-full outline-none border-none'
              placeholder='Search'
              onChange={handleChange}
            />
            {filter && emailGroup && (
              <select
                id='groupId'
                defaultValue=''
                className='w-full border outline-primary border-gray-200 p-1 rounded-md'
                onChange={handleSelectChange}
              >
                <option value=''>All</option>
                {emailGroup.data.map((emailGroup: EmailGroup) => (
                  <option value={emailGroup.id} key={emailGroup.id}>
                    {emailGroup.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className='mt-4 space-y-2 min-h-[350px] max-h-[650px] overflow-auto'>
          {data.map((item) => (
            <div
              key={item.id}
              className='item flex justify-between p-3 items-center border-gray-300 border rounded-lg '
            >
              <div className='flex gap-4 items-center max-w-[calc(100%-100px)] flex-1 w-full overflow-hidden'>
                <EnvelopeIcon className='w-6 min-w-6' />
                <p className='text-nowrap overflow-hidden text-ellipsis'>
                  {item.name}
                </p>
              </div>
              <div className='space-x-2 '>
                <button
                  onClick={() => handleEditBtnT(item.id)}
                  className='rounded-full p-2 hover:bg-primary hover:text-white transition-colors'
                >
                  <PencilSquareIcon className='w-5' />
                </button>
                <button
                  onClick={() => handleCopyBtnT(item.id)}
                  className='rounded-full p-2 hover:bg-secondary hover:text-white transition-colors'
                >
                  <DocumentDuplicateIcon className='w-5' />
                </button>
                <button
                  onClick={() => handleDeleteBtnT(item.id)}
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
