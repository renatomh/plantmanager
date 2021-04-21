import React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';
import {
    RectButton,
    RectButtonProps
} from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// Estendendo as propriedades dos botões
interface EnvironmentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnvironmentButton({
    title,
    // Definindo o estado padrão para o botão
    active = false,
    ...props
}: EnvironmentButtonProps) {
    return (
        <RectButton
            // Definindo o estilo do botão estando ativo ou inativo
            // Caso esteja ativo, adicionamos o estilo do container ativo (mudando a cor)
            style={[
                styles.container,
                active && styles.containerActive,
            ]}
            // Utilizando as propriedades padrão do botão
            {...props}
        >
            <Text
                // Caso esteja ativo, adicionamos o estilo do texto ativo (mudando a cor e fonte)
                style={[
                    styles.text,
                    active && styles.textActive,
                ]}
            >
                {title}
            </Text>
        </RectButton>
    )
}

// Definindo a estilização para os componentes
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5,
    },

    containerActive: {
        backgroundColor: colors.green_light,
    },

    text: {
        color: colors.heading,
        fontFamily: fonts.text,
    },

    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
    },
})
