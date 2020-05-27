import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert, Keyboard, Vibration } from 'react-native';
import ScreenView from '../../components/screenView';
import { useNavigation } from '@react-navigation/native';

export default function TestScreen() {
    const [title, setTitle] = useState('Eh Primo?');
    const [number, setNumber] = useState(0);
    const [isNew, setIsNew] = useState(1);
    const [background, setBackground] = useState('#7e7ecc');
    const [backgroundBtn, setBackgroundBtn] = useState('#5050a8');
    const navigation = useNavigation();
    let NumberInput;

    function ehPrimo(number){
        number = Number(number);
        if (number == 2) return true;
        if (number == 0 || number == 1 || number % 2 == 0) return false;
        for (let aux = 3; aux <= Math.floor(Math.sqrt(number)); aux += 2)
            if (number % aux == 0) return false;
        return true;
    }

    function easterEgg(){
        Alert.alert(
            "Easter Egg",
            "Digite os 6 primeiros números da Sequência de Fibonacci para acessar um jogo!"
        );
    }

    function verify(number){
        Keyboard.dismiss();
        setIsNew(0);
        if (!number) {
            Alert.alert(
                "Número inválido",
                "Você precisa digitar um número antes de efetuar a verificação"
            );
        } else if (number == 112358) {
            setTitle('Eh Primo?');
            navigation.navigate('Game');
        } else {
            if (ehPrimo(number)) {
                setTitle(number + ' eh primo!');
                setBackground('#00a0a0');
                setBackgroundBtn('#40a089');
                Vibration.vibrate();
            } else {
                setTitle(number + ' não eh :/');
                setBackground('#e50b2c');
                setBackgroundBtn('#b50721');
            }
        }
    }

    return (
        <ScreenView style={[styles.container, { backgroundColor: background }]}
            barStyle='light-content'
            safeAreaColor={background}>
            <View style={styles.box}>
                <Text style={[styles.boxTitle, { color: backgroundBtn }]}>{title}</Text>
                <TextInput
                    ref={ref => NumberInput = ref}
                    placeholder='Digite um número'
                    placeholderTextColor='#707070'
                    style={styles.boxInput}
                    keyboardType='number-pad'
                    keyboardAppearance='dark'
                    clearButtonMode='always'
                    selectionColor={backgroundBtn}
                    maxLength={13}
                    onChangeText={text => {
                        setNumber(text);
                        if (!isNew) {
                            setIsNew(1);
                            setBackground('#7e7ecc');
                            setBackgroundBtn('#5050a8');
                        }
                    }} />
                <TouchableOpacity
                    style={[styles.boxButton, { backgroundColor: backgroundBtn }]}
                    onLongPress={easterEgg}
                    delayLongPress={2000}
                    onPress={() => {
                        verify(number);
                    }}>
                    <Text style={styles.boxButtonText}>Verificar</Text>
                </TouchableOpacity>
            </View>
        </ScreenView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#7e7ecc',
    },
    box: {
        backgroundColor: '#f6f6f6',
        minHeight: 100,
        margin: 30,
        padding: 20,
        borderRadius: 5,
        alignItems: 'stretch'
    },
    boxTitle: {
        fontFamily: 'League Spartan',
        fontSize: 40,
        textAlign: 'center',
        color: '#404040'
    },
    boxInput: {
        backgroundColor: '#e0e0e0',
        color: '#404040',
        fontFamily: 'Poppins',
        fontSize: 20,
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    },
    boxButton: {
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    boxButtonText: {
        color: '#f6f6f6',
        fontFamily: 'Poppins',
        fontSize: 20,
    }
});
