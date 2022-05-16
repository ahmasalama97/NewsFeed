import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
  AsyncStorage,
} from "react-native";
import { RadioButton } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { LanguageConsumer, LanguageProvider } from "../LanguageContext";

const SettingsScreen = () => {
  const colorScheme = useColorScheme();
  const refRBSheet = useRef();

  const [checked, setChecked] = useState("");

  const handleLanguage = useCallback((e) => {
    setChecked(e);
    AsyncStorage.setItem("language", e);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("language").then((result) => {
      setChecked(result);
    });
  }, []);

  return (
    <LanguageProvider>
      <LanguageConsumer>
        {({ language, lang }) => (
          <SafeAreaView
            style={[
              styles.container,
              { backgroundColor: colorScheme === "dark" ? "#18191a" : "#fff" },
            ]}
          >
            <View style={styles.header} flexDirection="row">
              <Entypo
                style={styles.headericon}
                name="newsletter"
                size={25}
                color={colorScheme === "dark" ? "#fff" : "#000"}
              />
              {language === "english" ? (
                <Text
                  style={[
                    styles.headerText,
                    { color: colorScheme === "dark" ? "#fff" : "#000" },
                  ]}
                >
                  {lang.settings_header}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.headerText,
                    { color: colorScheme === "dark" ? "#fff" : "#000" },
                  ]}
                >
                  {lang.fr_settings_header}
                </Text>
              )}
            </View>
            <View style={styles.menuwrapper}>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <View style={styles.menuitem}>
                  <FontAwesome
                    name="language"
                    size={22}
                    color={colorScheme === "dark" ? "#fff" : "#000"}
                  />
                  {language === "english" ? (
                    <Text
                      style={[
                        styles.menuitemtext,
                        {
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        },
                      ]}
                    >
                      {lang.changeLang}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.menuitemtext,
                        {
                          color: colorScheme === "dark" ? "#fff" : "#000",
                        },
                      ]}
                    >
                      {lang.fr_changeLang}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000",
              }}
            >
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                  wrapper: {
                    ...StyleSheet.absoluteFillObject,
                    zIndex: 1000000,
                    backgroundColor: "rgba(0,0,0,0.70)",
                  },
                  draggableIcon: {
                    backgroundColor: "#A9A9A9",
                  },
                }}
              >
                <View>
                  {language === "english" ? (
                    <Text
                      style={{
                        padding: 10,
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {lang.changeLang}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        padding: 10,
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {lang.fr_changeLang}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    width: "90%",
                    backgroundColor: checked === "english" ? "#000" : "#f8f8f8",
                    borderRadius: 15,
                    padding: 10,
                    margin: 10,
                  }}
                >
                  <View style={{ alignSelf: "center" }}>
                    {language === "english" ? (
                      <Text
                        style={{
                          fontSize: 18,
                          color: checked === "english" ? "#fff" : "#000",
                        }}
                      >
                        {lang.english}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 18,
                          color: checked === "english" ? "#fff" : "#000",
                        }}
                      >
                        {lang.fr_english}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                    }}
                  >
                    <RadioButton
                      color="#fff"
                      value="english"
                      status={checked === "english" ? "checked" : "unchecked"}
                      onPress={() => {
                        handleLanguage("english");
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    width: "90%",
                    backgroundColor: checked === "french" ? "#000" : "#f8f8f8",
                    borderRadius: 15,
                    padding: 10,
                  }}
                >
                  <View style={{ alignSelf: "center" }}>
                    {language === "english" ? (
                      <Text
                        style={{
                          fontSize: 18,
                          color: checked === "french" ? "#fff" : "#000",
                        }}
                      >
                        French
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 18,
                          color: checked === "french" ? "#fff" : "#000",
                        }}
                      >
                        Français
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                    }}
                  >
                    <RadioButton
                      color="#fff"
                      value="french"
                      status={checked === "french" ? "checked" : "unchecked"}
                      onPress={() => {
                        handleLanguage("french");
                      }}
                    />
                  </View>
                </View>
              </RBSheet>
            </View>
          </SafeAreaView>
        )}
      </LanguageConsumer>
    </LanguageProvider>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: "10%",
  },
  headericon: {
    fontWeight: "bold",
    paddingTop: 25,
    left: 30,
  },
  headerText: {
    flex: 1,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 25,
    textAlign: "center",
  },
  orderstitleicon: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 8,
    textAlign: "left",
  },
  orderstitleicon2: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 20,
    textAlign: "left",
  },
  applyPromoCode: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 32,
  },
  settings: {
    alignItems: "flex-end",
    padding: 20,
    right: 10,
    marginTop: 10,
  },
  settings2: {
    alignItems: "flex-end",
    padding: 20,
    right: -10,
    marginTop: 10,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  Title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  Caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuwrapper: {
    flex: 1,
    marginTop: 14,
  },
  menuitem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuitemtext: {
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 25,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
