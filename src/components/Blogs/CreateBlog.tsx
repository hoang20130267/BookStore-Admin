import * as React from 'react';
import {SimpleForm, ReferenceInput, SelectInput, useGetList, required} from "react-admin";
import {Create, TextInput} from "react-admin";
import { RichTextInput } from 'ra-input-rich-text';
import {useEffect, useState} from "react";
import {Category} from "../../type";
import {Box} from "@mui/material";

export const CreateBlog = () => {
    const [category, setCategories] = useState<Category[]>([]);
    const {data}: any = useGetList<Category>('category', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);
    return (
        <Create title={'Tạo tin tức'}>
            <SimpleForm>
                <Box display={{ xs: 'block', sm: 'flex', width: '50%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput source="title" label="Tiêu đề"/>
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                        <SelectInput
                            source="blogCate"
                            label="Danh mục"
                            choices={category}
                            optionText="name"
                            optionValue="id"
                            validate={req}
                        />
                    </Box>
                </Box>
                <TextInput source="image" label="Link hình ảnh"/>
                <RichTextInput source="content" label="Nội dung" />
            </SimpleForm>
        </Create>
    )
};
const req = [required()];