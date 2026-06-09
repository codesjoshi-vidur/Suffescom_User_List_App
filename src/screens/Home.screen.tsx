import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScreenWrapper, SearchInput, UserListCard} from '../components';
import {resetUserState, RootState, setSeachQuery, setSelectedUser} from '../redux';
import {getUserListService, User} from '../services';
import {COLORS} from '../theme';
import {FONT_SIZE, SPACING} from '../theme/global.theme';

const PAGE_LIMT = 5;

export const Home = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const seachQuery = useSelector((state: RootState) => state.users.seachQuery);

  const [userData, setUserData] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [hasMoreUsres, setHasMoreUsres] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLodingMore, setIsLodingMore] = useState(false);
  const onEndReachedCalledDuringMomentum = useRef(true);

  const filteredUsres = useMemo(() => {
    if (!seachQuery.trim()) {
      return userData;
    }
    const query = seachQuery.toLowerCase().trim();
    return userData.filter(item => item.name.toLowerCase().includes(query));
  }, [userData, seachQuery]);

  const getUsersList = async (pageNum: number, isRefresh = false) => {
    try {
      if (pageNum === 1 && userData.length === 0 && !isRefresh) {
        setIsLoading(true);
      }
      if (isRefresh) {
        setIsRefreshing(true);
      }
      if (pageNum > 1) {
        setIsLodingMore(true);
      }

      const response = await getUserListService(pageNum, PAGE_LIMT);

      if (pageNum === 1) {
        setUserData(response.data);
      } else {
        setUserData(prev => {
          const ids = prev.map(p => p.id);
          const newOnes = response.data.filter((u: User) => !ids.includes(u.id));
          return [...prev, ...newOnes];
        });
      }

      setPage(pageNum);
      setHasMoreUsres(response.data.length === PAGE_LIMT);

      if (pageNum === 1) {
        onEndReachedCalledDuringMomentum.current = true;
      }
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Somthing went wrong');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setIsLodingMore(false);
    }
  };

  useEffect(() => {
    getUsersList(1);
  }, []);

  const onUserPress = useCallback(
    (user: User) => {
      dispatch(setSelectedUser(user));
      navigation.navigate('UserDetail');
    },
    [dispatch, navigation],
  );

  const onResetPress = async () => {
    dispatch(resetUserState());
    setUserData([]);
    setPage(0);
    setHasMoreUsres(true);
    await getUsersList(1, true);
    Alert.alert(
      'Reset',
      'List reset so that you can test pagination again',
      [{text: 'OK'}],
    );
  };

  const handleSeachChange = useCallback(
    (text: string) => {
      dispatch(setSeachQuery(text));
    },
    [dispatch],
  );

  const handleRefresh = useCallback(() => {
    getUsersList(1, true);
  }, [userData]);

  const handleLoadMore = useCallback(() => {
    if (onEndReachedCalledDuringMomentum.current) {
      return;
    }
    if (seachQuery.trim()) {
      return;
    }
    if (isLoading || isRefreshing || isLodingMore || !hasMoreUsres) {
      return;
    }
    if (userData.length < PAGE_LIMT) {
      return;
    }
    onEndReachedCalledDuringMomentum.current = true;
    getUsersList(page + 1);
  }, [
    hasMoreUsres,
    isLoading,
    isLodingMore,
    isRefreshing,
    page,
    seachQuery,
    userData,
  ]);

  const onMomentumScrollBegin = useCallback(() => {
    onEndReachedCalledDuringMomentum.current = false;
  }, []);

  const keyExtractor = useCallback((item: User) => String(item.id), []);

  const renderItem: ListRenderItem<User> = useCallback(
    ({item}) => <UserListCard user={item} onPress={onUserPress} />,
    [onUserPress],
  );

  const listFooter = useMemo(() => {
    if (isLodingMore) {
      return (
        <View style={styles.paginationBox}>
          <ActivityIndicator size="small" color={COLORS.bg1} />
          <Text style={styles.paginationText}>Loading more usres...</Text>
        </View>
      );
    }

    if (hasMoreUsres && userData.length >= PAGE_LIMT && !seachQuery.trim()) {
      return (
        <View style={styles.paginationBox}>
          <Text style={styles.paginationHint}>
            Scroll down to load more users
          </Text>
        </View>
      );
    }

    return null;
  }, [hasMoreUsres, isLodingMore, seachQuery, userData.length]);

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        colors={[COLORS.bg1]}
        tintColor={COLORS.bg1}
      />
    ),
    [handleRefresh, isRefreshing],
  );

  return (
    <ScreenWrapper isTabScreen disableScroll statusBarColor={COLORS.bg1}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Suffescom</Text>
          <Text style={styles.headerSub}>User List App</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>
              Total Users: {userData.length}
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={onResetPress}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>
          <SearchInput
            light
            value={seachQuery}
            onChangeText={handleSeachChange}
            placeholder="Seach user by name"
          />
        </View>

        {isLoading && userData.length === 0 ? (
          <View style={styles.loaderBox}>
            <ActivityIndicator size="large" color={COLORS.bg1} />
            <Text style={styles.loaderText}>Loading usres...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredUsres}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={Platform.OS === 'android'}
            maxToRenderPerBatch={5}
            windowSize={7}
            initialNumToRender={5}
            updateCellsBatchingPeriod={100}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No user founds</Text>
            }
            ListFooterComponent={listFooter}
            refreshControl={refreshControl}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.bg2,
  },
  header: {
    backgroundColor: COLORS.bg1,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerSub: {
    fontSize: FONT_SIZE.md,
    color: COLORS.secondary,
    marginTop: 2,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  totalText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.white,
    opacity: 0.85,
  },
  resetBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: 8,
  },
  resetText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.bg1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  loaderBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  loaderText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.darkGray,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
  paginationBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
  },
  paginationText: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZE.md,
    color: COLORS.bg1,
    fontWeight: '500',
  },
  paginationHint: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
});
