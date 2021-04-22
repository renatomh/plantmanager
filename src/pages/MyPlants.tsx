import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
} from 'react-native';

import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import { loadPlant, PlantProps } from '../libs/storage';

import waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants() {
    // Definindo os estados
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    // A função 'useEffect' é chamada logo antes de a tela ser carregada
    useEffect(() => {
        async function loadStorageDate() {
            const plantsStoraged = await loadPlant();
            // Caso alguma planta tenha sido cadastrada
            if (plantsStoraged.length > 0) {
                // Definindo quanto tempo falta para a próxima rega (a partir de agora)
                const nextTime = formatDistance(
                    new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                    new Date().getTime(),
                    // Formatando em pt-BR
                    { locale: pt },
                );
                setNextWatered(
                    `Não esqueça de regar a ${plantsStoraged[0].name} (${nextTime}).`
                );
            }
            // Caso nenhuma planta tenha sido cadastrada
            else setNextWatered(`Nenhuma planta cadastrada.`);

            // Atualizando a lista de plantas do usuário
            setMyPlants(plantsStoraged);
            setLoading(false);
        };

        // Chamando a função para carregar os dados
        loadStorageDate();
    }, []);

    // Verificando se a tela está carregando. Caso esteja, colocamos a animação
    if (loading) return <Load />
    // Caso contrário, retornamos a tela
    else return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary data={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

// Definindo a estilização para os componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },

    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    spotlightImage: {
        width: 60,
        height: 60,
    },

    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        //textAlign: 'justify',
    },

    plants: {
        flex: 1,
        width: '100%',
    },

    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    },
})
