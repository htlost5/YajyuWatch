import React, { useEffect, useState} from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Font from 'expo-font';
import Watch from "@/components/watch/watch";

export default function Index() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'digital': require('../assets/fonts/Technology.ttf'),
    }).then(() => setLoaded(true));
  }, []);

  return (
    <Watch />
  );
}