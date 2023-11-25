// GithubBuilds.js

import { createStackNavigator } from '@react-navigation/stack';
import BuildDetails from './BuildDetails';
import Buildss from './Buildss';

const Stack = createStackNavigator();

function GithubBuildsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Builds" component={Buildss} />
            <Stack.Screen name="BuildDetails" component={BuildDetails} />
        </Stack.Navigator>
    );
}

export default GithubBuildsStack;