import React, {
    useEffect,
    useState
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PlantProps } from '../libs/storage';

// Componentes para a página
import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// Definindo a tipagem para os ambientes
interface EnvironmentProps {
    key: string;
    title: string;
}

export function PlantSelect() {
    // Definindo os estados dos ambientes, plantas e etc.
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    // Criando os estados de paginação
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    // Utilizando a navegação do aplicativo
    const navigation = useNavigation();

    // Função para seleção de ambiente
    function handleEnvironmentSelected(environment: string) {
        setEnvironmentSelected(environment);

        // Caso tenha sido selecionado todos os ambientes
        if (environment == 'all')
            return setFilteredPlants(plants);

        // Caso contrário, filtramos as plantas pelo ambiente
        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        )
        setFilteredPlants(filtered);
    };

    // Definindo a função para obter os dados da API
    async function fetchPlant() {
        // Documentação do json-server: https://github.com/typicode/json-server
        const { data } = await api
            .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        // Verificando os dados obtidos
        // Se nada tiver sido retornado, já carregou tudo
        if (!data)
            return setLoading(true);
        // Verificando se a página é maior que 1, acrescentamos os novos dados
        if (page > 1) {
            setPlants(oldData => [...oldData, ...data])
            setFilteredPlants(oldData => [...oldData, ...data]);
        }
        // Caso contrário, criamos os dados com as plantas
        else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    };

    // A função 'useEffect' é chamada logo antes de a tela ser carregada
    useEffect(() => {
        // Definindo a função para obter os dados da API
        async function fetchEnvironment() {
            // Documentação do json-server: https://github.com/typicode/json-server
            const { data } = await api
                .get('plants_environments?_sort=title&_order=asc');
            setEnvironments([
                // Adicionando a opção de poder escolher todos os ambientes
                {
                    key: 'all',
                    title: 'Todos',
                },
                // Adicionando os dados retornandos da API
                ...data
            ]);
        }

        // Chamando a função criada
        fetchEnvironment();
    }, []);

    useEffect(() => {
        // Chamando a função criada para carregar as plantas
        fetchPlant()
    }, []);

    // Função para carregar mais dados quando o usuário rolar até o final da lista
    function handleFetchMore(distance: number) {
        if (distance < 1) return;
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        // Chamando a função criada para carregar as plantas
        fetchPlant();
    };

    // Função para lidar com a seleção da planta e navegaçõa da tela
    function handlePlantSelect(plant: PlantProps) {
        // Navegando para a página da planta, já passando os dados dessa
        navigation.navigate("PlantSave", { plant });
    };

    // Verificando se a tela está carregando. Caso esteja, colocamos a animação
    if (loading) return <Load />
    // Caso contrário, retornamos a tela
    else return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Utilizando o cabeçalho para a tela */}
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>

            <View>
                {/* Criando a lista de ambientes */}
                <FlatList
                    // Definindo os dados para a lista
                    data={environments}
                    // Definindo a chave para os itens
                    keyExtractor={(item) => String(item.key)}
                    // Definindo como os dados serão renderizados
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            title={item.title}
                            // Definindo a estilização de acordo com o selecionado
                            active={item.key == environmentSelected}
                            // Permitindo a seleção do ambiente
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}
                    // Definindo que será uma lista horizontal
                    horizontal
                    // Desabilitando a barra de rolagem
                    showsHorizontalScrollIndicator={false}
                    // Definindo a estilização da lista (não é somente com style={})
                    contentContainerStyle={styles.environmentList}
                />
            </View>

            <View style={styles.plants}>
                {/* Criando a lista de plantas */}
                <FlatList
                    // Definindo os dados para a lista
                    data={filteredPlants}
                    // Definindo a chave para os itens
                    keyExtractor={(item) => String(item.id)}
                    // Definindo como os dados serão renderizados
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    // Desabilitando a barra de rolagem
                    showsVerticalScrollIndicator={false}
                    // Definindo o número de colunas (items por linha)
                    numColumns={2}
                    // Definindo que o fim da rolagem será em 10%
                    onEndReachedThreshold={0.1}
                    // Definindo a função a ser chamada quando se chegar no final da rolagem
                    onEndReached={({ distanceFromEnd }) =>
                        handleFetchMore(distanceFromEnd)
                    }
                    // Definindo o componente para o final da lista
                    ListFooterComponent={
                        // Somente caso esteja carregando mais itens
                        loadingMore
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                />
            </View>
        </View>
    )
}

// Definindo a estilização para os componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: colors.background,
    },

    header: {
        paddingHorizontal: 30,
    },

    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },

    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
    },

    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
        // Evitando que o final da lista (à direita) fique cortado
        // SErá o dobreo do marginLeft
        paddingRight: 64,
    },

    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
})