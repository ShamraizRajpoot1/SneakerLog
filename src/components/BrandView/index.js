import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appImages} from '../../services/utilities/Assets';
import {fontFamily, fontSize} from '../../services/utilities/Fonts';
import {Colors} from '../../services/utilities/Colors';
import {scale} from 'react-native-size-matters';
import {AppStyles} from '../../services/utilities/AppStyles';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthProvider';

const BrandView = props => {
  const [data, setData] = useState([]);
  const [userBrandList, setUserBrandList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const {user} = useContext(AuthContext);
  const continueTextColor =
  selectedItems.every((item) =>
    userBrandList.some((brand) => brand.id === item.id)
  ) && selectedItems.length === userBrandList.length
    ? 'gray'
    : Colors.forgot; 
  useEffect(() => {
    const fetchBrandsData = async () => {
      try {
        const brandsCollection = firestore().collection('Brands');
        const snapshot = await brandsCollection.get();

        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        let data = [];
        snapshot.forEach(doc => {
          data.push(doc.data());
        });

        setData(data);
      } catch (error) {
        console.error('Error fetching brands data: ', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const userDocRef = firestore().collection('Users').doc(user.uid);
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          const brandList = userData.brandlist || [];
          setUserBrandList(brandList);

          setSelectedItems(brandList);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchBrandsData();
    fetchUserData();
  }, [user]);

  const handleItemPress = item => {
    const newSelectedItems = [...selectedItems];

    const index = newSelectedItems.findIndex(
      selectedItem => selectedItem.id === item.id,
    );
    if (index !== -1) {
      newSelectedItems.splice(index, 1);
    } else {
      newSelectedItems.push(item);
    }

    setSelectedItems(newSelectedItems);
  };
  const handleButtonClick = () => {
    handleContinuePress();
   props.back();
  };
  const handleContinuePress = async () => {
    try {
      const userDocRef = firestore().collection('Users').doc(user.uid);
      const updatedBrandList = [];
      selectedItems.forEach(item => {
        updatedBrandList.push({
          name: item.name,
          id: item.id,
          image: item.image,
        });
      });

      await userDocRef.update({
        brandlist: updatedBrandList,
      });
      console.log('Brand list updated successfully:', updatedBrandList);
      setUserBrandList(updatedBrandList);
    } catch (error) {
      console.error('Error updating brand list:', error);
    }
  };

  const renderItem = ({item, index}) => {
    const isSelected = selectedItems.some(
      selectedItem => selectedItem.id === item.id,
    );
    const isUserBrandSelected = userBrandList.some(
      brand => brand.id === item.id,
    );

    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {borderColor: isSelected ? 'red' : Colors.border1},
        ]}
        onPress={() => handleItemPress(item)}>
        <View
          style={[
            styles.cardview2,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <View style={{alignItems: 'center', justifyContent: 'center', width:'100%',height:'100%'}}>
            {item.image ? (
              <Image
                style={styles.productimage}
                source={{uri: item.image}}
                onError={() => {
                  console.log('Error loading image:', item.image);
                }}
              />
            ) : null}
          </View>
          
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[AppStyles.row2, {marginTop: responsiveWidth(1)}]}>
        <Text style={AppStyles.fvrtText}>SNEAKER BRANDS</Text>
        <TouchableOpacity
          disabled={
            selectedItems.every((item) =>
              userBrandList.some((brand) => brand.id === item.id)
            ) &&
            selectedItems.length === userBrandList.length
          }
          onPress={handleButtonClick}>
          <Text
            style={[
              AppStyles.forgot,
              {
                fontFamily: fontFamily.LatoBold,
                color: continueTextColor,
              },
            ]}
            disabled={
              selectedItems.every((item) =>
                userBrandList.some((brand) => brand.id === item.id)
              ) &&
              selectedItems.length === userBrandList.length
            }>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        numColumns={2}
        scrollEnabled={false}
        data={data}
        keyExtractor={item => item.image}
        renderItem={renderItem}
      />
    </View>
  );
};

export default BrandView;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: responsiveWidth(1.5),
    marginTop: responsiveWidth(1),
  },
  itemContainer: {
    marginLeft: responsiveWidth(3.5),
    marginBottom: responsiveHeight(2),
    borderWidth: scale(1),
    borderRadius: scale(5),
  },
  cardview2: {
    width: responsiveWidth(43),
    height: responsiveWidth(30),
    backgroundColor: Colors.fieldBackground,
    borderRadius: scale(5),
  },
  productimage: {
    height: responsiveHeight(12.5),
    width: responsiveWidth(17.5),
    resizeMode: 'contain',
  },
  datetext: {
    marginLeft: responsiveWidth(3),
    fontSize: fontSize.lebal,
    fontFamily: fontFamily.LatoBold,
    color: Colors.blackText,
  },
  text: {
    fontSize: fontSize.productName,
    fontFamily: fontFamily.LatoBold,
    textAlignVertical: 'center',
    color: Colors.blackText,
  },
});
