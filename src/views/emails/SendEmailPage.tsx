import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { SendEmail, sendEmail } from '@/api/SendEmailApi';
import ErrorMessage from '@/components/ErrorMessage';
import { EmailGroup } from '@/types/index';
import { getAllGroups } from '@/api/EmailGroupApi';
import { getAllTemplates } from '@/api/EmailTemplateApi';

export default function SendEmailPage() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SendEmail>({
    defaultValues: {
      templateId: '',
      groupId: '',
    },
  });

  const { data: emailTemplates } = useQuery({
    queryKey: ['templates1'],
    queryFn: () => getAllTemplates(),
  });

  const { data: emailGroup } = useQuery({
    queryKey: ['emailGroups1'],
    queryFn: () => getAllGroups(),
  });

  const { mutate } = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      toast.success('Created Succesfully');
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const clearForm = () => {
    reset();
  };

  const handleForm = (data: SendEmail) => {
    mutate(data);
  };

  if (emailGroup && emailTemplates) {
    return (
      <div className='container mx-auto px-8'>
        <h2 className='text-4xl text-primary font-bold'>Send Email </h2>
        <div className=' gap-4 mt-8'>
          <form
            onSubmit={handleSubmit(handleForm)}
            className='p-6 col-span-2 shadow-md bg-white rounded-lg h-fit space-y-4'
          >
            <div>
              <label htmlFor='groupId'>
                Select a Group
                <select
                  id='groupId'
                  className='w-full border outline-primary border-gray-200 p-2 rounded-md'
                  defaultValue=''
                  {...register('groupId', {
                    required: 'This field is required',
                  })}
                >
                  <option value='' disabled>
                    Select an Option
                  </option>
                  {emailGroup.data?.map((emailGroup: EmailGroup) => (
                    <option value={emailGroup.id} key={emailGroup.id}>
                      {emailGroup.name}
                    </option>
                  ))}
                </select>
              </label>
              {errors.groupId && (
                <ErrorMessage> {errors.groupId.message} </ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor='templateId'>
                Select a Template
                <select
                  id='templateId'
                  defaultValue=''
                  className='w-full border outline-primary border-gray-200 p-2 rounded-md'
                  {...register('templateId', {
                    required: 'This field is required',
                  })}
                >
                  <option value='' disabled>
                    Select an Option
                  </option>
                  {emailTemplates?.map((emailGroup: EmailGroup) => (
                    <option value={emailGroup.id} key={emailGroup.id}>
                      {emailGroup.name}
                    </option>
                  ))}
                </select>
              </label>
              {errors.groupId && (
                <ErrorMessage> {errors.groupId.message} </ErrorMessage>
              )}
            </div>

            <div className='text-center mt-8 space-x-4'>
              <button className='px-10 py-2 bg-primary font-bold text-white rounded-lg'>
                Send
              </button>
              <button
                onClick={clearForm}
                type='button'
                className='px-10 py-2  text-primary font-bold border border-primary rounded-lg'
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
