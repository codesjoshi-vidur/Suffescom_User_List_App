import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScreenWrapper} from '../components';
import {RootState, setSelectedUser} from '../redux';
import {COLORS} from '../theme';
import {FONT_SIZE, SPACING} from '../theme/global.theme';

export const UserDetail = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.selectedUser);

  const goBack = () => {
    dispatch(setSelectedUser(null));
    navigation.goBack();
  };

  if (!user) {
    return (
      <ScreenWrapper statusBarColor={COLORS.bg1}>
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>User detials not found</Text>
          <TouchableOpacity style={styles.backBtn} onPress={goBack}>
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  const fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

  return (
    <ScreenWrapper statusBarColor={COLORS.bg1}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backText}>{'<'} Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Detials</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{user.phone}</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{fullAddress}</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.bg1,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.white,
    fontWeight: '600',
    marginTop: SPACING.sm,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: SPACING.sm,
  },
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.bg1,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.bg3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.bg1,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
  },
  value: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.darkText1,
    fontWeight: '500',
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  errorText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.error,
    marginBottom: SPACING.md,
  },
  backBtn: {
    backgroundColor: COLORS.bg1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  backBtnText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
  },
});
