// BuildDetails.js

import React from 'react';
import { View, Text } from 'react-native';

function BuildDetails({route }) {
  const { build } = route.params;

  return (
    <View>
        <Text>Build Details</Text>
        <Text>{build.name}</Text>
    </View>
  );
}

export default BuildDetails;