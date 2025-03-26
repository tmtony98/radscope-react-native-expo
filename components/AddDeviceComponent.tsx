import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, CARD_STYLE , BUTTON_STYLE } from '@/constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';


type AddDeviceProps = {
  onConnect: (deviceName: string, ipAddress: string) => void;
  onCancel: () => void;
};

const AddDeviceComponent: React.FC<AddDeviceProps> = ({ onConnect, onCancel }) => {
  const [deviceName, setDeviceName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [showConnectForm, setShowConnectForm] = useState(true);

  const triggerHaptic = (style = Haptics.ImpactFeedbackStyle.Light) => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(style);
      } catch (error) {
        console.log('Haptics not available');
      }
    }
  };

  const handleAddDevice = () => {
    triggerHaptic();
    setShowConnectForm(true);
  };

  const handleConnect = () => {
    if (deviceName.trim() && ipAddress.trim()) {
      triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
      onConnect(deviceName, ipAddress);
      setDeviceName('');
      setIpAddress('');
      setShowConnectForm(false);
    }
  };

  const handleCancel = () => {
    triggerHaptic();
    setDeviceName('');
    setIpAddress('');
    setShowConnectForm(false);
    onCancel();
  };

  return (
    <View style={styles.container}>
     
      

      {showConnectForm ? (
        <View style={styles.connectFormContainer}>
          <Text style={[TYPOGRAPHY.smallText, styles.connectFormTitle]}>
            Find the IP address of the device to be connected by reading your settings - network - Device ip
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter Device Name"
            value={deviceName}
            onChangeText={setDeviceName}
            placeholderTextColor={COLORS.textSecondary}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Enter IP Address"
            value={ipAddress}
            onChangeText={setIpAddress}
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="decimal-pad"
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.connectButton}
              onPress={handleConnect}
              activeOpacity={0.7}
              disabled={!deviceName.trim() || !ipAddress.trim()}
            >
              <Text style={BUTTON_STYLE.mediumButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.addDeviceContainer}>
          <View style={styles.scanDevicesSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="wifi" size={24} color={COLORS.primary} />
            </View>
            <Text style={[TYPOGRAPHY.bodyTextMedium, styles.sectionTitle]}>Scan Devices</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.addDeviceButton}
            onPress={handleAddDevice}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={24} color={COLORS.primary} />
            <Text style={styles.addDeviceButtonText}>Add Device</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
  },
  title: {
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  description: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  addDeviceContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
  },
  scanDevicesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'solid',
  },
  sectionTitle: {
    color: COLORS.text,
  },
  addDeviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'solid',
  },
  addDeviceButtonText: {
    ...TYPOGRAPHY.bodyTextMedium,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
    fontFamily: 'Poppins-Medium',
  },
  connectFormContainer: {
    width: '100%',
    paddingVertical: SPACING.md,
  },
  connectFormTitle: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    fontFamily: 'Poppins-Regular',
    color: COLORS.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    ...TYPOGRAPHY.bodyTextMedium,
    color: COLORS.text,
    fontFamily: 'Poppins-Medium',
  },
  connectButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },
  connectButtonText: {
    ...TYPOGRAPHY.bodyTextMedium,
    color: COLORS.white,
    fontFamily: 'Poppins-Medium',
  },
});

export default AddDeviceComponent;
