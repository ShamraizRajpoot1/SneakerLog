import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Header from '../../../components/Header';
import { AppStyles } from '../../../services/utilities/AppStyles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../../services/utilities/Colors';
import { fontFamily, fontSize } from '../../../services/utilities/Fonts';
import CollectionHeader from '../../../components/CollectionHeader';
import SearchBar from '../../../components/SearchBar';
import { appIcons, appImages } from '../../../services/utilities/Assets';

const SearchSneaker = ({ navigation }) => {
  const [sneaker, setSneaker] = useState('');
  const [search, setSearch] = useState(false);

  const handleClearText = () => {
    setSneaker('');
    setSearch(false)
  };
  const back = () => {
    navigation.goBack();
  };

  const profile = () => {
    navigation.navigate('Profile');
  };

  const data = [
    { id: 1, name: 'Pvdc', price: 10, image: appImages.product1 },
    { id: 2, name: 'Pfrs 2', price: 20, image: appImages.product2 },
    { id: 3, name: 'Product 3', price: 30, image: appImages.product3 },
  ];

  const Search = () => {
    if (sneaker.trim() !== '') {
      setSearch(true);
    } else {
      setSearch(false);
    }
  };
  

  const filteredData = sneaker
  ? data.filter((item) =>
      item.name.toLowerCase().includes(sneaker.toLowerCase())
    )
  : [];

  const renderItem = ({ item, index }) => (
    <View>
    <TouchableOpacity style={AppStyles.collection}>
      <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
        <Image source={item.image} style={AppStyles.productImage} />
        <Text style={[styles.name]}>{item.name}</Text>
      </View>
      <View
        style={[AppStyles.priceContainer, { width: '10%', justifyContent: 'center' }]}
      >
        <Image style={AppStyles.arrowRight} source={appIcons.arrowRight} />
      </View>
    </TouchableOpacity>
   
    {filteredData.length > 1 && <View style={AppStyles.line} />}

    </View>
  );

  return (
    <>
      <Header Image={true} onPress={back} options={true} press={profile} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
      >
        <TouchableWithoutFeedback>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <CollectionHeader />

            <SearchBar
              Text={'Search Sneakers'}
              value={sneaker}
              onChangeText={setSneaker}
              onBlur={Search}
              onClearText={handleClearText}
              clear={true}
            />
            {sneaker !== '' ? (
              <View style={AppStyles.collectionContainer}>
                <View style={styles.result}>
                  <Text style={AppStyles.resultText}>Results</Text>
                </View>
                <FlatList
                  scrollEnabled={false}
                  data={filteredData}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
                <View style={[styles.result,{borderTopWidth: responsiveHeight(0.1),borderBottomWidth: 0,}]}>
                  
                </View>
              </View>
            ) : (
              <View style={styles.container}>
                <Text style={[styles.text]}>
                  {'   '}QUICKLY ADD SNEAKERS {'\n'} TO YOUR COLLECTION BY {'\n'}
                  SEARCHING OUR INVENTORY
                </Text>
                <Text style={[styles.text2]}>
                  If you cannot find the sneaker, {'\n'} {'   '}you can add it
                  manually
                </Text>
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default SearchSneaker;

const styles = StyleSheet.create({
  text: {
    color: Colors.blackText,
    fontSize: fontSize.h2,
    fontFamily: fontFamily.LatoBold,
    fontWeight: 'bold',
    alignContent: 'center',
  },
  text2: {
    color: Colors.blackText,
    fontSize: fontSize.h1,
    fontFamily: fontFamily.LatoBold,
    marginTop: responsiveHeight(4),
    alignContent: 'center',
  },
  container: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  name: {
    color: Colors.blackText,
    marginLeft: responsiveWidth(4),
  },
  result: {
    height: responsiveHeight(6),
    borderBottomWidth: responsiveHeight(0.1),
    justifyContent:'center',
    paddingLeft: responsiveWidth(2),
    borderColor: Colors.border1
  },
  
});
