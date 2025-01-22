import React, { useEffect, useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import PagerView from 'react-native-pager-view';
import { Input } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from "react-native";
// import CircularProgressBase from 'react-native-circular-progress-indicator';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import styleGlobal from "../../styleGlobal";
import { themes } from "../../themes/themes";
import ThemeSwitcher from "../../themes/themeSwitcher";
import ThemedButton from "../../themes/themedButtons";
import { ThemeProvider } from "../../themes/themeContext";

const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2
  };

const avatares = [
    {
        uri: require('../../assets-expo/default-user.png'),
        id: 0
    },
    {
        uri: require('../../assets-expo/avatar.png'),
        id: 1
    },
    {
        uri: require('../../assets-expo/avatarFamale.jpg'),
        id: 2
    },
    {
        uri: require('../../assets-expo/avatar3.jpg'),
        id: 3
    },
    {
        uri: require('../../assets-expo/avatar4.jpg'),
        id: 4
    },
    {
        uri: require('../../assets-expo/avatar5.jpg'),
        id: 5
    },
    {
        uri: require('../../assets-expo/avatar6.jpg'),
        id: 6
    },
]
const arryColors = [
    {
        color: '#4ecb71',
        id: 1
    },
    {
        color: 'red',
        id: 2
    },
    {
        color: 'orange',
        id: 3
    },
    {
        color: 'pink',
        id: 4
    },
    {
        color: 'gray',
        id: 5
    },
    {
        color: '#e63950',
        id: 6
    },
    {
        color: '#46aaca',
        id: 7
    },
    {
        color: '#6af3f3',
        id: 8
    },
    {
        color: '#f5a842', // orange
        id: 9
    }
]

const MiPerfil = ({navigation}) => {
    const { canGoBack, goBack } = useNavigation();
    const [colorPressabled, setColorPressabled] = useState(false);
    const inputName = useRef(null);
    const inputAge = useRef(null);
    const inputWeight = useRef(null); // Peso
    const inputHeight = useRef(null); // Altura
    const [nameUser, setNameUser] = useState('');
    const [ageUser, setAgeUser] = useState('');
    const [weightUser, setWeightUser] = useState(null);
    const [heightUser, setHeightUser] = useState(null);
    const [imcUser, setImcUser] = useState(null);
    const [modalIMCVisible, setModalIMCVisible] = useState(false);
    const [modalUserVisible, setModalUserVisible] = useState(false);
    const [imageProfile, setImageProfile] = useState(null);

    useEffect(() => {
        getDataProfileUser();
        calcularImc();
        loadImageProfile();
    }, []);

    const loadImageProfile = async () => {
        var index = await AsyncStorage.getItem('image');
        handleClickImageProfile(parseInt(index), 1);
    }
    
    const calcularImc = async () => {
        var peso =  await AsyncStorage.getItem('weight');
        var altura = await AsyncStorage.getItem('height');
        if(peso === null || altura === null){
            setImcUser('')
            return;
        }
        var imc =  Number(peso) / (Number(altura) * Number(altura));
        setImcUser(String(imc).substring(0, 5));
    }

    const getDataProfileUser = async () => {
        console.log('indexStorage => ', await AsyncStorage.getItem('image'))
        setNameUser(await AsyncStorage.getItem('name'));
        setAgeUser(await AsyncStorage.getItem('age'));
        setWeightUser(await AsyncStorage.getItem('weight'));
        setHeightUser(await AsyncStorage.getItem('height'));
    }

    const setDataLocalStorage = async (e, val) => {
        console.log('Data => ', e.nativeEvent.text);
        switch( val ){
            case 1: 
                await AsyncStorage.setItem('name', e.nativeEvent.text);

            break;
            case 2:
                await AsyncStorage.setItem('age', e.nativeEvent.text);
            break;
            case 3:
                await AsyncStorage.setItem('weight', e.nativeEvent.text);
                calcularImc();
            break;
            case 4:
                await AsyncStorage.setItem('height', e.nativeEvent.text); 
                calcularImc();
            break;
        }
    }

    const handleClickEdit = ( val ) => {
        switch(val){
            case 1:
                inputName.current.focus();
            break
            case 2:
                inputAge.current.focus();
            break
            case 3:
                inputWeight.current.focus();
            break
            case 4:
                inputHeight.current.focus();
            break
        }
    }

    const handleColorSelected = (index) => {
        console.log(index);
        setColorPressabled(true);
        // styleGlobal.backgroundGlobal.background = 'red';

    }
    
    const handleClearUser = () =>
        Alert.alert('Borrar Usuario', '¿Estas seguro que deseas borrar los datos de usuario registrados?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK', 
            onPress: () => {
                clearUserData();
            }
        },
    ]);

    const clearUserData = () => {
        AsyncStorage.removeItem('name');
        setNameUser('');
        AsyncStorage.removeItem('age');
        setAgeUser('');
        AsyncStorage.removeItem('weight');
        setWeightUser('');
        AsyncStorage.removeItem('height');
        setHeightUser('');
        setImcUser('');
        AsyncStorage.removeItem('image');
        setImageProfile(require('../../assets-expo/default-user.png'));
    }

    const handleClickImageProfile = async (index, val?) => {
        console.log('selecciono un imagen de perfil...', index);
        if(val !== 1){setModalUserVisible(!modalUserVisible);}
        switch(index){
            case 0:
                setImageProfile(require('../../assets-expo/default-user.png'));
                await AsyncStorage.setItem('image', JSON.stringify(index));
                await AsyncStorage.setItem('imageProfileUser', JSON.stringify(require('../../assets-expo/default-user.png')));
            break;
            case 1: 
                setImageProfile(require('../../assets-expo/avatar.png'));
                await AsyncStorage.setItem('image', JSON.stringify(index));
                await AsyncStorage.setItem('imageProfileUser', JSON.stringify(require('../../assets-expo/avatar.png')));
            break;
            case 2: 
                setImageProfile(require('../../assets-expo/avatarFamale.jpg'));
                await AsyncStorage.setItem('image', JSON.stringify(index));
                await AsyncStorage.setItem('imageProfileUser', JSON.stringify(require('../../assets-expo/avatarFamale.jpg')));
            break;
            case 3: 
                setImageProfile(require('../../assets-expo/avatar3.jpg'));
                await AsyncStorage.setItem('image', JSON.stringify(index));
                await AsyncStorage.setItem('imageProfileUser', JSON.stringify(require('../../assets-expo/avatar3.jpg')));
            break;
            case 4: 
                setImageProfile(require('../../assets-expo/avatar4.jpg'));
                await AsyncStorage.setItem('image', JSON.stringify(index));
                await AsyncStorage.setItem('imageProfileUser', JSON.stringify(require('../../assets-expo/avatar4.jpg')));
                break;
            case 5: 
                setImageProfile(require('../../assets-expo/avatar5.jpg'));
                await AsyncStorage.setItem('image', JSON.stringify(index));
                await AsyncStorage.setItem('imageProfileUser', JSON.stringify(require('../../assets-expo/avatar5.jpg')));
                break;
            case 6: 
                setImageProfile(require('../../assets-expo/avatar6.jpg'));
                await AsyncStorage.setItem('image', JSON.stringify(index));
                await AsyncStorage.setItem('imageProfileUser', JSON.stringify(require('../../assets-expo/avatar6.jpg')));
                break;
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.containerHeaderLeft}>
                    <Icon name="arrow-back" size={27} onPress={() => goBack()}/>
                </View>
                <View style={styles.containerHeaderRight}>
                    <Icon name="delete" size={27} onPress={handleClearUser} />
                </View>
            </View>

            <ScrollView>
                <View style={{flexDirection: 'column'}}>
                    <View style={styles.containerDataUser}>
                        {
                            imageProfile ? 
                                <Image source={imageProfile} style={styles.imgProfile} />
                            :
                                <Image source={require('../../assets-expo/default-user.png')} style={styles.imgProfile} />
                        }
                    </View>
                    <View style={{position: 'relative', bottom: 35, left: 45}}>
                        <Icon name="photo" size={35} onPress={() => setModalUserVisible(true)} />
                    </View>
                </View>
                

                <View style={styles.containerData}>
                    <View style={styles.contentData}>
                        <Text style={styles.titleData}>Nombre:</Text>
                        <Input 
                            style={styles.subtitleData} 
                            rightIcon={<Icon name="edit" onPress={() => handleClickEdit(1)} color={'gray'}></Icon>} 
                            ref={inputName}
                            placeholder="Ingresa tu nombre"
                            onChange={(e) => setDataLocalStorage(e, 1)}
                            defaultValue={nameUser}
                            inputContainerStyle={{borderBottomWidth:0}}
                        />
                    </View>
                    <View style={styles.contentData}>
                        <Text style={styles.titleData}>Edad:</Text>
                        <Input 
                            style={styles.subtitleData} 
                            rightIcon={<Icon name="edit" onPress={() => handleClickEdit(2)} color={'gray'}></Icon>} 
                            ref={inputAge}
                            placeholder="Ingresa tu edad"
                            onChange={(e) => setDataLocalStorage(e, 2)}
                            defaultValue={ageUser}
                            keyboardType="numeric"
                            inputContainerStyle={{borderBottomWidth:0}}
                        />
                    </View>
                    <View style={styles.contentData}>
                        <Text style={styles.titleData}>Peso:</Text>
                        <Input 
                            style={styles.subtitleData} 
                            rightIcon={<Icon name="edit" onPress={() => handleClickEdit(3)} color={'gray'}></Icon>} 
                            ref={inputWeight}
                            placeholder="Ingresa tu peso"
                            onChange={(e) => setDataLocalStorage(e, 3)}
                            defaultValue={weightUser}
                            keyboardType="numeric"
                            inputContainerStyle={{borderBottomWidth:0}}
                        />
                    </View>
                    <View style={styles.contentData}>
                        <Text style={styles.titleData}>Altura:</Text>
                        <Input 
                            style={styles.subtitleData} 
                            rightIcon={<Icon name="edit" onPress={() => handleClickEdit(4)} color={'gray'}></Icon>} 
                            ref={inputHeight}
                            placeholder="Ingresa tu altura"
                            onChange={(e) => setDataLocalStorage(e, 4)}
                            defaultValue={heightUser}
                            keyboardType="numeric"
                            inputContainerStyle={{borderBottomWidth:0}}
                        />
                    </View>
                    <View style={styles.contentData}>
                        <Text style={styles.titleData}>IMC:</Text>
                        <Input 
                            style={[styles.subtitleData, {color: 'black', opacity: 1}]} 
                            defaultValue={imcUser}
                            disabled={true}
                            inputContainerStyle={{borderBottomWidth:0}}
                            placeholder="No se ha calculado tu IMC"
                            rightIcon={<Icon name="info" onPress={() => setModalIMCVisible(true)} color={'gray'}></Icon>} 
                        />
                    </View>
                </View>

                <View style={styles.containerSwiper}>
                    <View>
                        <Text style={styles.titleData}>Selecciona tu color favorito para la app</Text>
                    </View>
                    <View style={styles.containerPager}>
                        <ScrollView horizontal>
                            <TouchableOpacity 
                                style={[ 
                                    styles.btnColorsArry,
                                    {backgroundColor: themes.green.primary}
                                ]}
                                onPress={() => {handleColorSelected(1)}}
                            />
                            <TouchableOpacity 
                                style={[ 
                                    styles.btnColorsArry,
                                    {backgroundColor: themes.red.primary}
                                ]}
                                onPress={() => {handleColorSelected(1)}}
                            />
                            <TouchableOpacity 
                                style={[ 
                                    styles.btnColorsArry,
                                    {backgroundColor: themes.orange.primary}
                                ]}
                                onPress={() => {handleColorSelected(1)}}
                            />
                            <TouchableOpacity 
                                style={[ 
                                    styles.btnColorsArry,
                                    {backgroundColor: themes.pink.primary}
                                ]}
                                onPress={() => {handleColorSelected(1)}}
                            />
                            <TouchableOpacity 
                                style={[ 
                                    styles.btnColorsArry,
                                    {backgroundColor: themes.gray.primary}
                                ]}
                                onPress={() => {handleColorSelected(1)}}
                            />
                            <TouchableOpacity 
                                style={[ 
                                    styles.btnColorsArry,
                                    {backgroundColor: themes.aqua.primary}
                                ]}
                                onPress={() => {handleColorSelected(1)}}
                            />
                            <TouchableOpacity 
                                style={[ 
                                    styles.btnColorsArry,
                                    {backgroundColor: themes.pinkMex.primary}
                                ]}
                                onPress={() => {handleColorSelected(1)}}
                            />
                            <TouchableOpacity 
                                style={[ 
                                    styles.btnColorsArry,
                                    {backgroundColor: themes.darkBlue.primary}
                                ]}
                                onPress={() => {handleColorSelected(1)}}
                            />

                        </ScrollView>
                    </View>

                    {/* <ThemeProvider>
                        <View style={styles.containerPager}>
                            <ScrollView horizontal>
                                <ThemeSwitcher />
                                <ThemedButton title="Click Me" onPress={() => alert('Button Pressed!')} />
                            </ScrollView>
                        </View>
                    </ThemeProvider>     */}
                </View>

                {/******  MODAL TABLA IMC *******/}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalIMCVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalIMCVisible(!modalIMCVisible);
                        }}
                        statusBarTranslucent={true}
                        >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, styles.modalViewIMC]}>
                               <View style={styles.btnCloseModal}>
                                    <Icon name="close" onPress={() => setModalIMCVisible(!modalIMCVisible)} size={28}/>
                               </View>

                               <View style={{alignItems: 'center'}}>
                                <CircularProgressBase
                                    {...props}
                                    value={20}
                                    radius={145}
                                    activeStrokeColor={'red'}
                                    inActiveStrokeColor={'red'}
                                    >
                                    <CircularProgressBase
                                        {...props}
                                        value={10}
                                        radius={120}
                                        activeStrokeColor={'orange'}
                                        inActiveStrokeColor={'orange'}
                                        >
                                        <CircularProgressBase
                                            {...props}
                                            value={10}
                                            radius={95}
                                            activeStrokeColor={'#fcec50'}
                                            inActiveStrokeColor={'#fcec50'}
                                        >
                                            <CircularProgressBase
                                                {...props}
                                                value={100}
                                                radius={70}
                                                activeStrokeColor={'#badc58'}
                                                inActiveStrokeColor={'#badc58'}
                                                duration={4000}
                                            >
                                                <CircularProgressBase
                                                {...props}
                                                value={10}
                                                radius={45}
                                                activeStrokeColor={'#419ead'}
                                                inActiveStrokeColor={'#419ead'}
                                                />
                                            </CircularProgressBase>
                                        </CircularProgressBase>
                                    </CircularProgressBase>
                                </CircularProgressBase>
                               </View>
                            </View>
                        </View>
                    </Modal>
                </View>

                {/******  MODAL IMAGES PROFILE USER *******/}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalUserVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalUserVisible(!modalUserVisible);
                        }}
                        statusBarTranslucent={true}
                        >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, styles.modalViewImageUser]}>

                                <View style={{alignItems: 'center'}}>
                                    <View style={styles.containerPager}>
                                        <ScrollView horizontal>
                                            { avatares.map((resp, index) => 
                                                <Pressable onPress={() => handleClickImageProfile(index)} key={index}>
                                                    <Image 
                                                        source={resp.uri} 
                                                        style={[styles.imgProfileAvatar, styles.imgProfileModal]} 
                                                    />
                                                </Pressable>
                                            )}
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    containerHeader: {
        flexDirection: 'row', 
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 15,
        // backgroundColor: '#46aaca'
    },
    containerHeaderLeft: {
        alignItems: 'flex-start',
        flex: 1
    },
    containerHeaderRight: {
        alignItems: 'flex-end',
        flex: 1
    },
    arrowContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingLeft: 10,
        marginTop: 0,

    },
    containerDataUser: {
        alignItems: 'center',
        paddingBottom: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    imgProfile: {
        marginTop: 5,
        width: 145, 
        height: 145,
        borderRadius: 100,
    },
    imgProfileAvatar: {
        marginTop: 5,
        width: 200, 
        height: 200,
        borderRadius: 100,
    },
    nameUser: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    contentName: {
        marginTop: 10
    },
    containerSwiper: {
        flex: 0.5,
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 0
    },
    containerPager: {
        // width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        marginLeft: 10
    },
    containerData: {
        paddingHorizontal: 21,
        marginTop: -10
    },
    titleData: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: 10,
        marginBottom: -10
    },
    subtitleData: {
        fontSize: 19,
        marginLeft: 0,
        borderWidth: 0,
        
    },
    contentData: {
        marginTop: 0,
        marginBottom: -10
    },
    colorSelected: {
        borderColor: '#e0e0e0',
        borderWidth: 5,
        opacity: 2
    },
    btnColorsArry: {
        width: 50, height: 50, borderRadius: 40, marginRight: 25
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: '#000000a1',
      },
      modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalViewIMC: {
        width: '95%',
        height: '80%',
        backgroundColor: 'white',
      },
      modalViewImageUser: {
        width: '95%',
        height: '100%',
        backgroundColor: '#00000000',
        alignItems: 'center',
        justifyContent: 'center'
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      btnCloseModal: {
        // flex: 1,
        alignItems: 'flex-end'
      },
      imgProfileModal: {
        marginRight: 20,
      }
});

export default MiPerfil;