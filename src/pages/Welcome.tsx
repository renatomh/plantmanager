import React from 'react';
import {
    View,
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

// Documentação do expo-icons: https://docs.expo.io/guides/icons/
import { Feather } from '@expo/vector-icons';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
    // Utilizando a navegação do aplicativo
    const navigation = useNavigation();

    // Função para navegar para a página segiunte
    function handleStart() {
        navigation.navigate('UserIdentification');
    }

    return (
        // O React só pode retornar um elemento
        // Devemos colocar tudo dentro de um principal, nem que seja um 'Fragment': '<> </>'
        <SafeAreaView style={styles.container}>
            {/* Definindo o wrapper para a tela */}
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de{'\n'}
                    forma fácil
                </Text>

                <Image
                    source={wateringImg}
                    style={styles.image}
                    // Redimensionando a imagem para estar contida no componente
                    resizeMode="contain"
                />

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Feather
                        name="chevron-right"
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

// Definindo a estilização para os componentes da tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper: {
        flex: 1,
        alignItems: 'center',
        // Utilizamos o 'space-around' aou invés do 'space-between' para que não cole nas bordas
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34,
    },

    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },

    image: {
        // Dimensionando a imagem de acordo com o tamanho da tela do dispositivo
        height: Dimensions.get('window').width * 0.7,
    },

    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },

    buttonIcon: {
        fontSize: 32,
        color: colors.white,
    },
})
