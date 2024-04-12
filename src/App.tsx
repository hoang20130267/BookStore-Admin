import {Admin, Resource, useGetList} from "react-admin";
import {dataProvider} from "./provider/dataProvider";
import {BlogList} from "./components/Blogs/BlogList";
import {CreateBlog} from "./components/Blogs/CreateBlog";
function App() {
  return (
      <Admin
          title="Admin"
          dataProvider={dataProvider}
          disableTelemetry
      >
        <Resource name={'blog'} list={BlogList} options={{label: "Bài viết"}} create={CreateBlog}/>
      </Admin>
  );
}

export default App;
