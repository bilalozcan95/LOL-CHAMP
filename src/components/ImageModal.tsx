import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ImageModalProps {
  visible: boolean;
  onClose: () => void;
  imageUrl: string;
  name: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ visible, onClose, imageUrl, name }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={30} color="#c8aa6e" />
        </TouchableOpacity>
        <Image
          source={{ uri: imageUrl }}
          style={styles.modalImage}
        />
        <Text style={styles.modalText}>{name}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  modalImage: {
    width: '90%',
    height: '70%',
    objectFit:"fill",
    borderRadius: 10,
  },
  modalText: {
    fontSize: 20,
    color: '#c8aa6e',
    marginTop: 10,
  },
});

export default ImageModal;
