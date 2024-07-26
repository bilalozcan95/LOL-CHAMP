import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';

export type Skill = {
  name: string;
  id: string;
  description: string;
  image: {
    full: string;
  };
};

type SkillModalProps = {
  visible: boolean;
  onClose: () => void;
  skill: Skill | null;
  championKey: string;
  skillIndex: number;
};

const SkillModal: React.FC<SkillModalProps> = ({ visible, onClose, skill, championKey, skillIndex }) => {
  const { t } = useTranslation('championDetail');
  if (!skill) return null;

  const skillKeys = ['Q1', 'W1', 'E1', 'R1'];
  const videoKey = skillKeys[skillIndex] || 'Q1';
  const formattedChampionKey = championKey.padStart(4, '0');
  const videoUrl = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${formattedChampionKey}/ability_${formattedChampionKey}_${videoKey}.mp4`;

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Video
            source={{ uri: videoUrl }}
            style={styles.video}
            resizeMode="cover"
            repeat={true}
            muted={true}
            controls={false}
          />
          <Text style={styles.skillName}>{skill.name}</Text>
          <Text style={styles.skillDescription}>{skill.description}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a2438',
    padding: 20,
    borderRadius: 10,
    width: '95%',
    alignItems: 'center',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: 350,
    borderWidth: 2,
    borderColor: '#c8aa6e',
    marginBottom: 10, 
    marginTop:40,
  },
  skillName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
    color: "#c8aa6e",
  },
  skillDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: "#c8aa6e",
    marginHorizontal: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: "#c8aa6e",
    borderRadius: 25,
    padding: 10,
    zIndex: 1, 
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SkillModal;
