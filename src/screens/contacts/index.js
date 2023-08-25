import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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
import PrimaryInput from '../../components/inputs/primaryInput';
import EmptyCard from '../../components/cards/emptyCard';

const Contacts = () => {
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = ContactList.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={{padding: 15, flex: 1}}>
      <Header
        showBack={false}
        renderLeftItem={() => (
          <Text style={{...styles.contactsHeader}}>{'Contacts'}</Text>
        )}
        renderRightItem={() => (
          <View style={[styles.headerIcons]}>
            <TouchableOpacity onPress={() => navigate(Routes.AddContacts)}>
              <Image source={icons.plusCircle} style={{...styles.imageStyle}} />
            </TouchableOpacity>
            <Spacer width={15} />
            <TouchableOpacity>
              <Image source={icons.calendar} style={{...styles.imageStyle}} />
            </TouchableOpacity>
            <Spacer width={15} />
            <TouchableOpacity onPress={() => navigate(Routes.ContactSetting)}>
              <Image source={icons.settings} style={{...styles.imageStyle}} />
            </TouchableOpacity>
          </View>
        )}
      />
      <Spacer height={5} />
      <PrimaryInput
        leftIconProps={{icon: 'search-outline', color: theme.grey200}}
        placeholder="Search contacts"
        innerContainerStyle={{...styles.inputInnerStyle}}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Spacer height={5} />
      <UnderLine width={insets.right + 400} />
      <View style={{flex: 1}}>
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyCard />}
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
  inputInnerStyle: {
    borderRadius: 40,
    height: 40,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 0,
  },
  imageStyle: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
  },
});

export default Contacts;
