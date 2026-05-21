// import React, { useRef, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// interface ChatInputProps {
//   onSend: (text: string) => void;
//   disabled?: boolean;
// }

// export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
//   const [text, setText] = useState('');
//   const inputRef = useRef<TextInput>(null);

//   const handleSend = () => {
//     const trimmed = text.trim();
//     if (!trimmed || disabled) return;
//     onSend(trimmed);
//     setText('');
//   };

//   const canSend = text.trim().length > 0 && !disabled;

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputRow}>
//         <TextInput
//           ref={inputRef}
//           style={styles.input}
//           placeholder="Message the agent..."
//           placeholderTextColor="#94A3B8"
//           value={text}
//           onChangeText={setText}
//           multiline
//           maxLength={2000}
//           editable={!disabled}
//           returnKeyType="default"
//         />
//         <TouchableOpacity
//           style={[styles.sendBtn, canSend && styles.sendBtnActive]}
//           onPress={handleSend}
//           disabled={!canSend}
//           activeOpacity={0.7}
//         >
//           <Text style={styles.sendIcon}>↑</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#E2E8F0',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     paddingBottom: 24, // safe area buffer
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 22,
//     borderWidth: 1.5,
//     borderColor: '#E2E8F0',
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//   },
//   input: {
//     flex: 1,
//     fontSize: 15,
//     color: '#1E293B',
//     maxHeight: 110,
//     lineHeight: 21,
//     paddingTop: 2,
//     paddingBottom: 2,
//   },
//   sendBtn: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: '#E2E8F0',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 8,
//     marginBottom: 1,
//   },
//   sendBtnActive: {
//     backgroundColor: '#0070D2',
//   },
//   sendIcon: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '700',
//     lineHeight: 18,
//   },
// });
import React, { useRef, useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [text, setText] = useState("");

  const inputRef = useRef<TextInput>(null);

  const isDark =
    useColorScheme() === "dark";

  const handleSend = () => {
    const trimmed = text.trim();

    if (!trimmed || disabled) {
      return;
    }

    onSend(trimmed);

    setText("");
  };

  const canSend =
    text.trim().length > 0 &&
    !disabled;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            isDark
              ? "#0F172A"
              : "#FFFFFF",

          borderTopColor:
            isDark
              ? "#1E293B"
              : "#E2E8F0",
        },
      ]}
    >
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor:
              isDark
                ? "#1E293B"
                : "#F8FAFC",

            borderColor:
              isDark
                ? "#334155"
                : "#E2E8F0",
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              color:
                isDark
                  ? "#FFFFFF"
                  : "#1E293B",
            },
          ]}
          placeholder="Message the agent..."
          placeholderTextColor={
            isDark
              ? "#CBD5E1"
              : "#94A3B8"
          }
          keyboardAppearance={
            isDark
              ? "dark"
              : "light"
          }
          value={text}
          onChangeText={setText}
          multiline
          maxLength={2000}
          editable={!disabled}
          returnKeyType="default"
        />

        <TouchableOpacity
          style={[
            styles.sendBtn,
            {
              backgroundColor:
                canSend
                  ? "#0070D2"
                  : isDark
                    ? "#334155"
                    : "#E2E8F0",
            },
          ]}
          onPress={handleSend}
          disabled={!canSend}
          activeOpacity={0.7}
        >
          <Text style={styles.sendIcon}>
            ↑
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,

    paddingHorizontal: 16,

    paddingVertical: 10,

    paddingBottom: 24,
  },

  inputRow: {
    flexDirection: "row",

    alignItems: "flex-end",

    borderRadius: 22,

    borderWidth: 1.5,

    paddingHorizontal: 14,

    paddingVertical: 8,
  },

  input: {
    flex: 1,

    fontSize: 15,

    maxHeight: 110,

    lineHeight: 21,

    paddingTop: 2,

    paddingBottom: 2,
  },

  sendBtn: {
    width: 34,

    height: 34,

    borderRadius: 17,

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 1,
  },

  sendIcon: {
    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "700",

    lineHeight: 18,
  },
});