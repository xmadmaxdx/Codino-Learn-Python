import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    WelcomeScreen,
    FeatureHighlightScreen,
    ExperienceScreen,
} from '../screens/onboarding';

export type OnboardingStackParamList = {
    Welcome: undefined;
    FeatureHighlight: undefined;
    Experience: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#191022' },
                animationEnabled: true,
            }}
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="FeatureHighlight" component={FeatureHighlightScreen} />
            <Stack.Screen name="Experience" component={ExperienceScreen} />
        </Stack.Navigator>
    );
};

export default OnboardingNavigator;
