import * as React from 'react';
import {Create, TabbedForm, TextInput, NumberInput, useGetList, SelectInput, DateInput, email} from 'react-admin';
import {useEffect, useState} from "react";
import {Category} from "../../type";
import {Box} from "@mui/material";

export const validateForm = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;
    if (!values.idProduct && !values.code) {
        errors.idProduct = 'Vui lòng chọn sản phẩm hoặc nhập mã giảm giá';
        errors.code = 'Vui lòng chọn sản phẩm hoặc nhập mã giảm giá';
    }
    if (!values.discount) {
        errors.discount = 'Vui lòng chọn phần trăm giảm giá';
    }
    if (!values.discount) {
        errors.discount = 'Vui lòng chọn phần trăm giảm giá';
    } else if (values.discount < 0 || values.discount > 100) {
        errors.discount = 'Phần trăm giảm giá không hợp lệ';
    }
    if (!values.startDate) {
        errors.startDate = 'Vui lòng chọn ngày bắt đầu';
    }
    if(!values.endDate) {
        errors.endDate = 'Vui lòng chọn ngày kết thúc';
    }
    if(new Date(values.startDate) < new Date()) {
        errors.startDate = 'Ngày bắt đầu phải sau ngày hiện tại';
    }
    if(new Date(values.endDate) <= new Date(values.startDate)) {
        errors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
    }
    return errors;
};
const PromotionCreate = () => {
    const [category, setCategories] = useState<Category[]>([]);
    const {data}: any = useGetList<Category>('products', {
        pagination: {page: 1, perPage: 100},
        sort: {field: 'title', order: 'ASC'},
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);
    return (
        <Create>
            <TabbedForm defaultValues={{sales: 0}} validate={validateForm}>
                <TabbedForm.Tab
                    label="Sản phẩm"
                    sx={{maxWidth: '40em'}}
                >
                    <SelectInput
                        source="idProduct"
                        label="Sản phẩm"
                        choices={category}
                        optionText="title"
                        optionValue="id"
                        sx={{maxWidth: '80em'}}
                    />
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Mã giảm giá"
                    path="details"
                    sx={{maxWidth: '40em'}}
                >
                    <TextInput source="code" sx={{maxWidth: '40em'}}/>
                </TabbedForm.Tab>
                <TabbedForm.Tab
                    label="Nội dung khác"
                >
                    <NumberInput source="discount" label="Phần trăm giảm" sx={{maxWidth: '40em'}}/>
                    <Box display={{xs: 'block', sm: 'flex', width: '50%'}}>
                        <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                            <DateInput source="startDate" label="Ngày bắt đầu" fullWidth/>
                        </Box>
                        <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                            <DateInput source="endDate" label="Ngày kết thúc" fullWidth/>
                        </Box>
                    </Box>
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    )
};

export default PromotionCreate;