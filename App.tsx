import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

// Importando o arquivo 'index' da pasta
import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

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

  // Criando o listener para as notificações
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      });

    return () => subscription.remove();

    async function notifications() {
      // Caso queriamos cancelar todas as notificações
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Caso queiramos recuperar todos os agendamentos de notificações
      const data = await Notifications.getAllScheduledNotificationsAsync();
      console.log("######## Notificações Agendadas ########");
      console.log(data);
    }
    //notifications();
  }, [])

  // Enquanto as fontes estão carregando, apresentamos a tela de splash
  if (!fontsLoaded)
    return <AppLoading />

  // Definindo as rotas para a aplicação
  return (
    <Routes />
  )
}
