import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';

// Tipo para os produtos (jogos)
type Product = {
  name: string;
  description: string;
  price: string;
  image: string;
};

const Home: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const products: Product[] = [
    {
      name: "Grand Theft Auto: San Andreas",
      description: "Um dos jogos mais icônicos do PS2, onde você joga como CJ explorando uma cidade cheia de crimes e aventuras.",
      price: "R$30",
      image: "https://preview.redd.it/gr84wguz7tb91.png?width=640&crop=smart&auto=webp&s=ff88f34feffe113c0faa9f96b0d2f108a02a5601", // Adicione a URL da imagem
    },
    {
      name: "God of War II",
      description: "Sequência do lendário God of War, onde Kratos enfrenta deuses e monstros da mitologia grega.",
      price: "R$40",
      image: "https://upload.wikimedia.org/wikipedia/pt/7/7e/God_of_War_2_capa.png", // Adicione a URL da imagem
    },
    {
      name: "Shadow of the Colossus",
      description: "Um jogo épico de aventura onde você enfrenta colossos gigantes em busca de um milagre.",
      price: "R$50",
      image: "https://upload.wikimedia.org/wikipedia/pt/6/66/ShadowOfTheColossusGH.jpg", // Adicione a URL da imagem
    },
    {
      name: "Resident Evil 4",
      description: "Clássico do survival horror, onde Leon S. Kennedy enfrenta zumbis em uma vila misteriosa.",
      price: "R$35",
      image: "https://i.pinimg.com/474x/52/2c/d9/522cd91e10f58980b35998afa556348e.jpg", // Adicione a URL da imagem
    },
    {
      name: "Metal Gear Solid 3: Snake Eater",
      description: "Jogo de espionagem tática, onde você controla Naked Snake em uma missão secreta.",
      price: "R$45",
      image: "https://gamefaqs.gamespot.com/a/box/4/4/9/53449_front.jpg", // Adicione a URL da imagem
    },
    {
      name: "Final Fantasy X",
      description: "Um dos RPGs mais famosos de todos os tempos, com uma história emocionante e batalhas épicas.",
      price: "R$40",
      image: "https://m.media-amazon.com/images/I/91rQrZ+BRHL.jpg", // Adicione a URL da imagem
    },
    {
      name: "Need for Speed: Most Wanted",
      description: "Jogo de corrida onde você desafia a polícia e sobe no ranking dos corredores mais procurados.",
      price: "R$35",
      image: "https://www.vgdb.com.br/gf/fotos/games/media_56781/need-for-speed-most-wanted-2005-----56781.jpg", // Adicione a URL da imagem
    },
    {
      name: "Bully",
      description: "Um jogo de mundo aberto da Rockstar onde você controla Jimmy, um estudante que precisa sobreviver em uma escola cheia de desafios.",
      price: "R$30",
      image: "https://i.pinimg.com/736x/dc/b6/e3/dcb6e3f8f29e9e4b08c31d8fc073080c.jpg", // Adicione a URL da imagem
    },
    {
      name: "Devil May Cry 3",
      description: "Jogo de ação frenética onde você joga como Dante, enfrentando hordas de demônios com estilo.",
      price: "R$38",
      image: "https://static.wikia.nocookie.net/devilmaycry/images/8/8a/Img_dmc3_dante_awakening_special_edition_capa.jpg/revision/latest?cb=20210413004944&path-prefix=pt-br", // Adicione a URL da imagem
    },
    {
      name: "Dragon Ball Z: Budokai Tenkaichi 3",
      description: "O jogo definitivo de luta de Dragon Ball, com um grande elenco de personagens e batalhas intensas.",
      price: "R$45",
      image: "https://bdjogos.com.br/capas/12316-dragon-ball-z-budokai-tenkaichi-3-playstation-2-capa-1.jpg", // Adicione a URL da imagem
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

  // Função para renderizar os cards
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Jogos</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={getColumns()}
        contentContainerStyle={styles.cardsContainer}
      />
    </View>
  );
};

// Estilos ajustados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerContainer: {
    backgroundColor: '#8e44ad', // Fundo roxo apenas atrás do nome
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardsContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Garante espaço para rolar até o final
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    marginBottom: 20,
    marginHorizontal: 10,
    flex: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  cardFooter: {
    padding: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8e44ad',
    padding: 10,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Home;
