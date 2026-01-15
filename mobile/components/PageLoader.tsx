import { View, Text, ActivityIndicator } from 'react-native'
import { styles } from '../assets/styles/home.styles'
import { COLORS } from '../constants/colors'
import React from 'react'

const PageLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
    )
}

export default PageLoader