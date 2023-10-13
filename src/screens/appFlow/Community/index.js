import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {appIcons, appImages} from '../../../services/utilities/Assets';
import {AppStyles} from '../../../services/utilities/AppStyles';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../../services/utilities/Colors';
import {scale} from 'react-native-size-matters';
import {fontFamily, fontSize} from '../../../services/utilities/Fonts';
import {Report, ReportModal, ThankYou} from '../../../components/Modals';

const Comunity = () => {
  const users = [
    {
      id: 1,
      name: 'User 1',
      profileImage: appImages.member1,
      username: 'user1',
    },
    {
      id: 2,
      name: 'User 2',
      profileImage: appImages.member2,
      username: 'user2',
    },
  ];

  const products = [
    [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        color: 'Dark Grey',
        image: appImages.product1,
        size: 'not Available',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20,
        color: 'Dark Grey',
        image: appImages.product2,
        size: 'not Available',
      },
      {
        id: 3,
        name: 'Product 3',
        price: 30,
        color: 'Dark Grey',
        image: appImages.product3,
        size: 'not Available',
      },
    ],
    [
      {
        id: 4,
        name: 'Product 4',
        price: 15,
        color: 'Dark Grey',
        image: appImages.product2,
        size: 'not Available',
      },
      {
        id: 5,
        name: 'Product 5',
        price: 25,
        color: 'Dark Grey',
        image: appImages.product2,
        size: 'not Available',
      },
    ],
  ];
  const collection = {
    ...AppStyles.collection,
    borderWidth: scale(0.7),
    marginTop: responsiveHeight(1.5),
    borderRadius: scale(8),
    padding: responsiveWidth(2),
  };
  const [report, setReport] = useState(false);
  const [reportUser, setReportUser] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const toggle = () => {
    setReport(prev => !prev);
  };
  const reporttoggle = () => {
    setReportUser(prev => !prev);
  };
  const thanktoggle = () => {
    setThankYou(prev => !prev);
  };

  const thank = () => {
    reporttoggle();
    thanktoggle();
  };
  const renderItem = ({item, index}) => (
    <View key={index.toString()} style={styles.userContainer}>
      <View style={styles.userDetails}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={users[index].profileImage} style={styles.userImage} />
          <View style={styles.nameContainer}>
            <Text style={styles.listdet2}>{users[index].name}</Text>
            <Text style={styles.listdet3}>{users[index].name}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.listtime}>3 hours ago</Text>
          <TouchableOpacity onPress={toggle}>
            <Image
              source={appIcons.threeDots}
              style={{
                height: scale(20),
                width: scale(20),
                marginBottom: responsiveHeight(2),
                tintColor: Colors.blackText,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.productList}>
        {products[index].map((product, productIndex) => (
          <View key={product.id.toString()} style={collection}>
            <View style={styles.inner1}>
              <Image source={product.image} style={styles.productpic} />
              <View style={styles.productDet}>
                <Text style={styles.pname}>{product.name}</Text>
                <Text style={styles.pcolor}>{product.color}</Text>
                <Text style={styles.psize}>Size {product.size}</Text>
                <View
                  style={{
                    marginTop: responsiveHeight(0.2),
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity>
                    <Image source={appIcons.heartFill} style={styles.like1} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.action}>
              <Text style={styles.pAction}>Added</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      {report && (
        <ReportModal
          isVisible={report}
          report={true}
          onBackdropPress={toggle}
          onPress={reporttoggle}
        />
      )}
      {reportUser && (
        <Report
          isVisible={reportUser}
          onBackdropPress={reporttoggle}
          onPress={thank}
        />
      )}
      {thankYou && (
        <ReportModal isVisible={thankYou} onBackdropPress={thanktoggle} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginLeft: responsiveWidth(2),
  },
  inner1: {flexDirection: 'row', justifyContent: 'space-between'},
  productDet: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginLeft: responsiveWidth(3.8),
  },
  container: {
    flex: 1,
    padding: 16,
  },
  pname: {
    color: Colors.text3,
    fontSize: fontSize.usernameText,
    fontFamily: fontFamily.LatoBlack,
  },
  pcolor: {
    color: Colors.text4,
    fontSize: fontSize.userNameComunity,
    fontFamily: fontFamily.LatoRegular,
  },
  psize: {
    color: Colors.text4,
    fontSize: fontSize.userNameComunity,
    fontFamily: fontFamily.LatoRegular,
  },

  pAction: {
    color: Colors.text5,
    fontSize: fontSize.userNameComunity,
    fontFamily: fontFamily.LatoBold,
  },
  action: {
    height: '100%',
    right: responsiveWidth(1),
  },
  userContainer: {
    marginBottom: responsiveHeight(2),
  },
  like1: {height: scale(18), width: scale(18)},
  userDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: responsiveHeight(0.5),
  },
  userImage: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(100),
  },
  productList: {
    flex: 2,
    marginTop: responsiveHeight(1),
  },
  listdet2: {
    color: Colors.text3,
    fontSize: responsiveFontSize(1.6),
    fontFamily: fontFamily.LatoBlack,
  },
  listdet3: {
    color: Colors.text4,
    fontSize: fontSize.userNameComunity,
    fontFamily: fontFamily.LatoRegular,
  },
  listtime: {
    alignSelf: 'center',
    color: Colors.text4,
    fontSize: fontSize.userNameComunity,
    fontFamily: fontFamily.LatoRegular,
    bottom: responsiveHeight(1),
  },
  productpic: {height: scale(50), width: scale(50), resizeMode: 'contain'},
});

export default Comunity;
