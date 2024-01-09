import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

const ConfirmDialog = ({
  visible,
  showDialog,
  closeDialog,
  item,
  deleteItem,
}) => {
  const processActivity = () => {
    deleteItem(item.id);
  };
  return (
    <View>
      <Dialog.Container visible={visible} onBackdropPress={closeDialog}>
        <View style={styles.customizeDialog}>
          <Image
            style={styles.actionIcon}
            source={require("../assets/icon-alert.png")}
          />

          <Text style={styles.cdTitle}>
            Are you sure you want to Delete this Issue ?
          </Text>
          {/* <Text style={styles.cdDesc}>If you're not sure, press no.</Text> */}

          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={closeDialog}
              style={[styles.actionButton, styles.cancel]}
            >
              <Text>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={processActivity}
              style={[styles.actionButton, styles.delete]}
            >
              <Text style={styles.textWhite}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#55BCF6",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginTop: 10,
    alignItems: "center",
  },

  customizeDialog: {
    justifyContent: "center",
    alignItems: "center",
  },

  cdTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },

  cdDesc: {
    fontSize: 15,
    marginBottom: 5,
  },

  actionIcon: {
    height: 80,
    width: 80,
    marginBottom: 5,
  },

  actionButtons: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
    marginBottom: 5,
  },
  actionButton: {
    width: 70,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 9,
    marginTop: 10,
    alignItems: "center",
  },

  cancel: {
    backgroundColor: "#E8EAED",
  },
  delete: {
    backgroundColor: "#55BCF6", // "#29c84d",
  },
  textWhite: {
    color: "#FFFFFF",
  },
});

export default ConfirmDialog;
