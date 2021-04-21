import React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// Estendendo as propriedades dos botões
interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
    }
}

export function PlantCardPrimary({ data, ...props }: PlantProps) {
    return (
        <RectButton
            style={styles.container}
            // Utilizando as propriedades padrão do botão
            {...props}
        >
            {/* Utilizando a imagem em formato SVG a partir da sua URI */}
            <SvgFromUri
                uri={data.photo}
                width={70}
                height={70} />
            <Text style={styles.text}>
                {data.name}
            </Text>
        </RectButton>
    )
}

// Definindo a estilização para os componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10,
    },

    image: {
        width: 70,
        height: 70,
        // Arredondando as bordas (deve ser pelo menos metade da largura/altura)
        borderRadius: 35,
    },

    text: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
    },
})
