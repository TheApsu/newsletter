import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';
import { DeleteItem } from '@/types/index';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';

type ConfirmDialogProps = {
  alert: DeleteItem;
  setAlert: Dispatch<SetStateAction<DeleteItem>>;
  callback: () => void;
};

export default function ConfirmDialog({
  alert,
  setAlert,
  callback,
}: ConfirmDialogProps) {
  return (
    <Dialog
      onClose={() =>
        setAlert({
          show: false,
          id: undefined,
        })
      }
      open={alert.show}
      transition
      className='fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0 '
    >
      <DialogBackdrop className='fixed inset-0 bg-black/30' />
      <div className='fixed inset-0 flex w-screen items-center justify-center p-4 '>
        <DialogPanel className='max-w-md w-full space-y-4 border bg-white p-8 rounded-lg  '>
          <DialogTitle className='font-bold'>
            Are you sure to delete this item?
          </DialogTitle>
          <Description>This will permanently deleted</Description>

          <div className='flex gap-4 justify-end pt-6'>
            <button
              onClick={() =>
                setAlert({
                  id: undefined,
                  show: false,
                })
              }
              className='bg-primary hover:opacity-90 transition-opacity px-4 py-1 rounded-md text-white'
            >
              Cancel
            </button>
            <button
              onClick={callback}
              className='flex items-center gap-1 border rounded-md px-4 py-1 hover:border-primary transition-colors'
            >
              Continue <ArrowRightCircleIcon className='w-5' />
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
