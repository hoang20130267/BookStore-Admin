import {Admin, ListGuesser, Resource, useGetList} from "react-admin";
import {dataProvider} from "./provider/dataProvider";
import {BlogList} from "./components/Blogs/BlogList";
import {CreateBlog} from "./components/Blogs/CreateBlog";
import CategoryList from "./components/categories/CategoryList";
import CategoryIcon from '@mui/icons-material/Category';
function App() {
    return (
        <Admin
            title="Admin"
            dataProvider={dataProvider}
            disableTelemetry
        >
            <Resource name={'blog'} list={BlogList} options={{label: "Bài viết"}} create={CreateBlog}/>
            <Resource name="categories" options={{ label: 'Danh mục' }} list={CategoryList} icon={CategoryIcon}/>
        </Admin>
    );
}

export default App;
