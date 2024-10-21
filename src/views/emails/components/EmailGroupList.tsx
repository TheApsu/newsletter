import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteEmailGroup,
  getAllGroups,
  getEmailGroup,
} from '@/api/EmailGroupApi';
import { DeleteItem, IndexQueryFilters } from '@/types/index';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import { emailGroupAppStore } from '@/stores/useAppStore';
import SearcherTemplate from './SearcherTemplate';

export default function EmailGroupList() {
  const setEmailGroup = emailGroupAppStore((store) => store.setEmailGroup);
  const editingId = emailGroupAppStore((store) => store.editingId);
  const setEditingId = emailGroupAppStore((store) => store.setEditingId);
  const duplicate = emailGroupAppStore((store) => store.duplicate);
  const isDuplicating = emailGroupAppStore((store) => store.isDuplicating);

  const [filters, setFilters] = useState<IndexQueryFilters>({
    name: '',
    pag: 1,
  });

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['emailGroups'],
    queryFn: () => getAllGroups(filters),
    refetchOnWindowFocus: false,
  });

  const handleCopyBtn = (id: string) => {
    duplicate(id);
  };

  const [alert, setAlert] = useState<DeleteItem>({
    id: undefined,
    show: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteEmailGroup,
    onSuccess: (data) => {
      console.log(data);
      setAlert({
        id: undefined,
        show: false,
      });
      toast.error('Resource deleted Succesfully');
      queryClient.invalidateQueries({ queryKey: ['emailGroups'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { data: emailGroup } = useQuery({
    queryKey: ['emailGroup', editingId],
    queryFn: () => getEmailGroup(editingId!),
    enabled: editingId !== undefined,
  });

  useEffect(() => {
    if (emailGroup) {
      if (isDuplicating) {
        setEditingId(undefined, true);
        queryClient.invalidateQueries({ queryKey: ['email', emailGroup.id] });
        emailGroup.id = '';
      }
      setEmailGroup(emailGroup);
    }
  }, [emailGroup]);

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
          queryKey='emailGroups'
          handleAcceptBtn={handleAcceptBtn}
          handleDeleteBtn={handleDeleteBtn}
          handleEditBtn={handleEditBtn}
          handleCopyBtn={handleCopyBtn}
          setAlert={setAlert}
          editingId={emailGroup?.id}
        />
      </>
    );
  }
}
