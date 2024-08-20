import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import styles from './styles';
import { colors } from '../../theme/color';

const AlertDialog = ({
    visible,
    onDismiss,
    title,
    content,
    submitTitleBtn
}) => {


    return (
        <Portal>
            <Dialog
                style={styles.dialog}
                visible={visible}
                onDismiss={onDismiss}>
                <Dialog.Title style={styles.title}>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text
                        style={styles.content}
                        variant="bodyMedium">
                        {content}
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        textColor={colors.primaryColor}
                        style={styles.submitBtn}
                        onPress={onDismiss}>
                        {submitTitleBtn}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default AlertDialog;