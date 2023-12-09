import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { dimensions } from '../../constants/Dimensions'
import { defaultTheme } from '../../constants/theme'
import { moderateScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const DietEndSubscription = ({ lang }) => {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => navigation.navigate("PackagesScreen")} style={styles.container}>
            <Image
                source={require('../../../res/img/lock.png')}
                style={styles.image}
            />
            <Text style={[{ fontFamily: lang.font }, styles.text]}>
                مهلت استفاده از برنامه غذایی تمام شده
            </Text>
            <Text style={[{ fontFamily: lang.font }, styles.text]}>
                برای تمدید اشتراک کلیک کنین
            </Text>
        </Pressable>
    )
}

export default DietEndSubscription

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: dimensions.WINDOW_WIDTH * 0.2,
        height: dimensions.WINDOW_WIDTH * 0.2,
        resizeMode: 'contain',
        tintColor: defaultTheme.primaryColor
    },
    text: {
        fontSize: moderateScale(15),
        color: defaultTheme.darkText
    }
})