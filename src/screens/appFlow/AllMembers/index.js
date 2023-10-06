import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AppStyles } from '../../../services/utilities/AppStyles';
import SearchBar from '../../../components/SearchBar';
import UserView from '../../../components/UserView';
import { responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import Header from '../../../components/Header';
import { fontFamily, fontSize } from '../../../services/utilities/Fonts';
import { Colors } from '../../../services/utilities/Colors';
import { scale } from 'react-native-size-matters';

const AllMembers = ({ navigation }) => {
  const [member, setMember] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const back = () => {
    navigation.goBack();
  };

  const Profile = () => {
    navigation.navigate('Profile');
  };

  const options = ['All', 'Followers', 'Following', 'Sent', 'Received'];
  useEffect(() => {
    setSelectedOption(options[0]);
  }, []);
  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Header Image={true} options={true} onPress={back} press={Profile} />

      <View style={styles.container}>
        <ScrollView
          style={styles.optionsContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.optionsScrollContent}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionPress(option)}
              style={[
                styles.optionItem,
                selectedOption === option && styles.selectedOption,
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
              {selectedOption === option && <View style={styles.selectedBar} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <SearchBar Text={'Search Members'} value={member} onChangeText={setMember} />
      <View style={{ flex: 1 }}>
        
          <TouchableWithoutFeedback>
            <ScrollView
              style={{ marginHorizontal: responsiveWidth(5) }}
              contentContainerStyle={[AppStyles.contentContainer]}
             
            >
              <UserView vertical={true} />
            </ScrollView>
          </TouchableWithoutFeedback>
    
      </View>
    </>
  );
};

export default AllMembers;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '6%',
  },
  optionsContainer: {
    height:'100%',
    flexDirection: 'row',
    marginHorizontal:responsiveWidth(3),
    marginTop:responsiveHeight(2)
  },
  
  optionItem: {
    alignItems: 'center',
    marginHorizontal:responsiveWidth(3.5),
    width:responsiveScreenWidth(18.5)
  },
  selectedOption: {
   
  },
  optionText:{
    fontSize: fontSize.fieldText,
    fontFamily: fontFamily.LatoBold,
    color: Colors.blackText,
  },
  selectedBar: {
    height: responsiveHeight(0.5),
    width: '100%',
    borderRadius: scale(5),
    backgroundColor: Colors.barBackground,
    bottom: 0,
  },
});
