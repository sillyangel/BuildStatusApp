import { token } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TextInput, Button } from 'react-native';
import * as React from 'react';


async function validateUsername(username) {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    console.log(response.status);
    console.log(username)
    return response.status === 200;
  }
  
  
  
  
  function SettingsScreen() {
    const [username, setUsername] = React.useState('');
    const [repoName, setRepoName] = React.useState('');
    const [selectedRepos, setSelectedRepos] = React.useState([]);
  
  
    React.useEffect(() => {
      const fetchSettings = async () => {
        const savedUsername = await AsyncStorage.getItem('githubUsername');
        const savedRepos = JSON.parse(await AsyncStorage.getItem('githubRepos')) || [];
        setUsername(savedUsername || '');
        setSelectedRepos(savedRepos);
      };
  
      fetchSettings();
    }, []);
  
    const saveSettings = async () => {
      try {
        if (!await validateUsername(username)) {
          alert('Invalid username');
          return;
        }
        await AsyncStorage.setItem('githubUsername', username);
        await AsyncStorage.setItem('githubRepos', JSON.stringify(selectedRepos));
        alert('Settings saved')
        console.log('Settings saved')
      } catch (error) {
        console.error(error);
      }
    };
  
    const addRepo = () => {
      if (repoName && !selectedRepos.includes(repoName)) {
        setSelectedRepos((prevRepos) => [...prevRepos, repoName]);
        setRepoName('');
      }
    };
  
    const removeRepo = (repoToRemove) => {
      setSelectedRepos((prevRepos) => prevRepos.filter((repo) => repo !== repoToRemove));
    };
  
    return (
      <View style={{ padding: 20, margin: 2 }}>
        <View >
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 2 }}>Github Username</Text>
          <TextInput
            value={username}
            style={{ fontSize: 18, borderColor: '#cccccc', borderWidth: 1, borderRadius: 5, padding: 2, width: '50%' }}
            onChangeText={(text) => setUsername(text)}
            placeholder={username ? username : "Enter your GitHub username"}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
  
        <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 2 }}>Add / Remove Repository</Text>
          <TextInput
            value={repoName}
            style={{ fontSize: 18,  borderColor: '#cccccc', borderWidth: 1, borderRadius: 5, padding: 2 }}
            onChangeText={setRepoName}
            placeholder="Enter a github repository name"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button title="Add Repo" onPress={addRepo} />
        </View>
        {selectedRepos.map((repo) => (
          <View key={repo} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{repo}</Text>
            <Button title="-" onPress={() => removeRepo(repo)} />
          </View>
        ))}
        <Button title="Save" onPress={saveSettings} />
      </View>
    );
  }

  export default SettingsScreen;