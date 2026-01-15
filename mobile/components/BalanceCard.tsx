import { View, Text } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

type BalanceCardProps = {
    summary: {
        balance: number | 0;
        income: number | 0;
        expense: number | 0;
    };
};

export const BalanceCard = ({ summary }: BalanceCardProps) => {
    return (
        <View style={styles.balanceCard}>
            <Text style={styles.balanceTitle}>Total Balance</Text>
            <Text style={styles.balanceAmount}>${parseFloat(String(summary.balance)).toFixed(2)}</Text>
            <View style={styles.balanceStats}>
                <View style={styles.balanceStatItem}>
                    <Text style={styles.balanceStatLabel}>Income</Text>
                    <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
                        +${parseFloat(String(summary.income)).toFixed(2)}
                    </Text>
                </View>
                <View style={[styles.balanceStatItem, styles.statDivider]} />
                <View style={styles.balanceStatItem}>
                    <Text style={styles.balanceStatLabel}>Expenses</Text>
                    <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
                        -${Math.abs(parseFloat(String(summary.expense))).toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
};