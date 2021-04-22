import React from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

// Componentes para a página
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// Tipagem para os dados da página
interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}

// Definindo os emojis para a tela
const emojis = {
    hug: '🤗',
    smile: '😁',
}

export function Confirmation() {
    // Utilizando a navegação do aplicativo
    const navigation = useNavigation();
    // Definindo a utilização do 'route' para recuperar os dados passados na navegação
    const route = useRoute();

    // Pegando as informações passadas para a rota
    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen,
    } = route.params as Params;

    // Função para navegar para a página segiunte
    function handleMoveOn() {
        navigation.navigate(nextScreen);
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Definindo o conteúdo para a tela */}
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {/* No Windows, para acessar a lista de emojis usamos o atalho 'Win + .' */}
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button
                        title={buttonTitle}
                        onPress={handleMoveOn}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

// Definindo a estilização para os componentes da tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30,
    },

    title: {
        fontSize: 22,
        lineHeight: 38,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 35,
    },

    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 10,
        color: colors.heading,
        marginTop: 15,
    },

    emoji: {
        fontSize: 78,
    },

    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 35,
    },
})
