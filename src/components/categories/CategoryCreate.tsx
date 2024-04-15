import {Create, required, SelectInput, SimpleForm, TextInput, useGetList} from "react-admin";
import * as React from "react";
import {useEffect, useState} from "react";
import {Category} from "../../type";

export const CategoryCreate = () => {
    const [parentCategories, setParentCategories] = useState<Category[]>([]);
    console.log(parentCategories);

    const {data}: any = useGetList<Category>('categories', {
        filter: {parentId: null, active: true},
        sort: {field: 'name', order: 'ASC'},
        pagination: {page: 1, perPage: 100}
    });

    useEffect(() => {
        if (data) {
            setParentCategories(data);
        }
    }, [data]);
    return (
        <Create title="Thêm danh mục">
            <SimpleForm>
                <TextInput source="name" label="Tên danh mục" validate={[required()]}/>
                <SelectInput
                    source="parentId"
                    label="Danh mục cha"
                    choices={parentCategories}
                />
                <SelectInput
                    source="active"
                    label="Trạng thái"
                    choices={[
                        {id: true, name: 'Active'},
                        {id: false, name: 'Inactive'},
                    ]}
                    defaultValue="true"
                />
            </SimpleForm>
        </Create>)
};