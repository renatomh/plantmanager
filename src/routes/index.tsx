import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackRoutes from './stack.routes';

// Centralizando as rotas no container de navegação
const Routes = () => (
    <NavigationContainer>
        <StackRoutes />
    </NavigationContainer>
)

export default Routes;
