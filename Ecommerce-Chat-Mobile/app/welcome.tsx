import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

export default function Welcome() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#000033', '#1a0033', '#330033']}
      style={styles.container}
    >
      <View style={styles.gridOverlay} />
      <View style={styles.content}>
        <Text style={styles.title}>RETRO{'\n'}GAMES</Text>
        <Text style={styles.subtitle}>PRESS START</Text>
        
        <View style={styles.buttonContainer}>
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/register" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          </Link>
        </View>
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
    padding: 20,
  },
  title: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 40,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
  },
  subtitle: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    opacity: 0.8,
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  buttonContainer: {
    gap: 20,
    width: '80%',
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#FFD700',
    width: '100%',
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
});