import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export type Props = {
  path?: string;
  headers?: object;
};

const useStatistic = (props?: Props) => {
  const history = useHistory();
  const host = window.location.hostname;
  const referer = localStorage.getItem('referer');
  const [responce, setResponce] = useState<Object>();
  const path = props?.path ? props.path : '/stats';

  const headers = {
    headers: props?.headers,
  };
  const params = {
    params: {
      referer: host + referer,
      url: host + history.location.pathname,
    }
  };

  useEffect(() => {
    if (referer !== history.location.pathname) {
      axios
        .put(path, params, headers)
        .then((resp) => setResponce(resp));
      localStorage.setItem('referer', history.location.pathname);
    }
  });

  return responce;
};

export default useStatistic;
