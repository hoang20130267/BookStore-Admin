import {DataProvider, fetchUtils} from 'react-admin'

const apiUrl = 'http://localhost:8080/api'
const httpClient = fetchUtils.fetchJson
const adminInfo = {
    token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob2FuZ25ndXllbiIsImlhdCI6MTcxMjkwODQ3MCwiZXhwIjoxNzEyOTk0ODcwfQ.7s-m9KyYJyhFXjcNC_5tsRWKXVkTwqMJGmtOyFKsalFW5FWTL8dzEC1MhcMHy1YOOUWR20KpEtzr4LtAtuH0Xg",
    type: "Bearer",
    id: 1,
    username: "hoangnguyen",
    email: "shuter.nsh@gmail.com",
    roles: ["ADMIN"]
};
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
    create: async (resource: any, params: any) => {
        try {
            const url = `${apiUrl}/${resource}/add`;
            const { json } = await httpClient(url, {
                method: 'POST',
                body: JSON.stringify(params.data),
                headers: new Headers({
                    'Authorization': `${adminInfo.type} ${adminInfo.token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            });
            console.log('response', json)
            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error('Error fetching data:', error);
            throw new Error('Error fetching data');
        }
    },
}

// export default dataProvider
