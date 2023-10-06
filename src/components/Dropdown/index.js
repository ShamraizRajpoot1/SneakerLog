import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker'; 

const Dropdown = (props) => {
  const { items, selectedValue, onValueChange, placeholder } = props;

  return (
    <DropDownPicker
      items={items.map((item, index) => ({
        label: item,
        value: item,
      }))}
      defaultValue={selectedValue}
      containerStyle={styles.container}
      style={styles.dropdown}
      itemStyle={styles.itemStyle}
      labelStyle={styles.labelStyle}
      dropDownStyle={styles.dropDown}
      onChangeItem={(item) => onValueChange(item.value)}
      
    />
  );
};

const styles = {
  container: {
    height: 40,
    width: '95%',
    marginTop: 10,
  },
  dropdown: {

    backgroundColor: 'white',
    borderColor: '#B6BBC8',
    borderWidth: 1,
    borderRadius: 5,
  },
  itemStyle: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  labelStyle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Lato-Medium',
    fontWeight: 'normal',
  },
  dropDown: {
    height:'40%',
    backgroundColor: 'white',
    borderColor: '#B6BBC8',
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
};

export default Dropdown;
