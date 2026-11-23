import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";

import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";

import {
  clearAllFavorites,
  toggleFavorite,
} from "../../src/features/diary/diarySlice";

import DiaryCard from "../../src/components/DiaryCard";

import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const favoriteEntries = useAppSelector((state) =>
    state.diary.entries.filter((entry) => entry.liked),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite</Text>

      <Text style={styles.counter}>
        {favoriteEntries.length} diary favorite
      </Text>

      {favoriteEntries.length > 0 && (
        <Pressable
          onPress={() => dispatch(clearAllFavorites())}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Hapus Semua Favorit</Text>
        </Pressable>
      )}

      <FlatList
        data={favoriteEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
            onPress={() =>
              router.push({
                pathname: "/detail/[id]",
                params: {
                  id: String(item.id),
                },
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🤍</Text>

            <Text style={styles.emptyTitle}>Belum Ada Diary Favorit</Text>

            <Text style={styles.emptyDescription}>
              Kamu belum menambahkan diary ke daftar favorit. Tekan tombol hati
              pada diary yang ingin disimpan sebagai favorit.
            </Text>

            <Pressable
              style={styles.homeButton}
              onPress={() => router.push("/")}
            >
              <Text style={styles.homeButtonText}>Lihat Semua Diary</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },

  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
  },

  counter: {
    color: COLORS.muted,
    marginBottom: SPACE.m,
  },

  clearButton: {
    backgroundColor: COLORS.danger,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: SPACE.m,
  },

  clearButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SPACE.xl,
    marginTop: 40,
  },

  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACE.m,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.s,
    textAlign: "center",
  },

  emptyDescription: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: SPACE.l,
  },

  homeButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACE.xl,
    paddingVertical: SPACE.m,
    borderRadius: 12,
  },

  homeButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  listContent: {
    paddingBottom: 140,
  },
});
