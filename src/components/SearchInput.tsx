// components/SearchInput.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText }) => {
  const {t}=useTranslation('tabmenu')
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={t('searchHeaderTitle')}
        placeholderTextColor="#c8aa6e"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#c8aa6e',
  },
  input: {
    height: 40,
    color: '#c8aa6e',
    fontSize: 18,
  },
});

export default SearchInput;
