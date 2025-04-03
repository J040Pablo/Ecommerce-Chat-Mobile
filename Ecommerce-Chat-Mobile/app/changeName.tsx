import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const ChangeName = () => {
  const [userLogged, setUserLogged] = useState(''); // Hook useState
  const router = useRouter(); // Hook useRouter

  const handleNavigate = () => {
    if (userLogged.trim().length === 0) {
      alert('Por favor, insira um nome válido.');
      return;
    }

    // Navegar para a página de chat com o parâmetro userLogged
    router.replace({ pathname: '/chat', params: { userLogged } });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Digite seu nome..."
        placeholderTextColor="black"
        onChangeText={(text) => setUserLogged(text)}
        value={userLogged}
        mode="outlined"
        theme={{
          colors: {
            primary: '#FFD700', // Cor da borda ativa
            text: 'black', // Cor do texto
            background: '#f9f9f9', // Fundo do TextInput
          },
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#400877', // Fundo roxo escuro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textInput: {
    width: '80%',
    fontFamily: 'PressStart2P_400Regular', // Fonte estilo retrô
    fontSize: 14,
    color: 'black',
    backgroundColor: '#f9f9f9', // Fundo do TextInput
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFD700', // Borda dourada
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF4500', // Laranja vibrante
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFD700', // Borda dourada
    alignItems: 'center',
    width: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  buttonText: {
    fontFamily: 'PressStart2P_400Regular', // Fonte estilo retrô
    color: '#FFD700', // Texto dourado
    fontSize: 16,
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});

export default ChangeName;
