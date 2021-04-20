import React from 'react';
import AppLoading from 'expo-app-loading';

// Importando o arquivo 'index' da pasta
import Routes from './src/routes';

// Definindo a fonte para o aplicativo: https://docs.expo.io/guides/using-custom-fonts/
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

export default function App() {
  // Definindo as fontes a serem utilizadas
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });
  // Enquanto as fontes estão carregando, apresentamos a tela de splash
  if (!fontsLoaded)
    return <AppLoading />

  // Definindo as rotas para a aplicação
  return (
    <Routes />
  )
}
