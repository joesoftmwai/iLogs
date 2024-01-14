import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import Issue from "./components/Issue";
import { useEffect, useMemo, useRef, useState } from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import AddIssue from "./components/AddIssue";
import EditDelete from "./components/EditDelete";
import ConfirmDialog from "./components/ConfirmDialog";
import { issuesData } from "./tempStore";
import EditIssue from "./components/EditIssue";
import Issues from "./components/Issues";

export default function App() {
  const aIbsModalRef = useRef(null);
  const eDbsModalRef = useRef(null);
  const eIbsModalRef = useRef(null);

  const aIsnapPoints = useMemo(() => ["63%", "75%"], []);
  const eDsnapPoints = useMemo(() => ["20%"], []);
  const eIsnapPoints = useMemo(() => ["63%", "75%"], []);

  const [issues, setIssues] = useState(issuesData);
  const [issue, setIssue] = useState(null);
  const [visibleCD, setVisibleCD] = useState(false);

  const openAI = () => aIbsModalRef.current.present();
  const closeAI = () => aIbsModalRef.current.close();
  const openED = () => eDbsModalRef.current.present();
  const closeED = () => eDbsModalRef.current.close();
  const openEI = () => eIbsModalRef.current.present();
  const closeEI = () => eIbsModalRef.current.close();

  const openCD = () => setVisibleCD(true);
  const closeCD = () => setVisibleCD(false);

  const addIssue = (data) => {
    console.log("data", data);
    setIssues([data, ...issues]);
    showToast("Issue logged successfully.");
    closeAI();
  };

  const editIssue = (data) => {
    console.log("Editiiing");
  };

  const deleteIssue = (issueId) => {
    if (!issueId) return;

    let issuesArr = [...issues];
    const index = issuesArr.findIndex((item) => item.id === issueId);

    if (index !== -1) {
      issuesArr.splice(index, 1);
      setIssues(issuesArr);
      showToast("Issue deleted successfully");
      setIssue(null);
      closeCD();
      closeED();
    }
  };

  const setSelectedIssue = (data) => {
    setIssue(data);
  };

  const showToast = (message) => {
    ToastAndroid.show(message || "", ToastAndroid.LONG);
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.appBar}>
            <Text style={styles.appTitle}>iLogs</Text>
            <TouchableOpacity>
              <Image
                style={styles.search}
                source={require("./assets/icons-search-100.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.mainContent}>
            <Issues
              tempIssues={issues}
              issue={issue}
              openED={openED}
              setSelectedIssue={setSelectedIssue}
            />

            {/* {issues?.map((issue, key) => (
              <Issue
                key={key}
                issue={issue}
                openED={openED}
                setSelectedIssue={setSelectedIssue}
              />
            ))} */}
          </View>

          <TouchableOpacity style={styles.fabWrapper} onPress={openAI}>
            <View style={styles.fab}>
              <Text style={styles.fabText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <AddIssue
          modalRef={aIbsModalRef}
          snapPoints={aIsnapPoints}
          addIssue={addIssue}
          close={closeAI}
          closeEI={closeEI}
          closeED={closeED}
          closeCD={closeCD}
        />
        <EditIssue
          modalRef={eIbsModalRef}
          snapPoints={eIsnapPoints}
          issue={issue}
          editIssue={editIssue}
        />

        <EditDelete
          modalRef={eDbsModalRef}
          snapPoints={eDsnapPoints}
          openCD={openCD}
          closeCD={closeCD}
          deleteItem={deleteIssue}
          openEdit={openEI}
          closeED={closeED}
          issue={issue}
        />
        <ConfirmDialog
          visible={visibleCD}
          showDialog={openCD}
          closeDialog={closeCD}
          item={issue}
          deleteItem={deleteIssue}
        />
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    paddingHorizontal: 15,
    backgroundColor: "#E8EAED",
  },
  appBar: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  appTitle: {
    fontSize: 27,
    fontWeight: "bold",
  },
  search: {
    height: 27,
    width: 27,
  },

  mainContent: {
    marginTop: 20,
  },

  fabWrapper: {
    position: "absolute",
    bottom: 17,
    right: 17,
  },

  fab: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#55BCF6",
    justifyContent: "center",
    alignItems: "center",
  },

  fabText: {
    fontSize: 23,
    color: "#fff",
  },
});
