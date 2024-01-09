import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const Issue = ({ openED, issue, setSelectedIssue }) => {
  const handleED = () => {
    setSelectedIssue(issue);
    openED();
  };

  const setStatusInd = (status) => {
    if (!status) return;
    let indicator = {};
    switch (status.toLowerCase()) {
      case "open":
        indicator = styles.open;
        break;
      case "in progress":
        indicator = styles.inProgress;
        break;
      case "done":
        indicator = styles.done;
        break;
      default:
        indicator = styles.open;
        break;
    }
    return indicator;
  };

  const setPriorityInd = (priority) => {
    if (!priority) return;
    let indicator = {};
    switch (priority.toLowerCase()) {
      case "low":
        indicator = styles.low;
        break;
      case "medium":
        indicator = styles.medium;
        break;
      case "high":
        indicator = styles.high;
        break;
      default:
        indicator = styles.low;
        break;
    }
    return indicator;
  };

  return (
    <View style={styles.issue}>
      <View style={styles.issueHeader}>
        <View style={styles.issueIcon}>
          <Image
            style={styles.issueIcon}
            source={require("../assets/icons-to-dos.png")}
          />
        </View>

        <View>
          <View style={styles.titleWrap}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.issueTitle}
            >
              {issue.title}
            </Text>
          </View>

          <View style={styles.statuWrapper}>
            <View
              style={[styles.statusIndicator, setStatusInd(issue.status)]}
            ></View>
            <Text style={styles.issueStatus}>{issue.status}</Text>
          </View>

          <View style={styles.issueMore}>
            <Text style={styles.issueDue}>Due: {issue.due_date}</Text>
            <Text
              style={[styles.issuePriority, setPriorityInd(issue.priority)]}
            >
              {issue.priority}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={handleED} style={styles.moreWrap}>
          <Image
            style={styles.iconMore}
            source={require("../assets/icons-more.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  issue: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 18,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
  },

  issueHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  issueIcon: {
    height: 30,
    width: 30,
    marginRight: 7,
  },

  titleWrap: {
    maxWidth: 250,
  },

  issueTitle: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 3,
  },

  statuWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },

  issueStatus: {
    fontSize: 11,
  },

  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginRight: 5,
  },

  open: { backgroundColor: "#55bcf69e" },
  inProgress: { backgroundColor: "#6c757da6" },
  done: { backgroundColor: "#29c84d" },

  issueMore: {
    flexDirection: "row",
    alignItems: "center",
  },

  issueDue: {
    fontWeight: "400",
    fontSize: 13,
    marginRight: 8,
  },

  issuePriority: {
    fontWeight: "400",
    fontSize: 11,
    paddingHorizontal: 5,
    borderRadius: 5,
  },

  high: {
    backgroundColor: "#f8d7da",
    color: "#dc3545",
  },
  low: {
    backgroundColor: "#cfe2ff",
    color: "#6ea5f6",
  },
  medium: {
    backgroundColor: "#fff3cd",
    color: "#f3c11f",
  },

  actionButtons: {
    // flexDirection: 'column',
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  moreWrap: {
    // borderColor: "#dee2e6",
    // borderWidth: 1,
    padding: 3,
    // borderRadius: "50%",
  },

  iconMore: {
    height: 15,
    width: 15,
  },

  iconStatus: {
    height: 20,
    width: 20,
    paddingRight: 6,
  },

  status: {
    paddingRight: 6,
  },
});

export default Issue;
