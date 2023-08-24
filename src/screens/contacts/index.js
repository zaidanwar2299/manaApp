import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef} from 'react';
import Header from '../../components/views/header';
import {AppStyles} from '../../common/styles';
import Fonts from '../../assets/fonts';
import icons from '../../assets/icons';
import {Spacer} from '../../components/Spacer';
import {ContactList} from '../../common/constants';
import UnderLine from '../../components/Underline';
import theme from '../../common/theme';
import {navigate} from '../../navigation/navigation.utils';
import Routes from '../../navigation/routes';

const Contacts = () => {
  const flatListRef = useRef();
  return (
    <View style={{padding: 15, flex:1}}>
      <Header
        showBack={false}
        renderLeftItem={() => (
          <Text style={{...styles.contactsHeader}}>{'Contacts'}</Text>
        )}
        renderRightItem={() => (
          <View style={[styles.headerIcons]}>
            <Image
              source={icons.PersonPlus}
              style={{resizeMode: 'contain', height: 25, width: 25}}
            />
            <Spacer width={15} />
            <Image
              source={icons.settings}
              style={{resizeMode: 'contain', height: 25, width: 25}}
            />
          </View>
        )}
      />
      <View
        style={{
          height: 45,
          width: 160,
          borderRadius: 40,
          backgroundColor: theme.secondary,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Fonts.regular,
            color: 'white',
          }}>
          {'All Contacts (24)'}
        </Text>
        <Spacer width={5} />
        <Image
          source={icons.downArrow}
          style={{
            height: 17,
            width: 17,
            resizeMode: 'contain',
            marginTop: 5,
          }}
        />
      </View>
      <View style={{flex:1}} >
      <FlatList
        data={ContactList}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => navigate(Routes.ContactDetail)}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 18,
              }}
              key={index}>
              <View style={{...styles.flexRow, alignItems: 'center'}}>
                <Image
                  source={icons.profilePhoto}
                  style={{height: 39, width: 39, resizeMode: 'contain'}}
                />
                <Spacer width={10} />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: Fonts.regular,
                    fontSize: 16,
                  }}>
                  {item.name}
                </Text>
              </View>

              <View style={{alignSelf: 'center', alignItems: 'center'}}>
                <Image
                  source={icons.calendarPlus}
                  style={{height: 23, width: 23, resizeMode: 'contain'}}
                />
              </View>
            </View>
            <UnderLine />
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactsHeader: {
    fontSize: 33,
    textAlign: 'center',
    color: 'white',
    fontFamily: Fonts.bold,
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Contacts;
