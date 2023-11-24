import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import React from 'react';
import { Text, View, SectionList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { token } from '@env';

console.log(token)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function GithubBuilds({ navigation }) {
    const { colors } = useTheme();
    const [builds, setBuilds] = React.useState(null);
    const [filter, setFilter] = React.useState('all');
  
    const filteredBuilds = builds ? builds.filter(build => {
      if (filter === 'all') {
        return true;
      } else {
        return build.conclusion === filter;
      }
    }) : null;
  
    const fetchBuilds = async () => {
      const username = await AsyncStorage.getItem('githubUsername');
      let selectedRepos = await AsyncStorage.getItem('githubRepos');
      selectedRepos = selectedRepos ? JSON.parse(selectedRepos) : [];
      console.log("Selected Repos: ",selectedRepos)
      const allBuilds = [];
      for (const repo of selectedRepos) {
        const urlgit = `https://api.github.com/repos/${username}/${repo}/actions/runs`;
        const response = await fetch(urlgit, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });
        const data = await response.json();
        console.log("Url: ",urlgit)
        allBuilds.push(...data.workflow_runs);
      }
  
      setBuilds(allBuilds);
    };
  
    React.useEffect(() => {
      fetchBuilds();
      const intervalId = setInterval(fetchBuilds, 30 * 1000);
      return () => clearInterval(intervalId);
    }, []);
  
  
    const renderItem = ({ item: build }) => {
      const startTime = new Date(build.created_at);
      const endTime = new Date(build.updated_at);
      const durationMs = endTime - startTime;
      const durationMinutes = Math.round(durationMs / 1000 / 60);
  
      return (
        <TouchableOpacity onPress={() => navigation.navigate('BuildDetails', { build })}>
            <View style={[styles.build, { backgroundColor: colors.border }]}>
                <View style={[styles.status, { backgroundColor: build.conclusion === 'success' ? 'green' : build.conclusion === 'failure' ? 'red' : 'yellow' }]} />
                <View style={styles.buildInfo}>
                    <Text style={[styles.buildtext, { color: colors.text }]}>{build.name}</Text>
                    <Text style={[styles.buildtext, { color: colors.text }]}>{durationMinutes}m </Text>
                </View>
            </View>
        </TouchableOpacity>
      );
    };
  
    const renderSectionHeader = ({ section: { title } }) => (
      <Text style={[styles.header, { color: colors.text }]}>{title}</Text>
    );
  
    const groupedBuilds = _.groupBy(filteredBuilds, 'repository.name');
  
    const sections = Object.keys(groupedBuilds).map((repoName) => ({
      title: repoName,
      data: groupedBuilds[repoName],
    }));
  
    return (
      <View style={[styles.container, { backgroundColor: colors.background}]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
          <Text style={{ fontWeight: 700, color: colors.text }} >Filter</Text>
          <RNPickerSelect style={{width: 100, inputIOS: { color: colors.text }, inputAndroid: { color: colors.text },}}
            onValueChange={(value) => setFilter(value)}
            items={[
              { label: 'All', value: 'all' },
              { label: 'Success', value: 'success' },
              { label: 'Failure', value: 'failure' }
            ]}
            value='all' // Add this line
            placeholder={{}}
          />
        </View>
        {builds ? (
          <SectionList
            sections={sections}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(build) => build.id.toString()}
          />
        ) : (
          <ActivityIndicator size="large" color="#c9c9c9" />
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      padding: 10,
    },
    build: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      backgroundColor: '#cdcd', // light gray background
      borderRadius: 20, // rounded corners
      padding: 10, // space around the text and status
      margin: 5, // space between each bubble
      width: '97%',
      height: 40,
    },
    buildtext: {
      fontWeight: '500',
      fontSize: 16
    },
    buildInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
    },
    status: {
      width: 12,
      height: 12,
      borderRadius: 7,
      marginRight: 10,
    },
    avatar: {
      width: 50,
      height: 50,
    },
    input: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#d6d7da'
    }
  });

  export default GithubBuilds;