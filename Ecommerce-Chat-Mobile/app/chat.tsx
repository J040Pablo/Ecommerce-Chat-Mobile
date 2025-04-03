import React, { Fragment, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

class Message {
  text: string;
  sentBy: string;

  constructor(text: string, sentBy: string) {
    this.text = text;
    this.sentBy = sentBy;
  }
}

const Chat = () => {
  const { userLogged } = useLocalSearchParams(); // Recebe o parâmetro da navegação
  const userLoggedString = Array.isArray(userLogged) ? userLogged[0] : userLogged || 'Anônimo'; // Garante que seja uma string
  const [chatState, setChat] = useState<{ messages: Message[] }>({ messages: [] });
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim().length > 0) {
      const newMessage = new Message(message, userLoggedString); // Usa a classe Message
      setChat((prevState) => ({
        messages: [...prevState.messages, newMessage],
      }));
      setMessage('');
    }
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          data={chatState.messages}
          renderItem={({ item }) => <Ballon message={item} currentUser={userLoggedString} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <Text style={styles.noMessagesText}>Nenhuma mensagem ainda</Text>
          )}
        />
      </View>
      <SafeAreaView>
        <View style={styles.messageTextInputContainer}>
          <TextInput
            style={styles.messageTextInput}
            placeholder="Digite sua mensagem..."
            value={message}
            multiline
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity
            onPress={() => sendMessage()}
            style={[styles.button, !message.trim() && styles.disabledButton]}
            disabled={!message.trim()}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const Ballon = ({ message, currentUser }: { message: Message; currentUser: string }) => {
  const sent = currentUser === message.sentBy;
  const ballonColor = sent ? styles.ballonSent : styles.ballonReceived;
  const ballonTextColor = sent ? styles.ballonTextSent : styles.ballonTextReceived;
  const bubbleWrapper = sent ? styles.bubbleWrapperSent : styles.bubbleWrapperReceived;

  return (
    <View style={{ marginBottom: '2%' }}>
      <View style={[styles.bubbleWrapper, bubbleWrapper]}>
        <View style={[styles.ballon, ballonColor]}>
          <Text style={[styles.ballonText, ballonTextColor]}>{message.text}</Text>
        </View>
      </View>
    </View>
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
    backgroundColor: 'rgba(25, 25, 25, 0.9)', // Fundo da caixa inteira
  },
  messageTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9', // Fundo do "Digite sua mensagem"
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
    borderColor: '#7f8c8d', // Fundo do botão desabilitado
  },
  // =========================== Ballon Css ==========================
  bubbleWrapper: {
    flexDirection: 'column',
  },
  bubbleWrapperSent: {
    alignSelf: 'flex-end',
    marginLeft: 40,
  },
  bubbleWrapperReceived: {
    alignSelf: 'flex-start',
    marginRight: 40,
  },
  ballon: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#FFD700', // Borda dourada retrô
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  ballonSent: {
    backgroundColor: '#FF4500', // Laranja da mensagem
  },
  ballonReceived: {
    backgroundColor: '#1E1E1E', // Cinza escuro (tom retrô)
  },
  ballonText: {
    fontSize: 14,
    fontFamily: 'PressStart2P_400Regular', // Fonte estilo retrô
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  ballonTextSent: {
    color: '#FFF', // Branco para contraste
  },
  ballonTextReceived: {
    color: '#FFD700', // Dourado para manter a estética
  },
});

export default Chat;
