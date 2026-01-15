import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
// import { API_URL } from '../constants/apiUrl';
import { API_URL } from "../constants/api";


// const API_BASE_URL = 'https://reactnativenodejs.onrender.com/api'

export const useTransactionsHook = (userId: string) => {
    const [transactions, setTransactions] = useState([]);

    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expense: 0,
    });

    const [loading, setLoading] = useState(true);

    const fetchTransactions = useCallback(async () => {
        try {
            if (!userId) {
                console.warn("User ID is missing");
                return;
            }
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const fetchSummaryTransactions = useCallback(async () => {
        try {
            if (!userId) {
                console.warn("User ID is missing");
                return;
            }
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
            const data = await response.json();
            setSummary(data);
        } catch (error) {
            console.error("Error fetching summary transactions:", error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const deleteTransactions = async (id: Int32) => {
        try {
            if (!userId) {
                console.warn("User ID is missing");
                return;
            }
            const response = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
            if (response.ok) {
                loadData();
            } else {
                throw new Error('Failed to delete transaction');
            }
            Alert.alert("Success", "Transaction deleted successfully");
        } catch (error) {
            console.error("Error delete transactions:", error);
            Alert.alert("Error", error instanceof Error ? error.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    const updateTransactions = async (id: Int32, updatedTransaction: any) => {
        try {
            if (!userId) {
                console.warn("User ID is missing");
                return;
            }
            const response = await fetch(`${API_URL}/transactions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTransaction),
            });
            if (!response.ok) {
                throw new Error('Failed to update transaction');
            }
            loadData();
        } catch (error) {
            console.error("Error delete transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            await Promise.all([fetchTransactions(), fetchSummaryTransactions()]);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    }, [fetchTransactions, fetchSummaryTransactions, userId]);

    return { transactions, summary, loading, loadData, deleteTransactions, updateTransactions };
}