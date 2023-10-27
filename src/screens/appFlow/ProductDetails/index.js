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
import React, {useState, useEffect} from 'react';
import {AppStyles} from '../../../services/utilities/AppStyles';
import Header from '../../../components/Header';
import {Colors} from '../../../services/utilities/Colors';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';
import CollectionHeader from '../../../components/CollectionHeader';
import ProductEdit from '../../../components/Modals/ProductEdit';
import {DeleteProduct} from '../../../components/Modals';
import firestore from '@react-native-firebase/firestore';


const ProductDetails = ({navigation,route}) => {
  const [productEdit, setProductEdit] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [data, setData] = useState([]);
  const selectedCollection = route.params.selectedCollection
  const selectedIndex = route.params.selectedIndex;
  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        if (route.params.selectedCollection) {
          const selectedCollectionId = route.params.selectedCollection.id;
          const collectionRef = firestore()
            .collection('Collections')
            .doc(selectedCollectionId);
          const doc = await collectionRef.get();
  
          if (doc.exists) {
            const data = doc.data();
            if (data && data.sneakers) {
              const sneakersData = data.sneakers.map(sneaker => ({
                id: sneaker.id || '',
                name: sneaker.sneakerName || '',
                price: sneaker.price || '',
                image: sneaker.image || '',
                colorway: sneaker.colorway || '',
                year: sneaker.year || 2023,
                condition: sneaker.condition || '',
                style: sneaker.style || '',
                size: sneaker.size || '',
                status: sneaker.status || '',
                estimatedPrice: sneaker.estimatedPrice || '',
                quantity: sneaker.quantity || '',
              }));
              setData(sneakersData);
            } else {
              console.log('Sneakers data not found.');
            }
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching Firestore data: ', error);
      }
    };
  
    fetchFirestoreData();
  }, [route.params.selectedCollection]);
  
  const deleteToggle = () => {
    setDeleteProduct(prev => !prev);
  };
  const toggle = () => {
    setProductEdit(prev => !prev);
  };
  const back = () => {
    navigation.goBack();
  };

  const profile = () => {
    navigation.navigate('Profile');
  };
  const Collection = () => {
    navigation.navigate('ChoseCollection');
  };
  const renderItem = ({item, index}) => (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={{width: '78%', marginRight: responsiveWidth(1)}}>
          <Text style={styles.name}>SNEAKER</Text>
          <Text style={styles.names}>{item.name}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggle}>
            <Image style={styles.icon} source={appIcons.edit} />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteToggle}>
            <Image style={styles.icon} source={appIcons.delete} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.name}>COLORWAY</Text>
        <Text style={styles.names}>
          {item.colorway.length === 0 ? '-' : `${item.colorway}`}
        </Text>
        <View style={styles.detailrow}>
          <View style={{width: '30%'}}>
            <Text style={styles.name}>RETAIL PRICE</Text>
            <Text style={styles.names}>
              {item.price.length === 0 ? '-' : `$ ${item.price}`}
            </Text>
          </View>
          <View style={{width: '15%'}}>
            <Text style={styles.name}>YEAR</Text>
            <Text style={styles.names}>
              {item.year.length === 0 ? '-' : `${item.year}`}
            </Text>
          </View>
          <View style={{width: '28%'}}>
            <Text style={styles.name}>CONDITION</Text>
            <Text style={styles.names}>
              {item.condition.length === 0 ? '-' : `${item.condition}`}
            </Text>
          </View>
        </View>
        <View style={styles.detailrow}>
          <View style={{width: '30%'}}>
            <Text style={styles.name}>STYLE</Text>
            <Text style={styles.names}>
              {item.style.length === 0 ? '-' : `${item.style}`}
            </Text>
          </View>
          <View style={{width: '15%'}}>
            <Text style={styles.name}>SIZE</Text>
            <Text style={styles.names}>
              {item.size.length === 0 ? '-' : ` ${item.size}`}
            </Text>
          </View>
          <View style={{width: '28%'}}>
            <Text style={styles.name}>STATUS</Text>
            <Text style={styles.names}>
              {item.status.length === 0 ? '-' : `${item.status}`}
            </Text>
          </View>
        </View>
        <View style={styles.detailrow}>
          <View style={{width: '70%'}}>
            <Text style={styles.name}>ESTIMATED MARKET VALUE</Text>
            <Text style={styles.names}>
              {item.estimatedPrice.length === 0
                ? '-'
                : `$ ${item.estimatedPrice}`}
            </Text>
          </View>
          <View style={{width: '28%'}}>
            <Text style={styles.name}>QUANTITY</Text>
            <Text style={styles.names}>
              {item.quantity.length === 0 ? '-' : `${item.quantity}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <Header Image={true} onPress={back} options={true} press={profile} />

      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: Colors.background}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <CollectionHeader name={selectedCollection.name} onPress={Collection} />
            <View style={{marginLeft: responsiveScreenWidth(5)}}>
            {data.length > 0 ? (
                <FlatList
                  data={data}
                  horizontal
                  renderItem={renderItem}
                  keyExtractor={(item) => item.name.toString()}
                  initialScrollIndex={selectedIndex}
              getItemLayout={(data, index) => ({
                length: responsiveWidth(80), 
                offset: responsiveWidth(90) * index,
                index,
              })}
                />
              ) : (
                <Text>No data available</Text>
              )}
              {deleteProduct && (
                <DeleteProduct onBackdropPress={deleteToggle} />
              )}
              {productEdit && (
                <ProductEdit isVisible={productEdit} onBackdropPress={toggle} />
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(80),
    borderWidth: responsiveScreenWidth(0.1),
    height: responsiveScreenHeight(60),
    marginTop: responsiveScreenHeight(3),
    marginRight: responsiveScreenWidth(5),
    borderRadius: scale(6),
  },
  nameContainer: {
    height: responsiveScreenHeight(8),
    borderBottomWidth: scale(0.7),
    borderColor: Colors.border1,
    width: '100%',
    flexDirection: 'row',
    padding: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(4),
    alignItems: 'center',
  },
  icon: {
    height: scale(20),
    width: scale(20),
  },
  iconContainer: {
    width: '22%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: Colors.username,
    fontFamily: fontFamily.LatoBold,
    fontSize: fontSize.usernameText,
    fontWeight: 'normal',
  },
  names: {
    color: Colors.text2,
    fontFamily: fontFamily.LatoBold,
    fontSize: fontSize.pDetail,
    fontWeight: 'normal',
  },
  imageContainer: {
    height: '40%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: responsiveScreenWidth(0.1),
    paddingBottom: '1%',
  },
  image: {
    height: '90%',
    width: '100%',
    resizeMode: 'contain',
  },
  detailContainer: {
    width: '100%',
    padding: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(4),
  },
  detailrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
});
