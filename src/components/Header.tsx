import React from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
} from 'react-native';

import userImg from '../assets/profile.png';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Renato</Text>
            </View>

            <Image source={userImg} style={styles.image} />
        </View>
    )
}

// Definindo a estilização para os componentes
const styles = StyleSheet.create({
    container: {
        width: '100%',
        // Colocando os itens um ao lado do outro
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        // Pegando a atulra da barra de notificações
        marginTop: getStatusBarHeight(),
    },

    image: {
        width: 70,
        height: 70,
        // Arredondando as bordas (deve ser pelo menos metade da largura/altura)
        borderRadius: 35,
    },

    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },

    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40,
    },
})
