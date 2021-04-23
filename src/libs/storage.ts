import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
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
export interface StoragePlantProps {
    [id: string]: {
        data: PlantProps;
        notificationId: string;
    };
};

// Função para salvar a planta com os dados no armazenamento do dispositivo
export async function savePlant(plant: PlantProps): Promise<void> {
    try {
        // Obtendo o horário atual e o de rega
        const nextTime = new Date(plant.dateTimeNotification);
        const now = new Date();
        // Obtendo a frequência de rega da planta
        const { times, repeat_every } = plant.frequency;
        // Caso seja semanal, o intervalo será a cada 7 dias
        if (repeat_every == 'week') {
            const interval = Math.trunc(7 / times);
            nextTime.setDate(now.getDate() + interval)
        }
        // Caso seja diário
        else nextTime.setDate(now.getDate() + 1)

        // Pegando a diferença entre os horários em segundos
        const seconds = Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
        );

        // Agendando a notificação para a planta
        // Referências para Emojis: https://getemoji.com/
        const notificationId = await Notifications.scheduleNotificationAsync({
            // Conteúdo da notificação
            content: {
                title: 'Heeey, 🌱',
                body: `Está na hora de cuidar da sua ${plant.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            // Gatilho
            trigger: {
                // O tempo não pode ser menor que 60 segundos
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true,
            }
        })

        // Obtendo os dados do armazenamento local
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        // Caso algo tenha sido retornado, convertemos no tipo correto
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        // Instanciando a nova planta a ser salva
        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId,
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

// Função para remover uma planta do armazenamento do dispositivo
export async function removePlant(id: string): Promise<void> {
    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};
        // Removendo a notificação para a planta
        await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);
        // Removendo a planta selecionada pelo seu ID
        delete plants[id];
        await AsyncStorage.setItem(
            '@plantmanager:plants',
            JSON.stringify(plants)
        );
    } catch (error) {
        // Caso ocora algum erro
        throw new Error(error);
    }
};
