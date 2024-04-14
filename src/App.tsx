import {Admin, Resource, houseLightTheme} from "react-admin";
import {dataProvider} from "./provider/dataProvider";
import {authProvider} from "./provider/authProvider";
import Login from "./layout/Login";
import {BlogList} from "./components/Blogs/BlogList";
import {CreateBlog} from "./components/Blogs/CreateBlog";
import {UserList} from "./components/Users/UserList";
import {AddUser} from "./components/Users/AddUser";

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
            <Resource name={'user'} list={UserList} options={{label: "Người dùng"}} create={AddUser}/>
            <Resource name={'blog'} list={BlogList} options={{label: "Bài viết"}} create={CreateBlog}/>
        </Admin>
    );
}

export default App;
