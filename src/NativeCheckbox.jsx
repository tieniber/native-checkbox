import { Component, createElement } from "react";
import { Platform, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export class NativeCheckbox extends Component {
    render() {
        const { booleanAttr, trueContainer, falseContainer, animated } = this.props;

        const views = <View>{booleanAttr.value ? trueContainer : falseContainer}</View>;
        if (animated) {
            if (Platform.OS === "ios") {
                return <TouchableOpacity onPress={() => this._toggle()}>{views}</TouchableOpacity>;
            } else if (Platform.OS === "android") {
                return <TouchableHighlight onPress={() => this._toggle()}>{views}</TouchableHighlight>;
            } else {
                return null;
            }
        } else {
            return <TouchableWithoutFeedback onPress={() => this._toggle()}>{views}</TouchableWithoutFeedback>;
        }
    }

    _toggle() {
        const { booleanAttr, onChangeAction } = this.props;
        booleanAttr.setValue(!booleanAttr.value);

        if (onChangeAction && onChangeAction.canExecute && !onChangeAction.isExecuting) {
            onChangeAction.execute();
        }
    }
}
