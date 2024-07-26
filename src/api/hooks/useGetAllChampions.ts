import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import i18n from '../../i18n';

import { getLanguageForAPI } from '../../utils/languageUtils';

const fetchAllChampions = async () => {
  const lang = getLanguageForAPI(i18n.language || 'tr');
  const response = await axios.get(`http://ddragon.leagueoflegends.com/cdn/11.14.1/data/${lang}/champion.json`);
  return response.data;
};


export const useGetAllChampions = () => {
  return useQuery({
    queryKey: ['allChampions'],
    queryFn: fetchAllChampions,
    staleTime: 0, 

  });
};
