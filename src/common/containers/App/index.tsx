import { RouterProvider } from 'react-router-dom';
import { router } from '../../router';
import { useEffect, useState } from 'react';
import { Loader } from '../../components';
import { useTypedSelector, useTypedDispatch } from '../../hooks';
import { getToken } from '../../../services';
import { Notification } from '../../components';
import { coursesMetadataActions, commonActions } from '../../reducer';
import { storage } from '../../data';

const App = () => {
  const dispatch = useTypedDispatch();
  const [token, setToken] = useState('');
  const { isLoading } = useTypedSelector(({ common }) => common);
  const coursesMetadata = useTypedSelector(({ coursesMetadata: metadata }) => metadata);

  useEffect(() => {
    if (!token) {
      dispatch(commonActions.update({ isLoading: true, error: '' }));
      getToken()
        .then((newToken: string) => {
          dispatch(commonActions.update({ isLoading: false, error: '' }));
          setToken(newToken);
        })
        .catch(() => dispatch(commonActions.update({ isLoading: false, error: 'Token didn\'t get!' })))
    }
  }, [dispatch, token])

  useEffect(() => {
    const metadata = storage.get();
    if (!coursesMetadata.page && metadata) {
      dispatch(coursesMetadataActions.setCourseMetadata(metadata))
    }
  }, [coursesMetadata.page, dispatch])

  if (isLoading) return (
    <Loader />
  )

  return (
    <>
      <RouterProvider router={router} />
      <Notification />
    </>
  )
}

export { App }
