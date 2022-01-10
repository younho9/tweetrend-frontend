import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from 'src/contexts';

function VerifiedPage() {
  const { logIn } = useAuth();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const prevToken = window.localStorage.getItem('token');
    const token = new URLSearchParams(location.search).get('token');

    if (!prevToken && token && logIn) {
      logIn(token);
    }

    history.replace('/home/covid-19');
  }, [logIn, location, history]);

  return <div>Loading...</div>;
}

export default VerifiedPage;
