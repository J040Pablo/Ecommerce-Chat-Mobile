import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Divider, Menu } from 'react-native-paper';

const MenuHeader = () => {
  const [visible, setVisible] = useState(false); // Hook useState
  const router = useRouter(); // Hook useRouter

  // Ajuste o tipo do parâmetro para corresponder ao esperado
  const handleNavigate = (path: "/changeName" | "/login") => {
    setVisible(false); // Fecha o menu antes de navegar
    router.replace({ pathname: path }); // Navega para a rota especificada
  };

  return (
    <Menu
      visible={visible} // Controla a visibilidade do menu
      onDismiss={() => setVisible(false)} // Fecha o menu ao clicar fora
      anchor={
        <TouchableOpacity onPress={() => setVisible(true)} style={{ marginRight: 15 }}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#FFF" />
        </TouchableOpacity>
      }
    >
      <Menu.Item title={<Text>Perfil</Text>} />
      <Menu.Item title={<Text>Configurações</Text>} />
      <Menu.Item onPress={() => handleNavigate('/changeName')} title={<Text>Conversar com a IA</Text>} />
      <Divider />
      <Menu.Item onPress={() => handleNavigate('/login')} title={<Text>Logout</Text>} />
    </Menu>
  );
};

export default MenuHeader;