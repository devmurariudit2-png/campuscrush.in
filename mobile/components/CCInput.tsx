import React from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';
import { Colors } from '../constants/colors';

interface CCInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const CCInput: React.FC<CCInputProps> = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error ? styles.errorBorder : null]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.muted}
          {...props}
        />
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
  },
  label: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: Colors.dark,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    height: 56,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  input: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 16,
    color: Colors.dark,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
