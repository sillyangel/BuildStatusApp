import { token } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
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
  
  
  
  
  const SetupScreen = ({onSetupComplete}) => {
    const [username, setUsername] = React.useState('');
    const [repoName, setRepoName] = React.useState('');
    const [selectedRepos, setSelectedRepos] = React.useState([]);
  
  
  
    const saveSettings = async ( ) => {
      try {
        if (!await validateUsername(username)) {
          alert('Invalid username');
          return;
        }
        await AsyncStorage.setItem('githubUsername', username);
        await AsyncStorage.setItem('githubRepos', JSON.stringify(selectedRepos));
        onSetupComplete();
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
        <View style={styles.container}>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome</Text>
            <Text style={styles.welcomeMessage}>Please enter your setup information below:</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Github Username</Text>
                <TextInput
                    value={username}
                    style={styles.input}
                    onChangeText={(text) => setUsername(text)}
                    placeholder={username ? username : "Enter your GitHub username"}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            <View style={styles.repoContainer}>
                <Text style={styles.inputLabel}>Add / Remove Repository</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            value={repoName}
                            style={{
                                fontSize: 18,
                                borderColor: '#cccccc',
                                borderWidth: 1,
                                borderRadius: 5,
                                padding: 2,
                                width: '73%',
                            }}
                            onChangeText={setRepoName}
                            placeholder="Enter a github repository name"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Button title="Add Repo" onPress={addRepo} />
                </View>
            </View>
            {selectedRepos.map((repo) => (
                <View key={repo} style={styles.repoRow}>
                    <Text>{repo}</Text>
                    <Button title="-" onPress={() => removeRepo(repo)} />
                </View>
            ))}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={saveSettings}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }

    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        margin: 2,
    },
    inputContainer: {
        marginBottom: 50,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addrepocontainer: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '27%',
    },
    inputLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    input: {
        fontSize: 18,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
        width: '100%',
    },
    repoContainer: {
        marginTop: 50,
    },
    welcomeMessage: {
        fontSize: 21,
        fontWeight: '400',
        marginBottom: 80,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
    },  
    repoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default SetupScreen;