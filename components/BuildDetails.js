import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function BuildDetails({ route }) {
  const { build } = route.params;
  const { colors } = useTheme();
  const startTime = new Date(build.created_at);
  const endTime = new Date(build.updated_at);
  const durationMs = endTime - startTime;
  const durationMinutes = Math.round(durationMs / 1000 / 60);

  return (
    <View style={[styles.container, { backgroundColor: colors.background}]}>
      <View style={styles.buildInfo}>
        <Text style={[styles.header, { color: colors.text}]}>Build Details</Text>
        <View style={[styles.status, { backgroundColor: build.conclusion === 'success' ? 'green' : build.conclusion === 'failure' ? 'red' : 'yellow' }]} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
        <Text style={[styles.title, { color: colors.text}]}>{build.display_title}</Text>
        <Text style={[styles.duration, { color: colors.text}]}>{durationMinutes}m</Text>
      </View>
      <View style={styles.commitInfo}>
        <Text style={[styles.author, { color: colors.text}]}>{build.head_commit.author.name}</Text>
        <Text style={[styles.message, { color: colors.text}]}>{build.head_commit.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 2, 
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buildInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginTop: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  duration: {
    fontSize: 20,
    fontWeight: '500',
  },
  commitInfo: {
    marginBottom: 20,
  },
  author: {
    fontSize: 16,
    fontWeight: '500',
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
  },
});