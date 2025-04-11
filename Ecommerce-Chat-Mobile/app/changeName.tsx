import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const ChangeName = () => {
  const [userLogged, setUserLogged] = useState(''); // Hook useState
  const router = useRouter(); // Hook useRouter

  const handleNavigate = (chatType: 'geral' | 'ai') => {
    if (userLogged.trim().length === 0) {
      alert('Por favor, insira um nome válido.');
      return;
    }

    // Navegar para a página de chat com o parâmetro userLogged e o tipo de chat
    if (chatType === 'geral') {
      router.replace({ pathname: '/chatGeral', params: { userName: userLogged } });
    } else if (chatType === 'ai') {
      router.replace({ pathname: '/chat', params: { userLogged, chatType } });
    }
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
      {userLogged.trim() !== '' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('geral')}
          >
            <Text style={styles.buttonText}>Chat Geral</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('ai')}
          >
            <Text style={styles.buttonText}>Chat com IA</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Botão para voltar à Home */}
      <TouchableOpacity style={styles.homeButton} onPress={() => router.replace('/home')}>
        <Text style={styles.homeButtonText}>Voltar para Home</Text>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#FF4500', // Laranja vibrante
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFD700', // Borda dourada
    alignItems: 'center',
    width: '40%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  buttonText: {
    fontFamily: 'PressStart2P_400Regular', // Fonte estilo retrô
    color: '#FFD700', // Texto dourado
    fontSize: 14,
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    marginTop: 20,
  },
  homeButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#FFF',
    fontSize: 12,
  },
});

export default ChangeName;
