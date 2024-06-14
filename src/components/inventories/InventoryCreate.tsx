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
import {Inventory, Product} from "../../type";
import * as React from "react";
import {useEffect, useState} from "react";

export const InventoryCreate = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [combinedProducts, setCombinedProducts] = useState<Product[]>([]);

    const {data: productData}: any = useGetList<Product>('products', {
        filter: {active: false},
        sort: {field: 'id', order: 'DESC'},
        pagination: {page: 1, perPage: 100}
    });

    const {data: inventoryData}: any = useGetList<Inventory>('inventories', {
        sort: {field: 'id', order: 'DESC'},
        pagination: {page: 1, perPage: 100}
    });

    useEffect(() => {
        if (productData) {
            setProducts(productData);
        }
    }, [productData]);

    useEffect(() => {
        if (inventoryData) {
            setInventories(inventoryData);
        }
    }, [inventoryData]);

    useEffect(() => {
        if (products.length > 0 || inventories.length > 0) {

            // Lấy danh sách sản phẩm từ inventories có active là false
            const inactiveInventoryProducts = inventories
                .filter(inventory => !inventory.active) // Lọc các inventories có active là false
                .map(inventory => {
                    return inventory.product;
                });

            // Tạo một tập hợp chứa các productId đã có inventory mới (active: true)
            const newInventoryProductIds = new Set(
                inventories
                    .filter(inventory => inventory.active)
                    .map(inventory => {
                        console.log('Active inventory product ID:', inventory.product.id); // Logging kiểm tra
                        return inventory.product.id;
                    })
            );

            // Lọc bỏ sản phẩm nếu đã có một inventory mới (active: true)
            const filteredInventoryProducts = inactiveInventoryProducts.filter(inventoryProduct =>
                !newInventoryProductIds.has(inventoryProduct.id)
            );

            // Kết hợp danh sách sản phẩm từ products và filteredInventoryProducts
            const allProducts = [...products, ...filteredInventoryProducts];

            // Loại bỏ các sản phẩm trùng lặp dựa trên id
            const uniqueProducts = Array.from(new Set(allProducts.map(product => product.id)))
                .map(id => allProducts.find(product => product.id === id) as Product);

            setCombinedProducts(uniqueProducts);
        }
    }, [products, inventories]);

    return (
        <Create title="Nhập sản phẩm">
            <SimpleForm>
                <ArrayInput source="InventoryRequest" label="Nhập sản phẩm">
                    <SimpleFormIterator sx={{marginTop: '20px'}} inline>
                        <SelectInput
                            sx={{maxWidth: '20em'}}
                            source="productId"
                            label="Sản phẩm"
                            choices={combinedProducts}
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