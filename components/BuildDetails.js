// BuildDetails.js
//
//        <Button title="Back" onPress={() => navigation.goBack()} />
//
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function BuildDetails({route, navigation }) {
  const { build } = route.params;
  const startTime = new Date(build.created_at);
  const endTime = new Date(build.updated_at);
  const durationMs = endTime - startTime;
  const durationMinutes = Math.round(durationMs / 1000 / 60);


  return (
    <View style={styles.container}>
        <View style={styles.buildInfo}>
                    <Text style={{ fontSize: 20, fontWeight: '500'}}>{build.repository.full_name}</Text>
                    <Text style={{ fontSize: 20, fontWeight: '500'}}>{durationMinutes}m </Text>
        </View>
                     <Text style={{ fontSize: 16, fontWeight: '500'}}>{build.display_title}</Text>
        <View style={{ }}>
                    <Text style={{ fontSize: 16, fontWeight: '500'}}>{build.head_commit.author.name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '500'}}>{build.head_commit.message}</Text>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      padding: 20,
      margin: 2, 
      flex: 1,
      color: '#000000',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      padding: 10,
    },
    buildInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    status: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 10,
    }
  });

export default BuildDetails;