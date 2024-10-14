import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose any icon set
import CheckCircleIcon from 'react-native-vector-icons/MaterialIcons';
import CancelIcon from 'react-native-vector-icons/MaterialIcons';
import { checkExcercise } from '../../api/excercise-api';
import { fonts } from '../../theme/fonts';

const ExcerciseSentence = ({ _id, lessonId, sentenceOrderQuestion, onNext }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("none");
  const [answerCorrect, setAnswerCorrect] = useState("");

  const handleWordClick = (word) => {
    setSelectedWords((prev) => [...prev, word]);
  };

  const handleRemoveWord = (word) => {
    setSelectedWords((prev) => prev.filter((w) => w !== word));
  };

  const handleCheck = () => {
    const body = {
      type: "sentence-order-question",
      sentenceOrderAnswer: selectedWords,
    };
    console.log(body);

    if (selectedWords.length === 0) {
      Alert.alert("Error", "Vui lòng chọn câu trả lời");
    } else {
      checkExcercise(lessonId, _id, body)
        .then(({ result }) => {
          if (result.checkResult === true) {
            setCorrectAnswer("true");
          } else {
            setCorrectAnswer("false");
          }
        })
        .catch((err) => {
          Alert.alert("Error", "Có lỗi xảy ra");
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
      <View
        style={{
          padding: 10,
          marginVertical: 20,
          borderRadius: 10,
          width: '100%',
          backgroundColor: '#FFFFFD',
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: fonts.Medium }}>
          Sắp xếp lại câu cho đúng
        </Text>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
              padding: 10,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderBottomColor: '#dfdfdf',
              borderTopColor: '#dfdfdf',
              minHeight: 50,
              minWidth: 200,
            }}
          >
            {selectedWords.map((word, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleRemoveWord(word)}
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderWidth: 1,
                  borderColor: '#dfdfdf',
                  boxShadow: 1,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  transition: 'all 0.3s',
                  fontWeight: '400',
                }}
              >
                <Text>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#dfdfdf',
            boxShadow: 1,
            marginTop: 20,
          }}
        >
          {sentenceOrderQuestion?.sentenceParts
            ?.filter((word) => !selectedWords.includes(word))
            .map((word, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleWordClick(word)}
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderWidth: 1,
                  borderColor: '#dfdfdf',
                  boxShadow: 1,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  transition: 'all 0.3s',
                  fontWeight: '400',
                  transform: [{ scale: 1 }],
                }}
              >
                <Text>{word}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            flexDirection: 'column',
            flexGrow: 1,
            backgroundColor:
              correctAnswer === "true" ? "#33CC33" : correctAnswer === "false" ? "#FF0000" : "#FFFFFF",
            marginTop: 20,
          }}
        >
          {correctAnswer === "true" ? (
            <>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10 }}>
                <CheckCircleIcon name="check-circle" size={24} color="#FFFFFF" />
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontWeight: '400' }}>Làm tốt lắm!</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <TouchableOpacity
                  onPress={() => {
                    handleCheck();
                    onNext();
                  }}
                  style={{
                    height: 40,
                    width: 150,
                    backgroundColor: '#33CC33',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontSize: 13, color: '#FFFFFF' }}>Tiếp tục</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : correctAnswer === "false" ? (
            <>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10 }}>
                <CancelIcon name="cancel" size={24} color="#FFFFFF" />
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontWeight: '400' }}>
                  Đáp án đúng: {sentenceOrderQuestion?.correctOrder?.join(", ")}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <TouchableOpacity
                  onPress={() => {
                    handleCheck();
                    onNext();
                  }}
                  style={{
                    height: 40,
                    width: 150,
                    backgroundColor: '#FF0000',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontSize: 13, color: '#FFFFFF' }}>Tiếp tục</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <TouchableOpacity
                  onPress={handleCheck}
                  style={{
                    height: 40,
                    width: 150,
                    backgroundColor: '#0000FF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontSize: 13, color: '#FFFFFF' }}>Kiểm tra</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ExcerciseSentence;