import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, StatusBar, Animated, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import MenuHeader from '@/components/MenuHeader';
import axios from 'axios';

// Tipo para os produtos (jogos)
type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const Home: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const notificationTranslateY = useRef(new Animated.Value(100)).current;

  useFocusEffect(
    React.useCallback(() => {
      const loadCart = async () => {
        try {
          const cartData = await AsyncStorage.getItem('cart');
          if (cartData) {
            setCart(JSON.parse(cartData));
            console.log('Carrinho carregado do AsyncStorage:', JSON.parse(cartData));
          }
        } catch (error) {
          console.error('Erro ao carregar o carrinho:', error);
        }
      };
      loadCart();
    }, [])
  );

  useEffect(() => {
    if (showNotification) {
      Animated.timing(notificationTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(notificationTranslateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [showNotification]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.1.71:3000/api/product'); // Substitua pelo IP correto
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const notificationStyle = {
    ...styles.notificationBottom,
    transform: [{ translateY: notificationTranslateY }],
  };

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4500" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  // Função para calcular a quantidade de colunas com base na largura da tela
  const getColumns = () => {
    const screenWidth = Dimensions.get('window').width;
    if (screenWidth < 600) {
      return 2;
    } else if (screenWidth < 900) {
      return 3;
    } else {
      return 4;
    }
  };

  // Função para adicionar o produto ao carrinho
  const addToCart = async (product: Product) => {
    console.log('Tentando adicionar produto:', product);
    // Verificar se o produto já está no carrinho
    const isProductInCart = cart.some(item => item.name === product.name);
    if (isProductInCart) {
      console.log('Produto já está no carrinho:', product.name);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    console.log('Carrinho atualizado:', updatedCart);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Notificação temporária por 3 segundos
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      console.log('Carrinho salvo no AsyncStorage');
    } catch (error) {
      console.error('Erro ao salvar o carrinho:', error);
    }
  };

  const handleNavigateToCart = () => {
    router.push('/cart');
  };

  // Função para renderizar os cards
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode='cover'
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.buttonText}>+🛒+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#000033', '#1a0033', '#330033']}
      style={styles.container}
    >
      <Animated.View style={notificationStyle}>
        <Text style={styles.notificationText}>Adicionado ao carrinho com sucesso!</Text>
      </Animated.View>
      <View style={styles.gridOverlay} />
      <StatusBar barStyle="light-content" backgroundColor="#000033" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Jogos</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.cartIconButton} onPress={handleNavigateToCart}>
            <Text style={styles.cartIcon}>🛒</Text>
          </TouchableOpacity>
          <MenuHeader />
        </View>
      </View>

      <FlatList
        key={getColumns()}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        numColumns={getColumns()}
        contentContainerStyle={styles.cardsContainer}
      />
    </LinearGradient>
  );
};

// Estilos ajustados
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 69, 0, 0.8)',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  header: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 24,
    color: '#FFD700',
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  cardsContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(25, 25, 25, 0.9)',
    borderRadius: 8,
    elevation: 5,
    marginBottom: 20,
    marginHorizontal: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: '#34495e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'space-between', // Garante que o rodapé fique na parte inferior
  },
  cardImage: {
    width: '100%',
    height: 270,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 10,
    flex: 1, // Permite que o conteúdo ocupe o espaço disponível
  },
  cardTitle: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 18,
    color: '#ecf0f1',
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: '#bdc3c7',
    marginVertical: 5,
  },
  cardFooter: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  addButton: {
    backgroundColor: '#FFD700',
    borderWidth: 2,
    borderColor: '#FF4500',
  },
  buttonText: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#000033',
    fontSize: 16,
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  notificationBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 10,
  },
  notificationText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    color: '#FFD700',
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  cartIconButton: {
    padding: 5,
  },
  cartIcon: {
    fontSize: 24,
    color: '#FFD700',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#FFD700',
    fontFamily: 'PressStart2P_400Regular',
  },
});

export default Home;