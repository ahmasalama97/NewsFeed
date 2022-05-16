import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const Article = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const { image } = route.params;
  const { title } = route.params;
  const { author } = route.params;
  const { source } = route.params;
  const { publishedAt } = route.params;
  const { description } = route.params;
  const { content } = route.params;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#18191a" : "#fff" },
      ]}
    >
      <View style={styles.header} flexDirection="row">
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Entypo
            style={styles.headericon}
            name="chevron-left"
            size={25}
            color={colorScheme === "dark" ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerText,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
        >
          {title}
        </Text>
      </View>
      <ScrollView>
        <Image
          source={
            image
              ? {
                  uri: image,
                }
              : require("../assets/icon.png")
          }
          style={{
            borderRadius: 15,
            width: 150,
            height: 150,
            marginBottom: 10,
            paddingLeft: 20,
            alignSelf: "center",
            justifyContent: "center",
          }}
        />
        <View style={styles.cardauthor}>
          <Text
            style={{
              color: colorScheme === "dark" ? "#fff" : "#000",
            }}
          >
            Author:{" "}
          </Text>
          <Text
            style={{
              color: colorScheme === "dark" ? "#c5c6d0" : "#A9A9A9",
            }}
          >
            {author}
          </Text>
        </View>
        <View style={styles.cardsource}>
          <Text
            style={{
              color: colorScheme === "dark" ? "#fff" : "#000",
            }}
          >
            Source:{" "}
          </Text>
          <Text
            style={{
              color: colorScheme === "dark" ? "#c5c6d0" : "#A9A9A9",
            }}
          >
            {source}
          </Text>
        </View>
        <View style={styles.cardpublish}>
          <Text
            style={{
              color: colorScheme === "dark" ? "#fff" : "#000",
            }}
          >
            Published At:{" "}
          </Text>
          <Text
            style={{
              color: colorScheme === "dark" ? "#c5c6d0" : "#A9A9A9",
            }}
          >
            {publishedAt}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.articleSubHeader,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
          >
            Description
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.carddescription,
              {
                color: colorScheme === "dark" ? "#fff" : "#000",
              },
            ]}
          >
            {description}
          </Text>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              borderBottomWidth: 1,
              borderColor: "#A9A9A9",
              marginBottom: 5,
            }}
          ></View>
          <Text
            style={[
              styles.cardContent,
              {
                color: colorScheme === "dark" ? "#fff" : "#000",
              },
            ]}
          >
            {content}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Article;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: "10%",
  },
  headerText: {
    flex: 1,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 35,
    paddingBottom: 15,
    paddingTop: 25,
    textAlign: "center",
  },
  headericon: {
    fontWeight: "bold",
    paddingTop: 25,
    paddingLeft: 20,
  },
  articleSubHeader: {
    padding: 30,
    fontSize: 20,
  },
  cardauthor: {
    alignSelf: "center",
    flexDirection: "row",
    display: "flex",
    paddingTop: 20,
  },
  cardsource: {
    alignSelf: "center",
    flexDirection: "row",
    display: "flex",
    paddingTop: 20,
  },
  cardpublish: {
    alignSelf: "center",
    flexDirection: "row",
    display: "flex",
    paddingTop: 20,
  },
  carddescription: {
    width: "90%",
    alignSelf: "center",
    paddingLeft: 10,
    paddingBottom: 30,
    fontWeight: "bold",
  },
  cardContent: {
    width: "90%",
    alignSelf: "center",
    paddingLeft: 10,
    paddingTop: 30,
    fontWeight: "bold",
  },
});
