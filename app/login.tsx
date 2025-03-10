import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Login = () => {
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#000000', '#8e44ad']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.formContainer}>
                <MaterialCommunityIcons name="account-circle" size={100} color="white" />
                <Text style={styles.title}>Login</Text>
            </View>

            <TextInput style={styles.input} placeholderTextColor='#DDD' placeholder='E-mail' keyboardType="email-address" />
            <TextInput style={styles.input} placeholderTextColor='#DDD' placeholder='Senha' secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={() => router.replace('/home')}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/welcome')}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    formContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        width: '90%',
        backgroundColor: '#9b59b6',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        color: 'white',
        marginBottom: 12,
    },
    button: {
        width: '90%',
        backgroundColor: '#8e44ad',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    backButton: {
        width: '90%',
        backgroundColor: '#6c3483',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default Login
