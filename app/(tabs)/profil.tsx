import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Profil: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleEdit = () => {
    // Logique pour enregistrer les informations de l'utilisateur
    Alert.alert('Informations mises à jour', `Nom d'utilisateur: ${username}\nEmail: ${email}`);
  };

  const handleLogout = () => {
    // Logique pour déconnexion
    Alert.alert('Déconnexion', 'Vous avez été déconnecté.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Button title="Enregistrer" onPress={handleEdit} />
      <Button title="Se déconnecter" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F3F3F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default Profil;
