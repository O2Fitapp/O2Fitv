import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from "react-native"
import { withModal } from "../hoc/withModal"
import { dimensions } from "../../constants/Dimensions"
import { moderateScale } from "react-native-size-matters"
import { defaultTheme } from "../../constants/theme"
import { ConfirmButton } from ".."
import { useNavigation } from "@react-navigation/native"
import { urls } from "../../utils/urls"
import { BlurView } from "@react-native-community/blur"
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from 'moment'

const MarketModal = props => {
    const navigation = useNavigation()
    const item = props.item
    if (item.title[props.lang.langName]) {
        return (
            <View
                onPress={props.onRequestClose}
                activeOpacity={1}
                style={{ alignItems: "center", justifyContent: "center", width: dimensions.WINDOW_WIDTH, height: dimensions.WINDOW_HEIGTH, position: "absolute", top: moderateScale(-40) }}>
                <BlurView
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    blurType="dark"
                    blurAmount={1}
                />
                <View style={styles.mainContainer} activeOpacity={1}>
                    <ScrollView>
                        <TouchableOpacity onPress={props.onRequestClose} style={styles.headerContaienr}>
                            <Image
                                source={require("../../../res/img/cross.png")}
                                style={styles.cross}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                        <Text style={[styles.headerText, { fontFamily: props.lang.font }]}>
                            {
                                item.title[props.lang.langName]
                            }
                        </Text>
                        {/* <View style={styles.imgContainer}> */}
                        <Image
                            source={{ uri: "https://social.o2fitt.com/MarketMessageImages/" + item.image }}
                            style={styles.img}
                            resizeMode="cover"
                        />
                        {/* </View> */}
                        <Text style={[styles.context, { fontFamily: props.lang.font }]} allowFontScaling={false}>
                            {
                                props.item.description[props.lang.langName]
                            }
                        </Text>
                    </ScrollView>
                    <ConfirmButton
                        lang={props.lang}
                        onPress={() => {
                            if (item.link.includes("https://")) {
                                Linking.canOpenURL(item.link).then(supported => {
                                    if (supported) {
                                        Linking.openURL(item.link);
                                    }
                                });
                            } else {
                                navigation.navigate(item.link)
                            }
                            props.onRequestClose()
                            AsyncStorage.setItem("marketMessage", JSON.stringify({ ...item, nextTimeShow: moment().add(2000, "hours").format("YYYY-MM-DDTHH:mm:ss") }))

                        }}
                        style={styles.btn}
                        title={item.buttonName[props.lang.langName]}
                    />
                </View>
            </View>
        )
    } else {
        return <></>
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        width: dimensions.WINDOW_WIDTH * 0.84,
        borderRadius: moderateScale(16),
        backgroundColor: defaultTheme.lightBackground,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        alignSelf: "center",
        marginTop: dimensions.WINDOW_HEIGTH * 0.125
    },
    imgContainer: {
        width: dimensions.WINDOW_WIDTH * 0.8,
        height: dimensions.WINDOW_HEIGTH * 0.4,
        borderRadius: moderateScale(16),

    },
    img: {
        width: dimensions.WINDOW_WIDTH * 0.8,
        height: dimensions.WINDOW_HEIGTH * 0.3,
        borderRadius: moderateScale(10)
    },
    cross: {
        width: moderateScale(18),
        height: moderateScale(18),
        alignSelf: "flex-end",
        margin: moderateScale(18),
        tintColor: defaultTheme.gray
    },
    context: {
        width: dimensions.WINDOW_WIDTH * 0.75,
        minHeight: dimensions.WINDOW_HEIGTH * 0.07,
        alignSelf: "center",
        textAlign: "left",
        color: defaultTheme.darkText,
        fontSize: moderateScale(15),
        lineHeight: moderateScale(26),
        marginVertical: moderateScale(20)
    },
    btn: {
        width: moderateScale(130),
        backgroundColor: defaultTheme.green,
        marginBottom: moderateScale(16)
    },
    headerText: {
        color: defaultTheme.darkText,
        textAlign: "center",
        marginVertical: moderateScale(10),
        fontSize: moderateScale(17)
    },
    headerContaienr: {
        flexDirection: "row",
        alignItems: 'center'
    },
    crossText: {
        fontSize: moderateScale(16),
        color: defaultTheme.darkText,

    }
})

export default MarketModal