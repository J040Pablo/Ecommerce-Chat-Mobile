import mongoose from 'mongoose';
import Product from './src/models/ProductModel.js';

const products = [
  {
    name: "Grand Theft Auto: San Andreas",
    description: "Um dos jogos mais icônicos do PS2, onde você joga como CJ explorando uma cidade cheia de crimes e aventuras.",
    price: 30,
    image: "https://preview.redd.it/gr84wguz7tb91.png?width=640&crop=smart&auto=webp&s=ff88f34feffe113c0faa9f96b0d2f108a02a5601",
    quantity: 10,
  },
  {
    name: "God of War II",
    description: "Sequência do lendário God of War, onde Kratos enfrenta deuses e monstros da mitologia grega.",
    price: 40,
    image: "https://upload.wikimedia.org/wikipedia/pt/7/7e/God_of_War_2_capa.png",
    quantity: 10,
  },
  {
    name: "Shadow of the Colossus",
    description: "Um jogo épico de aventura onde você enfrenta colossos gigantes em busca de um milagre.",
    price: 50,
    image: "https://upload.wikimedia.org/wikipedia/pt/6/66/ShadowOfTheColossusGH.jpg",
    quantity: 10,
  },
  {
    name: "Resident Evil 4",
    description: "Clássico do survival horror, onde Leon S. Kennedy enfrenta zumbis em uma vila misteriosa.",
    price: 35,
    image: "https://i.pinimg.com/474x/52/2c/d9/522cd91e10f58980b35998afa556348e.jpg",
    quantity: 10,
  },
  {
    name: "Metal Gear Solid 3: Snake Eater",
    description: "Jogo de espionagem tática, onde você controla Naked Snake em uma missão secreta.",
    price: 45,
    image: "https://gamefaqs.gamespot.com/a/box/4/4/9/53449_front.jpg",
    quantity: 10,
  },
  {
    name: "Final Fantasy X",
    description: "Um dos RPGs mais famosos de todos os tempos, com uma história emocionante e batalhas épicas.",
    price: 40,
    image: "https://m.media-amazon.com/images/I/91rQrZ+BRHL.jpg",
    quantity: 10,
  },
  {
    name: "Need for Speed: Most Wanted",
    description: "Jogo de corrida onde você desafia a polícia e sobe no ranking dos corredores mais procurados.",
    price: 35,
    image: "https://www.vgdb.com.br/gf/fotos/games/media_56781/need-for-speed-most-wanted-2005-----56781.jpg",
    quantity: 10,
  },
  {
    name: "Bully",
    description: "Um jogo de mundo aberto da Rockstar onde você controla Jimmy, um estudante que precisa sobreviver em uma escola cheia de desafios.",
    price: 30,
    image: "https://i.pinimg.com/736x/dc/b6/e3/dcb6e3f8f29e9e4b08c31d8fc073080c.jpg",
    quantity: 10,
  },
  {
    name: "Devil May Cry 3",
    description: "Jogo de ação frenética onde você joga como Dante, enfrentando hordas de demônios com estilo.",
    price: 38,
    image: "https://m.media-amazon.com/images/I/71R+Na4J2aL.jpg",
    quantity: 10,
  },
  {
    name: "Dragon Ball Z: Budokai Tenkaichi 3",
    description: "O jogo definitivo de luta de Dragon Ball, com um grande elenco de personagens e batalhas intensas.",
    price: 45,
    image: "https://bdjogos.com.br/capas/12316-dragon-ball-z-budokai-tenkaichi-3-playstation-2-capa-1.jpg",
    quantity: 10,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB');

    // Limpar a coleção de produtos antes de inserir novos
    await Product.deleteMany({});
    console.log('Coleção de produtos limpa.');

    // Inserir os produtos
    await Product.insertMany(products);
    console.log('Produtos inseridos com sucesso.');

    mongoose.connection.close();
  } catch (error) {
    console.error('Erro ao inserir produtos:', error);
    mongoose.connection.close();
  }
};

seedProducts();