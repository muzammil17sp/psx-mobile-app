import { useMutation } from '@tanstack/react-query';
import { updateFcmToken } from '../api/auth.api';

/**
 * Hook to update FCM token
 */
export const useFcmTokenUpdate = () => {
  return useMutation({
    mutationFn: (fcmToken: string) => updateFcmToken(fcmToken),
    onError: (error) => {
      console.error('Error updating FCM token:', error);
    },
  });
};


