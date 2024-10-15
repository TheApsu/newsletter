import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { DeleteItem, IndexQueryFilters } from '@/types/index';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import { useAppStore } from '@/stores/useAppStore';
import SearcherTemplate from './SearcherTemplate';
import {
  deleteEmailTemplate,
  getAllTemplates,
  getEmailTemplate,
} from '@/api/EmailTemplateApi';

export default function EmailTemplateList() {
  const setEmail = useAppStore((store) => store.setEmail);
  const editingId = useAppStore((store) => store.editingId);
  const setEditingId = useAppStore((store) => store.setEditingId);
  const duplicate = useAppStore((store) => store.duplicate);
  const isDuplicating = useAppStore((store) => store.isDuplicating);

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
  console.log(data);

  const [alert, setAlert] = useState<DeleteItem>({
    id: undefined,
    show: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteEmailTemplate,
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
    queryFn: () => getEmailTemplate(editingId!),
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
        />
      </>
    );
  }
}
