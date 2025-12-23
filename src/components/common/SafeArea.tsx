import { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SafeScreen({ children }: { children: ReactNode }) {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
}
