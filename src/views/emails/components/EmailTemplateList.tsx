import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteEmail, getEmail } from '@/api/EmailApi';
import { DeleteItem, IndexQueryFilters } from '@/types/index';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import { emailAppStore } from '@/stores/useAppStore';
import SearcherTemplate from './SearcherTemplate';
import { getAllTemplates } from '@/api/EmailTemplateApi';

export default function EmailList() {
  const setEmail = emailAppStore((store) => store.setEmail);
  const editingId = emailAppStore((store) => store.editingId);
  const setEditingId = emailAppStore((store) => store.setEditingId);

  const [filters, setFilters] = useState<IndexQueryFilters>({
    name: '',
    pag: 1,
  });

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => getAllTemplates(filters),
    refetchOnWindowFocus: false,
  });

  const [alert, setAlert] = useState<DeleteItem>({
    id: undefined,
    show: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteEmail,
    onSuccess: (data) => {
      console.log(data);
      setAlert({
        id: undefined,
        show: false,
      });
      toast.error('Resource deleted Succesfully');
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { data: email } = useQuery({
    queryKey: ['templates', editingId],
    queryFn: () => getEmail(editingId!),
    enabled: editingId !== undefined,
  });

  useEffect(() => {
    if (email) {
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
          setAlert={setAlert}
        />
      </>
    );
  }
}
