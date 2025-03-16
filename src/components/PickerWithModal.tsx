import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

interface PickerOption {
    label: string;
    value: string | number;
}

interface PickerWithModalProps {
    selectedValue: string | number;
    onValueChange: (value: string | number) => void;
    options: PickerOption[];
    placeholder?: string;
}

const PickerWithModal: React.FC<PickerWithModalProps> = ({
    selectedValue,
    onValueChange,
    options,
    placeholder = '選択してください',
}) => {
    const [isOpen,setIsOpen] = useState(false);
    const dropdownRef = useRef<View>(null);
    const [dropdownLayout,setDropdownLayout] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    const selectedLabel = options.find(option => option.value === selectedValue)?.label || placeholder;

    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            dropdownRef.current.measure((x,y, width, height, pageX, pageY) => {
                setDropdownLayout({
                    x: pageX,
                    y: pageY + height,
                    width: width,
                    height: height,
                });
            });
        }
    }, [isOpen]);

    useEffect(() => {
        const handleOutsideClick = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };
    }, [isOpen]);

    const windowHeight = Dimensions.get('window').height;

    const maxDropdownHeight = windowHeight - dropdownLayout.y - 20;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                ref={dropdownRef}
                style={styles.dropdownButton}
                onPress={() => setIsOpen(!isOpen)}
            >
                <Text style={styles.selectedText}>{selectedLabel}</Text>
                <Text style={styles.dropdownIcon}>{isOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {isOpen && (
                <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                    <View
                        style={[
                            styles.dropdown,
                            {
                                top: dropdownLayout.height,
                                width: dropdownLayout.width,
                                maxHeight: maxDropdownHeight,
                            },
                        ]}
                    >
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => {
                                        onValueChange(item.value);
                                        setIsOpen(false);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            item.value === selectedValue && styles.selectedOption,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 12,
        marginVertical: 8,
    },
    selectedText: {
        fontSize: 16,
    },
    dropdownIcon: {
        fontSize: 14,
        color: '#666',
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        zIndex: 1000,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    option: {
        padding: 12,
    },
    optionText: {
        fontSize: 16,
    },
    selectedOption: {
        fontWeight: 'bold',
        color: '#007AFF',
    },
    separator: {
        height: 1,
        backgroundColor: '#EEEEEE',
        width: '100%',
    },
});

export default PickerWithModal;
