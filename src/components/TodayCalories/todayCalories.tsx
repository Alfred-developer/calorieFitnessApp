import { StyleSheet, View, Text } from "react-native";
import React, { FC } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import styleGlobal from "../../styleGlobal";

export type TodayCaloriesProps = {
    total: number | string;
    consumed: number | string;
    remaining: number | string;
    percentage: number;
}

const TodayCalories:FC<TodayCaloriesProps> = ({ total, consumed, remaining, percentage }) => {
    return(
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <CircularProgress value={percentage} 
                    valueSuffix="%" 
                    progressValueColor={styleGlobal.backgroundGlobal.background}
                    activeStrokeColor={styleGlobal.backgroundGlobal.background}
                />
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.legendToday}>Today</Text>
                <View style={styles.righItems}>
                    <Text style={styles.tightItemLegend}>Total:</Text>
                    <Text style={styles.tightItemValue}>{ total }</Text>
                </View>
                <View style={styles.righItems}>
                    <Text style={styles.tightItemLegend}>Comsumed:</Text>
                    <Text style={styles.tightItemValue}>{ consumed }</Text>
                </View>
                <View style={styles.righItems}>
                    <Text style={styles.tightItemLegend}>Remaining:</Text>
                    <Text style={styles.tightItemValue}>{ remaining }</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftContainer: {
        flex: 1,
        // justifyContent: 'center'
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    legendToday: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 14
    },
    righItems: {
        flexDirection: 'row',
        marginBottom: 8
    },
    tightItemLegend: {
        flex: 1
    }, 
    tightItemValue: {
        flex: 1,
        textAlign: 'right',

    }, 
});

export default TodayCalories;