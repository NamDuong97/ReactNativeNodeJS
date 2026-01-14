import { SignOutButton } from '@/components/SignOutButton'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { useTransactionsHook } from '../../hooks/userTransactions'
import { Text, View } from 'react-native'
import { useEffect } from 'react'

export default function Page() {
    const { user } = useUser()
    const { transactions, summary, loading, loadData, deleteTransactions, updateTransactions } = useTransactionsHook(user?.id || '');

    useEffect(() => {
        loadData();
    }, [user]);

    console.log("Transactions:", transactions);
    console.log("Summary:", summary);
    console.log("User:", user?.id);
    return (
        <View>
            <SignedIn>
                <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
                <SignOutButton />
            </SignedIn>
            <SignedOut>
                <Link href="/(auth)/sign-in">
                    <Text>Sign in</Text>
                </Link>
                <Link href="/(auth)/sign-up">
                    <Text>Sign up</Text>
                </Link>
            </SignedOut>
        </View>
    )
}