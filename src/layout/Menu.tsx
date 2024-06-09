import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';

import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    useSidebarState,
} from 'react-admin';

import blog from '../components/blogs';
import user from '../components/users';
import category from '../components/categories';
import product from '../components/products';
import comment from '../components/comments';
import inventory from "../components/inventories";
import order from "../components/orders";
import contact from "../components/contact";
import promotion from "../components/promotion";
import SubMenu from './SubMenu';

type MenuName = 'menuCategories';

const Menu = ({dense = false}: MenuProps) => {
    const [state, setState] = useState({
        menuCategories: true
    });
    const translate = useTranslate();
    const [open] = useSidebarState();

    const handleToggle = (menu: MenuName) => {
        setState(state => ({...state, [menu]: !state[menu]}));
    };

    return (
        <Box
            sx={{
                width: open ? 200 : 50,
                marginTop: 1,
                marginBottom: 1,
                transition: theme =>
                    theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
            }}
        >
            <DashboardMenuItem />
            <MenuItemLink
                to="/user"
                state={{_scrollToTop: true}}
                primaryText={translate(`Người dùng`, {
                    smart_count: 2,
                })}
                leftIcon={<user.icon/>}
                dense={dense} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
            <MenuItemLink
                to="/products"
                state={{_scrollToTop: true}}
                primaryText={translate(`Sản phẩm`, {
                    smart_count: 2,
                })}
                leftIcon={<product.icon/>}
                dense={dense} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
            <MenuItemLink
                to="/orders"
                state={{_scrollToTop: true}}
                primaryText={translate(`Đơn hàng`, {
                    smart_count: 2,
                })}
                leftIcon={<order.icon/>}
                dense={dense} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
            <MenuItemLink
                to="/promotion"
                state={{_scrollToTop: true}}
                primaryText={translate(`Giảm giá`, {
                    smart_count: 2,
                })}
                leftIcon={<promotion.icon/>}
                dense={dense} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
            <MenuItemLink
                to="/blog"
                state={{_scrollToTop: true}}
                primaryText={translate(`Tin tức`, {
                    smart_count: 2,
                })}
                leftIcon={<blog.icon/>}
                dense={dense} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
            <SubMenu
                handleToggle={() => handleToggle('menuCategories')}
                isOpen={state.menuCategories}
                name="Danh mục"
                icon={<category.icon/>}
                dense={dense}
            >
                <MenuItemLink
                    to="/categories"
                    state={{_scrollToTop: true}}
                    primaryText={translate(`Sản phẩm`, {
                        smart_count: 2,
                    })}
                    leftIcon={<product.icon/>}
                    dense={dense} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
                <MenuItemLink
                    to="/blogCate"
                    state={{_scrollToTop: true}}
                    primaryText={translate(`Tin tức`, {
                        smart_count: 2,
                    })}
                    leftIcon={<blog.icon/>}
                    dense={dense} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
            </SubMenu>
            <MenuItemLink
                to="/inventories"
                state={{_scrollToTop: true}}
                primaryText={translate(`Kho hàng`, {
                    smart_count: 2,
                })}
                leftIcon={<inventory.icon/>}
                dense={dense} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
            <MenuItemLink
                to="/comment"
                state={{_scrollToTop: true}}
                primaryText={translate(`Đánh giá`, {
                    smart_count: 2,
                })}
                leftIcon={<comment.icon/>}
                dense={dense} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
            <MenuItemLink
                to="/contact"
                state={{_scrollToTop: true}}
                primaryText={translate(`Liên hệ`, {
                    smart_count: 2,
                })}
                leftIcon={<contact.icon/>}
                dense={dense} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
        </Box>
    );
};

export default Menu;