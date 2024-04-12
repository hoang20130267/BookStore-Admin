import {DataProvider, fetchUtils} from 'react-admin'

const apiUrl = 'http://localhost:8080/api'
const httpClient = fetchUtils.fetchJson

// @ts-ignore
export const dataProvider: DataProvider = {
    // @ts-ignore
    getList: async (resource: any, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            filter: JSON.stringify(fetchUtils.flattenObject(params.filter)),
            sort: field,
            order: order,
            page: page - 1,
            perPage: perPage,
        };
        try {
            const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
            const { json } = await httpClient(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            });
            console.log('response', json)
            return {
                data: json.content,
                total: parseInt(json.totalElements, 10),
            }
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error('Error fetching data:', error);
            throw new Error('Error fetching data');
        }
    },
}

// export default dataProvider
