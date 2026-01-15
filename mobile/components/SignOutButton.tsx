import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../assets/styles/home.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/colors'
import { router } from 'expo-router'

export const SignOutButton = () => {
    // Use `useClerk()` to access the `signOut()` function
    const { signOut } = useClerk();

    const handleLogout = async () => {
        try {
            await signOut()
            router.replace('/sign-in')
        } catch (error) {
            console.error('Sign out error:', error)
            Alert.alert('Error', 'Failed to sign out. Please try again.')
        }
    }

    const handleSignOut = async (): Promise<void> => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Sign Out", style: "destructive", onPress: handleLogout }
            ]
        )
    }

    return (
        <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
        </TouchableOpacity>
    )
}