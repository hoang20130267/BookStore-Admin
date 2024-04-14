import * as React from 'react';
import {SimpleForm} from "react-admin";
import {Create, TextInput} from "react-admin";
import { RichTextInput } from 'ra-input-rich-text';

export const CreateBlog = () => {
    return (
        <Create title={'Tạo tin tức'}>
            <SimpleForm>
                <TextInput source="blogCate" label="Tên danh mục"/>
                <TextInput source="title" label="Tiêu đề"/>
                <TextInput source="image" label="Link hình ảnh"/>
                <RichTextInput source="content" label="Nội dung" />
            </SimpleForm>
        </Create>
    )
}