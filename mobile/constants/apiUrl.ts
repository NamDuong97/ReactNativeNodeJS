import Constants from 'expo-constants';

const getApiUrl = () => {
    const debuggerHost = Constants.expoConfig?.hostUri;
    if (debuggerHost) {
        const host = debuggerHost.split(':')[0];
        return `http://${host}:5001/api`; // Port backend
    }
    return 'http://192.168.2.134:5001/api'; // Thay IP thực
};

export const API_URL = getApiUrl();

// Khi sử dụng expo go trên thiết bị thật, ta cần lấy IP của máy chạy backend để kết nối đúng.
// Khi sử dụng trình giả lập, ta có thể sử dụng localhost

// ❌ SAI - không hoạt động trên thiết bị
// const API_URL = 'http://localhost:5001';

// ✅ ĐÚNG
// Android Emulator
// const API_URL = 'http://10.0.2.2:5001';

// iOS Simulator
// const API_URL = 'http://localhost:5001';

// Thiết bị thật - dùng IP máy tính
// const API_URL = 'http://192.168.1.100:5001';