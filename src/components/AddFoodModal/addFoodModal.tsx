import { Button, Icon, Input, Text } from "@rneui/themed";
import React, { FC, useEffect, useState } from "react";
import { Modal, View } from "react-native";
import { StyleSheet } from "react-native";
import {} from 'react-native';
import UseFoodStorage from "../../hooks/useFoodStorage";

type AddFoodModalProps = {
    onClose: (shouldUpdate?: boolean) => void;
    visible: boolean;
}

const AddFoodModal: FC<AddFoodModalProps> = ({onClose, visible}) => {
    const [calories, setCalories] = useState('');
    const [name, setName] = useState('');
    const [portion, setPortion] = useState('');
    const { onSaveFood } = UseFoodStorage();

    useEffect(() => {
        setCalories('');
        setName('');
        setPortion('');
    }, [visible]);

    const handleAddPress = async() => {
        try{    
            await onSaveFood({
                calories,
                name,
                portion
            });
            onClose(true);
        }catch(error){
            console.error(error)
        }
    };

    return(
        <Modal visible={visible} onRequestClose={() => onClose()} transparent animationType="fade">
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.closeContainer}>
                        <Button 
                            icon={<Icon name="close" size={28} /> } 
                            onPress={() => onClose()}
                            type="clear"
                        />
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input placeholder="100, 200, 300..." value={calories} onChangeText={(text:string) => setCalories(text)}/>
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>CAL</Text>
                        </View>
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input placeholder="Pollo, Carne..." value={name} onChangeText={(text:string) => setName(text)}/>
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>Nombre</Text>
                        </View>
                    </View>
                    <View style={styles.formItem}>
                        <View style={styles.inputContainer}>
                            <Input placeholder="10gr, 20gr, 50gr..." value={portion} onChangeText={(text:string) => setPortion(text)}/>
                        </View>
                        <View style={styles.legendContainer}>
                            <Text style={styles.legend}>Porción</Text>
                        </View>
                    </View>

                    <View style={styles.btnContiner} >
                        <Button 
                            title="Add" 
                            icon={<Icon name="add" color='#fff'/>} 
                            color='#4ecb71'
                            radius={'lg'}  
                            disabled={calories.trim() === '' || name.trim() === '' || portion.trim() === ''} 
                            onPress={handleAddPress}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        width: '75%',
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 20,
        // Esto para darle la elevacion del modal en android
        elevation: 5,
        // Esto para darle la elevacion del modal en ios 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4

    },
    closeContainer: {
        alignItems: 'flex-end'
    },
    formItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 2
    },
    legendContainer: {
        flex: 1
    },
    legend: {
        fontWeight: 'bold'
    },
    btnContiner: {
        alignItems: 'center',
    }
});

export default AddFoodModal