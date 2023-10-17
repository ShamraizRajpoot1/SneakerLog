import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AppStyles} from '../../../services/utilities/AppStyles';
import SearchBar from '../../../components/SearchBar';
import UserView from '../../../components/UserView';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Header from '../../../components/Header';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {Colors} from '../../../services/utilities/Colors';
import {scale} from 'react-native-size-matters';
import Followers from '../Followers';
import Sent from '../Sent';
import Following from '../Following';
import Received from '../Received';

const AllMembers = ({navigation}) => {
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

  let selectedComponent;

  switch (selectedOption) {
    case 'All':
      selectedComponent = <UserView vertical={true} />;
      break;
    case 'Followers':
      selectedComponent = <Followers />;
      break;
    case 'Following':
      selectedComponent = <Following />;
      break;
    case 'Sent':
      selectedComponent = <Sent />;
      break;
    case 'Received':
      selectedComponent = <Received />;
      break;

    default:
      selectedComponent = <UserView vertical={true} />;
      break;
  }

  const handleOptionPress = option => {
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
          contentContainerStyle={styles.optionsScrollContent}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionPress(option)}
              style={[
                styles.optionItem,
                selectedOption === option && styles.selectedOption,
              ]}>
              <Text style={styles.optionText}>{option}</Text>
              {selectedOption === option && <View style={styles.selectedBar} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
<View style={{backgroundColor: Colors.background,}}>
      <SearchBar
        Text={'Search Members'}
        value={member}
        onChangeText={setMember}
      />
      </View>
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback>
          <ScrollView
          showsVerticalScrollIndicator={false}
            style={{marginHorizontal: responsiveWidth(5),backgroundColor: Colors.background,}}
            contentContainerStyle={[AppStyles.contentContainer]}>
            {selectedComponent}
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
    backgroundColor: Colors.background,
  },
  optionsContainer: {
    height: '100%',
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    backgroundColor: Colors.background,
  },
  optionItem: {
    alignItems: 'center',
    marginHorizontal: responsiveWidth(3.5),
    width: responsiveScreenWidth(18.5),
    backgroundColor: Colors.background,
  },
  selectedOption: {},
  optionText: {
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
