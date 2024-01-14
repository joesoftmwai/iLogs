import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

AppRegistry.registerComponent(appName, () => (
  <Provider store={store}>
    <App />
  </Provider>
));
