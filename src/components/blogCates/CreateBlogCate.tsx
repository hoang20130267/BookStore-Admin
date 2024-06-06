import * as React from 'react';
import {SimpleForm, required} from "react-admin";
import {Create, TextInput} from "react-admin";
import {Box} from "@mui/material";

export const CreateBlogCate = () => {

    return (
        <Create title={'Tạo danh mục tin tức'}>
            <SimpleForm>
                <Box display={{ xs: 'block', sm: 'flex', width: '50%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput source="name" label="Tên danh mục" required={true}/>
                    </Box>
                </Box>
            </SimpleForm>
        </Create>
    )
};
const req = [required()];