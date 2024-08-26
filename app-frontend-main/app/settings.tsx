import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

import { useRouter } from "expo-router";

export default function SettingsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <TouchableOpacity
                style={styles.settingsCard}
                onPress={() => alert("In Progress")}
            >
                <Text>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.settingsCard}
                onPress={() => router.push("/history")}
            >
                <Text>History</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.settingsCard}
                onPress={() => alert("In Progress")}
            >
                <Text>Account Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.googleSignInButton}
                onPress={() => alert("Sign in with Google pressed")}
            >
                <Image
                    source={require("../assets/sign-in-w-google.png")}
                    style={styles.googleSignInImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    settingsCard: {
        maxHeight: 150,
        width: "100%",
        borderWidth: 2,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    googleSignInButton: {
        width: "100%",
        borderWidth: 2,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    googleSignInImage: {
        width: "100%",
        height: 40, // TODO: adjust if this looks shite
    },
});
