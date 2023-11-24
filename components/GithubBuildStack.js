// GithubBuilds.js

import { createStackNavigator } from '@react-navigation/stack';
import BuildDetails from './BuildDetails';
import GithubBuilds from './GithubBuilds';

const Stack = createStackNavigator();

function GithubBuildsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="GithubBuilds" component={GithubBuilds} />
            <Stack.Screen name="BuildDetails" component={BuildDetails} />
        </Stack.Navigator>
    );
}

export default GithubBuildsStack;