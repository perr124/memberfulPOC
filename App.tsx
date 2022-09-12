import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import { pkceChallenge } from 'react-native-pkce-challenge';
import axios from 'axios';

export default function App() {
  const onPress = () => {
    console.log('hiii');
  };

  const URLEncode = (str: any) => {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  };

  // const {codeChallenge, codeVerifier} = pkceChallenge();
  const client_id = 'Atb3hribSevwe6RTaTWd6B5E';
  const codeChallenge = 'grBj03_9B5OIc27JddGpZ9HNPBkfXJ1WyyQy1s9KPPA';
  const codeVerifier =
    'evaNO6bSErHo8mSV7COYg0kz37rFmJqHX29GvpzCrRyBerObuFCc4b36CTrG6M7lUEGsTQIBgoYpb8DLelMo9LnvdtXcDtDPc06xN7k6CkioDpCkrJB2SPy8VoztxDBY';

  const discovery = {
    authorizationEndpoint: 'https://scoontv.memberful.com/oauth',
    tokenEndpoint: 'https://scoontv.memberful.com/oauth/token',
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: client_id,
      usePKCE: true,
      redirectUri: 'com.scoontv.app://callback',
      codeChallenge: codeChallenge,
      codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
      // state: 'DAV0RlF68zZr7F77',
    },
    discovery
  );

  useEffect(() => {
    async function fetchMyAPI() {
      if (response?.type === 'success') {
        console.log(response, 'ACCC TOkEN');
        console.log(codeVerifier, 'ACCC verif');
        await fetchAndLog(response.params.code, response.params.redirect_to);
        // await postApi(response.params.code)
      }
    }
    fetchMyAPI();
  }, [response]);

  const fetchAndLog = async (code: string, redirecturl: string) => {
    console.log(code, 'CODEEE');
    console.log(codeChallenge, 'codeChallenge');
    const response = await fetch('https://scoontv.memberful.com/oauth/token', {
      method: 'POST',
      headers: { 'content-Type': 'application/json', 'User-Agent': 'chrome' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: client_id,
        code: code,
        // redirect_uri: redirecturl,
        code_verifier: codeVerifier,
      }),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!oddd11</Text>
      <Button
        onPress={() => promptAsync()}
        title='Log In'
        color='#000000'
        accessibilityLabel='Tap on Me'
      />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
