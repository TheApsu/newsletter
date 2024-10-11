import { useState } from 'react';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { User } from '../types';

type SignInPageProps = {
  uid: User['uid'];
};

export default function Layout({ uid }: SignInPageProps) {
  const [sizes, setSizes] = useState([100, '40%', 'auto']);

  const layoutCSS = {
    height: '100%',
  };

  const activeLink = (isActive: boolean) =>
    isActive
      ? 'bg-white font-bold transition-all  block p-3 rounded-lg [&_.wrapper-svg]:bg-primary [&_svg]:text-white shadow-md'
      : 'transition-all block p-3 rounded-lg [&_.wrapper-svg]:bg-white ';

  if (!uid) {
    return <Navigate to='/sign-in' />;
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
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M20.297 9.5h.953c.268 0 .523-.06.75-.168v7.418a3.25 3.25 0 0 1-3.066 3.245L18.75 20H5.25a3.25 3.25 0 0 1-3.245-3.066L2 16.75V8.608l9.652 5.056a.75.75 0 0 0 .696 0zM12.525 4H5.25l-.186.005a3.25 3.25 0 0 0-3.048 2.919L12 12.154L17.065 9.5H13.75a1.75 1.75 0 0 1-1.225-3A1.74 1.74 0 0 1 12 5.25c0-.49.201-.932.525-1.25m8.725-2a.75.75 0 1 1 0 1.5h-7.5a.747.747 0 0 1-.75-.75a.75.75 0 0 1 .75-.75zm0 2.5a.75.75 0 1 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5zM13 7.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75'
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
