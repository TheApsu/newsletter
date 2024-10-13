import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

import { AuthSignIn, User } from '@/types/index';
import ErrorMessage from '@/components/ErrorMessage';
import { useAppStore } from '@/stores/useAppStore';
import { signIn } from '@/api/AuthApi';

type SignInPageProps = {
  uid: User['id'];
};

export default function SignInPage({ uid }: SignInPageProps) {
  const setUser = useAppStore((state) => state.setUser);

  const { mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log('data :>> ', data);
      if (data) {
        setUser(data);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSignIn>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const location = useLocation();
  const handleForm = (data: AuthSignIn) => mutate(data);

  if (uid) {
    return <Navigate to={location.state.prevPath} />;
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      <div className='min-w-[450px]'>
        <h2 className='text-4xl text-primary text-center font-black'>Login</h2>
        <p className='text-center'>Enter your details to sign in.</p>
        <form
          onSubmit={handleSubmit(handleForm)}
          className='container mt-8 mx-auto space-y-6 bg-white p-16 rounded-lg shadow-lg'
          noValidate
        >
          <div>
            <div className='flex rounded-md border border-gray-200 pl-2 gap-2 overflow-hidden'>
              <UserIcon className='w-6' />
              <input
                id='email'
                className='w-full p-3 border-none outline-none'
                type='email'
                placeholder='Enter your email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
            </div>
            {errors.email && (
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <div className='flex rounded-md border border-gray-200 pl-2 gap-2 overflow-hidden'>
              <LockClosedIcon className='w-6' />
              <input
                id='password'
                className='w-full p-3 border-none outline-none'
                type='password'
                placeholder='Enter your password'
                {...register('password', {
                  required: 'Password is required',
                })}
              />
            </div>
            {errors.password && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
          </div>
          <button className='w-full bg-primary text-white py-3 font-bold rounded-md'>
            Sign In
          </button>
        </form>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </div>
  );
}
