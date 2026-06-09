import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {User} from '../services';
import {COLORS} from '../theme';
import {FONT_SIZE, SPACING} from '../theme/global.theme';

interface Props {
  user: User;
  onPress: (user: User) => void;
}

function UserListCardComponent(props: Props) {
  const {user} = props;
  const firstLetter = user.name.charAt(0).toUpperCase();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => props.onPress(user)}>
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>
        <View style={styles.nameBox}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.rowText}>Email: {user.email}</Text>
      <Text style={styles.rowText}>Phone: {user.phone}</Text>
      <Text style={styles.rowText}>Website: {user.website}</Text>

      <Text style={styles.sectionTitle}>Address</Text>
      <Text style={styles.rowText}>Street: {user.address.street}</Text>
      <Text style={styles.rowText}>Suite: {user.address.suite}</Text>
      <Text style={styles.rowText}>City: {user.address.city}</Text>
      <Text style={styles.rowText}>Zipcode: {user.address.zipcode}</Text>

      <Text style={styles.sectionTitle}>Company</Text>
      <Text style={styles.rowText}>Name: {user.company.name}</Text>
      <Text style={styles.rowText}>Catch Phrase: {user.company.catchPhrase}</Text>
      <Text style={styles.rowText}>BS: {user.company.bs}</Text>

      <Text style={styles.tapHint}>Tap to view detials</Text>
    </TouchableOpacity>
  );
}

export const UserListCard = React.memo(
  UserListCardComponent,
  (prev, next) => prev.user.id === next.user.id,
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(71, 111, 255, 0.18)',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.bg3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  avatarText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.bg1,
  },
  nameBox: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.darkText1,
  },
  username: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.bg1,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  rowText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.darkGray,
    marginBottom: 3,
  },
  tapHint: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.bg1,
    marginTop: SPACING.sm,
    textAlign: 'right',
    fontWeight: '500',
  },
});
