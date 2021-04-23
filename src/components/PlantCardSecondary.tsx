import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// Estendendo as propriedades do componente
interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    // Tipando a função para exclusão do item
    handleRemove: () => void;
}

export function PlantCardSecondary({ data, handleRemove, ...props }: PlantProps) {
    return (
        // Tornando o botão "deslizável" para permitir a exclusão dos itens
        <Swipeable
            // Impedindo o deslizamento para a direta (faremos só para a esquerda)
            overshootRight={false}
            // Renderizando o btão para exclusão
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            {/* Acrescentando o ícone para o botão */}
                            <Feather
                                name="trash"
                                size={32}
                                color={colors.white}
                            />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={styles.container}
                // Utilizando as propriedades padrão do botão
                {...props}
            >
                {/* Utilizando a imagem em formato SVG a partir da sua URI */}
                <SvgFromUri
                    uri={data.photo}
                    width={50}
                    height={50} />
                <Text style={styles.title}>
                    {data.name}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                        Regar às
                </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}

// Definindo a estilização para os componentes
const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },

    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
    },

    details: {
        alignItems: 'flex-end',
    },

    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,
    },

    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark,
    },

    buttonRemove: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // Movendo um pouco para a direita
        position: 'relative',
        right: 20,
        paddingLeft: 15,
    },
})
