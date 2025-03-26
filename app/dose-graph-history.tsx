import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { CARD_STYLE, COLORS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import * as Haptics from 'expo-haptics';

interface TimeData {
  hour: string;
  minute: string;
  period: string;
}

interface DatePickerStepProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onNext: () => void;
}

interface TimePickerStepProps {
  selectedTime: TimeData;
  onTimeSelect: (time: TimeData) => void;
  onNext: () => void;
}

interface GraphStepProps {
  selectedDate: string;
  selectedTime: TimeData;
}

// Step components
const DatePickerStep: React.FC<DatePickerStepProps> = ({ selectedDate, onDateSelect, onNext }) => {
  const [currentMonth, setCurrentMonth] = useState('August 2025');
  const [showCalendar, setShowCalendar] = useState(false);
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calendarDays = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    disabled: false,
    selected: i + 1 === 17
  }));

  const handleDateSelect = (day: number) => {
    const date = `Mon, Aug ${day}`;
    onDateSelect(date);
    setShowCalendar(false);
    onNext();
  };

  return (
    <View style={styles.stepContainer}>
      {/* Date Input Field */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Select Date:</Text>
        <TouchableOpacity 
          onPress={() => setShowCalendar(true)} 
          style={styles.dateInput}
        >
          <Text style={styles.dateText}>
            {selectedDate || 'Select a date'}
          </Text>
          <MaterialIcons name="calendar-today" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Calendar View */}
      {showCalendar && (
        <View style={styles.calendarContainer}>
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateText}>
              {selectedDate || 'Select date'}
            </Text>
            <TouchableOpacity style={styles.editButton}>
              <MaterialIcons name="edit" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.monthSelector}>
            <Text style={styles.monthText}>{currentMonth}</Text>
            <View style={styles.monthNavigation}>
              <TouchableOpacity style={styles.monthButton}>
                <MaterialIcons name="chevron-left" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.monthButton}>
                <MaterialIcons name="chevron-right" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.calendar}>
            <View style={styles.daysOfWeek}>
              {daysOfWeek.map((day, index) => (
                <Text key={index} style={styles.dayOfWeekText}>{day}</Text>
              ))}
            </View>
            
            <View style={styles.calendarDays}>
              {calendarDays.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.calendarDay,
                    item.selected && styles.selectedDay,
                    item.disabled && styles.disabledDay
                  ]}
                  onPress={() => handleDateSelect(item.day)}
                >
                  <Text style={[
                    styles.calendarDayText,
                    item.selected && styles.selectedDayText,
                    item.disabled && styles.disabledDayText
                  ]}>
                    {item.day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.calendarActions}>
            <TouchableOpacity 
              onPress={() => setShowCalendar(false)}
              style={styles.calendarButton}
            >
              <Text style={styles.calendarButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                setShowCalendar(false);
                onNext();
              }}
              style={styles.calendarButton}
            >
              <Text style={styles.calendarButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const TimePickerStep: React.FC<TimePickerStepProps> = ({ selectedTime, onTimeSelect, onNext }) => {
  const clockNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [period, setPeriod] = useState('AM');

  return (
    <View style={styles.stepContainer}>
      <View style={styles.timeInputContainer}>
        <View style={styles.timeInputWrapper}>
          <TextInput
            style={styles.timeInput}
            value={selectedTime.hour}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <Text style={styles.timeSeparator}>:</Text>
        <View style={styles.timeInputWrapper}>
          <TextInput
            style={styles.timeInput}
            value={selectedTime.minute}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <View style={styles.periodSelector}>
          <TouchableOpacity 
            style={[styles.periodButton, period === 'AM' && styles.activePeriodButton]}
            onPress={() => setPeriod('AM')}
          >
            <Text style={[styles.periodButtonText, period === 'AM' && styles.activePeriodButtonText]}>
              AM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.periodButton, period === 'PM' && styles.activePeriodButton]}
            onPress={() => setPeriod('PM')}
          >
            <Text style={[styles.periodButtonText, period === 'PM' && styles.activePeriodButtonText]}>
              PM
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.clockContainer}>
        <View style={styles.clockFace}>
          {clockNumbers.map((number, index) => (
            <View 
              key={index} 
              style={[
                styles.clockNumber,
                { 
                  top: 110 + 90 * Math.sin(((number - 3) * 30) * Math.PI / 180),
                  left: 110 + 90 * Math.cos(((number - 3) * 30) * Math.PI / 180)
                }
              ]}
            >
              <Text style={styles.clockNumberText}>{number}</Text>
            </View>
          ))}
          <View style={styles.clockCenter} />
          <View style={styles.clockHand} />
          <TouchableOpacity 
            style={styles.okButton}
            onPress={onNext}
          >
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const GraphStep: React.FC<GraphStepProps> = ({ selectedDate, selectedTime }) => {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.graphHeader}>
        <Text style={styles.graphTitle}>Dose Rate</Text>
        <Text style={styles.graphTime}>{selectedTime.hour}:{selectedTime.minute} {selectedTime.period}</Text>
      </View>
      
      <View style={styles.graphContainer}>
        {/* Placeholder for the graph */}
        <View style={styles.dummyGraph} />
      </View>
      
      <View style={styles.graphParameters}>
        <Text style={styles.parameterTitle}>Graph Parameters</Text>
        <View style={styles.parameterRow}>
          <Text style={styles.parameterLabel}>Date</Text>
          <Text style={styles.parameterValue}>{selectedDate}</Text>
        </View>
        <View style={styles.parameterRow}>
          <Text style={styles.parameterLabel}>Start Time</Text>
          <Text style={styles.parameterValue}>{selectedTime.hour}:{selectedTime.minute} {selectedTime.period}</Text>
        </View>
        <View style={styles.parameterRow}>
          <Text style={styles.parameterLabel}>End Time</Text>
          <Text style={styles.parameterValue}>{selectedTime.hour}:{selectedTime.minute} {selectedTime.period}</Text>
        </View>
      </View>
    </View>
  );
};

export default function DoseGraphHistory() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState({ hour: '07', minute: '00', period: 'AM' });

  const handleNext = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (currentStep === 0) {
      router.back();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={TYPOGRAPHY.TitleLarge}>Dose Graph History</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content}>
        {currentStep === 0 && (
          <DatePickerStep
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onNext={handleNext}
          />
        )}
        
        {currentStep === 1 && (
          <TimePickerStep
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            onNext={handleNext}
          />
        )}
        
        {currentStep === 2 && (
          <GraphStep
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        )}
      </ScrollView>
      
      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton} onPress={() => router.push('/')}>
          <MaterialIcons name="home" size={24} color={COLORS.textSecondary} />
          <Text style={styles.tabButtonText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.connectButton}>
          <MaterialIcons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabButton} onPress={() => router.push('/settings')}>
          <MaterialIcons name="settings" size={24} color={COLORS.textSecondary} />
          <Text style={styles.tabButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xl + SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.xs,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  stepContainer: {
    ...CARD_STYLE.container,
    marginTop: 0,
  },
  // Date Picker Styles
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  monthText: {
    ...TYPOGRAPHY.bodyTextMedium,
    textAlign: 'left',
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendar: {
    marginBottom: SPACING.md,
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.sm,
  },
  dayOfWeekText: {
    ...TYPOGRAPHY.smallText,
    width: 30,
    textAlign: 'center',
  },
  calendarDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  calendarDay: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 15,
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
  },
  disabledDay: {
    opacity: 0.3,
  },
  calendarDayText: {
    ...TYPOGRAPHY.smallText,
  },
  selectedDayText: {
    color: COLORS.white,
  },
  disabledDayText: {
    color: COLORS.textSecondary,
  },
  
  // Time Picker Styles
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  timeInputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    width: 40,
    alignItems: 'center',
  },
  timeInput: {
    ...TYPOGRAPHY.TitleLarge,
    textAlign: 'center',
  },
  timeSeparator: {
    ...TYPOGRAPHY.TitleLarge,
    marginHorizontal: SPACING.sm,
  },
  periodSelector: {
    flexDirection: 'row',
    marginLeft: SPACING.md,
  },
  periodButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 4,
  },
  activePeriodButton: {
    backgroundColor: COLORS.primary,
  },
  periodButtonText: {
    ...TYPOGRAPHY.smallText,
  },
  activePeriodButtonText: {
    color: COLORS.white,
  },
  clockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  clockFace: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
  },
  clockNumber: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  clockNumberText: {
    ...TYPOGRAPHY.smallText,
  },
  clockCenter: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    top: 116,
    left: 116,
  },
  clockHand: {
    position: 'absolute',
    width: 2,
    height: 80,
    backgroundColor: COLORS.primary,
    top: 120,
    left: 119,
    transformOrigin: 'top',
    transform: [{ rotate: '210deg' }],
  },
  
  // Graph Styles
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  graphTitle: {
    ...TYPOGRAPHY.TitleLarge,
  },
  graphTime: {
    ...TYPOGRAPHY.bodyTextMedium,
  },
  graphContainer: {
    height: 200,
    marginBottom: SPACING.md,
  },
  dummyGraph: {
    flex: 1,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 8,
  },
  graphParameters: {
    marginTop: SPACING.md,
  },
  parameterTitle: {
    ...TYPOGRAPHY.TitleMedium,
    marginBottom: SPACING.sm,
  },
  parameterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  parameterLabel: {
    ...TYPOGRAPHY.bodyTextMedium,
    color: COLORS.textSecondary,
  },
  parameterValue: {
    ...TYPOGRAPHY.bodyTextMedium,
  },
  
  // Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: 60,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabButtonText: {
    ...TYPOGRAPHY.smallText,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  connectButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedDateText: {
    ...TYPOGRAPHY.TitleMedium,
    marginBottom: SPACING.md,
  },
  okButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  okButtonText: {
    ...TYPOGRAPHY.bodyTextMedium,
    color: COLORS.primary,
  },
  // Updated and new styles for Date Picker
  datePickerContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.bodyTextMedium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textAlign: 'left',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
  },
  dateText: {
    ...TYPOGRAPHY.bodyTextMedium,
    color: COLORS.text,
    textAlign: 'left',
  },
  calendarContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginTop: SPACING.sm,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  editButton: {
    padding: SPACING.xs,
  },
  monthButton: {
    padding: SPACING.xs,
    marginHorizontal: SPACING.xs,
  },
  calendarActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  calendarButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  calendarButtonText: {
    ...TYPOGRAPHY.bodyTextMedium,
    color: COLORS.primary,
  },
});
