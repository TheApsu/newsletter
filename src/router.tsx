import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAppStore } from './stores/useAppStore';
import SignInPage from './views/signin/SignInPage';
import Spinner from './components/Spinner';
import Layout from './layouts/Layout';
import GroupEmailsPage from './views/emails/GroupEmailsPage';
import EmailsPage from './views/emails/EmailsPage';
import EmailTemplatePage from './views/emails/EmailTemplatePage';
import SendEmailPage from './views/emails/SendEmailPage';
import UnsubscribePage from './views/unsubscribe/Unsubscribepage';

// PAGES AND LAYOUT

export default function AppRouter() {
  const loadingUser = useAppStore((state) => state.loadingUser);
  const user = useAppStore((state) => state.user);
  const getUser = useAppStore((state) => state.getUser);

  useEffect(() => {
    getUser();
  }, []);

  if (loadingUser) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/sign-in'
          element={
            <Suspense fallback='Cargando...'>
              <SignInPage uid={user.id} />
            </Suspense>
          }
        />
        <Route
          path='/unsubscribe'
          element={
            <Suspense fallback='Cargando...'>
              <UnsubscribePage />
            </Suspense>
          }
        />
        <Route element={<Layout uid={user.id} />}>
          <Route
            path='/group-emails'
            index
            element={
              <Suspense fallback='Cargando...'>
                <GroupEmailsPage />
              </Suspense>
            }
          />
          <Route
            path='/emails'
            index
            element={
              <Suspense fallback='Cargando...'>
                <EmailsPage />
              </Suspense>
            }
          />
          <Route
            path='/templates'
            index
            element={
              <Suspense fallback='Cargando...'>
                <EmailTemplatePage />
              </Suspense>
            }
          />
          <Route
            path='/send'
            index
            element={
              <Suspense fallback='Cargando...'>
                <SendEmailPage />
              </Suspense>
            }
          />

          <Route path='*' element={<Navigate to={'/group-emails'} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
