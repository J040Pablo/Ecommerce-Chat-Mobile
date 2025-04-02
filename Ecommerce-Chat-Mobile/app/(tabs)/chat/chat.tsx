import React, { Fragment, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Ballon from './baloon';
import { SafeAreaView } from 'react-native-safe-area-context';

type Message = {
  text: string;
  user: object;
};

const Chat = () => {
  const [userLogged, setUserLogged] = useState<object>({});
  const [chatState, setChatState] = useState<{ messages: Message[] }>({ messages: [] });
  const [message, setMessage] = useState<string>('');

  const sendMessage = () => {
    if (message.trim().length > 0) {
      const newMessage: Message = { text: message, user: userLogged };
      setChatState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, newMessage],
      }));
      setMessage('');
    }
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {chatState.messages.length > 0 ? (
            chatState.messages.map((m, index) => (
              <Ballon key={index} message={m} currentUser={userLogged} />
            ))
          ) : (
            <Text style={styles.noMessagesText}>Não há mensagens</Text>
          )}
        </ScrollView>
      </View>
      <SafeAreaView>
        <View style={styles.messageTextInputContainer}>
          <TextInput
            style={styles.messageTextInput}
            placeholder="Digite sua mensagem"
            value={message}
            multiline
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity
            style={[styles.button, !message.trim() && styles.disabledButton]}
            disabled={!message.trim()}
            onPress={sendMessage}
          >
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#400877',
  },
  scrollViewContainer: {
    padding: 10,
  },
  noMessagesText: {
    alignSelf: 'center',
    color: '#FFD700',
    fontFamily: 'PressStart2P_400Regular',
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  messageTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#34495e',
    backgroundColor: 'rgba(25, 25, 25, 0.9)', //fundo da caixa inteira
  },
  messageTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9', //fundo do digite uma mensagem
    fontFamily: 'PressStart2P_400Regular',
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
    borderColor: '#7f8c8d', //fundo do enviar
  },
  buttonText: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#FFD700',
    fontSize: 16,
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});

export default Chat;
