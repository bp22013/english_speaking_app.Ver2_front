/* 管理者のメッセージをSWRで取得するフック */

/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { useAdminSession } from '@/app/context/AdminAuthContext';
import type { AdminMessage } from '@/types/message';

export const useAdminMessages = (): {
    messages: AdminMessage[];
    isLoading: boolean;
    isError: any;
    refetch: () => void;
} => {
    const { user } = useAdminSession();
    const shouldFetch = !!user?.id;

    const { data, error, isLoading, mutate } = useSWR(
        shouldFetch ? `/api/messages/getAdminMessages?senderId=${user?.id}` : null,
        fetcher
    );

    // 🔍 ログポイント②：取得されたデータ
    console.log('🔍 useAdminMessages - data:', data);

    return {
        messages: (data?.messages ?? []) as AdminMessage[],
        isLoading,
        isError: error,
        refetch: mutate,
    };
};
