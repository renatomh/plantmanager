import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';

import loadAnimation from '../assets/load.json';

export function Load() {
    return (
        <View style={styles.container}>
            <LottieView
                source={loadAnimation}
                // Definindo que será reproduzido automaticamente e em loop
                autoPlay loop
                style={styles.animation}
            />
        </View>
    )
}

// Definindo a estilização para os componentes da tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    animation: {
        backgroundColor: 'transparent',
        width: 200,
        height: 200,
    },
})
