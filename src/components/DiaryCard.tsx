import { Pressable, StyleSheet, Text, View } from "react-native";

import { COLORS, RADIUS, SPACE, TYPO } from "../styles/tokens";

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  onPress,
  onToggleFavorite,
}: Props) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.main}>
        <View style={styles.moodBox}>
          <Text style={styles.mood}>{mood}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={onToggleFavorite} style={styles.favoriteButton}>
        <Text style={[styles.favorite, liked && styles.favoriteActive]}>
          {liked ? "♥" : "♡"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    marginBottom: SPACE.l,
    overflow: "hidden",
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },

  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.m,
    padding: SPACE.l,
  },

  moodBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryLight,
  },

  mood: {
    fontSize: 34,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },

  date: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    marginBottom: 8,
  },

  preview: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
  },

  favoriteButton: {
    paddingHorizontal: SPACE.l,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "#F8FBFF",
  },

  favorite: {
    fontSize: 30,
    color: "#A3AED0",
  },

  favoriteActive: {
    color: COLORS.danger,
  },
});
