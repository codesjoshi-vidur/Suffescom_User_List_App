# User List Suffescom

React Native app for Suffescom assignment. Shows users from JSONPlaceholder API with search, pagination and detail screen.

App display name on phone: **User_List_Suffescom**

---

## Features

- Splash screen (3.5 sec)
- Home screen with user list (FlatList)
- API pagination — 5 users per page, load more on scroll
- Search users by name
- Pull to refresh
- Loading and error handling
- User detail screen
- Redux for search query and selected user
- Custom bottom tab bar
- React.memo / useCallback / useMemo for list performance

---

## Tech Stack

- React Native 0.86
- TypeScript
- Redux Toolkit
- React Navigation (native stack + bottom tabs)
- Axios

---

## API

```
GET https://jsonplaceholder.typicode.com/users?_page=1&_limit=5
```

---

## Project Structure

```
src/
├── assets/          images
├── components/      ScreenWrapper, UserListCard, SearchInput, BottomTabBar
├── navigations/     Root, Stack, BottomTab
├── redux/           slice + store
├── screens/         Splash, Home, UserDetail
├── services/        getUserListService (axios)
└── theme/           colors, spacing, fonts
```

---

## Setup & Run

**Requirements:** Node 22+, Android Studio / Xcode, JDK 17

```bash
npm install
```

**Android**

```bash
npm run android
```

**iOS**

```bash
cd ios && pod install && cd ..
npm run ios
```

If metro is not running, open another terminal and run `npm start` first.

---

## Build Release APK

```bash
cd android
./gradlew --stop
./gradlew assembleRelease -x lintVitalAnalyzeRelease
```

APK path:

```
android/app/build/outputs/apk/release/app-release.apk
```

---

## Notes

- Pagination loads next page when you scroll near bottom (after 5 cards)
- Reset button on home clears list and starts from page 1 again (useful for testing)
- User data is fetched from API on screen, not stored in redux

---

## Author

Vidhur Joshi

GitHub: https://github.com/codesjoshi-vidur/Suffescom_User_List_App
