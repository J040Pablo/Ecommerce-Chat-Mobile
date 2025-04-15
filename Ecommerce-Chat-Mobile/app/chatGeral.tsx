import React, { Fragment, useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { useRouter } from 'expo-router'; // Importar o hook useRouter

class Message {
  text: string;
  sentBy: string;

  constructor(text: string, sentBy: string) {
    this.text = text;
    this.sentBy = sentBy;
  }
}

let ws: WebSocket;

const Chat = () => {
  const { userLogged } = useLocalSearchParams(); // Obtém o nome do usuário
  const userLoggedString = Array.isArray(userLogged) ? userLogged[0] : userLogged || 'Anônimo'; // Define o nome padrão como "Anônimo"
  const router = useRouter(); // Hook para navegação
  const [chatState, setChat] = useState<{ messages: Message[] }>({ messages: [] });
  const [message, setMessage] = useState('');

  useEffect(() => {
    ws = new WebSocket('ws://192.168.1.71:3000'); // Substitua pelo IP do seu backend
    ws.onopen = () => {
      console.log('Conexão com o servidor WebSocket estabelecida!');
    };


    return () => {
      ws.close(); // Fecha o WebSocket ao desmontar o componente
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      const jsonMessage = { text: message, sentBy: userLoggedString }; // Usa o nome do usuário como remetente
      const jsonString = JSON.stringify(jsonMessage);

      // Adiciona a mensagem ao estado local
      setChat((prevState) => ({
        messages: [...prevState.messages, new Message(message, userLoggedString)],
      }));

      // Envia a mensagem para o servidor WebSocket
      ws.send(jsonString);

      // Salva a mensagem no banco de dados
      try {
        await axios.post('http://192.168.1.71:3000/api/messages', jsonMessage);
      } catch (error) {
        console.error('Erro ao salvar mensagem no banco de dados:', error);
      }

      // Limpa o campo de entrada
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botões na parte superior */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => router.replace('/chat')} // Redireciona para o Chat com IA
        >
          <Text style={styles.switchButtonText}>Ir para Chat com IA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButton} onPress={() => router.replace('/home')}>
          <Text style={styles.homeButtonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.scrollViewContainer}
        data={chatState.messages}
        renderItem={({ item }) => <Ballon message={item} currentUser={userLoggedString} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.noMessagesText}>Nenhuma mensagem ainda</Text>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={styles.messageTextInputContainer}
      >
        <TextInput
          style={styles.messageTextInput}
          placeholder="Digite sua mensagem..."
          value={message}
          multiline
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={[styles.button, !message.trim() && styles.disabledButton]}
          disabled={!message.trim()}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const Ballon = ({ message, currentUser }: { message: Message; currentUser: string }) => {
  const sent = currentUser === message.sentBy; // Verifica se a mensagem foi enviada pelo usuário atual
  const ballonColor = sent ? styles.ballonSent : styles.ballonReceived;
  const ballonTextColor = sent ? styles.ballonTextSent : styles.ballonTextReceived;
  const bubbleWrapper = sent ? styles.bubbleWrapperSent : styles.bubbleWrapperReceived;

  return (
    <View style={{ marginBottom: '2%' }}>
      <View style={[styles.bubbleWrapper, bubbleWrapper]}>
        {/* Nome do remetente */}
        <Text style={[styles.senderName, sent ? styles.senderNameSent : styles.senderNameReceived]}>
          {message.sentBy}
        </Text>
        <View style={[styles.ballon, ballonColor]}>
          {/* Texto da mensagem */}
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
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1E1E1E', // Fundo para destacar os botões
    borderBottomWidth: 1,
    borderColor: '#FFD700',
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
  senderName: {
    fontSize: 12,
    fontFamily: 'PressStart2P_400Regular', // Fonte estilo retrô
    marginBottom: 5,
  },
  senderNameSent: {
    color: '#FFF', // Branco para mensagens enviadas
    textAlign: 'right', // Alinha à direita para mensagens enviadas
  },
  senderNameReceived: {
    color: '#FFD700', // Dourado para mensagens recebidas
    textAlign: 'left', // Alinha à esquerda para mensagens recebidas
  },
  switchButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  switchButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  homeButtonText: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Chat;
