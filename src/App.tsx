import {Admin, Resource, houseLightTheme} from "react-admin";
import {dataProvider} from "./provider/dataProvider";
import {authProvider} from "./provider/authProvider";
import Login from "./layout/Login";
import {BlogList} from "./components/blogs/BlogList";
import {CreateBlog} from "./components/blogs/CreateBlog";
import {UserList} from "./components/users/UserList";
import {AddUser} from "./components/users/AddUser";
import {EditUser} from "./components/users/EditUser";
import CategoryList from "./components/categories/CategoryList";
import CategoryIcon from "@mui/icons-material/Category";
import {CategoryCreate} from "./components/categories/CategoryCreate";
import {CategoryEdit} from "./components/categories/CategoryEdit";
import {ProductList} from "./components/products/ProductList";
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import People from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import {EditBlog} from "./components/blogs/EditBlog";
import {CommentList} from "./components/comments/CommentList";
import CommentIcon from '@mui/icons-material/Comment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Layout from "./layout/Layout";
import {InventoryList} from "./components/inventories/InventoryList";
import {InventoryCreate} from "./components/inventories/InventoryCreate";
import {useTokenCheck} from "./provider/UserTokenCheck";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ProductCreate} from "./components/products/ProductCreate";
import {CreateBlogCate} from "./components/blogCates/CreateBlogCate";
import {ProductShow} from "./components/products/ProductShow";
import {ProductEdit} from "./components/products/ProductEdit";
import {OrderList} from "./components/orders/OrderList";

function App() {
    useTokenCheck(authProvider, 60000);
    return (
        <Admin
            title="Admin"
            dataProvider={dataProvider}
            authProvider={authProvider}
            loginPage={Login}
            theme={houseLightTheme}
            layout={Layout}
            disableTelemetry
        >
            <Resource name={'user'} icon={People} list={UserList}
                      options={{label: "Người dùng"}}
                      create={AddUser}
                      edit={EditUser}/>
            <Resource name={'blog'} icon={ArticleIcon} list={BlogList}
                      options={{label: "Bài viết"}}
                      create={CreateBlog}
                      edit={EditBlog}/>
            <Resource name={'blogCate'} icon={ArticleIcon} list={BlogList}
                      options={{label: "Bài viết"}}
                      create={CreateBlogCate}/>
            <Resource name="categories"
                      options={{label: 'Danh mục'}}
                      list={CategoryList}
                      create={CategoryCreate}
                      edit={CategoryEdit}
                      icon={CategoryIcon}/>
            <Resource name="products"
                      options={{label: 'Sản phẩm'}}
                      list={ProductList}
                      create={ProductCreate}
                      show={ProductShow}
                      edit={ProductEdit}
                      icon={LocalMallIcon}/>
            <Resource name="orders"
                      options={{label: 'Đơn hàng'}}
                      list={OrderList}
                      icon={AttachMoneyIcon}/>
            <Resource name="inventories"
                      options={{label: 'Kho'}}
                      list={InventoryList}
                      create={InventoryCreate}
                      icon={InventoryIcon}/>
            <Resource name="comment"
                      options={{label: 'Đánh giá'}}
                      list={CommentList}
                      icon={CommentIcon}/>
            <ToastContainer/>
        </Admin>
    );
}

export default App;
