export const getLanguageForAPI = (language: string): string => {
    const languageMap: { [key: string]: string } = {
      tr: 'tr_TR',
      en: 'en_US',
      // Diğer diller burada tanımlanabilir
    };
    return languageMap[language] || 'tr_TR'; // Varsayılan olarak 'tr_TR' kullanılıyor
  };