import { Dialog, DialogPanel } from '@headlessui/react';
import EmailTemplateContent from './EmailTemplateContent';
import { Dispatch } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ShowTemplateAsFullScreenProps = {
  openTemplate: boolean;
  setOpenTemplate: Dispatch<React.SetStateAction<boolean>>;
};

export default function ShowTemplateAsFullScreen({
  openTemplate,
  setOpenTemplate,
}: ShowTemplateAsFullScreenProps) {
  return (
    <Dialog
      onClose={() => {
        setOpenTemplate(false);
      }}
      open={openTemplate}
      transition
      className='fixed z-[200000] inset-0 flex overflow-visible w-screen items-center justify-center bg-black/30 transition duration-300 ease-out data-[closed]:opacity-0 '
    >
      <DialogPanel className='h-screen w-full overflow-auto space-y-4 border bg-white '>
        <div className='p-5 flex justify-end'>
          <button type='button' onClick={() => setOpenTemplate(false)}>
            <XMarkIcon className='w-6' />
          </button>
        </div>
        <EmailTemplateContent />
      </DialogPanel>
    </Dialog>
  );
}
