import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PlantSelect } from '../pages/PlantSelect';
import { MyPlants } from '../pages/MyPlants';

import colors from '../styles/colors';
import { MaterialIcons } from '@expo/vector-icons';

// Inicializando a navegaçõ por abas
const AppTab = createBottomTabNavigator();

const AuthRoutes: React.FC = () => (
    // Opções para as abas
    <AppTab.Navigator
        tabBarOptions={{
            activeTintColor: colors.green,
            inactiveTintColor: colors.heading,
            labelPosition: 'beside-icon',
            style: {
                paddingVertical: Platform.OS == 'ios' ? 20 : 0,
                height: 88,
            }
        }}
    >
        {/* Definindo as abas para navegação */}
        <AppTab.Screen
            name="Nova Planta"
            component={PlantSelect}
            // Definindo as opções para a aba
            options={{
                // Selecionando o ícone para a aba
                tabBarIcon: (({ size, color }) => (
                    <MaterialIcons
                        name="add-circle-outline"
                        size={size}
                        color={color}
                    />
                ))
            }}
        />
        <AppTab.Screen
            name="Minhas Planta"
            component={MyPlants}
            // Definindo as opções para a aba
            options={{
                // Selecionando o ícone para a aba
                tabBarIcon: (({ size, color }) => (
                    <MaterialIcons
                        name="format-list-bulleted"
                        size={size}
                        color={color}
                    />
                ))
            }}
        />

    </AppTab.Navigator>
)

export default AuthRoutes;
