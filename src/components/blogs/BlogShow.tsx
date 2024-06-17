import * as React from 'react';
import {SimpleForm, SelectInput, useGetList, ImageField, Show, TopToolbar, EditButton} from "react-admin";
import {TextInput} from "react-admin";
import { RichTextInput } from 'ra-input-rich-text';
import {useEffect, useState} from "react";
import {Category} from "../../types";
import {Box} from "@mui/material";

export const BlogShow = () => {
    const [category, setCategories] = useState<Category[]>([]);
    const {data}: any = useGetList<Category>('blogCate', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    return (
        <Show title={'Thông tin tin tức'}>
            <SimpleForm toolbar={false}>
                <Box display={{ xs: 'block', sm: 'flex', width: '50%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput source="title" label="Tiêu đề" disabled={true} />
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                        <SelectInput
                            source="blogCate"
                            label="Danh mục"
                            choices={category}
                            optionText="name"
                            optionValue="id"
                            disabled={true}
                        />
                    </Box>
                </Box>
                <ImageField source={"imageShow"} title=""/>
                <RichTextInput source="content" label="Nội dung" disabled={true} />
            </SimpleForm>
        </Show>
    );
};
