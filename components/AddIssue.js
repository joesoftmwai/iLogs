import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

import { TextInput } from "react-native-gesture-handler";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import { logIssue, reset } from "../features/issues/issuesSlice";

const AddIssue = ({
  modalRef,
  snapPoints,
  addIssue,
  close,
  closeEI,
  closeED,
  closeCD,
}) => {
  const dispatch = useDispatch();
  const { isError, isSuccess, msg } = useSelector((state) => state.issues);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimateIssue, setEstimateIssue] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("");

  const saveIssue = () => {
    if (!title || !description || !dueDate || !priority || !status) {
      showToast("Please fill in the required fields.");
      return;
    }
    let data = {
      // id: uuid.v4(),
      title,
      description,
      due_date: dueDate,
      estimate_issue: estimateIssue,
      priority: priority,
      status,
    };

    // addIssue(data);
    dispatch(logIssue(data));

    // setTimeout(() => {
    //   clearForm();
    // }, 2000);
  };

  const showToast = (message) => {
    ToastAndroid.show(message || "", ToastAndroid.SHORT);
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setEstimateIssue("");
    setPriority("Low");
    setStatus("");
  };

  const cleanup = () => {
    clearForm();
    close();
    closeEI();
    closeED();
    closeCD();
  };

  const formatPriority = (data) => {
    if (!data) return;
    let fPriority = null;
    switch (data.toLowerCase()) {
      case 1:
        fPriority = "Low";
        break;
      case 2:
        fPriority = "Medium";
      case 3:
        fPriority = "High";
        break;

      default:
        fPriority = "Low";
        break;
    }
    return fPriority;
  };

  useEffect(() => {
    if (isError && msg) {
      showToast(msg);
    }
    if (isSuccess && msg) {
      showToast(msg);
      cleanup();
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, msg, dispatch]);

  const bottomSheetBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={modalRef}
        index={0}
        enablePanDownToClose={true}
        backdropComponent={bottomSheetBackdrop}
      >
        <View style={styles.container}>
          <Text style={styles.title}>New Issue</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
                placeholder={"Title"}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.input}
                editable
                multiline
                numberOfLines={4}
                placeholder={"Enter issue description"}
              />
            </View>
            <View style={styles.dateTimes}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Due Date</Text>
                <TextInput
                  value={dueDate}
                  onChangeText={(text) => setDueDate(text)}
                  style={styles.input}
                  placeholder={"08 Jan"}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Estimate issue</Text>
                <TextInput
                  value={estimateIssue}
                  onChangeText={(text) => setEstimateIssue(text)}
                  style={styles.input}
                  placeholder={"3 hrs"}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Priority</Text>
              <View style={styles.issuePriority}>
                <TouchableOpacity
                  onPress={() => setPriority("Low")}
                  style={[
                    styles.priorityButton,
                    priority === "Low" && styles.pbtnActiveBgColor,
                  ]}
                >
                  <View>
                    <Text>Low</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setPriority("Medium")}
                  style={[
                    styles.priorityButton,
                    priority === "Medium" && styles.pbtnActiveBgColor,
                  ]}
                >
                  <View>
                    <Text>Medium</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setPriority("High")}
                  style={[
                    styles.priorityButton,
                    priority === "High" && styles.pbtnActiveBgColor,
                  ]}
                >
                  <View>
                    <Text>High</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Status</Text>
              <TextInput
                value={status}
                onChangeText={(text) => setStatus(text)}
                style={styles.input}
                placeholder={"Open"}
              />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={saveIssue}>
              <Text style={styles.btnText}>Save Issue</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  inputWrapper: {
    marginBottom: 5,
    flexGrow: 1,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 14,
    backgroundColor: "#E8EAED",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
  },

  dateTimes: {
    flexDirection: "row",
    gap: 10,
  },

  issuePriority: {
    flexDirection: "row",
    backgroundColor: "#E8EAED",
    gap: 5,
    padding: 5,
    borderRadius: 10,
  },
  priorityButton: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pbtnColor: {
    color: "gray",
  },

  pbtnActiveBgColor: {
    backgroundColor: "#9bcbeccf",
  },

  pickerStyle: {
    color: "black",
  },

  addButton: {
    backgroundColor: "#55BCF6",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginTop: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default AddIssue;
