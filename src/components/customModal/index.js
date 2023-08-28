import {View, Text} from 'react-native';
import React, {Children} from 'react';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomModal = ({modalToggle, modalVisible, content}) => {
  const insets = useSafeAreaInsets();
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        // visible={modalVisible}
        // onRequestClose={() => {
        //   // setModalVisible(!modalVisible);
        //   // setShowTimePicker(false);
        //   modalToggle
        // }}
        // swipeDirection={['down']}
        // onSwipeComplete={()=>setModalVisible(false)}
        isVisible={modalVisible}
        swipeDirection={['down']} // Configure swipe directions
        onSwipeComplete={modalToggle} // Function to call when modal is swiped
        onBackdropPress={modalToggle}
        backdropOpacity={0}
        style={{
          marginRight: insets.right,
          marginLeft: insets.left,
          marginTop: insets.top - 60,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}>
        {content}
      </Modal>
    </View>
  );
};

export default CustomModal;
