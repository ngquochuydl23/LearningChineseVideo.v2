import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose any icon set
import { getExcerciseByLessonId } from '../../../api/excercise-api';
import { useNavigation } from "@react-navigation/native";
const LessonItem = ({ index, title, _id, courseId  }) => {
    const [excercises, setExcercises] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        getExcerciseByLessonId(_id).then((res) => {
            if (res.result) {
                setExcercises(res.result);
            }
        });
    }, [_id]);

    const handleIconPress = () => {
        setIsRotated(!isRotated);
        setIsExpanded(!isExpanded);
    };

    return (
        
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    height: 50,
                    padding: 5,
                    backgroundColor: '#E8E8E8',
                    borderRadius: 10,
                }}
            >
                <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: 'textPrimaryColor',
                            fontFamily: 'Regular',
                        }}
                    >
                        {index + 1}. {title}
                    </Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleIconPress}>
                        <Icon
                            name="expand-more"
                            size={25}
                            color="#000"
                            style={{
                                transform: [{ rotate: isRotated ? '180deg' : '0deg' }],
                                transition: 'transform 0.2s',
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {isExpanded && (
                <View
                    style={{
                        marginTop: 5,
                        borderRadius: 10,
                        backgroundColor: '#EEEEEE',
                        padding: 10,
                    }}
                >
                    {excercises.length > 0 ? (
                        excercises.map((excercise, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    padding: 10,
                                    borderRadius: 10,
                                    cursor: 'pointer',
                                    marginBottom: 5,
                                    backgroundColor: '#FFFFFF',
                                }}
                                onPress={() => {
                                    // Handle navigation or other actions here
                                }}
                            >
                                <Text style={{ fontSize: 16 }}>
                                    {index + 1}.{' '}
                                    {excercise.type === 'fill-in-blank'
                                        ? 'Điền vào chổ trống'
                                        : excercise.type === 'image-question'
                                            ? 'Nhìn hình trả lời câu hỏi'
                                            : excercise.type === 'audio-question'
                                                ? 'Nghe và trả lời câu hỏi'
                                                : excercise.type === 'sentence-order-question'
                                                    ? 'Sắp xếp lại câu cho đúng'
                                                    : excercise.type === 'synonym-antonym-question'
                                                        ? 'Tìm từ đồng nghĩa hoặc trái nghĩa'
                                                        : 'Câu hỏi về ngữ pháp'}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View
                            style={{
                                padding: 10,
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16 }}>Phần này không có bài tập !!!</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity
                                    style={{
                                        height: 35,
                                        width: 100,
                                        backgroundColor: '#4caf50',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                    }}
                                    onPress={() => {
                                        navigation.navigate('VideoCourse', { lessonId: _id, idCourse: courseId });
                                    }}
                                >
                                    <Text style={{ fontSize: 12, color: '#FFFFFF' }}>Xem video</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                    {excercises.length > 0 && (
                        <View
                            style={{
                                padding: 10,
                                borderRadius: 10,
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 1,
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 3 }}>
                                <TouchableOpacity
                                    style={{
                                        height: 35,
                                        width: 100,
                                        backgroundColor: '#4caf50',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 5,
                                    }}
                                    onPress={() => {
                                        navigation.navigate('VideoCourse', { lessonId: _id, idCourse: courseId  });
                                    }}
                                >
                                    <Text style={{ fontSize: 12, color: '#FFFFFF' }}>Xem video</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        height: 35,
                                        width: 120,
                                        backgroundColor: '#0099FF',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 5,

                                    }}
                                    onPress={() => {
                                        navigation.navigate('ExcerciseDetail', { lessonId: _id });
                                    }}
                                >
                                    <Text style={{ fontSize: 13, color: '#FFFFFF' }}>Làm bài tập</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
       
    );
};

export default LessonItem;