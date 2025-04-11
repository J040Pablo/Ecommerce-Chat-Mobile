import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const SERVER_URL = 'http://192.168.1.71:3000'; // Substitua pelo IP correto do backend
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email.trim()) {
        Alert.alert('Erro', 'Por favor, insira um email.');
        return;
    }
    if (!isValidEmail(email)) {
        Alert.alert('Erro', 'Por favor, insira um email válido.');
        return;
    }
    if (!password.trim()) {
        Alert.alert('Erro', 'Por favor, insira uma senha.');
        return;
    }

    try {
        console.log('Enviando dados para o backend:', { email, password });
        const loginUrl = `${SERVER_URL}/api/login`;
        const response = await axios.post(loginUrl, { email, password });

        console.log('Resposta do backend:', response.data);
        if (response.data.success) {
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
            router.replace('/home');
        } else {
            Alert.alert('Erro', response.data.message || 'Credenciais inválidas.');
        }
    } catch (error) {
        // Verifica se o erro é uma instância de AxiosError
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                Alert.alert('Erro', 'Login inválido.');
            } else {
                Alert.alert('Erro', 'Não foi possível fazer login. Tente novamente mais tarde.');
            }
        } else {
            Alert.alert('Erro', 'Ocorreu um erro inesperado.');
        }
        // Removido o console.error para evitar exibir o erro no console
    }
  };

  return (
    <LinearGradient
      colors={['#000033', '#1a0033', '#330033']}
      style={styles.container}
    >
      <View style={styles.gridOverlay} />
      <View style={styles.content}>
        <Text style={styles.title}>LOGIN</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Digite seu email"
            placeholderTextColor="#666"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>SENHA</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Digite sua senha"
            placeholderTextColor="#666"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>

        <Link href="/register" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>CRIAR CONTA</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(128, 0, 255, 0.1)',
    borderRadius: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 32,
    color: '#FFD700',
    marginBottom: 40,
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    color: '#FFD700',
    marginBottom: 8,
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: '#FF4500',
    borderRadius: 8,
    padding: 12,
    color: 'white',
    width: '100%',
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    borderWidth: 3,
    borderColor: '#FFD700',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'PressStart2P_400Regular',
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  linkButton: {
    marginTop: 20,
    padding: 10,
  },
  linkText: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#FFD700',
    fontSize: 12,
    textDecorationLine: 'underline',
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
