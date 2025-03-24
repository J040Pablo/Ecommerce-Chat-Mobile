import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');
  
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const isValidCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let result = (sum * 10) % 11;
    if (result === 10 || result === 11) result = 0;
    if (result !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    result = (sum * 10) % 11;
    if (result === 10 || result === 11) result = 0;
    return result === parseInt(cpf.charAt(10));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    if (name.trim().length < 2) {
      Alert.alert('Nome inválido', 'O nome deve ter no mínimo 2 caracteres.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Email obrigatório', 'Por favor, insira um email.');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Email inválido', 'Por favor, insira um email válido.');
      return;
    }
    if (!cpf.trim()) {
      Alert.alert('CPF obrigatório', 'Por favor, insira um CPF.');
      return;
    }
    if (!isValidCPF(cpf)) {
      Alert.alert('CPF inválido', 'Por favor, insira um CPF válido.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Senha obrigatória', 'Por favor, insira uma senha.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Senhas não conferem', 'As senhas devem ser iguais.');
      return;
    }
    router.replace('/login');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#000033', '#1a0033', '#330033']}
      style={styles.container}
    >
      <View style={styles.gridOverlay} />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <Text style={styles.title}>CRIAR{'\n'}CONTA</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>NOME</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Digite seu nome"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email"
              placeholderTextColor="#666"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>SENHA</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Digite sua senha"
              placeholderTextColor="#666"
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>CONFIRMAR SENHA</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirme sua senha"
              placeholderTextColor="#666"
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              value={cpf}
              onChangeText={setCpf}
              placeholder="Digite seu CPF"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>REGISTRAR</Text>
          </TouchableOpacity>

          <Link href="/login" asChild>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>JÁ TENHO CONTA</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 32,
    color: '#FFD700',
    marginBottom: 40,
    textAlign: 'center',
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
