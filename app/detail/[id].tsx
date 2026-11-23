import { useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";

import { editDiary } from "../../src/features/diary/diarySlice";

import { COLORS, RADIUS, SPACE } from "../../src/styles/tokens";

const MOODS = ["😊", "🎯", "😌", "🥰"];

export default function EditScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === Number(id)),
  );

  const [title, setTitle] = useState(entry?.title ?? "");

  const [body, setBody] = useState(entry?.body ?? "");

  const [mood, setMood] = useState(entry?.mood ?? "😊");

  if (!entry) {
    return <Text style={{ padding: 16 }}>Diary tidak ditemukan.</Text>;
  }

  const saveChanges = () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Validasi", "Judul dan isi wajib diisi");
      return;
    }

    if (title.trim().length < 3) {
      Alert.alert("Validasi", "Judul diary minimal 3 karakter");
      return;
    }

    dispatch(
      editDiary({
        id: entry.id,
        title: title.trim(),
        body: body.trim(),
        mood,
      }),
    );

    router.replace({
      pathname: "/detail/[id]",
      params: {
        id: String(entry.id),
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Diary</Text>

      <Text style={styles.label}>Judul Diary</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul diary"
        style={styles.input}
      />

      <Text style={styles.label}>Isi Diary</Text>

      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan harimu..."
        multiline
        style={[styles.input, styles.bodyInput]}
      />

      <Text style={styles.label}>Pilih Mood</Text>

      <View style={styles.moodRow}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setMood(item)}
            style={[styles.moodButton, mood === item && styles.selectedMood]}
          >
            <Text style={styles.mood}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={saveChanges} style={styles.saveButton}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
  },

  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: 12,
    backgroundColor: COLORS.surface,
  },

  bodyInput: {
    minHeight: 140,
    textAlignVertical: "top",
  },

  moodRow: {
    flexDirection: "row",
    gap: SPACE.s,
  },

  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },

  selectedMood: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },

  mood: {
    fontSize: 28,
  },

  saveButton: {
    padding: 14,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    marginTop: SPACE.m,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
