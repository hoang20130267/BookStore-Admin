import {Admin, Resource, houseLightTheme } from "react-admin";
import {dataProvider} from "./provider/dataProvider";
import {authProvider} from "./provider/authProvider";
import Login from "./layout/Login";
import {BlogList} from "./components/Blogs/BlogList";
import {CreateBlog} from "./components/Blogs/CreateBlog";
function App() {
  return (
      <Admin
          title="Admin"
          dataProvider={dataProvider}
          authProvider={authProvider}
          loginPage={Login}
          theme={houseLightTheme}
          disableTelemetry
      >
        <Resource name={'blog'} list={BlogList} options={{label: "Bài viết"}} create={CreateBlog}/>
      </Admin>
  );
}

export default App;
