import {
    ArrayInput,
    Create, minValue,
    NumberInput,
    required,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    useGetList
} from "react-admin";
import {Product} from "../../type";
import * as React from "react";
import {useEffect, useState} from "react";

export const InventoryCreate = () => {
    const [products, setProducts] = useState<Product[]>([]);
    console.log(products)
    const {data}: any = useGetList<Product>('products', {
        sort: {field: 'id', order: 'DESC'},
        pagination: {page: 1, perPage: 100}
    });
    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data]);

    return (
        <Create title="Nhập sản phẩm">
            <SimpleForm>
                <ArrayInput source="InventoryRequest" label="Nhập sản phẩm">
                    <SimpleFormIterator sx={{marginTop: '20px'}} inline>
                        <SelectInput
                            sx={{maxWidth: '20em'}}
                            source="productId"
                            label="Sản phẩm"
                            choices={products}
                            optionText="title"
                            optionValue="id"
                            validate={[required()]}
                        />
                        <NumberInput sx={{maxWidth: '9em'}} step='1000' source="importPrice" helperText={false}
                                     label="Giá nhập"
                                     validate={[required(), minValue(1000)]}/>
                        <NumberInput sx={{maxWidth: '9em'}} step='1000' source="salePrice" helperText={false}
                                     label="Giá bán"
                                     validate={[required(), minValue(1000)]}/>
                        <NumberInput sx={{maxWidth: '9em'}} source="quantity" helperText={false} label="Số lượng"
                                     validate={[required(), minValue(1)]}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
};