import React from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

// Componentes para a página
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation() {
    // Utilizando a navegação do aplicativo
    const navigation = useNavigation();

    // Função para navegar para a página segiunte
    function handleMoveOn() {
        navigation.navigate('PlantSelect');
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Definindo o conteúdo para a tela */}
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {/* No Windows, para acessar a lista de emojis usamos o atalho 'Win + .' */}
                    😁
                 </Text>

                <Text style={styles.title}>
                    Prontinho
                </Text>

                <Text style={styles.subtitle}>
                    Agora vamos começar a cuidar das suas
                    plantinhas com muito cuidado.
                </Text>
                <View style={styles.footer}>
                    <Button
                        title="Começar"
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
