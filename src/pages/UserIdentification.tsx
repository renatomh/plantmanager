import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componentes para a página
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
    // Definindo o estado do campo de entrada de texto
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    // Utilizando a navegação do aplicativo
    const navigation = useNavigation();

    // Função para quando o usuário clica fora do campo de entrada de texto
    function handleInputBlur() {
        setIsFocused(false);
        // Caso tenha sido inserido um nome, mantemos o estado como preenchido
        setIsFilled(!!name);
    }

    // Função para quando o usuário clica no campo de entrada de texto
    function handleInputFocus() {
        setIsFocused(true);
    }

    // Verificando mudanças no input
    function handleInputChange(value: string) {
        // Caso tenha conteúdo, é verdadeiro, caso contrário, é falso
        setIsFilled(!!value);
        setName(value);
    }

    // Função para navegar para a página seguinte
    async function handleSubmit() {
        // Verificando se foi informado um nome
        if (!name) return Alert.alert('Diga-me como chamar você 😥');

        // Salvando o nome do usuário no armazenamento do dispositivo
        try {
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect',
            });
        } catch {
            Alert.alert('Não foi possível salvar o seu nome 😥');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Evitando que o teclado fique por cima da tela tampando o botão */}
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                {/* Escondendo o teclado ao clicar fora da caixa de texto */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* Definindo o conteúdo para a tela */}
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {/* No Windows, para acessar a lista de emojis usamos o atalho 'Win + .' */}
                                    {/* O emoji será definido com base no campo de texto estar preenchido ou não */}
                                    {isFilled ? '😄' : '😃'}
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos{'\n'}
                                    chamar você?
                                </Text>
                            </View>

                            <TextInput
                                style={[
                                    styles.input,
                                    // Caso esteja focado ou preenchido, mudamos a cor
                                    (isFocused || isFilled) &&
                                    { borderColor: colors.green }
                                ]}
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />

                            <View style={styles.footer}>
                                <Button
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

// Definindo a estilização para os componentes da tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    content: {
        flex: 1,
        width: '100%',
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
        width: '100%',
    },

    header: {
        alignItems: 'center',
    },

    emoji: {
        fontSize: 44,
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },

    title: {
        fontSize: 24,
        lineHeight: 34,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },

    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20,
    },
})
