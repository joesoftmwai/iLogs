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

const Issues = ({ tempIssues, issue, openED, setSelectedIssue }) => {
  const dispatch = useDispatch();
  const { isLoading, issues, msg, isError, isSuccess } = useSelector(
    (state) => state.issues
  );



  useEffect(() => {
    dispatch(getIssues());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

//   useEffect(() => {
//     if (isError && msg) {
//       showToast(msg);
//     }
//     if (isSuccess && msg) {
//       showToast(msg);
//     }
//     return () => {
//       dispatch(reset());
//     };
//   }, [isError, msg, dispatch]);

  return (
    <View>
      {!isLoading ? (
        <View>
          {issues.length ? (
            <View>
              {issues?.map((issue, key) => (
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
