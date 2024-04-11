import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    ImageField,
    DateField,
} from 'react-admin';

export const BlogList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID"/>
            <TextField source="blog_cate_id.name" label="Danh mục"/>
            <ImageField source="image" label="Hình ảnh"/>
            <TextField source="creator.username" label="Người tạo"/>
            <TextField source="title" label="Tiêu đề"/>
            <DateField source="created_at" label="Ngày tạo"/>
        </Datagrid>
    </List>
);