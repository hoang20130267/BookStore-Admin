import {Edit, required, SelectInput, SimpleForm, TextInput, useGetList} from "react-admin";
import * as React from "react";
import {useEffect, useState} from "react";
import {Category} from "../../type";

export const CategoryEdit = () => {
    const [mainCategories, setMainCategories] = useState<Category[]>([]);

    const {data}: any = useGetList<Category>('categories', {
        filter: {parentCategory: 1, active: true},
        sort: {field: 'name', order: 'ASC'},
        pagination: {page: 1, perPage: 100}
    });

    useEffect(() => {
        if (data) {
            setMainCategories(data);
        }
    }, [data]);
    return (
        <Edit title="Chỉnh sửa danh mục">
            <SimpleForm>
                <TextInput source="id" label="ID" disabled/>
                <TextInput source="name" label="Tên danh mục" validate={[required()]}/>
                <SelectInput
                    source="parentCategory.id"
                    label="Danh mục cha"
                    choices={mainCategories}
                />
                <SelectInput
                    source="active"
                    label="Trạng thái"
                    choices={[
                        {id: true, name: 'Active'},
                        {id: false, name: 'Inactive'},
                    ]}
                />
            </SimpleForm>
        </Edit>)
};