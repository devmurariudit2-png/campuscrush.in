import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Hackathon 2026',
    college: 'DAIICT',
    date: 'May 15, 6:00 PM',
    attendees: 156,
    crushUsers: 42,
    image: 'https://picsum.photos/600/300?random=30',
  },
  {
    id: '2',
    title: 'Cultural Fest Night',
    college: 'PDEU',
    date: 'May 18, 8:00 PM',
    attendees: 500,
    crushUsers: 89,
    image: 'https://picsum.photos/600/300?random=31',
  },
  {
    id: '3',
    title: 'Alumni Meetup',
    college: 'GNLU',
    date: 'May 20, 10:00 AM',
    attendees: 45,
    crushUsers: 12,
    image: 'https://picsum.photos/600/300?random=32',
  },
];

import { API_URL } from '../../constants/api';

export default function EventsScreen() {
  const [events, setEvents] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch(`${API_URL}/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  const renderEventItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.eventCard}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <View style={styles.collegeBadge}>
          <Text style={styles.collegeBadgeText}>{item.college}</Text>
        </View>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={16} color={Colors.muted} />
          <Text style={styles.infoText}>{item.date}</Text>
        </View>
        <View style={styles.attendeeRow}>
          <View style={styles.attendeeAvatars}>
            {[1, 2, 3].map(i => (
              <Image 
                key={i} 
                source={{ uri: `https://picsum.photos/40/40?random=${i + 40}` }} 
                style={[styles.miniAvatar, { marginLeft: i > 1 ? -12 : 0 }]} 
              />
            ))}
          </View>
          <Text style={styles.attendeeText}>
            <Text style={styles.boldText}>{item.crushUsers} CampusCrush users</Text> going
          </Text>
        </View>
        <TouchableOpacity style={styles.rsvpButton}>
          <Text style={styles.rsvpButtonText}>RSVP</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Campus Events</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color={Colors.dark} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 28,
    color: Colors.dark,
  },
  searchButton: {
    padding: 4,
  },
  listContent: {
    padding: 24,
  },
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.muted + '22',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 180,
  },
  eventContent: {
    padding: 20,
  },
  collegeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.roseTint,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  collegeBadgeText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: Colors.crushPink,
    textTransform: 'uppercase',
  },
  eventTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 22,
    color: Colors.dark,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  infoText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: Colors.muted,
  },
  attendeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  attendeeAvatars: {
    flexDirection: 'row',
  },
  miniAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  attendeeText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: Colors.dark,
  },
  boldText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  rsvpButton: {
    backgroundColor: Colors.crushPink,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rsvpButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
});