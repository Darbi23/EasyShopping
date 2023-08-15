import {useState, useEffect} from 'react';
import foodApi from '../api/foodApi';

const useResults = () => {
  const [result, setResult] = useState({name: '', image_url: ''});
  const [errorMsg, setErrorMsg] = useState('');

  const searchApi = async (searchTerm: any, offset: number) => {
    try {
      const response = await foodApi.get('/search', {
        params: {
          limit: offset,
          term: searchTerm,
          location: 'las vegas',
          // offset: offset,
        },
      });
      setResult(response.data.businesses);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  useEffect(() => {
    searchApi('Pizza');
  }, []);

  return [searchApi, result, errorMsg];
};

export default useResults;
