import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MOCK_LIKES = [
  { id: '1', name: 'Aavya', photo: 'https://picsum.photos/200/300?random=10', college: 'PDEU', reaction: '🔥' },
  { id: '2', name: 'Ishani', photo: 'https://picsum.photos/200/300?random=11', college: 'Nirma', reaction: '😍' },
  { id: '3', name: 'Kavya', photo: 'https://picsum.photos/200/300?random=12', college: 'DAIICT', reaction: '✍️' },
  { id: '4', name: 'Sneha', photo: 'https://picsum.photos/200/300?random=13', college: 'IIIT-GN', reaction: '❤️' },
];

const MOCK_MATCHES = [
  { id: '1', name: 'Riya', photo: 'https://picsum.photos/100/100?random=20', lastMessage: 'See you at the canteen?', time: '2m ago', unread: true },
  { id: '2', name: 'Ananya', photo: 'https://picsum.photos/100/100?random=21', lastMessage: 'That was a great hackathon!', time: '1h ago', unread: false },
];

import { API_URL } from '../../constants/api';

export default function MatchesScreen() {
  const [activeTab, setActiveTab] = useState<'likes' | 'matches'>('likes');
  const [likes, setLikes] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);

  React.useEffect(() => {
    fetch(`${API_URL}/matches`)
      .then(res => res.json())
      .then(data => {
        setLikes(data.likes || []);
        setMatches(data.matches || []);
      })
      .catch(err => console.error(err));
  }, []);

  const renderLikeItem = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity style={styles.likeCard}>
      <Image 
        source={{ uri: item.photo }} 
        style={[styles.likePhoto, index > 0 && styles.blurredPhoto]} 
        blurRadius={index > 0 ? 20 : 0}
      />
      <View style={styles.likeOverlay}>
        <Text style={styles.likeName}>{item.name}</Text>
        <Text style={styles.likeCollege}>{item.college}</Text>
      </View>
      <View style={styles.reactionBadge}>
        <Text>{item.reaction}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderMatchItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.matchItem}>
      <Image source={{ uri: item.photo }} style={styles.matchAvatar} />
      <View style={styles.matchInfo}>
        <View style={styles.matchHeader}>
          <Text style={styles.matchName}>{item.name}</Text>
          <Text style={styles.matchTime}>{item.time}</Text>
        </View>
        <Text style={[styles.matchMessage, item.unread && styles.unreadMessage]} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => setActiveTab('likes')}
          style={[styles.tab, activeTab === 'likes' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'likes' && styles.activeTabText]}>Likes You</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setActiveTab('matches')}
          style={[styles.tab, activeTab === 'matches' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'matches' && styles.activeTabText]}>Matches</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'likes' ? (
          <View style={styles.likesContainer}>
            <View style={styles.unblurBanner}>
              <Ionicons name="flash" size={16} color={Colors.campusAmber} />
              <Text style={styles.unblurText}>1 unblurred profile left today</Text>
            </View>
            <FlatList
              data={likes}
              renderItem={renderLikeItem}
              keyExtractor={item => item.id}
              numColumns={2}
              contentContainerStyle={styles.likesGrid}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <FlatList
            data={matches}
            renderItem={renderMatchItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.matchesList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
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
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.muted + '22',
  },
  tab: {
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.crushPink,
  },
  tabText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    color: Colors.muted,
  },
  activeTabText: {
    color: Colors.dark,
  },
  content: {
    flex: 1,
  },
  likesContainer: {
    flex: 1,
  },
  unblurBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.campusAmber + '11',
    paddingVertical: 10,
    gap: 8,
  },
  unblurText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: Colors.campusAmber,
  },
  likesGrid: {
    padding: 10,
  },
  likeCard: {
    flex: 1,
    aspectRatio: 0.75,
    margin: 6,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.muted + '22',
  },
  likePhoto: {
    width: '100%',
    height: '100%',
  },
  blurredPhoto: {
    opacity: 0.8,
  },
  likeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  likeName: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  likeCollege: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: Colors.white,
    opacity: 0.8,
  },
  reactionBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.white,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchesList: {
    padding: 20,
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  matchAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
  },
  matchInfo: {
    flex: 1,
    marginLeft: 16,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  matchName: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    color: Colors.dark,
  },
  matchTime: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: Colors.muted,
  },
  matchMessage: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: Colors.muted,
  },
  unreadMessage: {
    color: Colors.dark,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.crushPink,
    marginLeft: 10,
  },
});