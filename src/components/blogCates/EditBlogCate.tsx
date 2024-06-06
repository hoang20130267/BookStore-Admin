import * as React from 'react';
import {SimpleForm, required} from "react-admin";
import {Edit, TextInput} from "react-admin";
import {Box} from "@mui/material";

export const EditBlogCate = () => {
    return (
        <Edit title={'Chỉnh sửa tin tức'}>
            <SimpleForm>
                <Box display={{ xs: 'block', sm: 'flex', width: '50%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput source="name" label="Tên danh mục" validate={req} />
                    </Box>
                </Box>
            </SimpleForm>
        </Edit>
    );
};

const req = [required()];
