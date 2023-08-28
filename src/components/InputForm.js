import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Styles } from "../styles/Styles";
import { Colors } from "../assets/colors/colors";

export const InputForm = ({ keyboardType, border, data, TextChangeEvent, PressEvent, Validation, editable, backColor, borderRadius, TextShift, TextSpace }) => {

    return (
        data.map((item, index) => {
            return (
                <View key={index} style={{ marginTop: TextSpace }}>
                    <Text style={[Styles.inputTitle, TextShift == undefined ? null : { marginLeft: TextShift }]}>{item.text}</Text>
                    <View style={[Styles.input_view, border == undefined ? null : { borderWidth: border }, backColor == undefined ? null : { backgroundColor: backColor }, borderRadius == undefined ? null : { borderRadius: borderRadius }]}>
                        <TextInput
                            keyboardType={item.numpad == true ||item.numpad != undefined ? "number-pad" : "default"}
                            style={Styles.input}
                            editable={editable == undefined ? null : item.immutable == true && item.immutable != undefined ? false : editable}
                            secureTextEntry={item.show}
                            defaultValue={item.value}
                            placeholder={item.placeholder}
                            placeholderTextColor={item.color}
                            onChangeText={TextChangeEvent == undefined ? null : text => TextChangeEvent(text, index)} />
                        {item.pass == true ? <TouchableOpacity style={Styles.pass_btn} onPress={PressEvent == undefined ? null : () => PressEvent(index)}>
                            {item.show ? <Icon name="eye" size={20} color={Colors.grey} /> : <Icon name="eye-off" size={20} color={Colors.grey} />}
                        </TouchableOpacity> : null}
                    </View>
                    {Validation == undefined ? null : <Validation index={index} />}
                </View>
            )
        })
    )
}