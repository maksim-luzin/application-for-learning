import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useTypedSelector } from '../../hooks';

const Notification = () => {
  const { error } = useTypedSelector(({ common }) => common);
  if (error) NotificationManager.error(error);

  return <NotificationContainer />
};

export { Notification };