import { getUser } from '@/components/auth/actions';
import { useEffect } from 'react';

export default () => {
  useEffect(() => {
    (async () => await getUser())();
  }, []);
};
