import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ChatMessage as ChatMessageType } from '../types/agent';

interface ChatMessageProps {
  message: ChatMessageType;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  if (message.isLoading) {
    // Handled by TypingIndicator; skip rendering
    return null;
  }

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowAgent]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      )}

      <View style={styles.bubbleWrapper}>
        <View
          style={[
            styles.bubble,
            isUser ? styles.bubbleUser : styles.bubbleAgent,
            message.isError && styles.bubbleError,
          ]}
        >
          <Text
            style={[
              styles.text,
              isUser ? styles.textUser : styles.textAgent,
              message.isError && styles.textError,
            ]}
          >
            {message.text}
          </Text>
        </View>
        <Text style={[styles.timestamp, isUser && styles.timestampRight]}>
          {formatTime(message.timestamp)}
          {message.isError && '  ⚠ Error'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 14,
    paddingHorizontal: 16,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowAgent: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0070D2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 18,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  bubbleWrapper: {
    maxWidth: '72%',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  bubbleUser: {
    backgroundColor: '#0070D2',
    borderBottomRightRadius: 4,
  },
  bubbleAgent: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bubbleError: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
  },
  textUser: {
    color: '#FFFFFF',
  },
  textAgent: {
    color: '#1E293B',
  },
  textError: {
    color: '#DC2626',
  },
  timestamp: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  timestampRight: {
    textAlign: 'right',
  },
});