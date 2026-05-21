// import React, { useState } from 'react';
// import {
//   FlatList,
//   Modal,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { Agent } from '../types/agent';

// interface AgentDropdownProps {
//   agents: Agent[];
//   selectedAgent: Agent | null;
//   onSelect: (agent: Agent) => void;
//   disabled?: boolean;
// }

// export default function AgentDropdown({
//   agents,
//   selectedAgent,
//   onSelect,
//   disabled = false,
// }: AgentDropdownProps) {
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState('');

//   const filtered = agents.filter((a) =>
//     a.label.toLowerCase().includes(query.toLowerCase())
//   );

//   const handleSelect = (agent: Agent) => {
//     onSelect(agent);
//     setOpen(false);
//     setQuery('');
//   };

//   return (
//     <View style={styles.wrapper}>
//       <TouchableOpacity
//         style={[styles.trigger, disabled && styles.triggerDisabled]}
//         onPress={() => !disabled && setOpen(true)}
//         activeOpacity={0.75}
//       >
//         <View style={styles.triggerInner}>
//           <Text style={selectedAgent ? styles.triggerText : styles.placeholder}>
//             {selectedAgent ? selectedAgent.label : 'Select an Agent'}
//           </Text>
//           <Text style={styles.chevron}>{open ? '▲' : '▼'}</Text>
//         </View>
//       </TouchableOpacity>

//       <Modal
//         visible={open}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setOpen(false)}
//       >
//         <TouchableOpacity
//           style={styles.backdrop}
//           activeOpacity={1}
//           onPress={() => setOpen(false)}
//         />
//         <View style={styles.sheet}>
//           <View style={styles.sheetHandle} />
//           <Text style={styles.sheetTitle}>Choose an Agent</Text>

//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search agents..."
//             placeholderTextColor="#94A3B8"
//             value={query}
//             onChangeText={setQuery}
//             autoFocus
//           />

//           {filtered.length === 0 ? (
//             <View style={styles.emptyState}>
//               <Text style={styles.emptyText}>No agents match your search.</Text>
//             </View>
//           ) : (
//             <FlatList
//               data={filtered}
//               keyExtractor={(item) => item.id}
//               contentContainerStyle={{ paddingBottom: 32 }}
//               renderItem={({ item }) => {
//                 const isSelected = selectedAgent?.id === item.id;
//                 return (
//                   <TouchableOpacity
//                     style={[styles.option, isSelected && styles.optionSelected]}
//                     onPress={() => handleSelect(item)}
//                     activeOpacity={0.7}
//                   >
//                     <View style={styles.optionLeft}>
//                       <View
//                         style={[
//                           styles.agentAvatar,
//                           isSelected && styles.agentAvatarSelected,
//                         ]}
//                       >
//                         <Text style={styles.agentAvatarText}>
//                           {item.label.charAt(0).toUpperCase()}
//                         </Text>
//                       </View>
//                       <View style={styles.optionTextGroup}>
//                         <Text
//                           style={[
//                             styles.optionLabel,
//                             isSelected && styles.optionLabelSelected,
//                           ]}
//                         >
//                           {item.label}
//                         </Text>
//                         <Text style={styles.optionSub}>{item.rawAgentType}</Text>
//                       </View>
//                     </View>
//                     {isSelected && (
//                       <Text style={styles.checkmark}>✓</Text>
//                     )}
//                   </TouchableOpacity>
//                 );
//               }}
//             />
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     marginBottom: 16,
//   },
//   trigger: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 14,
//     borderWidth: 1.5,
//     borderColor: '#E2E8F0',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     shadowColor: '#0070D2',
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   triggerDisabled: {
//     opacity: 0.5,
//   },
//   triggerInner: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   triggerText: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   placeholder: {
//     fontSize: 15,
//     color: '#94A3B8',
//   },
//   chevron: {
//     fontSize: 11,
//     color: '#94A3B8',
//   },
//   backdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.45)',
//   },
//   sheet: {
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingHorizontal: 20,
//     paddingTop: 12,
//     maxHeight: '75%',
//   },
//   sheetHandle: {
//     width: 40,
//     height: 4,
//     backgroundColor: '#E2E8F0',
//     borderRadius: 99,
//     alignSelf: 'center',
//     marginBottom: 16,
//   },
//   sheetTitle: {
//     fontSize: 17,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 14,
//   },
//   searchInput: {
//     backgroundColor: '#F8FAFC',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     fontSize: 14,
//     color: '#1E293B',
//     marginBottom: 12,
//   },
//   emptyState: {
//     paddingVertical: 32,
//     alignItems: 'center',
//   },
//   emptyText: {
//     color: '#94A3B8',
//     fontSize: 14,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 12,
//     marginBottom: 6,
//   },
//   optionSelected: {
//     backgroundColor: '#EFF6FF',
//   },
//   optionLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   agentAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#E2E8F0',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   agentAvatarSelected: {
//     backgroundColor: '#0070D2',
//   },
//   agentAvatarText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#FFFFFF',
//   },
//   optionTextGroup: {
//     flex: 1,
//   },
//   optionLabel: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   optionLabelSelected: {
//     color: '#0070D2',
//   },
//   optionSub: {
//     fontSize: 12,
//     color: '#94A3B8',
//     marginTop: 2,
//   },
//   checkmark: {
//     color: '#0070D2',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });

import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Agent } from "../types/agent";

// ─── Theme shape (passed in from parent) ─────────────────────────────────────
export interface DropdownTheme {
  surface: string;
  surfaceRaised: string;
  bg: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentBg: string;
  blue: string;
}

interface AgentDropdownProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onSelect: (agent: Agent) => void;
  disabled?: boolean;
  theme: DropdownTheme; // ← new required prop
}

export default function AgentDropdown({
  agents,
  selectedAgent,
  onSelect,
  disabled = false,
  theme: T,
}: AgentDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = agents.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (agent: Agent) => {
    onSelect(agent);
    setOpen(false);
    setQuery("");
  };

  return (
    <View style={styles.wrapper}>
      {/* ── Trigger ── */}
      <TouchableOpacity
        style={[
          styles.trigger,
          { backgroundColor: T.surface, borderColor: T.border },
          disabled && styles.triggerDisabled,
        ]}
        onPress={() => !disabled && setOpen(true)}
        activeOpacity={0.75}
      >
        <View style={styles.triggerInner}>
          <Text
            style={[
              selectedAgent ? styles.triggerText : styles.placeholder,
              { color: selectedAgent ? T.textPrimary : T.textMuted },
            ]}
          >
            {selectedAgent ? selectedAgent.label : "Select an Agent"}
          </Text>
          <Text style={[styles.chevron, { color: T.textMuted }]}>
            {open ? "▲" : "▼"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* ── Bottom sheet modal ── */}
      <Modal
        visible={open}
        animationType="slide"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        />

        {/* Sheet */}
        <View style={[styles.sheet, { backgroundColor: T.surface }]}>
          <View style={[styles.sheetHandle, { backgroundColor: T.border }]} />

          <Text style={[styles.sheetTitle, { color: T.textPrimary }]}>
            Choose an Agent
          </Text>

          {/* Search */}
          <TextInput
            style={[
              styles.searchInput,
              {
                backgroundColor: T.bg,
                borderColor: T.border,
                color: T.textPrimary,
              },
            ]}
            placeholder="Search agents…"
            placeholderTextColor={T.textMuted}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />

          {/* List */}
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: T.textMuted }]}>
                No agents match your search.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 40 }}
              renderItem={({ item }) => {
                const isSelected = selectedAgent?.id === item.id;
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      isSelected && { backgroundColor: T.accentBg },
                    ]}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.optionLeft}>
                      {/* Avatar */}
                      <View
                        style={[
                          styles.agentAvatar,
                          { backgroundColor: isSelected ? T.blue : T.bg },
                        ]}
                      >
                        <Text
                          style={[
                            styles.agentAvatarText,
                            { color: isSelected ? "#FFFFFF" : T.textSecondary },
                          ]}
                        >
                          {item.label.charAt(0).toUpperCase()}
                        </Text>
                      </View>

                      {/* Text */}
                      <View style={styles.optionTextGroup}>
                        <Text
                          style={[
                            styles.optionLabel,
                            { color: isSelected ? T.accent : T.textPrimary },
                          ]}
                        >
                          {item.label}
                        </Text>
                        <Text
                          style={[styles.optionSub, { color: T.textMuted }]}
                        >
                          {item.rawAgentType}
                        </Text>
                      </View>
                    </View>

                    {isSelected && (
                      <Text style={[styles.checkmark, { color: T.accent }]}>
                        ✓
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 0, // parent controls spacing
  },

  // ── Trigger ────────────────────────────────────────────────────────────────
  trigger: {
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  triggerDisabled: { opacity: 0.5 },
  triggerInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  triggerText: { fontSize: 15, fontWeight: "600" },
  placeholder: { fontSize: 15 },
  chevron: { fontSize: 11 },

  // ── Modal ──────────────────────────────────────────────────────────────────
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    maxHeight: "75%",
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 99,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 14,
  },

  // ── Search ─────────────────────────────────────────────────────────────────
  searchInput: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
  },

  // ── Empty ──────────────────────────────────────────────────────────────────
  emptyState: { paddingVertical: 32, alignItems: "center" },
  emptyText: { fontSize: 14 },

  // ── Options ────────────────────────────────────────────────────────────────
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  agentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  agentAvatarText: { fontSize: 16, fontWeight: "700" },
  optionTextGroup: { flex: 1 },
  optionLabel: { fontSize: 15, fontWeight: "600" },
  optionSub: { fontSize: 12, marginTop: 2 },
  checkmark: { fontWeight: "700", fontSize: 16 },
});
