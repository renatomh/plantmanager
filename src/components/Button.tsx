import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableOpacityProps
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// Estendendo as propriedades dos botões
interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            // Utilizando as propriedades padrão do botão
            {...props}
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

// Definindo a estilização para os componentes
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading,
    },
})
