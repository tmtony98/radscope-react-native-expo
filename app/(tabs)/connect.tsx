import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, CARD_STYLE, BUTTON_STYLE } from '@/constants/theme';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import AddDeviceComponent from '@/components/AddDeviceComponent';
import ConnectedDeviceCard from '@/components/ConnectedDeviceCard';
import * as Haptics from 'expo-haptics';

type DeviceType = {
  id: string;
  name: string;
  ipAddress: string;
  connected?: boolean;
};

export default function Connect() {
  const [activeTab, setActiveTab] = useState<'scan' | 'add'>('scan');
  const [isSearching, setIsSearching] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<DeviceType | null>(null);
  
  // Mock data for available devices
  const [devices, setDevices] = useState<DeviceType[]>([
    { id: '1', name: 'Device Name', ipAddress: '127.365.55.35.55' },
    { id: '2', name: 'Device Name', ipAddress: '127.365.55.35.55' },
  ]);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        console.log('Haptics not available');
      }
    }
  };

  const handleScan = () => {
    setIsSearching(true);
    triggerHaptic();
    // Simulate scanning process
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const handleConnectDevice = (deviceName: string, ipAddress: string) => {
    // Add the new device to the list
    const newDevice = {
      id: Date.now().toString(),
      name: deviceName,
      ipAddress: ipAddress
    };
    setDevices([...devices, newDevice]);
    setActiveTab('scan');
  };

  const handleConnectDeviceFromList = (device: DeviceType) => {
    triggerHaptic();
    setConnectedDevice(device);
  };

  const handleDisconnectDevice = () => {
    triggerHaptic();
    setConnectedDevice(null);
  };

  const handleViewDashboard = () => {
    triggerHaptic();
    console.log('Viewing dashboard for device:', connectedDevice?.name);
    // Navigate to dashboard or open dashboard view
  };

  const handleCancelAddDevice = () => {
    setActiveTab('scan');
  };

  const renderDeviceItem = ({ item }: { item: DeviceType }) => (
    <View style={styles.deviceCard}>
      <View style={styles.deviceInfo}>
        <MaterialIcons name="devices" size={24} color={COLORS.primary} />
        <View style={styles.deviceDetails}>
          <Text style={[TYPOGRAPHY.TitleMedium, styles.deviceName]}>{item.name}</Text>
          <Text style={[TYPOGRAPHY.smallText, styles.deviceIp]}>{item.ipAddress}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={BUTTON_STYLE.smallButton}
        onPress={() => handleConnectDeviceFromList(item)}
      >
        <Text style={BUTTON_STYLE.smallButtonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[TYPOGRAPHY.headLineMedium, styles.headerTitle]}>Radscope App</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={[TYPOGRAPHY.TitleLarge, styles.sectionTitle]}>Add Device</Text>
        <Text style={[TYPOGRAPHY.smallText, styles.sectionDescription]}>
          Scan and connect devices on your network
        </Text>
        
        {connectedDevice && (
          <ConnectedDeviceCard
            deviceName={connectedDevice.name}
            ipAddress={connectedDevice.ipAddress}
            onDisconnect={handleDisconnectDevice}
            onViewDashboard={handleViewDashboard}
          />
        )}
        
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'scan' && styles.activeTab]}
            onPress={() => {
              triggerHaptic();
              setActiveTab('scan');
            }}
          >
            <MaterialIcons name="search" size={20} color={activeTab === 'scan' ? COLORS.primary : COLORS.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'scan' && styles.activeTabText]}>Scan Devices</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'add' && styles.activeTab]}
            onPress={() => {
              triggerHaptic();
              setActiveTab('add');
            }}
          >
            <MaterialIcons name="add" size={20} color={activeTab === 'add' ? COLORS.primary : COLORS.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'add' && styles.activeTabText]}>Add Device</Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'scan' ? (
          <>
            {isSearching ? (
              <View style={styles.searchingContainer}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={[TYPOGRAPHY.smallText, styles.searchingText]}>Searching for devices...</Text>
              </View>
            ) : ( null
              // <TouchableOpacity style={BUTTON_STYLE.mediumButtonWithIconLeft} onPress={handleScan}>
              //   <Feather name="refresh-cw" size={16} color={COLORS.white} />
              //   <Text style={styles.refreshButtonText}>Refresh</Text>
              // </TouchableOpacity>
            )}
            
            <View style={styles.devicesSection}>
        <View style={styles.section}>
          <Text style={[TYPOGRAPHY.TitleMedium, styles.devicesSectionTitle]}>Available Devices</Text>
          <TouchableOpacity style={BUTTON_STYLE.smallButtonDarkWithIcon} onPress={handleScan}>
            <Feather name="refresh-cw" size={16} color={COLORS.white} style={BUTTON_STYLE.smallButtonIcon} />
            <Text style={BUTTON_STYLE.smallButtonDarkText}>Refresh</Text>
          </TouchableOpacity>
        </View>
              <FlatList
                data={devices}
                renderItem={renderDeviceItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.devicesList}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </>
        ) : (
          <View style={styles.addDeviceContainer}>
            <AddDeviceComponent 
              onConnect={handleConnectDevice}
              onCancel={handleCancelAddDevice}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  header: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.text,
    textAlign: 'center',
    fontSize: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  sectionDescription: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  tabContainer: {
    backgroundColor:COLORS.white,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  tabButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...TYPOGRAPHY.bodyTextMedium,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  activeTabText: {
    color: COLORS.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  searchingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  searchingText: {
    marginLeft: SPACING.sm,
    color: COLORS.textSecondary,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginBottom: SPACING.md,
  },
  refreshButtonText: {
    ...TYPOGRAPHY.smallText,
    color: COLORS.white,
    marginLeft: SPACING.xs,
    fontFamily: 'Poppins-Medium',
  },
  devicesSection: {
    flex: 1,
    
  },
  devicesSectionTitle: {
    color: COLORS.text,
  },
  devicesList: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    // paddingBottom: SPACING.xl,
  },
  deviceCard: {
    ...CARD_STYLE.containerList,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
    
   
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceDetails: {
    marginLeft: SPACING.md,
  },
  deviceName: {
    color: COLORS.text,
  },
  deviceIp: {
    color: COLORS.textSecondary,
    textAlign: 'left',
  },
  connectButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
  },
  connectButtonText: {
    ...TYPOGRAPHY.smallText,
    color: COLORS.white,
    fontFamily: 'Poppins-Medium',
  },
  addDeviceContainer: {
    flex: 1,
    width: '100%',
  },
});