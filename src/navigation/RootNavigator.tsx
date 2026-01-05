import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainTabNavigator } from './MainTabNavigator';

export type RootStackParamList = {
    Onboarding: undefined;
    MainTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#191022' },
                animationEnabled: true,
            }}
        >
            <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        </Stack.Navigator>
    );
};

export default RootNavigator;
