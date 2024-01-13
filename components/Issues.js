import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getIssues, reset } from "../features/issues/issuesSlice";
import Issue from "./Issue";
import axios from "axios";

const Issues = ({ tempIssues, issue, openED, setSelectedIssue }) => {
  const dispatch = useDispatch();
  const { isLoading, issues, msg, isError, isSuccess } = useSelector(
    (state) => state.issues
  );

  const showToast = (message) => {
    ToastAndroid.show(message || "", ToastAndroid.LONG);
  };

  const simulateFetch = async () => {
    try {
      const response = await axios.get(
        "https://crudcrud.com/api/1e30c677c4464d0abfee4fb1fbdb6916/ilogs"
      );
      // Handle the response data
      console.log("respeksssss", response.data);
    } catch (error) {
      // Handle errors
      console.error("Axios error:", error);
    }
  };

  useEffect(() => {
    // simulateFetch();
    // dispatch(getIssues());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && msg) {
      showToast(msg);
    }
    if (isSuccess && msg) {
      showToast(msg);
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, msg]);

  return (
    <View>
      {!isLoading ? (
        <View>
          {tempIssues.length ? (
            <View>
              {tempIssues?.map((issue, key) => (
                <Issue
                  key={key}
                  issue={issue}
                  openED={openED}
                  setSelectedIssue={setSelectedIssue}
                />
              ))}
            </View>
          ) : (
            <View style={styles.noDataWrapper}>
              <Image
                style={styles.noData}
                source={require("../assets/no-data.png")}
              />
            </View>
          )}
        </View>
      ) : (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#55BCF6" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noDataWrapper: {
    justifyContent: "center",
    marginVertical: "50%",
    padding: 50,
    alignItems: "center",
  },

  noData: {
    height: 175,
    width: 175,
  },
});

export default Issues;
