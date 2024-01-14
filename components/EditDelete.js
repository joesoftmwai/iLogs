import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { getIisssue } from "../features/issues/issuesSlice";

const EditDelete = ({
  modalRef,
  snapPoints,
  openCD,
  openEdit,
  closeED,
  issue,
}) => {
  const dispatch = useDispatch();
  const handleUpdate = () => {
    openEdit();
    closeED();
    if (issue) {
      dispatch(getIisssue(issue._id));
    }
  };
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
          <TouchableOpacity onPress={handleUpdate} style={styles.actions}>
            <Image
              style={styles.actionIcon}
              source={require("../assets/icons-edit.png")}
            />
            <Text style={styles.actionText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openCD()} style={styles.actions}>
            <Image
              style={styles.actionIcon}
              source={require("../assets/icons-delete.png")}
            />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
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
  actions: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    // backgroundColor: "#E8EAED",
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  actionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#444",
  },
});

export default EditDelete;
