import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, CARD_STYLE, BUTTON_STYLE } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

type ConnectedDeviceCardProps = {
  deviceName: string;
  ipAddress: string;
  onDisconnect: () => void;
  onViewDashboard: () => void;
};

const ConnectedDeviceCard = ({
  deviceName,
  ipAddress,
  onDisconnect,
  onViewDashboard,
}: ConnectedDeviceCardProps) => {
  
  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Connected Devices</Text>
        <View style={styles.connectedBadge}>
          <Text style={styles.connectedText}>1 Connected</Text>
        </View>
      </View>
      
      <View style={styles.deviceCard}>
        <View style={styles.deviceInfo}>
          <MaterialIcons name="print" size={24} color={COLORS.text} style={styles.deviceIcon} />
          <View>
            <Text style={styles.deviceName}>{deviceName}</Text>
            <Text style={styles.deviceIp}>{ipAddress}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.disconnectButton}
          onPress={() => {
            triggerHaptic();
            onDisconnect();
          }}
        >
          <Text style={styles.disconnectButtonText}>Disconnect</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.dashboardButton}
        onPress={() => {
          triggerHaptic();
          onViewDashboard();
        }}
      >
        <Text style={styles.dashboardButtonText}>View Dashboard</Text>
        <MaterialIcons name="chevron-right" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.TitleMedium,
    color: COLORS.text,
  },
  connectedBadge: {
    backgroundColor: '#D6F94B', // Lime green color for the badge
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 16,
  },
  connectedText: {
    ...TYPOGRAPHY.smallText,
    color: COLORS.text,
    fontFamily: 'Poppins-Medium',
  },
  deviceCard: {
    ...CARD_STYLE.containerList,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIcon: {
    marginRight: SPACING.sm,
  },
  deviceName: {
    ...TYPOGRAPHY.bodyTextLarge,
    color: COLORS.text,
  },
  deviceIp: {
    ...TYPOGRAPHY.smallText,
    color: COLORS.textSecondary,
    textAlign: 'left',
  },
  disconnectButton: {
    backgroundColor: '#E62B2B', // Red color for disconnect button
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
  },
  disconnectButtonText: {
    ...TYPOGRAPHY.smallText,
    color: COLORS.white,
    fontFamily: 'Poppins-Medium',
  },
  dashboardButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: 8,
  },
  dashboardButtonText: {
    ...TYPOGRAPHY.bodyTextLarge,
    color: COLORS.white,
    fontFamily: 'Poppins-Medium',
    marginRight: SPACING.xs,
  },
});

export default ConnectedDeviceCard;
