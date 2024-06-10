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
import ContactMailIcon from '@mui/icons-material/ContactMail';
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
import {BlogCateList} from "./components/blogCates/BlogCateList";
import {EditBlogCate} from "./components/blogCates/EditBlogCate";
import {ContactList} from "./components/contact/ContactList";
import {ReplyContact} from "./components/contact/ReplyContact";
import DiscountIcon from '@mui/icons-material/Discount';
import {PromotionList} from "./components/promotion/PromotionList";
import PromotionCreate from "./components/promotion/PromotionCreate";
import PromotionEdit from "./components/promotion/PromotionEdit";
import OrderEdit from "./components/orders/OrderEdit";
import {Dashboard} from "./components/dashboard";

function App() {
    useTokenCheck(authProvider, 300000);
    return (
        <Admin
            title="Admin"
            dataProvider={dataProvider}
            authProvider={authProvider}
            loginPage={Login}
            theme={houseLightTheme}
            layout={Layout}
            dashboard={Dashboard}
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
            <Resource name={'blogCate'} icon={ArticleIcon} list={BlogCateList}
                      options={{label: "Bài viết"}}
                      create={CreateBlogCate}
                      edit={EditBlogCate}/>
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
                      edit={OrderEdit}
                      icon={AttachMoneyIcon}/>
            <Resource name="promotion"
                      options={{label: 'Giảm giá'}}
                      list={PromotionList}
                      create={PromotionCreate}
                      edit={PromotionEdit}
                      icon={DiscountIcon}/>
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
            <Resource name="contact"
                      options={{label: 'Liên hệ'}}
                      list={ContactList}
                      edit={ReplyContact}
                      icon={ContactMailIcon}/>
            <ToastContainer/>
        </Admin>
    );
}

export default App;
