import React from "react" 
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
    bubbleWrapper: {
        flexDirection: 'column',
    },
    bubbleWrapperSent: {
        alignSelf: 'flex-end',
        marginLeft: 40,
    },
    bubbleWrapperReceived: {
        alignSelf: 'flex-start',
        marginRight: 40,
    },
    ballon: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#FFD700', // Borda dourada retrô
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    ballonSent: {
        backgroundColor: '#8B0000', // Vermelho escuro (tom retrô)
    },
    ballonReceived: {
        backgroundColor: '#1E1E1E', // Cinza escuro (tom retrô)
    },
    ballonText: {
        fontSize: 14,
        fontFamily: 'PressStart2P_400Regular', // Fonte estilo retrô
        textShadowColor: '#FF4500',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    ballonTextSent: {
        color: '#FFF', // Branco para contraste
    },
    ballonTextReceived: {
        color: '#FFD700', // Dourado para manter a estética
    },
})

const Ballon = ({ message, currentUser } : any) => {
    const sent = currentUser === message.sentBy;
    const ballonColor = sent ? styles.ballonSent : styles.ballonReceived;
    const ballonTextColor = sent ? styles.ballonTextSent : styles.ballonTextReceived;
    const bubbleWrapper = sent ? styles.bubbleWrapperSent : styles.bubbleWrapperReceived;
    
    return (
        <View style={{ marginBottom: '2%' }}>
            <View style={[styles.bubbleWrapper, bubbleWrapper]}>
                <View style={[styles.ballon, ballonColor]}>
                    <Text style={[styles.ballonText, ballonTextColor]}>
                        {message.text}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Ballon
