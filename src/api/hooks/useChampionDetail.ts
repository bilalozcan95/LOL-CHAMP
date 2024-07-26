import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import i18n from '../../i18n';

import { getLanguageForAPI } from '../../utils/languageUtils';

const fetchChampionDetail = async (name: string): Promise<any> => {
  const lang = getLanguageForAPI(i18n.language || 'tr');


  const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/11.14.1/data/${lang}/champion/${name}.json`);
  return response.data;
};


export const useChampionDetail = (name: string): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['championDetail', name],
    queryFn: () => fetchChampionDetail(name),
  });
};

