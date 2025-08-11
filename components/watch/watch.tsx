import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Font from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Watch() {
    const [loaded, setLoaded] = useState(false);
    const [orientation, setOrientation] = useState<ScreenOrientation.Orientation | null>(null);
    const [colonColor, setColonColor] = useState('transparent');
    const [time, setTime] = useState({
        year: '',
        month: '',
        date: '',
        day: '',
        hours: '',
        minutes: '',
        seconds: '',
    });
    const [isReady, setIsReady] = useState(false);


    useEffect(() => {
        const subscription = ScreenOrientation.addOrientationChangeListener(e => {
            setOrientation(e.orientationInfo.orientation);
        });

        ScreenOrientation.getOrientationAsync().then(o => setOrientation(o));

        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription);
        };
    }, []);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const now = new Date();
            const day_list = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
            setTime({
                year: String(now.getFullYear()),
                month: String(now.getMonth() + 1).padStart(2, '0'),
                date: String(now.getDate()).padStart(2, '0'),
                day: day_list[now.getDay()],
                hours: String(now.getHours()).padStart(2, '0'),
                minutes: String(now.getMinutes()).padStart(2, '0'),
                seconds: String(now.getSeconds()).padStart(2, '0'),
            });
        }, 1000);

        const colonInterval = setInterval(() => {
            setColonColor(prevColor => (prevColor === 'transparent' ? 'black' : 'transparent'));
        }, 500);

        return () => {
            clearInterval(timeInterval);
            clearInterval(colonInterval);
        };
    }, []);

    useEffect(() => {
        Font.loadAsync({
            'digital': require('../../assets/fonts/Technology.ttf'),
        }).then(() => setLoaded(true));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 980);

        return () => clearTimeout(timer);
    }, []);

    if (!isReady) {
        return null;
    }

    const isLandscape = 
        orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;

    const dateStr = `${time.year}.${time.month}.${time.date}`;
    
    if(!isLandscape) {
        return(
            <View style={styles.container}>
                <View style={styles.portlait}>
                    <View>
                        <Text style={styles.date}>{dateStr}</Text>
                        <Text style={styles.day}>{time.day}&kinai</Text>
                    </View>
                    <Text style={styles.time}>
                        {time.hours}
                        <Text style={{ color: colonColor }}>:</Text>
                        {time.minutes}
                        <Text style={{ color: colonColor }}>:</Text>
                        {time.seconds}
                    </Text>
                </View>
            </View>
        );
    } else {
        return(
            <View style={styles.container}>
                <View style={styles.landscape}>
                    <View>
                        <Text style={styles.date}>{dateStr}</Text>
                        <Text style={styles.day}>{time.day}&kinai</Text>
                    </View>
                    <Text style={styles.time}>
                        {time.hours}
                        <Text style={{ color: colonColor }}>:</Text>
                        {time.minutes}
                        <Text style={{ color: colonColor }}>:</Text>
                        {time.seconds}
                    </Text>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
  },
  portlait: {
    flexDirection: 'column'
  },
  landscape: {
    flexDirection: 'row'
  },
  date: {
    fontFamily: 'digital',
    fontSize: 50,
    marginRight: 15
  },
  day: {
    fontFamily: '',
    fontSize: 25,
    marginRight: 15,
  },
  time: {
    fontFamily: 'digital',
    fontSize: 100
  }
})