import { useState } from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { User } from '../types';
import Logo from '@/components/Logo';
import { useAppStore } from '@/stores/useAppStore';

type SignInPageProps = {
  uid: User['id'];
};

export default function Layout({ uid }: SignInPageProps) {
  const logout = useAppStore((store) => store.logout);
  const [sizes, setSizes] = useState([100, '40%', 'auto']);

  const layoutCSS = {
    height: '100%',
  };

  const activeLink = (isActive: boolean) =>
    isActive
      ? 'bg-white font-bold transition-all  block p-3 rounded-lg [&_.wrapper-svg]:bg-primary [&_svg]:text-white shadow-md'
      : 'transition-all block p-3 rounded-lg [&_.wrapper-svg]:bg-white ';

  if (!uid) {
    return <Navigate to='/sign-in' state={{ prevPath: location.pathname }} />;
  }

  return (
    <div style={{ height: '100vh' }} className='bg-gray-100'>
      <SplitPane
        sashRender={() => <></>}
        split='vertical'
        sizes={sizes}
        onChange={setSizes}
        allowResize={false}
      >
        <Pane minSize={50}>
          <div style={{ ...layoutCSS }} className='p-4'>
            <Logo />
            <nav className='space-y-3'>
              <NavLink
                to='/group-emails'
                className={({ isActive }) => activeLink(isActive)}
              >
                <div className='flex gap-4 items-center '>
                  <div className='wrapper-svg p-2 rounded-md shadow-md'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 26 26'
                    >
                      <path
                        fill='currentColor'
                        d='M17.531 1c-1.798 0-3.367.927-4.062 2.688c1.459 1.204 2.469 3.067 2.469 5.593c0 2.697-1.272 5.162-2.594 6.75c2.106.797 5.402 2.394 6.344 4.844c3.318-.184 6.28-.852 6.28-2.75V17.5c0-1.74-3.034-3.443-5.718-4.344c-.122-.04-.89-.226-.406-1.719c1.26-1.316 2.125-3.446 2.125-5.53C21.969 2.696 19.973 1 17.53 1zM8.97 4.094c-2.6 0-4.844 1.775-4.844 5.187c0 2.23 1.06 4.506 2.406 5.906c.525 1.399-.428 2.395-.625 2.47C3.186 18.653 0 20.452 0 22.25v.688c0 2.449 4.671 3 9 3c4.334 0 8.969-.551 8.969-3v-.688c0-1.852-3.208-3.635-6.063-4.594c-.13-.043-.951-.913-.437-2.5h-.031c1.34-1.4 2.5-3.654 2.5-5.875c0-3.412-2.371-5.187-4.97-5.187z'
                      />
                    </svg>
                  </div>
                  <p>Group Emails</p>
                </div>
              </NavLink>
              <NavLink
                to='/emails'
                className={({ isActive }) => activeLink(isActive)}
              >
                <div className='flex gap-4 items-center'>
                  <div className='p-2 rounded-md wrapper-svg shadow-md'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M20.297 9.5h.953c.268 0 .523-.06.75-.168v7.418a3.25 3.25 0 0 1-3.066 3.245L18.75 20H5.25a3.25 3.25 0 0 1-3.245-3.066L2 16.75V8.608l9.652 5.056a.75.75 0 0 0 .696 0zM12.525 4H5.25l-.186.005a3.25 3.25 0 0 0-3.048 2.919L12 12.154L17.065 9.5H13.75a1.75 1.75 0 0 1-1.225-3A1.74 1.74 0 0 1 12 5.25c0-.49.201-.932.525-1.25m8.725-2a.75.75 0 1 1 0 1.5h-7.5a.747.747 0 0 1-.75-.75a.75.75 0 0 1 .75-.75zm0 2.5a.75.75 0 1 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5zM13 7.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75'
                      />
                    </svg>
                  </div>
                  <p>Emails</p>
                </div>
              </NavLink>
              <NavLink
                to='/templates'
                className={({ isActive }) => activeLink(isActive)}
              >
                <div className='flex gap-4 items-center'>
                  <div className='p-2 rounded-md wrapper-svg shadow-md'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z'
                      />
                    </svg>
                  </div>
                  <p>Templates</p>
                </div>
              </NavLink>
              <NavLink
                to='/send'
                className={({ isActive }) => activeLink(isActive)}
              >
                <div className='flex gap-4 items-center'>
                  <div className='p-2 rounded-md wrapper-svg shadow-md'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M1.946 9.315c-.522-.174-.526-.455.01-.634L21.044 2.32c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.678.045L12 14l6-8l-8 6z'
                      />
                    </svg>
                  </div>
                  <p>Send Emails</p>
                </div>
              </NavLink>
              <button
                onClick={logout}
                className='transition-all block p-3 rounded-lg [&_.wrapper-svg]:bg-white'
              >
                <div className='flex gap-4 items-center'>
                  <div className='p-2 rounded-md wrapper-svg shadow-md'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z'
                      />
                    </svg>
                  </div>
                  <p>Logout</p>
                </div>
              </button>
            </nav>
          </div>
        </Pane>
        <Pane className='overflow-auto'>
          <div className='overflow-auto p-4'>
            <main>
              <div className='overflow-visible'>
                <Outlet />
              </div>
            </main>
          </div>
        </Pane>
      </SplitPane>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </div>
  );
}
