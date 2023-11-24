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
  
  
  
  
  const SetupScreen = ({onSetupComplete, theme}) => {
    const { colors } = theme;
    const [username, setUsername] = React.useState('');
    const [repoName, setRepoName] = React.useState('');
    const [selectedRepos, setSelectedRepos] = React.useState([]);
    const [showWelcome, setShowWelcome] = React.useState(true);
  


    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (showWelcome) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 12, color: colors.text }}>Welcome</Text>
      </View>
        );
    }
  
  
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
        <View style={[styles.container, { backgroundColor: colors.background}]}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 12, color: colors.text }}>Welcome</Text>
            <Text style={[styles.welcomeMessage, {color: colors.text}]}>Please enter your setup information below:</Text>
            <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, {color: colors.text}]}>Github Username</Text>
                <TextInput
                  value={username}
                  style={[styles.input, { color: colors.text, borderColor: colors.border}]}
                  onChangeText={(text) => setUsername(text)}
                  placeholder={username ? username : "Enter your GitHub username"}
                  autoCapitalize="none"
                  autoCorrect={false}
              />
            </View>

            <View style={[styles.repoContainer, { Text: colors.text }]}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Add / Remove Repository</Text>
                  <View style={styles.inputRow}>
                      <TextInput
                          value={repoName}
                          style={{
                              fontSize: 18,
                              borderColor: colors.border,
                              color: colors.text,
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
              <TouchableOpacity style={{backgroundColor: colors.primary, paddingLeft: 10, paddingRight: 10, paddingBottom: 3, paddingTop: 3, borderRadius: 5, alignItems: 'center',}} onPress={addRepo}>
                      <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              </View>
          </View>
          <View style={{ borderColor: colors.border, borderWidth: 2, borderRadius: 5, padding: 5}}>
          {selectedRepos.map((repo) => (
              <View key={repo} style={styles.repoRow}>
                  <Text style={{ fontSize: 20, color: colors.text}}>{repo}</Text>
                  <TouchableOpacity style={{backgroundColor: colors.primary, marginLeft: 15 , paddingLeft: 5, paddingRight: 5, paddingBottom: 0.5, paddingTop: 0.5, borderRadius: 5, alignItems: 'center',}} onPress={() => removeRepo(repo)}>
                      <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              </View>
          ))}
          </View>
          <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary}]} onPress={saveSettings}>
                  <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
          </View>
        </View>
    );
  }

    

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 22,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3
    },
    addrepocontainer: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '27%',
    },
    inputLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        fontSize: 18,
        borderWidth: 0.5,
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
        padding: 5
    },
  });

export default SetupScreen;