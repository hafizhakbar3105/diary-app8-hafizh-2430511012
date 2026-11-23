import { useState } from "react";

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";

import DiaryCard from "../../src/components/DiaryCard";

import { toggleFavorite } from "../../src/features/diary/diarySlice";

import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";

import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ["Semua", "😊", "🎯", "😌", "🥰"];

export default function HomeScreen() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.diary.entries);

  const totalDiary = useAppSelector((state) => state.diary.entries.length);

  const totalFavorite = useAppSelector(
    (state) => state.diary.entries.filter((entry) => entry.liked).length,
  );

  const [selectedMood, setSelectedMood] = useState("Semua");

  const filteredEntries =
    selectedMood === "Semua"
      ? entries
      : entries.filter((entry) => entry.mood === selectedMood);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.header}>Buku Harian</Text>
        <Text style={styles.subheader}>
          Catat hari-harimu dengan rapi dan menarik
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalDiary}</Text>
            <Text style={styles.statLabel}>Total Diary</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalFavorite}</Text>
            <Text style={styles.statLabel}>Favorite</Text>
          </View>
        </View>
      </View>

      <Text style={styles.filterTitle}>Filter Mood</Text>

      <View style={styles.moodRow}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setSelectedMood(item)}
            style={[
              styles.moodButton,
              selectedMood === item && styles.selectedMood,
            ]}
          >
            <Text
              style={[
                styles.moodText,
                selectedMood === item && styles.selectedMoodText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
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
            <Text style={styles.emptyEmoji}>
              {entries.length === 0 ? "📖" : "🔍"}
            </Text>

            <Text style={styles.emptyTitle}>
              {entries.length === 0
                ? "Belum Ada Diary"
                : "Diary Tidak Ditemukan"}
            </Text>

            <Text style={styles.emptyDescription}>
              {entries.length === 0
                ? "Kamu belum memiliki catatan diary. Yuk, mulai tulis cerita pertamamu!"
                : "Belum ada diary dengan mood yang dipilih. Coba pilih mood lainnya."}
            </Text>

            {entries.length === 0 ? (
              <Pressable
                style={styles.actionButton}
                onPress={() => router.push("/create")}
              >
                <Text style={styles.actionButtonText}>Tambah Diary</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.actionButton}
                onPress={() => setSelectedMood("Semua")}
              >
                <Text style={styles.actionButtonText}>Pilih Mood Lainnya</Text>
              </Pressable>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    backgroundColor: COLORS.background,
  },

  hero: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACE.l,
    marginBottom: SPACE.l,
  },

  header: {
    fontSize: TYPO.h1,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  subheader: {
    fontSize: 14,
    color: "#DBEAFE",
    marginTop: 6,
    marginBottom: SPACE.l,
  },

  statsRow: {
    flexDirection: "row",
    gap: SPACE.m,
  },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: RADIUS.md,
    paddingVertical: SPACE.m,
    paddingHorizontal: SPACE.m,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  statLabel: {
    fontSize: 13,
    color: "#DBEAFE",
    marginTop: 4,
  },

  filterTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },

  moodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.s,
    marginBottom: SPACE.l,
  },

  moodButton: {
    minWidth: 64,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedMood: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  moodText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "600",
  },

  selectedMoodText: {
    color: "#FFFFFF",
  },

  listContent: {
    paddingBottom: 140,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SPACE.xl,
    marginTop: 40,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyEmoji: {
    fontSize: 52,
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

  actionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACE.xl,
    paddingVertical: SPACE.m,
    borderRadius: 14,
  },

  actionButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
