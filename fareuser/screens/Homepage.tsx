import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Pressable, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const Homepage = () => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null); // Set initial type
  const [destination, setDestination] = useState(""); // Destination as string
  const [fare, setFare] = useState<number | null>(null); // Fare as number

  const gensanRegion = {
    latitude: 6.1164,
    longitude: 125.1716,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  };

  const calculateFare = async () => {
    if (!currentLocation || !destination) {
      Alert.alert("Error", "Please enter all required fields!");
      return;
    }

    try {
      const response = await axios.post("https://your-backend-url/fare", {
        currentLocation,
        destination,
      });
      setFare(response.data.fare);
    } catch (error) {
      console.error("Error calculating fare:", error);
      Alert.alert("Error", "Failed to calculate fare!");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={gensanRegion}
        showsUserLocation={true}
        onUserLocationChange={(event) => {
          const coords = event.nativeEvent.coordinate;
          if (coords) {
            setCurrentLocation({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
          }
        }}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Your Location" />
        )}
      </MapView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your destination"
          value={destination}
          onChangeText={setDestination}
        />
        <Pressable style={styles.button} onPress={calculateFare}>
          <Text style={styles.buttonText}>Calculate Fare</Text>
        </Pressable>
      </View>

      {fare !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Calculated Fare: ₱{fare.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  inputContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1f42bb",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  resultContainer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  resultText: { fontWeight: "bold", fontSize: 16 },
});

export default Homepage;
