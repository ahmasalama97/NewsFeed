import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  useColorScheme,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useInfiniteQuery } from "react-query";
import SearchBar from "react-native-platform-searchbar";
import axios from "axios";
import {
  LanguageConsumer,
  LanguageContext,
  LanguageProvider,
} from "../LanguageContext";
import { useFocusEffect } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [q, setQ] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const fetchNews = async () => {
    return await axios.get(
      `https://newsapi.org/v2/everything?q=${
        !q ? "apple" : q
      }&from=2022-05-13&to=2022-05-13&sortBy=popularity&apiKey=e0256a36f3774f78b6ea4aabd698348b`
    );
  };

  const { isLoading, data, isSuccess, refetch } = useInfiniteQuery(
    ["fetchNews", q],
    fetchNews,
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  const [isScreenFocused, setIsScreenFocused] = useState(false);
  useFocusEffect(() => {
    setIsScreenFocused(true); // when i focus the screen
    return () => setIsScreenFocused(false); // when i quit the screen
  });

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
                  {lang.home_header}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.headerText,
                    { color: colorScheme === "dark" ? "#fff" : "#000" },
                  ]}
                >
                  {lang.fr_home_header}
                </Text>
              )}
            </View>

            <View style={{ padding: 20 }}>
              <SearchBar
                returnKeyType="search"
                value={q}
                onChangeText={(e) => setQ(e)}
                placeholder={
                  language === "english" ? lang.search : lang.fr_search
                }
                theme={colorScheme === "dark" ? "dark" : "light"}
                platform="ios"
                cancelText={"Cancel"}
                cancelTextStyle={{ paddingRight: 10 }}
              />
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    onRefresh(), refetch();
                  }}
                />
              }
            >
              {isLoading && <ActivityIndicator size="large" />}
              {isSuccess &&
                data?.pages?.map((group, i) => {
                  return (
                    <View
                      style={{
                        backgroundColor:
                          colorScheme === "dark" ? "#18191a" : "#fff",
                      }}
                    >
                      {group?.data?.articles?.map((article) => (
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Article", {
                                image: article.urlToImage,
                                title: article.title,
                                author: article.author,
                                source: article.source.name,
                                publishedAt: article.publishedAt,
                                description: article.description,
                                content: article.content,
                              })
                            }
                            activeOpacity={1}
                            style={{ padding: 20 }}
                          >
                            <View
                              style={[
                                styles.cardInfo,
                                {
                                  backgroundColor:
                                    colorScheme === "dark" ? "#242526" : "#fff",
                                },
                              ]}
                            >
                              <Image
                                source={
                                  article.urlToImage
                                    ? {
                                        uri: article.urlToImage,
                                      }
                                    : require("../assets/icon.png")
                                }
                                style={{
                                  borderRadius: 15,
                                  width: 100,
                                  height: 100,
                                  marginBottom: 10,
                                  paddingLeft: 20,
                                }}
                              />
                              <Text
                                style={[
                                  styles.cardTitle,
                                  {
                                    color:
                                      colorScheme === "dark" ? "#fff" : "#000",
                                  },
                                ]}
                              >
                                {article.title}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  );
                })}
            </ScrollView>
          </SafeAreaView>
        )}
      </LanguageConsumer>
    </LanguageProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: "10%",
  },
  cardInfo: {
    flex: 2,
    width: "100%",
    padding: 20,
    borderColor: "#ccc",
    borderRadius: 15,
    elevation: 5,
    marginBottom: 10,
    borderWidth: 1,
    flexDirection: "row",
  },
  cardTitle: {
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
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
});
export default HomeScreen;
