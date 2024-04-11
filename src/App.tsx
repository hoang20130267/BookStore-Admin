import {Admin, Resource, useGetList} from "react-admin";
import {dataProvider} from "./provider/dataProvider";
import {BlogList} from "./components/Blogs/BlogList";
function App() {
  return (
      <Admin
          title="Admin"
          dataProvider={dataProvider}
          disableTelemetry
      >
        <Resource name={'blogs'} list={BlogList} options={{label: "Bài viết"}}/>
      </Admin>
  );
}

export default App;
