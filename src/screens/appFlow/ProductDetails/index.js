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
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';
import AddSneakers from '../../../components/AddSneakers';
import CollectionHeader from '../../../components/CollectionHeader';
import SearchBar from '../../../components/SearchBar';
import ProductEdit from '../../../components/Modals/ProductEdit';
import { DeleteProduct } from '../../../components/Modals';

const data = [
  {
    id: 1,
    name: 'Product 1',
    price: '',
    image: appImages.product1,
    colorway: 'dark',
    year: 2023,
    condition: 'good',
    style: '554-56',
    size: '5.5',
    status: 'want',
    estimatedPrice: 756,
    quantity: 6,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 20,
    image: appImages.product2,
    colorway: 'dark',
    year: 2023,
    condition: 'good',
    style: '554-56',
    size: '5.5',
    status: 'want',
    estimatedPrice: 756,
    quantity: 6,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 30,
    image: appImages.product3,
    colorway: 'dark',
    year: 2023,
    condition: 'good',
    style: '554-56',
    size: '5.5',
    status: 'want',
    estimatedPrice: 756,
    quantity: 6,
  },
];

const ProductDetails = ({navigation}) => {
  const [productEdit, setProductEdit] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false)
  const deleteToggle = () =>{
    setDeleteProduct(prev => !prev)
  }
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
        <Image source={item.image} style={styles.image} />
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
              {item.quantity.length === 0
                ? '-'
                : `
              ${item.quantity}`}
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
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <TouchableWithoutFeedback>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={[AppStyles.contentContainer]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <CollectionHeader onPress={Collection}/>
            <View style={{marginLeft: responsiveScreenWidth(5)}}>
              <FlatList
                data={data}
                renderItem={renderItem}
                horizontal
                keyExtractor={item => item.id.toString()}
              />
              {deleteProduct && <DeleteProduct onBackdropPress={deleteToggle} />}
              {productEdit && <ProductEdit isVisible={productEdit} onBackdropPress={toggle}/>}
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
    borderBottomWidth: responsiveScreenWidth(0.1),
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
    color: Colors.blackText,
    fontSize: fontSize.usernameText,
    fontFamily: fontFamily.LatoBold,
  },
  names: {
    color: Colors.text3,
    fontFamily: fontFamily.LatoBold,
    fontSize: fontSize.usernameText,
    marginTop: responsiveScreenHeight(0.2),
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
