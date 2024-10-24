import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteEmail, getAllGroups, getEmail } from '@/api/EmailApi';
import { DeleteItem, IndexQueryFilters } from '@/types/index';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import { emailAppStore } from '@/stores/useAppStore';
import SearcherTemplate from './SearcherTemplate';

export default function EmailList() {
  const setEmail = emailAppStore((store) => store.setEmail);
  const editingId = emailAppStore((store) => store.editingId);
  const setEditingId = emailAppStore((store) => store.setEditingId);
  const duplicate = emailAppStore((store) => store.duplicate);
  const isDuplicating = emailAppStore((store) => store.isDuplicating);

  const [filters, setFilters] = useState<IndexQueryFilters>({
    name: '',
    pag: 1,
    groupId: '',
  });

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['emails'],
    queryFn: () => getAllGroups(filters),
    refetchOnWindowFocus: false,
  });

  const [alert, setAlert] = useState<DeleteItem>({
    id: undefined,
    show: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteEmail,
    onSuccess: () => {
      setAlert({
        id: undefined,
        show: false,
      });
      toast.error('Resource deleted Succesfully');
      queryClient.invalidateQueries({ queryKey: ['emails'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { data: email } = useQuery({
    queryKey: ['email', editingId],
    queryFn: () => getEmail(editingId!),
    enabled: editingId !== undefined,
  });

  useEffect(() => {
    if (email) {
      if (isDuplicating) {
        setEditingId(undefined, true);
        queryClient.invalidateQueries({ queryKey: ['email', email.id] });
        email.id = '';
      }
      setEmail(email);
    }
  }, [email]);

  const handleAcceptBtn = () => mutate(alert.id!);

  const handleDeleteBtn = (id: string) => {
    setAlert({
      id,
      show: true,
    });
  };

  const handleEditBtn = (id: string) => {
    setEditingId(id);
  };

  const handleCopyBtn = (id: string) => {
    duplicate(id);
  };

  if (isLoading) {
    return (
      <div className='p-8 flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (data) {
    return (
      <>
        <SearcherTemplate
          alert={alert}
          data={data.data}
          meta={data.meta}
          filters={filters}
          setFilters={setFilters}
          queryKey='emails'
          handleAcceptBtn={handleAcceptBtn}
          handleDeleteBtn={handleDeleteBtn}
          handleEditBtn={handleEditBtn}
          handleCopyBtn={handleCopyBtn}
          setAlert={setAlert}
          filter={true}
          editingId={email?.id}
        />
      </>
    );
  }
}
