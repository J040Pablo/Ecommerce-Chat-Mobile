import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

// Tipo para os produtos (jogos)
type Product = {
  name: string;
  description: string;
  price: number; // Alterado para number
  image: string;
};

const Cart: React.FC = () => {
  const router = useRouter();
  const { cart: cartString } = useLocalSearchParams();
  const cart: Product[] = typeof cartString === 'string' ? JSON.parse(cartString) : [];
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const [cartState, setCartState] = React.useState<Product[]>(cart);

  useFocusEffect(
    React.useCallback(() => {
      const loadCart = async () => {
        try {
          const cartData = await AsyncStorage.getItem('cart');
          if (cartData) {
            const parsedCart = JSON.parse(cartData).map((item: Product) => ({
              ...item,
              price: Number(item.price), // Garante que o preço seja um número
            }));
            setCartState(parsedCart);
            console.log('Carrinho carregado do AsyncStorage ao focar:', parsedCart);
          }
        } catch (error) {
          console.error('Erro ao carregar o carrinho:', error);
        }
      };
      loadCart();
    }, [])
  );

  const removeFromCart = async (index: number) => {
    const updatedCart = cartState.filter((_, i) => i !== index);
    setCartState(updatedCart);
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      console.log('Carrinho atualizado no AsyncStorage após remoção:', updatedCart);
    } catch (error) {
      console.error('Erro ao atualizar o carrinho no AsyncStorage:', error);
    }
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCartState([]);
      console.log('Carrinho limpo');
    } catch (error) {
      console.error('Erro ao limpar o carrinho:', error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const renderCartItem = ({ item }: { item: Product }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item, index }: { item: Product, index: number }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(index)}>
        <Text style={styles.removeText}>Remover item do carrinho</Text>
      </TouchableOpacity>
    </View>
  );

  const total = cartState.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <FlatList
        data={cartState}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.totalText}>Total: R${total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Finalizar Compra')}>
        <Text style={styles.buttonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000033',
  },
  title: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 24,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(25, 25, 25, 0.9)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#34495e',
  },
  cardTitle: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 18,
    color: '#ecf0f1',
  },
  cardPrice: {
    fontSize: 16,
    color: '#bdc3c7',
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  buttonText: {
    fontFamily: 'PressStart2P_400Regular',
    color: 'white',
    fontSize: 16,
  },
  totalText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 20,
    color: '#FFD700',
    textAlign: 'center',
    marginVertical: 10,
  },
  removeButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  removeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'PressStart2P_400Regular',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cartItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export default Cart;