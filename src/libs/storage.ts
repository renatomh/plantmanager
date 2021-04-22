import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

// Tipagem para as propriedades das plantas
export interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    };
    dateTimeNotification: Date;
    hour: string;
};

// Definindo a tipagem do objeto a ser armazenado n AsyncStorage
interface StoragePlantProps {
    [id: string]: {
        data: PlantProps;
    };
};

// Função para salvar a planta com os dados no armazenamento do dispositivo
export async function savePlant(plant: PlantProps): Promise<void> {
    try {
        // Obtendo os dados do armazenamento local
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        // Caso algo tenha sido retornado, convertemos no tipo correto
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        // Instanciando a nova planta a ser salva
        const newPlant = {
            [plant.id]: {
                data: plant
            }
        };

        // Salvando a lista de plantas atualizada
        await AsyncStorage.setItem('@plantmanager:plants',
            JSON.stringify({
                ...newPlant,
                ...oldPlants
            }));
    } catch (error) {
        // Caso ocora algum erro
        throw new Error(error);
    }
};

// Função para carregar as plantas do armazenamento do dispositivo
export async function loadPlant(): Promise<PlantProps[]> {
    try {
        // Obtendo os dados do armazenamento local
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        // Caso algo tenha sido retornado, convertemos no tipo correto
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};
        // Ordenando os dados
        const plantsSorted = Object
            .keys(plants)
            .map((plant) => {
                return {
                    ...plants[plant].data,
                    hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm'),
                }
            })
            .sort((a, b) =>
                // Ordenando por horário de rega
                Math.floor(
                    new Date(a.dateTimeNotification).getTime() / 1000 -
                    Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
                )
            );
        // Retornando os dados tratados
        return plantsSorted;
    } catch (error) {
        // Caso ocora algum erro
        throw new Error(error);
    }
};
