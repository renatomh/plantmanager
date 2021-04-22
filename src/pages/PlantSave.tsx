import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { isBefore, format } from 'date-fns';

import { PlantProps, savePlant } from '../libs/storage';

// Componentes para a página
import { Button } from '../components/Button';

import waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// Definindo a tipagem para os dados
interface Params {
    plant: PlantProps;
}

export function PlantSave() {
    // Utilizando a navegação do aplicativo
    const navigation = useNavigation();
    // Definindo a utilização do 'route' para recuperar os dados passados na navegação
    const route = useRoute();
    const { plant } = route.params as Params;

    // Definindo os estados
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    // A função 'useEffect' é chamada logo antes de a tela ser carregada
    useEffect(() => {

    }, []);

    // Função para lidar com a seleção de horários
    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        // Para o Android
        if (Platform.OS == 'android') {
            // Alterando o estado anterior do visualizador
            setShowDatePicker(oldState => !oldState)
        }

        // Caso ele tenha escolhido um horário no passado
        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰');
        }

        // Caso contrário, atribuímos o horário selecionado
        if (dateTime) setSelectedDateTime(dateTime);
    };

    // Função para abrir o DateTime picker no Android
    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState)
    };

    // Função para salvar o horário para a planta escolhida
    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime,
            });
            // Indo para a página das plantas do usuário
            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants',
            });
        } catch {
            Alert.alert('Não foi possível salvar. 😢')
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Text style={styles.plantName}>
                    {plant.name}
                </Text>
                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>
            </View>

            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image
                        source={waterdrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>
                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>

                {// Mostrando apenas quando selecionado
                    showDatePicker &&
                    (<DateTimePicker
                        // Documentação: https://github.com/react-native-datetimepicker/datetimepicker#mode-optional
                        // Definindo onde armazenar o horário escolhido
                        value={selectedDateTime}
                        // Escolhendo o tipo de seleção que poderá ser feita
                        mode="time"
                        // Caso queiramos utilizar o spinner para a selação
                        //display="spinner"
                        onChange={handleChangeTime}
                    />)
                }

                {
                    // Adicionando um botão para mostrar o DatePicker no Android
                    Platform.OS == 'android' && (
                        <TouchableOpacity
                            style={styles.dateTimePickerButton}
                            onPress={handleOpenDateTimePickerForAndroid}
                        >
                            <Text style={styles.dateTimePickerText}>
                                {`Mudar ${format(selectedDateTime, "HH:mm")}`}
                            </Text>
                        </TouchableOpacity>
                    )
                }

                <Button
                    title="Cadastrar planta"
                    onPress={handleSave}
                />
            </View>
        </View>
    )
}

// Definindo a estilização para os componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        //alignItems: 'center',
        backgroundColor: colors.shape,
    },

    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },

    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },

    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },

    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.heading,
        marginTop: 10,
    },

    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        // Centralizando o container de dica com a parte de baixo do container principal
        position: 'relative',
        bottom: 60,
    },

    tipImage: {
        width: 56,
        height: 54,
    },

    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify',
    },

    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },

    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },

    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    },
})
