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
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {AppStyles} from '../../../services/utilities/AppStyles';
import Header from '../../../components/Header';
import {Colors} from '../../../services/utilities/Colors';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {appIcons} from '../../../services/utilities/Assets';
import {scale} from 'react-native-size-matters';
import CollectionHeader from '../../../components/CollectionHeader';
import ProductEdit from '../../../components/Modals/ProductEdit';
import {CollectionModal, DeleteProduct} from '../../../components/Modals';
import firestore from '@react-native-firebase/firestore';

const ProductDetails = ({navigation, route}) => {
  const [productEdit, setProductEdit] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState();
  const [itemToEdit, setItemToEdit] = useState();
  const [collection, setCollection] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIndexId, setSelectedIndexId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState();
  const flatListRef = useRef();
  const toggleCollection = () => {
    setCollection(prev => !prev);
  };
  const setCollectionId = selectedItem => {
    setCollection(prev => !prev);
    setSelectedId(selectedItem);
  };
  const selectedCollection = selectedId
    ? selectedId
    : route.params.selectedCollection;
  const selectedIndex = selectedIndexId
    ? selectedIndexId
    : route.params.selectedIndex;
  const fetchFirestoreData = async () => {
    try {
      setLoading(true);
      if (selectedCollection) {
        const selectedCollectionId = selectedCollection.id;
        const collectionRef = firestore()
          .collection('Collections')
          .doc(selectedCollectionId);

        const unsubscribe = collectionRef.onSnapshot(doc => {
          if (doc.exists) {
            const data = doc.data();
            setFavorite(data.favorite);
            const sneakers = data.sneakers || [];
            setData(sneakers);
          } else {
            console.log('No such document!');
          }
          setLoading(false);
        });
        return () => unsubscribe();
      }
    } catch (error) {
      console.error('Error fetching Firestore data: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFirestoreData();
  }, [selectedCollection]);

  const deleteToggle = item => {
    setItemToDelete(item);
    setDeleteProduct(prev => !prev);
  };
  const toggle = item => {
    setItemToEdit(item);
    setProductEdit(prev => !prev);
  };
  const back = () => {
    navigation.goBack();
  };

  const profile = () => {
    navigation.navigate('Profile');
  };
  const deleteItem = async item => {
    try {
      const selectedCollectionId = selectedCollection.id;
      const collectionRef = firestore()
        .collection('Collections')
        .doc(selectedCollectionId);
      await collectionRef.update({
        sneakers: firestore.FieldValue.arrayRemove(item),
      });
      deleteToggle(null);
      setSelectedIndexId(0);
      if (flatListRef) {
        flatListRef.current.scrollToIndex({animated: true, index: 0});
      }
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  const renderItem = ({item, index}) => (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={{width: '78%', marginRight: responsiveWidth(1)}}>
          <Text style={styles.name}>SNEAKER</Text>
          <Text style={styles.names}>{item.name}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => toggle(item)}>
            <Image style={styles.icon} source={appIcons.edit} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteToggle(item)}>
            <Image style={styles.icon} source={appIcons.delete} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        {item.image && item.image.small ? (
          <Image source={{uri: item.image.small}} style={styles.image} />
        ) : item.image && typeof item.image === 'string' && (
          <Image source={{uri: item.image}} style={styles.image} />
        ) 
        }
      </View>
      <View style={styles.detailContainer}>
  <Text style={styles.name}>COLORWAY</Text>
  <Text style={styles.names}>
    {item.colorway ? item.colorway : '-'}
  </Text>
  <View style={styles.detailrow}>
    <View style={{width: '30%'}}>
      <Text style={styles.name}>RETAIL PRICE</Text>
      <Text style={styles.names}>
        {item.retailPrice ? `$ ${item.retailPrice}` : '-'}
      </Text>
    </View>
    <View style={{width: '15%'}}>
      <Text style={styles.name}>YEAR</Text>
      <Text style={styles.names}>
        {item.releaseYear ? item.releaseYear : '-'}
      </Text>
    </View>
    <View style={{width: '28%'}}>
      <Text style={styles.name}>CONDITION</Text>
      <Text style={styles.names}>
        {item.condition ? item.condition : '-'}
      </Text>
    </View>
  </View>
  <View style={styles.detailrow}>
    <View style={{width: '30%'}}>
      <Text style={styles.name}>STYLE</Text>
      <Text style={styles.names}>
        {item.sku? item.sku : '-'}
      </Text>
    </View>
    <View style={{width: '15%'}}>
      <Text style={styles.name}>SIZE</Text>
      <Text style={styles.names}>
        {item.size ? item.size : '-'}
      </Text>
    </View>
    <View style={{width: '28%'}}>
      <Text style={styles.name}>STATUS</Text>
      <Text style={styles.names}>
        {item.status ? item.status : '-'}
      </Text>
    </View>
  </View>
  <View style={styles.detailrow}>
    <View style={{width: '70%'}}>
      <Text style={styles.name}>ESTIMATED MARKET VALUE</Text>
      <Text style={styles.names}>
        {item.estimatedMarketValue ? `$ ${item.estimatedMarketValue}` : '-'}
      </Text>
    </View>
    <View style={{width: '28%'}}>
      <Text style={styles.name}>QUANTITY</Text>
      <Text style={styles.names}>
        {item.quantity ? item.quantity : '-'}
      </Text>
    </View>
  </View>
  {collection && (
    <CollectionModal
      onBackdropPress={toggleCollection}
      onPress={setCollectionId}
    />
  )}
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
          {loading ? (
            <ActivityIndicator
              style={AppStyles.loadingIndicator}
              size="large"
              color={Colors.primary}
            />
          ) : (
            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={[AppStyles.contentContainer]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <CollectionHeader
                Favorite={favorite}
                name={selectedCollection.name}
                onPress={toggleCollection}
              />
              <View style={{marginLeft: responsiveScreenWidth(5)}}>
                {data.length >= 1 ? (
                  <FlatList
                    ref={flatListRef}
                    data={data}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    initialScrollIndex={selectedIndex}
                    getItemLayout={(data, index) => ({
                      length: responsiveWidth(80),
                      offset: responsiveWidth(90) * index,
                      index,
                    })}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>No data available</Text>
                  </View>
                )}
                {deleteProduct && (
                  <DeleteProduct
                    onBackdropPress={() => deleteToggle(null)}
                    onDelete={() => deleteItem(itemToDelete)}
                    item={itemToDelete}
                  />
                )}
                {productEdit && (
                  <ProductEdit
                    isVisible={productEdit}
                    item={itemToEdit}
                    onBackdropPress={() => toggle(null)}
                    selectedId={selectedCollection.id}
                  />
                )}
              </View>
            </ScrollView>
          )}
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
    width: '90%',
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
