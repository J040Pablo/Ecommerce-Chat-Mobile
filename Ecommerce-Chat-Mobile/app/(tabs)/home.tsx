import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, StatusBar, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import MenuHeader from '@/components/MenuHeader';

// Tipo para os produtos (jogos)
type Product = {
  name: string;
  description: string;
  price: string;
  image: string;
};

const Home: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });
  const router = useRouter();

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

  const notificationStyle = {
    ...styles.notificationBottom,
    transform: [{ translateY: notificationTranslateY }],
  };

  if (!fontsLoaded) {
    return null;
  }

  const products: Product[] = [
    {
      name: "Grand Theft Auto: San Andreas",
      description: "Um dos jogos mais icônicos do PS2, onde você joga como CJ explorando uma cidade cheia de crimes e aventuras.",
      price: "R$30",
      image: "https://preview.redd.it/gr84wguz7tb91.png?width=640&crop=smart&auto=webp&s=ff88f34feffe113c0faa9f96b0d2f108a02a5601",
    },
    {
      name: "God of War II",
      description: "Sequência do lendário God of War, onde Kratos enfrenta deuses e monstros da mitologia grega.",
      price: "R$40",
      image: "https://upload.wikimedia.org/wikipedia/pt/7/7e/God_of_War_2_capa.png",
    },
    {
      name: "Shadow of the Colossus",
      description: "Um jogo épico de aventura onde você enfrenta colossos gigantes em busca de um milagre.",
      price: "R$50",
      image: "https://upload.wikimedia.org/wikipedia/pt/6/66/ShadowOfTheColossusGH.jpg",
    },
    {
      name: "Resident Evil 4",
      description: "Clássico do survival horror, onde Leon S. Kennedy enfrenta zumbis em uma vila misteriosa.",
      price: "R$35",
      image: "https://i.pinimg.com/474x/52/2c/d9/522cd91e10f58980b35998afa556348e.jpg",
    },
    {
      name: "Metal Gear Solid 3: Snake Eater",
      description: "Jogo de espionagem tática, onde você controla Naked Snake em uma missão secreta.",
      price: "R$45",
      image: "https://gamefaqs.gamespot.com/a/box/4/4/9/53449_front.jpg",
    },
    {
      name: "Final Fantasy X",
      description: "Um dos RPGs mais famosos de todos os tempos, com uma história emocionante e batalhas épicas.",
      price: "R$40",
      image: "https://m.media-amazon.com/images/I/91rQrZ+BRHL.jpg",
    },
    {
      name: "Need for Speed: Most Wanted",
      description: "Jogo de corrida onde você desafia a polícia e sobe no ranking dos corredores mais procurados.",
      price: "R$35",
      image: "https://www.vgdb.com.br/gf/fotos/games/media_56781/need-for-speed-most-wanted-2005-----56781.jpg",
    },
    {
      name: "Bully",
      description: "Um jogo de mundo aberto da Rockstar onde você controla Jimmy, um estudante que precisa sobreviver em uma escola cheia de desafios.",
      price: "R$30",
      image: "https://i.pinimg.com/736x/dc/b6/e3/dcb6e3f8f29e9e4b08c31d8fc073080c.jpg",
    },
    {
      name: "Devil May Cry 3",
      description: "Jogo de ação frenética onde você joga como Dante, enfrentando hordas de demônios com estilo.",
      price: "R$38",
      image: "https://m.media-amazon.com/images/I/71R+Na4J2aL.jpg",
    },
    {
      name: "Dragon Ball Z: Budokai Tenkaichi 3",
      description: "O jogo definitivo de luta de Dragon Ball, com um grande elenco de personagens e batalhas intensas.",
      price: "R$45",
      image: "https://bdjogos.com.br/capas/12316-dragon-ball-z-budokai-tenkaichi-3-playstation-2-capa-1.jpg",
    },
  ];

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
});

export default Home;