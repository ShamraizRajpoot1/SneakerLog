import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Image } from 'react-native'
import React,{useState} from 'react'
import Header from '../../../components/Header'
import { AppStyles, } from '../../../services/utilities/AppStyles'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Colors } from '../../../services/utilities/Colors'
import { fontSize } from '../../../services/utilities/Fonts'
import CollectionHeader from '../../../components/CollectionHeader'
import AddSneakers from '../../../components/AddSneakers'
import { CollectionModal } from '../../../components/Modals'

const AddProduct = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [collection, setCollection] = useState(false);
  const selectedCollection = selectedId ? selectedId : route.params.selectedCollection;
  const setCollectionId = (selectedItem) => {
    setCollection(prev => !prev);
    setSelectedId(selectedItem);
  };
  const toggle = () => {
    setCollection(prev => !prev);
  };
    const back = () => {
        navigation.goBack();
      };
      const profile = () => {
        navigation.navigate('Profile')
      };
      const Sneakers = () => {
        navigation.navigate('SneakerStack', {
          screen: 'Sneakers',
          params: { selectedCollection },
        });
       
      };
      const Search = () => {
        navigation.navigate('SearchSneaker',{ selectedCollection })
      };
      
  return (
    <>
    <Header Image={true} onPress={back} options={true} press={profile}/>

    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor:Colors.background}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
      <TouchableWithoutFeedback>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={[AppStyles.contentContainer]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
            <CollectionHeader name={selectedCollection.name} onPress={toggle}/>
            <AddSneakers onPress={Sneakers} press={Search}/>
            {collection && <CollectionModal onBackdropPress={toggle} onPress={setCollectionId} />}
          </ScrollView>
          </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          </>
  )
}

export default AddProduct

const styles = StyleSheet.create({
    text: {
        color: Colors.blackText,
        fontSize: fontSize.h3,
      },
})