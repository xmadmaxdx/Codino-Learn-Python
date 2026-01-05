import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeDashboardScreen } from '../screens/home';
import { LessonUnitOverviewScreen, LessonDetailScreen } from '../screens/lessons';
import { QuizScreen } from '../screens/quiz';
import { CommunityHubScreen, DiscussionPostScreen } from '../screens/community';
import { UserProfileScreen } from '../screens/profile';
import { LeaderboardScreen } from '../screens/leaderboard';

export type MainStackParamList = {
    HomeDashboard: undefined;
    LessonUnitOverview: undefined;
    LessonDetail: undefined;
    Quiz: undefined;
    CommunityHub: undefined;
    DiscussionPost: undefined;
    Profile: undefined;
    Leaderboard: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

export const MainTabNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#191022' },
                animationEnabled: true,
            }}
        >
            <Stack.Screen name="HomeDashboard" component={HomeDashboardScreen} />
            <Stack.Screen name="LessonUnitOverview" component={LessonUnitOverviewScreen} />
            <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="CommunityHub" component={CommunityHubScreen} />
            <Stack.Screen name="DiscussionPost" component={DiscussionPostScreen} />
            <Stack.Screen name="Profile" component={UserProfileScreen} />
            <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        </Stack.Navigator>
    );
};

export default MainTabNavigator;
