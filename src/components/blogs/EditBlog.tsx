import * as React from 'react';
import {SimpleForm, SelectInput, useGetList, required, ImageField, ImageInput} from "react-admin";
import {Edit, TextInput} from "react-admin";
import { RichTextInput } from 'ra-input-rich-text';
import {useEffect, useState} from "react";
import {Category} from "../../types";
import {Box} from "@mui/material";

export const EditBlog = () => {
    const [category, setCategories] = useState<Category[]>([]);
    const [imageSelected, setImageSelected] = useState(false);
    const {data}: any = useGetList<Category>('blogCate', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'name', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    const handleImageChange = (file:any) => {
        if (file) {
            setImageSelected(true);
        } else {
            setImageSelected(false);
        }
    };

    return (
        <Edit title={'Chỉnh sửa tin tức'}>
            <SimpleForm>
                <Box display={{ xs: 'block', sm: 'flex', width: '50%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput source="title" label="Tiêu đề" validate={req} />
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
                <ImageInput source="image" accept="image/*" label="Link hình ảnh" placeholder={<p>Chọn ảnh</p>} onChange={handleImageChange}>
                    <ImageField source={"src"} title=""/>
                </ImageInput>
                {!imageSelected && <ImageField source={"imageShow"} title=""/>}
                <RichTextInput source="content" label="Nội dung" />
            </SimpleForm>
        </Edit>
    );
};

const req = [required()];
