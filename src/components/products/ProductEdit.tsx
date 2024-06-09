import {
    DateInput,
    Edit,
    ImageField,
    ImageInput,
    minValue,
    NumberInput,
    required,
    SelectInput,
    TabbedForm,
    TextInput,
    useGetList,
    useRecordContext
} from "react-admin";
import {Grid} from "@mui/material";
import {RichTextInput} from "ra-input-rich-text";
import * as React from "react";
import {useEffect, useState} from "react";
import {Category, Product} from "../../type";

export const ProductEdit = () => {
    const record = useRecordContext();
    const [mainCategories, setMainCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Category[]>([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(record?.category?.parentCategory?.id);

    const {data: mainData}: any = useGetList<Category>('categories', {
        filter: {parentCategory: 1, active: true},
        sort: {field: 'name', order: 'ASC'},
        pagination: {page: 1, perPage: 100}
    });
    const {data: subData} = useGetList('categories', {
        filter: {parentCategory: selectedMainCategory, active: true},
        sort: {field: 'name', order: 'ASC'},
        pagination: {page: 1, perPage: 100}
    });


    useEffect(() => {
        if (mainData) {
            setMainCategories(mainData);
        }
    }, [mainData]);

    useEffect(() => {
        if (subData) {
            setSubCategories(subData);
        }
    }, [subData, selectedMainCategory]);

    useEffect(() => {
        if (record) {
            setSelectedMainCategory(record?.category?.parentCategory?.id);
        }
    }, [record]);

    const validateMainImage = [required('Ảnh chính không được để trống')];

    const validateSubImages = (value: string | any[]) => {
        if (value && value.length > 4) {
            return 'Danh sách ảnh phụ không được vượt quá 4 ảnh';
        }
        return undefined;
    };

    const ProductTitle = () => {
        const record = useRecordContext<Product>();
        if (!record) return null;
        return <span>{record.title}</span>;
    };
    return (
        <Edit title={<ProductTitle/>}>
            <TabbedForm>
                <TabbedForm.Tab label="Thông tin cơ bản">
                </TabbedForm.Tab>
                <TabbedForm.Tab label="Chi tiết sản phẩm">
                </TabbedForm.Tab>
            </TabbedForm>
        </Edit>
    );
};
const req = [required()];