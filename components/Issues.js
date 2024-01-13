import React, { useEffect } from "react";
import { Text, ToastAndroid, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getIssues, reset } from "../features/issues/issuesSlice";

const Issues = () => {
  const dispatch = useDispatch();
  const { isLoading, issues, msg, isError, isSuccess } = useSelector(
    (state) => state.issues
  );

  const showToast = (message) => {
    ToastAndroid.show(message || "", ToastAndroid.LONG);
  };
  useEffect(() => {
    dispatch(getIssues());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && msg) {
      showToast(msg);
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, msg]);

  return (
    <View>
      {isLoading ? <Text>Loading ...</Text> : <Text>Issues here we go</Text>}
      <View>
        {issues?.map((issue, key) => (
          <Text>MJ</Text>
        ))}
      </View>
    </View>
  );
};

export default Issues;
