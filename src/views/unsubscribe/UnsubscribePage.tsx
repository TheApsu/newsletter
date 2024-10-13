import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { unsubscribe, UnsubscribeAPI } from '@/api/UnsubscribeApi';
import { toast, ToastContainer } from 'react-toastify';
import ErrorMessage from '@/components/ErrorMessage';

const reasons = [
  {
    value: 'I no longer wish to receive these emails',
  },
  {
    value:
      'The emails are no longer for content that I originally signed up for',
  },
  {
    value:
      'I never gave my permission to receive these emails, please report this as abuse',
  },
  {
    value: 'I unsubscribed by accident! Please add me back to this list',
  },
  {
    value: 'Other',
  },
];

export default function UnsubscribePage() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UnsubscribeAPI>({
    defaultValues: {
      reason: '',
      email: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: unsubscribe,
    onSuccess: (data) => {
      console.log(data);
      if (!data.item) {
        toast.error('The entered email was not found');
      } else {
        toast.success('You has been unsubscribed successfully');
      }
      reset();
    },
    onError: () => {
      toast.error('An error has been ocurred');
    },
  });

  const handleForm = (formData: UnsubscribeAPI) => mutate(formData);

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      <div className='space-y-3'>
        <h4 className='text-primary text-center font-bold text-3xl'>
          Do you want to unsubscribe?
        </h4>
        <p className='text-center'>
          Fill the next form fields and send to unsubscribe
        </p>
        <form
          onSubmit={handleSubmit(handleForm)}
          className='bg-white rounded-md p-8 shadow-md'
        >
          <h4 className='font-bold text-xl mb-4'>Reason</h4>
          <div className='flex flex-col gap-4 justify-center'>
            {reasons.map((reason, index) => (
              <label
                key={index}
                className='flex items-center gap-2'
                htmlFor={reason.value}
              >
                <input
                  id={reason.value}
                  value={reason.value}
                  type='radio'
                  {...register('reason', {
                    required: 'This field is required',
                  })}
                />
                {reason.value}
              </label>
            ))}
            {errors.reason && (
              <ErrorMessage>{errors.reason.message}</ErrorMessage>
            )}
          </div>
          <h4 className='font-bold text-xl my-4'>Email</h4>
          <label htmlFor='email'>
            Your Email{' '}
            <input
              className='p-2 w-full border border-gray-200 rounded-md'
              type='email'
              id='email'
              placeholder='example@example.com'
              {...register('email', {
                required: 'This field is required',
              })}
            />
          </label>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <div className='text-center mt-8'>
            <button className='bg-primary text-wrap py-1 px-4 text-white rounded-md'>
              Unsubscribe
            </button>
          </div>
        </form>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </div>
  );
}
