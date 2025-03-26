import { ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';
import Header from '@/components/Header';
import DeviceDetailsCard from '@/components/DeviceDetailsCard';
import DoseRateCard from '@/components/DoseRateCard';
import ChartCard from '@/components/ChartCard';
import SpectrumCard from '@/components/SpectrumCard';
import GPSCard from '@/components/GPSCard';
import SessionLoggingCard from '@/components/SessionLoggingCard';
import BatteryCard from '@/components/BatteryCard';

export default function Dashboard() {
  const handleFullscreen = () => {
    console.log('Fullscreen pressed');
  };

  const handleGetHistory = () => {
    console.log('Get history pressed');
  };

  const handleSettings = () => {
    console.log('Settings pressed');
  };

  const handleGetLocation = () => {
    console.log('Get location pressed');
  };

  const handleDownload = () => {
    console.log('Download files pressed');
  };

  const handleStart = () => {
    console.log('Start logging pressed');
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Dashboard" />
      
      <DeviceDetailsCard />

      <DoseRateCard 
        doseRate={0.589} 
        unit="μSv/h" 
        mqttStatus={true} 
      />

      <ChartCard 
        title="Dose Rate"
        timestamp="11:15:25 AM"
        onFullscreen={handleFullscreen}
        onGetHistory={handleGetHistory}
      />

      <SpectrumCard 
        duration="222 s"
        onFullscreen={handleFullscreen}
        onSettings={handleSettings}
      />

      <GPSCard 
        latitude="18.6545556"
        longitude="18.6545556"
        onGetLocation={handleGetLocation}
      />

      <SessionLoggingCard 
        onDownload={handleDownload}
        onStart={handleStart}
      />

      <BatteryCard 
        chargeRemaining="50%"
        batteryVoltage="3.514 V"
        chargingStatus="Not Charging"
        isLastCard={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});