import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {AppStyles} from '../../../services/utilities/AppStyles';
import Header from '../../../components/Header';
import {Colors} from '../../../services/utilities/Colors';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';
import AddSneakers from '../../../components/AddSneakers';
import CollectionHeader from '../../../components/CollectionHeader';
import SearchBar from '../../../components/SearchBar';

const data = [
  {id: 1, name: 'Product 1', price: 10, image: appImages.product1},
  {id: 2, name: 'Product 2', price: 20, image: appImages.product2},
  {id: 3, name: 'Product 3', price: 30, image: appImages.product3},
];

const Collections = ({navigation}) => {
  const back = () => {
    navigation.goBack();
  };
  const addProduct = () => {
    navigation.navigate('AddProduct');
  };
  const profile = () => {
    navigation.navigate('Profile');
  };
  const Sneakers = () => {
    navigation.navigate('SneakerStack');
  };
  const Search = () => {
    navigation.navigate('SearchSneaker');
  };
  const [filter, setFilter] = useState(false);
  const Filter = () => {
    setFilter(prevFilter => !prevFilter);
  };
  const [sneaker, setSneaker] = useState('');
  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity style={AppStyles.collection}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={item.image} style={AppStyles.productImage} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={AppStyles.priceContainer}>
          <Text>${item.price}</Text>
          <Image style={AppStyles.arrowRight} source={appIcons.arrowRight} />
        </View>
      </TouchableOpacity>
      {index < data.length - 1 && <View style={AppStyles.line} />}
    </View>
  );
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(sneaker.toLowerCase()),
  );
  return (
    <>
      <Header Image={true} onPress={back} options={true} press={profile} />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <CollectionHeader />
            {data.length === 0 ? (
              <View>
                <View style={styles.textContainer}>
                  <Text style={styles.emptyText}>
                    YOUR COLLECTION IS EMPTY.
                  </Text>
                  <Text style={styles.letsdo}>
                    Let's do Something about that!
                  </Text>
                </View>
                <AddSneakers onPress={Sneakers} press={Search} />
              </View>
            ) : (
              <>
                {!filter ? (
                  <View
                    style={[
                      AppStyles.row2,
                      {
                        marginTop: responsiveHeight(3),
                        marginBottom: responsiveHeight(3),
                      },
                    ]}>
                    <View style={styles.iconContaier}>
                      <Image
                        style={[styles.icon, {marginLeft: responsiveWidth(2)}]}
                        source={appIcons.pvt}
                      />
                      <Text
                        style={[
                          AppStyles.resultText,
                          {marginLeft: responsiveWidth(2)},
                        ]}>
                        Private
                      </Text>
                    </View>
                    <View style={styles.iconContaier}>
                      <TouchableOpacity>
                        <Image
                          style={[
                            styles.icon,
                            {width: scale(17), height: scale(22)},
                          ]}
                          source={appIcons.upload}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={Filter}>
                        <Image
                          style={[
                            styles.icon,
                            {width: scale(18), height: scale(22)},
                          ]}
                          source={appIcons.filter}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={addProduct}>
                        <Image
                          style={[
                            styles.icon,
                            {width: scale(22), height: scale(22)},
                          ]}
                          source={appIcons.add}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.row}>
                    <View style={{width: responsiveScreenWidth(80)}}>
                      <SearchBar onChangeText={setSneaker} value={sneaker} />
                    </View>
                    <TouchableOpacity onPress={Filter}>
                      <Text style={styles.cancel}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={[AppStyles.collectionContainer, {marginTop: 0}]}>
                  {filteredData.length > 0 ? (
                    <FlatList
                      scrollEnabled={false}
                      data={filteredData}
                      renderItem={renderItem}
                      keyExtractor={item => item.id.toString()}
                    />
                  ) : (
                    <View style={{alignSelf:'center'}}>
                      <Text style={tyles.emptyText}>No Sneaker</Text>
                    </View>
                  )}
                </View>
              </>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Collections;

const styles = StyleSheet.create({
  text: {
    color: Colors.blackText,
    fontSize: fontSize.h3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: responsiveScreenWidth(7),
  },
  textContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSize.h2,
    fontFamily: fontFamily.LatoBold,
    color: Colors.blackText,
  },
  letsdo: {
    fontSize: fontSize.h3,
    color: Colors.blackText,
  },
  icon: {
    width: scale(30),
    height: scale(30),
    marginLeft: responsiveWidth(6),
  },
  iconContaier: {
    // marginRight: responsiveWidth(-2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    color: Colors.blackText,
    marginLeft: responsiveWidth(4),
  },
  cancel: {
    fontSize: fontSize.usernameText,
    fontFamily: fontFamily.LatoBold,
    color: Colors.forgot,
  },
});
