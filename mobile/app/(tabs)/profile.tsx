import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [ghostMode, setGhostMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://picsum.photos/400/400?random=50' }} 
              style={styles.profileImage} 
            />
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="pencil" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Ishaan, 22</Text>
          <Text style={styles.college}>PDEU • Computer Engineering</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Crushes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Spotlight</Text>
          </View>
        </View>

        {/* CrushCoins Card */}
        <View style={styles.coinsCard}>
          <View style={styles.coinsHeader}>
            <View style={styles.coinsInfo}>
              <Text style={styles.coinsTitle}>CrushCoins</Text>
              <Text style={styles.coinsCount}>120 Balance</Text>
            </View>
            <Ionicons name="flash" size={32} color={Colors.campusAmber} />
          </View>
          <TouchableOpacity style={styles.earnButton}>
            <Text style={styles.earnButtonText}>Earn more coins</Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Settings List */}
        <View style={styles.settingsSection}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="eye-off" size={24} color={Colors.dark} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Ghost Mode</Text>
                <Text style={styles.settingSubtitle}>Hide from your department</Text>
              </View>
            </View>
            <Switch
              value={ghostMode}
              onValueChange={setGhostMode}
              trackColor={{ false: Colors.muted + '33', true: Colors.crushPink }}
              thumbColor={Colors.white}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="shield-checkmark" size={24} color={Colors.dark} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Safe Meet</Text>
                <Text style={styles.settingSubtitle}>Manage trusted contacts</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.muted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="settings-outline" size={24} color={Colors.dark} />
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>Settings</Text>
                <Text style={styles.settingSubtitle}>Discovery & Account</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.muted} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 24,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.white,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.crushPink,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  name: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 24,
    color: Colors.dark,
  },
  college: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: Colors.muted,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 20,
    color: Colors.dark,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: Colors.muted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.muted + '22',
  },
  coinsCard: {
    backgroundColor: Colors.dark,
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 24,
    marginBottom: 24,
  },
  coinsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  coinsTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    color: Colors.white,
  },
  coinsCount: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: Colors.campusAmber,
    marginTop: 2,
  },
  coinsInfo: {},
  earnButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  earnButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: Colors.white,
  },
  settingsSection: {
    backgroundColor: Colors.white,
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 8,
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: Colors.dark,
  },
  settingSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: Colors.muted,
    marginTop: 2,
  },
  logoutButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  logoutText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: Colors.muted,
  },
});
