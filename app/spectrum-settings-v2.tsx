import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Pressable } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

export default function SpectrumSettingsV2() {
  const router = useRouter();
  
  // State for settings
  const [axisType, setAxisType] = useState('energy'); // 'energy' or 'adc'
  const [scaleType, setScaleType] = useState('Smoothy');
  const [showScaleDropdown, setShowScaleDropdown] = useState(false);
  const [smaEnabled, setSmaEnabled] = useState(false);
  const [smoothingPoints, setSmoothingPoints] = useState(30);
  
  // Scale type options
  const scaleTypes = ['Smoothy', 'Linear', 'Logarithmic'];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Spectrum Settings</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Enable Energy Axis</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              style={[
                styles.toggleButton, 
                axisType === 'energy' && styles.toggleButtonActive
              ]}
              onPress={() => setAxisType('energy')}
            >
              {axisType === 'energy' && (
                <Ionicons name="checkmark" size={18} color={COLORS.white} style={styles.checkIcon} />
              )}
              <Text style={[
                styles.toggleText,
                axisType === 'energy' && styles.toggleTextActive
              ]}>Energy Axis</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.toggleButton, 
                axisType === 'adc' && styles.toggleButtonActive
              ]}
              onPress={() => setAxisType('adc')}
            >
              {axisType === 'adc' && (
                <Ionicons name="checkmark" size={18} color={COLORS.white} style={styles.checkIcon} />
              )}
              <Text style={[
                styles.toggleText,
                axisType === 'adc' && styles.toggleTextActive
              ]}>ADC channels</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Y Axis scale type</Text>
          <Pressable 
            style={styles.dropdown}
            onPress={() => setShowScaleDropdown(!showScaleDropdown)}
          >
            <Text style={styles.dropdownText}>{scaleType}</Text>
            <MaterialIcons 
              name={showScaleDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
              size={24} 
              color={COLORS.text} 
            />
          </Pressable>
          
          {showScaleDropdown && (
            <View style={styles.dropdownMenu}>
              {scaleTypes.map((type) => (
                <TouchableOpacity 
                  key={type}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setScaleType(type);
                    setShowScaleDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Y Axis smoothing type</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>SMA :</Text>
            <Switch
              value={smaEnabled}
              onValueChange={setSmaEnabled}
              trackColor={{ false: '#D9D9D9', true: '#D9D9D9' }}
              thumbColor={smaEnabled ? COLORS.primary : '#F4F3F4'}
              ios_backgroundColor="#D9D9D9"
            />
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Smooting Points</Text>
          <Text style={styles.sliderLabel}>Selected Points :</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>0</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={smoothingPoints}
              onValueChange={setSmoothingPoints}
              step={1}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor="#D9D9D9"
              thumbTintColor={COLORS.primary}
            />
            <Text style={styles.sliderValue}>100</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton}>
          <Ionicons name="home-outline" size={24} color={COLORS.text} />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabButton}>
          <View style={styles.addButton}>
            <Ionicons name="add" size={24} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabButton}>
          <Ionicons name="settings-outline" size={24} color={COLORS.text} />
          <Text style={styles.tabText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  saveButton: {
    padding: 4,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  toggleButtonActive: {
    backgroundColor: '#1E3A5F',
  },
  checkIcon: {
    marginRight: 4,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333333',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginRight: 8,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
  },
  sliderValue: {
    fontSize: 12,
    color: '#666666',
    width: 24,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 8,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  tabText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 