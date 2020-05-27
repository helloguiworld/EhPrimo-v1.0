import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, AsyncStorage } from 'react-native';
import ScreenView from '../../components/screenView';
import { useNavigation } from '@react-navigation/native';

export default function GamePage() {
    const [gameOn, setGameOn] = useState(0);
    const [number, setNumber] = useState(0);
    const [result, setResult] = useState(false);
    const [points, setPoints] = useState(0);
    const [record, setRecord] = useState(0);
    // const [background, setBackground] = useState('#F6F6F6');
    // const [backgroundBtn, setBackgroundBtn] = useState('#5050a8');
    const navigation = useNavigation();

    const ehPrimo = (number) => {
        number = Number(number);
        if (number == 2) return true;
        if (number == 0 || number == 1 || number % 2 == 0) return false;
        for (let aux = 3; aux <= Math.floor(Math.sqrt(number)); aux += 2)
            if (number % aux == 0) return false;
        return true;
    }

    function generateNewNum(min, max) {
        let num;
        if (min < 0) min = 0;
        do {
            num = Math.floor(Math.random() * (Number(max) + 1 - Number(min)) + Number(min));
        } while (num % 2 == 0 || num % 5 == 0);
        setNumber(num);
        if (ehPrimo(num)) setResult(true);
        else setResult(false);
    };

    function verify(answer) {
        if (answer == result) {
            setPoints(points + 1);
            generateNewNum(10, 500);
        } else {
            if (points > record) {
                Alert.alert(
                    "Parabéns!",
                    "Você tem um novo recorde! :)"
                );
                putRecord(points);
            } else {
                Alert.alert(
                    "Você errou :(",
                    "Tente novamente!"
                );
            }
            setPoints(0);
            setGameOn(0);
        }
    }

    function resetRecord() {
        Alert.alert(
            'Modo reset',
            'Deseja apagar seu recorde atual?',
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        putRecord(0);
                        console.log('Recorde resetado');
                        Alert.alert(
                            "Reset executado",
                            "Você zerou seu recorde"
                        );
                    }
                },
                {
                    text: 'Não',
                    onPress: () => console.log('Reset cancelado'),
                    style: 'destructive'
                },
            ]
        );
    }

    async function putRecord(newRecord) {
        try {
            await AsyncStorage.setItem('@Game_Record', newRecord.toString());
        } catch (error) {
            console.log("Erro ao gravar recorde com AsyncStorage");
        }
        setRecord(newRecord);
    }

    async function getRecord() {
        let response;
        try {
            response = await AsyncStorage.getItem('@Game_Record');
            if (response == null) response = 0;
        } catch (error) {
            console.log("Erro ao recuperar recorde com AsyncStorage");
        }
        setRecord(Number(response));
    }

    useEffect(() => {
        getRecord()
    }, []);

    return (
        <ScreenView style={[styles.container, { backgroundColor: '#F6F6F6' }]}
            barStyle='light-content'
            safeAreaColor='#5050a8'>
            {
                gameOn ? (
                    <>
                        <Text style={styles.questionTitle}>{number} eh primo?</Text>
                        <Text style={styles.pointsText}>
                            {points == 0 ? "Você ainda não fez pontos" : `Você fez ${points} pontos`}
                        </Text>
                        <View style={styles.answerBox}>
                            <TouchableOpacity style={[styles.answerBtn, { backgroundColor: '#c4c4ef' }]}
                                onPressOut={() => verify(false)}>
                                <Text style={[styles.boxButtonText, { color: '#5050a8' }]}>Não</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.answerBtn, { backgroundColor: '#5050a8' }]}
                                onPressOut={() => verify(true)}>
                                <Text style={[styles.boxButtonText, { color: '#F6F6F6' }]}>Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        {
                            record == 0 ? (
                                <Text style={[styles.pointsText, { fontSize: 40 }]}>
                                    EhPrimo Play
                                </Text>
                            ) : (
                                <>
                                    <Text style={[styles.pointsText, { fontSize: 20 }]}>Seu record atual é de</Text>
                                    <Text style={[styles.pointsText, { fontSize: 40 }]}>{record} pontos</Text>
                                </>
                            )
                        }
                        <Text style={[styles.pointsText, { fontSize: 16, marginBottom: 20, color: '#7e7ecc'  }]}>
                            Clique para jogar
                        </Text>
                        <TouchableOpacity style={[styles.boxButton, { backgroundColor: '#5050a8' }]}
                            onLongPress={resetRecord}
                            delayLongPress={4000}
                            onPress={() => {
                                generateNewNum(10, 500);
                                setGameOn(1);
                            }}>
                            <Text style={[styles.boxButtonText, { color: '#F6F6F6' }]}>Jogar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.boxButton, { backgroundColor: '#c4c4ef' }]}
                            onPressOut={() => navigation.goBack()}>
                            <Text style={[styles.boxButtonText, { color: '#5050a8' }]}>Voltar</Text>
                        </TouchableOpacity>
                    </>
                )
            }
        </ScreenView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    boxButton: {
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    boxButtonText: {
        color: '#f6f6f6',
        fontFamily: 'Poppins',
        fontSize: 20,
    },
    questionTitle: {
        color: '#5050a8',
        fontFamily: 'League Spartan',
        fontSize: 40,
        textAlign: 'center',
    },
    pointsText: {
        color: '#5050a8',
        fontFamily: 'Poppins',
        fontSize: 20,
        textAlign: 'center',
    },
    answerBox: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    answerBtn: {
        width: '48%',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});