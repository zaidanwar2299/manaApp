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
import Fonts from '../../assets/fonts';
import icons from '../../assets/icons';
import {Spacer} from '../../components/Spacer';
import {ContactAddedList, ContactList} from '../../common/constants';
import UnderLine from '../../components/Underline';
import theme from '../../common/theme';
import {navigate} from '../../navigation/navigation.utils';
import Routes from '../../navigation/routes';
import PrimaryInput from '../../components/inputs/primaryInput';
import EmptyCard from '../../components/cards/emptyCard';

const AddContacts = () => {
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = ContactAddedList.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // const [added, setAdded] = useState(false)

  const [changedItems, setChangedItems] = useState([]);

  const handleItemPress = itemId => {
    if (!changedItems.includes(itemId)) {
      setChangedItems([...changedItems, itemId]);
    }
  };

  //   const toggleItem = (itemId) => {
  //     if (addedItems.includes(itemId)) {
  //       setAddedItems(addedItems.filter(id => id !== itemId));
  //     } else {
  //       setAddedItems([...addedItems, itemId]);
  //     }
  //   };

  return (
    <View style={{flex: 1}}>
      <Header
        title={'Mario Mourad'}
        titleStyle={{fontSize: 18, fontFamily: Fonts.bold}}
        titleProps={{fontSize: 30}}
        renderRightItem={() => (
            <TouchableOpacity onPress={()=> navigate(Routes.InviteUser)} >
          <Image
            source={icons.profilePlus}
            style={{
              height: 25,
              width: 25,
              resizeMode: 'contain',
              marginRight: 5,
            }}
            tintColor={'white'}
          />
          </TouchableOpacity>
        )}
      />
      <View style={{padding: 15, flex: 1}}>
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
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity>
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
                    <View>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: Fonts.regular,
                          fontSize: 16,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: theme.grey100,
                          fontFamily: Fonts.regular,
                          fontSize: 13,
                        }}>
                        {item.tag}
                      </Text>
                    </View>
                  </View>

                  <View style={{alignSelf: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
                      <View style={{...styles.flexRow}}>
                        {changedItems.includes(item.id) ? (
                          <Text
                            style={{
                              color: theme.green,
                              alignSelf: 'center',
                              paddingRight: 5,
                            }}>
                            {'added'}
                          </Text>
                        ) : null}
                        <Image
                          source={
                            changedItems.includes(item.id)
                              ? icons.greenTick
                              : icons.circlePlus
                          }
                          style={{height: 23, width: 23, resizeMode: 'contain'}}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <UnderLine />
              </TouchableOpacity>
            )}
          />
        </View>
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

export default AddContacts;
