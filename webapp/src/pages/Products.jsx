import React from 'react'
import placeholderImg from '../assets/images/placeholder-image.jpg'
import Switch from '../components/Switch'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

const productItems = [
    {
        productid: '676bb2a4-0ac0-4156-9315-4075fd06d2b6',
        productname: 'Urban Explorer Jacket',
        shipping:
            'Versatile jacket for urban adventures, available in multiple colors.',
        price: '180.00',
        discountprice: '140.00',
        brand: 'UrbanGear',
        colors: ['#2F4F4F', '#8B0000', '#556B2F', '#4682B4'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Canvas',
        onlinestores: [
            {
                link: 'https://www.tokped.com/urban-explorer-jacket',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/urban-explorer-jacket',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T03:21:37.371Z',
        ProductImages: [
            {
                productimageid: '96d9fbf2-c17a-4eb7-935b-dd38e8bc67e7',
                imageid: 'aaa0991d-206d-415a-b48e-fbb5d5821909',
                isdefault: true,
                color: '#2F4F4F',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/7787d351-6e74-413c-bbce-0cd7223277ce.jpg',
                },
            },
            {
                productimageid: '96d9fbf2-c17a-4eb7-935b-dd38e8bc67e7',
                imageid: '7196ae9a-0afb-567b-b1b6-790077623f21',
                isdefault: false,
                color: '#2F4F4F',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/055c6c8f-9feb-4372-988f-bce9af89f3c2.jpg',
                },
            },
            {
                productimageid: 'd81fc456-2157-4303-9a6a-093e0e2e7f3f',
                imageid: '8b215399-e62d-40c5-9316-585130d3e193',
                isdefault: true,
                color: '#8B0000',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/055c6c8f-9feb-4372-988f-bce9af89f3c2.jpg',
                },
            },
            {
                productimageid: 'da7579ff-3a6b-44b7-b19e-511168dc66ec',
                imageid: '147e0db8-bc14-4c8d-a364-17e55228abfa',
                isdefault: true,
                color: '#556B2F',
                Image: {
                    imagepath: 'images/urban-explorer-jacket-olive.jpg',
                },
            },
            {
                productimageid: '3b638d56-a01d-4414-90b9-58d8ac249a4f',
                imageid: '9ed87bfb-17b1-490c-ac8b-7bc36f77244d',
                isdefault: true,
                color: '#4682B4',
                Image: {
                    imagepath: 'images/urban-explorer-jacket-steelblue.jpg',
                },
            },
        ],
        ProductCategories: [
            {
                productcategoryid: 'c876961c-80d4-4cdf-a43f-aaec29081ea6',
                productid: '676bb2a4-0ac0-4156-9315-4075fd06d2b6',
                categorydetailid: '099eb63b-035c-46e3-b301-c485f38e9e01',
                CategoryDetail: {
                    categorydetailid: '099eb63b-035c-46e3-b301-c485f38e9e01',
                    categoryid: 'cae649d7-8414-4292-bf5a-01f4d9628440',
                    categorydetailname: 'Winter',
                    Category: {
                        categoryid: 'cae649d7-8414-4292-bf5a-01f4d9628440',
                        categoryname: 'Season',
                    },
                },
            },
            {
                productcategoryid: '9109ae65-8fe9-4510-a386-f89c9ea8faf8',
                productid: '676bb2a4-0ac0-4156-9315-4075fd06d2b6',
                categorydetailid: 'a5fe5da9-264d-48b0-b213-c73e38aebed9',
                CategoryDetail: {
                    categorydetailid: 'a5fe5da9-264d-48b0-b213-c73e38aebed9',
                    categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                    categorydetailname: 'Blazer & Jacket',
                    Category: {
                        categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                        categoryname: 'Outer',
                    },
                },
            },
        ],
    },
    {
        productid: '8dcf05b6-15c3-440a-acda-5550594713ea',
        productname: 'FF XVI',
        shipping: 'Mau keluar di PC loh.',
        price: '50.00',
        discountprice: '50.00',
        brand: 'SquareEnix',
        colors: ['#00FF7F', '#4682B4'],
        sizes: ['M', 'L'],
        material: 'Joy',
        onlinestores: [
            {
                link: 'https://www.tokped.com/spring-windbreaker',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/spring-windbreaker',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T03:20:51.441Z',
        ProductImages: [
            {
                productimageid: '228841cb-63c1-4e70-b78d-65833fa5a727',
                imageid: '213f8902-424f-4683-ac81-8aa8cdded261',
                isdefault: true,
                color: '#00FF7F',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/faf76160-9c09-44d3-abc5-bfd3f25e44f2.jpg',
                },
            },
            {
                productimageid: '1d30eb4e-313a-4f8e-9a42-3fca7036c7cc',
                imageid: '1ec24b80-2f59-443a-b4a4-385376414919',
                isdefault: true,
                color: '#4682B4',
                Image: {
                    imagepath: 'images/xvi-side.jpg',
                },
            },
        ],
        ProductCategories: [
            {
                productcategoryid: '0e12ac4f-8c6c-4433-9343-aa3d86b2fd86',
                productid: '8dcf05b6-15c3-440a-acda-5550594713ea',
                categorydetailid: '9074f328-aee8-4ddc-9f6e-e665c91822cb',
                CategoryDetail: {
                    categorydetailid: '9074f328-aee8-4ddc-9f6e-e665c91822cb',
                    categoryid: 'fc64fa3e-cd69-438a-9201-960f0f48491f',
                    categorydetailname: 'Our Pick',
                    Category: {
                        categoryid: 'fc64fa3e-cd69-438a-9201-960f0f48491f',
                        categoryname: 'Our Pick',
                    },
                },
            },
        ],
    },
    {
        productid: '2292752b-c330-4c78-89d5-5ce96a143d18',
        productname: 'Winter Coat',
        shipping: 'Warm and cozy for the winter season.',
        price: '200.00',
        discountprice: '150.00',
        brand: 'WinterWardrobe',
        colors: ['#000000', '#B22222'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Fleece',
        onlinestores: [
            {
                link: 'https://www.tokped.com/winter-coat',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/winter-coat',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T03:18:22.443Z',
        ProductImages: [
            {
                productimageid: '2928cb30-269f-471f-b1b1-f8d1bf2b387c',
                imageid: 'b1b14a18-33c5-4572-a1f1-6e934bc65986',
                isdefault: true,
                color: '#000000',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/ef850124-1abd-4aad-81e2-b13e8a80270e.jpg',
                },
            },
        ],
        ProductCategories: [
            {
                productcategoryid: '5e84b303-208c-4576-a494-072ebb9ecfca',
                productid: '2292752b-c330-4c78-89d5-5ce96a143d18',
                categorydetailid: '5b828386-e412-4014-aef2-01841b6532f3',
                CategoryDetail: {
                    categorydetailid: '5b828386-e412-4014-aef2-01841b6532f3',
                    categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                    categorydetailname: 'Coat',
                    Category: {
                        categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                        categoryname: 'Outer',
                    },
                },
            },
        ],
    },
    {
        productid: '1eaa20d2-d710-47c4-b965-fd9eaeafff2e',
        productname: 'New Name',
        shipping: 'This is an updated description',
        price: '150.00',
        discountprice: '120.00',
        brand: 'FallFashion',
        colors: ['#FF5733', '#33FF57'],
        sizes: ['M', 'L'],
        material: 'Cotton',
        onlinestores: [
            {
                link: 'https://www.tokped.com/updated-product',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/updated-product',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T02:48:36.551Z',
        ProductImages: [
            {
                productimageid: '29420150-9695-4eab-a034-7fba6ec94619',
                imageid: '19f86092-d84d-438f-9605-e543cc44b43f',
                isdefault: true,
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/7dfe36d9-0c44-4a4c-9d73-a172993e76f8.jpg',
                },
            },
        ],
        ProductCategories: [],
    },
    {
        productid: '676bb2a4-0ac0-4156-9315-4075fd06d2b4',
        productname: 'Urban Explorer Jacket',
        shipping:
            'Versatile jacket for urban adventures, available in multiple colors.',
        price: '180.00',
        discountprice: '140.00',
        brand: 'UrbanGear',
        colors: ['#2F4F4F', '#8B0000', '#556B2F', '#4682B4'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Canvas',
        onlinestores: [
            {
                link: 'https://www.tokped.com/urban-explorer-jacket',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/urban-explorer-jacket',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T03:21:37.371Z',
        ProductImages: [
            {
                productimageid: '96d9fbf2-c17a-4eb7-935b-dd38e8bc67e7',
                imageid: 'aaa0991d-206d-415a-b48e-fbb5d5821909',
                isdefault: true,
                color: '#2F4F4F',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/7787d351-6e74-413c-bbce-0cd7223277ce.jpg',
                },
            },
            {
                productimageid: '96d9fbf2-c17a-4eb7-935b-dd38e8bc67e7',
                imageid: '7196ae9a-0afb-567b-b1b6-790077623f21',
                isdefault: false,
                color: '#2F4F4F',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/055c6c8f-9feb-4372-988f-bce9af89f3c2.jpg',
                },
            },
            {
                productimageid: 'd81fc456-2157-4303-9a6a-093e0e2e7f3f',
                imageid: '8b215399-e62d-40c5-9316-585130d3e193',
                isdefault: true,
                color: '#8B0000',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/055c6c8f-9feb-4372-988f-bce9af89f3c2.jpg',
                },
            },
            {
                productimageid: 'da7579ff-3a6b-44b7-b19e-511168dc66ec',
                imageid: '147e0db8-bc14-4c8d-a364-17e55228abfa',
                isdefault: true,
                color: '#556B2F',
                Image: {
                    imagepath: 'images/urban-explorer-jacket-olive.jpg',
                },
            },
            {
                productimageid: '3b638d56-a01d-4414-90b9-58d8ac249a4f',
                imageid: '9ed87bfb-17b1-490c-ac8b-7bc36f77244d',
                isdefault: true,
                color: '#4682B4',
                Image: {
                    imagepath: 'images/urban-explorer-jacket-steelblue.jpg',
                },
            },
        ],
        ProductCategories: [
            {
                productcategoryid: 'c876961c-80d4-4cdf-a43f-aaec29081ea6',
                productid: '676bb2a4-0ac0-4156-9315-4075fd06d2b4',
                categorydetailid: '099eb63b-035c-46e3-b301-c485f38e9e01',
                CategoryDetail: {
                    categorydetailid: '099eb63b-035c-46e3-b301-c485f38e9e01',
                    categoryid: 'cae649d7-8414-4292-bf5a-01f4d9628440',
                    categorydetailname: 'Winter',
                    Category: {
                        categoryid: 'cae649d7-8414-4292-bf5a-01f4d9628440',
                        categoryname: 'Season',
                    },
                },
            },
            {
                productcategoryid: '9109ae65-8fe9-4510-a386-f89c9ea8faf8',
                productid: '676bb2a4-0ac0-4156-9315-4075fd06d2b4',
                categorydetailid: 'a5fe5da9-264d-48b0-b213-c73e38aebed9',
                CategoryDetail: {
                    categorydetailid: 'a5fe5da9-264d-48b0-b213-c73e38aebed9',
                    categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                    categorydetailname: 'Blazer & Jacket',
                    Category: {
                        categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                        categoryname: 'Outer',
                    },
                },
            },
        ],
    },
    {
        productid: '8dcf05b6-15c3-440a-acda-5550594712ea',
        productname: 'FF XVI',
        shipping: 'Mau keluar di PC loh.',
        price: '50.00',
        discountprice: '50.00',
        brand: 'SquareEnix',
        colors: ['#00FF7F', '#4682B4'],
        sizes: ['M', 'L'],
        material: 'Joy',
        onlinestores: [
            {
                link: 'https://www.tokped.com/spring-windbreaker',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/spring-windbreaker',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T03:20:51.441Z',
        ProductImages: [
            {
                productimageid: '228841cb-63c1-4e70-b78d-65833fa5a727',
                imageid: '213f8902-424f-4683-ac81-8aa8cdded261',
                isdefault: true,
                color: '#00FF7F',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/faf76160-9c09-44d3-abc5-bfd3f25e44f2.jpg',
                },
            },
            {
                productimageid: '1d30eb4e-313a-4f8e-9a42-3fca7036c7cc',
                imageid: '1ec24b80-2f59-443a-b4a4-385376414919',
                isdefault: true,
                color: '#4682B4',
                Image: {
                    imagepath: 'images/xvi-side.jpg',
                },
            },
        ],
        ProductCategories: [
            {
                productcategoryid: '0e12ac4f-8c6c-4433-9343-aa3d86b2fd86',
                productid: '8dcf05b6-15c3-440a-acda-5550594712ea',
                categorydetailid: '9074f328-aee8-4ddc-9f6e-e665c91822cb',
                CategoryDetail: {
                    categorydetailid: '9074f328-aee8-4ddc-9f6e-e665c91822cb',
                    categoryid: 'fc64fa3e-cd69-438a-9201-960f0f48491f',
                    categorydetailname: 'Our Pick',
                    Category: {
                        categoryid: 'fc64fa3e-cd69-438a-9201-960f0f48491f',
                        categoryname: 'Our Pick',
                    },
                },
            },
        ],
    },
    {
        productid: '2292752b-c330-4c78-89d5-5ce96a143d28',
        productname: 'Winter Coat',
        shipping: 'Warm and cozy for the winter season.',
        price: '200.00',
        discountprice: '150.00',
        brand: 'WinterWardrobe',
        colors: ['#000000', '#B22222'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Fleece',
        onlinestores: [
            {
                link: 'https://www.tokped.com/winter-coat',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/winter-coat',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T03:18:22.443Z',
        ProductImages: [
            {
                productimageid: '2928cb30-269f-471f-b1b1-f8d1bf2b387c',
                imageid: 'b1b14a18-33c5-4572-a1f1-6e934bc65986',
                isdefault: true,
                color: '#000000',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/ef850124-1abd-4aad-81e2-b13e8a80270e.jpg',
                },
            },
        ],
        ProductCategories: [
            {
                productcategoryid: '5e84b303-208c-4576-a494-072ebb9ecfca',
                productid: '2292752b-c330-4c78-89d5-5ce96a143d28',
                categorydetailid: '5b828386-e412-4014-aef2-01841b6532f3',
                CategoryDetail: {
                    categorydetailid: '5b828386-e412-4014-aef2-01841b6532f3',
                    categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                    categorydetailname: 'Coat',
                    Category: {
                        categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                        categoryname: 'Outer',
                    },
                },
            },
        ],
    },
    {
        productid: '1eaa20d2-d710-47c4-b965-fd9eaeafff3e',
        productname: 'New Name',
        shipping: 'This is an updated description',
        price: '150.00',
        discountprice: '120.00',
        brand: 'FallFashion',
        colors: ['#FF5733', '#33FF57'],
        sizes: ['M', 'L'],
        material: 'Cotton',
        onlinestores: [
            {
                link: 'https://www.tokped.com/updated-product',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/updated-product',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T02:48:36.551Z',
        ProductImages: [
            {
                productimageid: '29420150-9695-4eab-a034-7fba6ec94619',
                imageid: '19f86092-d84d-438f-9605-e543cc44b43f',
                isdefault: true,
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/7dfe36d9-0c44-4a4c-9d73-a172993e76f8.jpg',
                },
            },
        ],
        ProductCategories: [],
    },
    {
        productid: '676bb2a4-0ac0-4156-9315-4075fd06d2b1',
        productname: 'Urban Explorer Jacket',
        shipping:
            'Versatile jacket for urban adventures, available in multiple colors.',
        price: '180.00',
        discountprice: '140.00',
        brand: 'UrbanGear',
        colors: ['#2F4F4F', '#8B0000', '#556B2F', '#4682B4'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Canvas',
        onlinestores: [
            {
                link: 'https://www.tokped.com/urban-explorer-jacket',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/urban-explorer-jacket',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T03:21:37.371Z',
        ProductImages: [
            {
                productimageid: '96d9fbf2-c17a-4eb7-935b-dd38e8bc67e7',
                imageid: 'aaa0991d-206d-415a-b48e-fbb5d5821909',
                isdefault: true,
                color: '#2F4F4F',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/7787d351-6e74-413c-bbce-0cd7223277ce.jpg',
                },
            },
            {
                productimageid: '96d9fbf2-c17a-4eb7-935b-dd38e8bc67e7',
                imageid: '7196ae9a-0afb-567b-b1b6-790077623f21',
                isdefault: false,
                color: '#2F4F4F',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/055c6c8f-9feb-4372-988f-bce9af89f3c2.jpg',
                },
            },
            {
                productimageid: 'd81fc456-2157-4303-9a6a-093e0e2e7f3f',
                imageid: '8b215399-e62d-40c5-9316-585130d3e193',
                isdefault: true,
                color: '#8B0000',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/055c6c8f-9feb-4372-988f-bce9af89f3c2.jpg',
                },
            },
            {
                productimageid: 'da7579ff-3a6b-44b7-b19e-511168dc66ec',
                imageid: '147e0db8-bc14-4c8d-a364-17e55228abfa',
                isdefault: true,
                color: '#556B2F',
                Image: {
                    imagepath: 'images/urban-explorer-jacket-olive.jpg',
                },
            },
            {
                productimageid: '3b638d56-a01d-4414-90b9-58d8ac249a4f',
                imageid: '9ed87bfb-17b1-490c-ac8b-7bc36f77244d',
                isdefault: true,
                color: '#4682B4',
                Image: {
                    imagepath: 'images/urban-explorer-jacket-steelblue.jpg',
                },
            },
        ],
        ProductCategories: [
            {
                productcategoryid: 'c876961c-80d4-4cdf-a43f-aaec29081ea6',
                productid: '676bb2a4-0ac0-4156-9315-4075fd06d2b1',
                categorydetailid: '099eb63b-035c-46e3-b301-c485f38e9e01',
                CategoryDetail: {
                    categorydetailid: '099eb63b-035c-46e3-b301-c485f38e9e01',
                    categoryid: 'cae649d7-8414-4292-bf5a-01f4d9628440',
                    categorydetailname: 'Winter',
                    Category: {
                        categoryid: 'cae649d7-8414-4292-bf5a-01f4d9628440',
                        categoryname: 'Season',
                    },
                },
            },
            {
                productcategoryid: '9109ae65-8fe9-4510-a386-f89c9ea8faf8',
                productid: '676bb2a4-0ac0-4156-9315-4075fd06d2b1',
                categorydetailid: 'a5fe5da9-264d-48b0-b213-c73e38aebed9',
                CategoryDetail: {
                    categorydetailid: 'a5fe5da9-264d-48b0-b213-c73e38aebed9',
                    categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                    categorydetailname: 'Blazer & Jacket',
                    Category: {
                        categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                        categoryname: 'Outer',
                    },
                },
            },
        ],
    },
    {
        productid: '8dcf05b6-15c3-440a-acda-5550594755ea',
        productname: 'FF XVI',
        shipping: 'Mau keluar di PC loh.',
        price: '50.00',
        discountprice: '50.00',
        brand: 'SquareEnix',
        colors: ['#00FF7F', '#4682B4'],
        sizes: ['M', 'L'],
        material: 'Joy',
        onlinestores: [
            {
                link: 'https://www.tokped.com/spring-windbreaker',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/spring-windbreaker',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T03:20:51.441Z',
        ProductImages: [
            {
                productimageid: '228841cb-63c1-4e70-b78d-65833fa5a727',
                imageid: '213f8902-424f-4683-ac81-8aa8cdded261',
                isdefault: true,
                color: '#00FF7F',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/faf76160-9c09-44d3-abc5-bfd3f25e44f2.jpg',
                },
            },
            {
                productimageid: '1d30eb4e-313a-4f8e-9a42-3fca7036c7cc',
                imageid: '1ec24b80-2f59-443a-b4a4-385376414919',
                isdefault: true,
                color: '#4682B4',
                Image: {
                    imagepath: 'images/xvi-side.jpg',
                },
            },
        ],
        ProductCategories: [
            {
                productcategoryid: '0e12ac4f-8c6c-4433-9343-aa3d86b2fd86',
                productid: '8dcf05b6-15c3-440a-acda-5550594755ea',
                categorydetailid: '9074f328-aee8-4ddc-9f6e-e665c91822cb',
                CategoryDetail: {
                    categorydetailid: '9074f328-aee8-4ddc-9f6e-e665c91822cb',
                    categoryid: 'fc64fa3e-cd69-438a-9201-960f0f48491f',
                    categorydetailname: 'Our Pick',
                    Category: {
                        categoryid: 'fc64fa3e-cd69-438a-9201-960f0f48491f',
                        categoryname: 'Our Pick',
                    },
                },
            },
        ],
    },
    {
        productid: '2292752b-c330-4c78-89d5-5ce96a143d38',
        productname: 'Winter Coat',
        shipping: 'Warm and cozy for the winter season.',
        price: '200.00',
        discountprice: '150.00',
        brand: 'WinterWardrobe',
        colors: ['#000000', '#B22222'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Fleece',
        onlinestores: [
            {
                link: 'https://www.tokped.com/winter-coat',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/winter-coat',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T03:18:22.443Z',
        ProductImages: [
            {
                productimageid: '2928cb30-269f-471f-b1b1-f8d1bf2b387c',
                imageid: 'b1b14a18-33c5-4572-a1f1-6e934bc65986',
                isdefault: true,
                color: '#000000',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/ef850124-1abd-4aad-81e2-b13e8a80270e.jpg',
                },
            },
        ],
        ProductCategories: [
            {
                productcategoryid: '5e84b303-208c-4576-a494-072ebb9ecfca',
                productid: '2292752b-c330-4c78-89d5-5ce96a143d38',
                categorydetailid: '5b828386-e412-4014-aef2-01841b6532f3',
                CategoryDetail: {
                    categorydetailid: '5b828386-e412-4014-aef2-01841b6532f3',
                    categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                    categorydetailname: 'Coat',
                    Category: {
                        categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                        categoryname: 'Outer',
                    },
                },
            },
        ],
    },
    {
        productid: '1eaa20d2-d710-47c4-b965-fd9eaeafff4e',
        productname: 'New Name',
        shipping: 'This is an updated description',
        price: '150.00',
        discountprice: '120.00',
        brand: 'FallFashion',
        colors: ['#FF5733', '#33FF57'],
        sizes: ['M', 'L'],
        material: 'Cotton',
        onlinestores: [
            {
                link: 'https://www.tokped.com/updated-product',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/updated-product',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T02:48:36.551Z',
        ProductImages: [
            {
                productimageid: '29420150-9695-4eab-a034-7fba6ec94619',
                imageid: '19f86092-d84d-438f-9605-e543cc44b43f',
                isdefault: true,
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/7dfe36d9-0c44-4a4c-9d73-a172993e76f8.jpg',
                },
            },
        ],
        ProductCategories: [],
    },
    {
        productid: '2292752b-c330-4c78-89d5-5ce26a143d38',
        productname: 'Winter Coat',
        shipping: 'Warm and cozy for the winter season.',
        price: '200.00',
        discountprice: '150.00',
        brand: 'WinterWardrobe',
        colors: ['#000000', '#B22222'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Fleece',
        onlinestores: [
            {
                link: 'https://www.tokped.com/winter-coat',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/winter-coat',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T03:18:22.443Z',
        ProductImages: [
            {
                productimageid: '2928cb30-269f-471f-b1b1-f8d1bf2b387c',
                imageid: 'b1b14a18-33c5-4572-a1f1-6e934bc65986',
                isdefault: true,
                color: '#000000',
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/ef850124-1abd-4aad-81e2-b13e8a80270e.jpg',
                },
            },
        ],
        ProductCategories: [
            {
                productcategoryid: '5e84b303-208c-4576-a494-072ebb9ecfca',
                productid: '2292752b-c330-4c78-89d5-5ce96a143d38',
                categorydetailid: '5b828386-e412-4014-aef2-01841b6532f3',
                CategoryDetail: {
                    categorydetailid: '5b828386-e412-4014-aef2-01841b6532f3',
                    categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                    categorydetailname: 'Coat',
                    Category: {
                        categoryid: '108ff555-161d-4832-afa8-69ee9a76450d',
                        categoryname: 'Outer',
                    },
                },
            },
        ],
    },
    {
        productid: '1eaa20d2-d710-47c4-b965-fd3eaeafff4e',
        productname: 'New Name',
        shipping: 'This is an updated description',
        price: '150.00',
        discountprice: '120.00',
        brand: 'FallFashion',
        colors: ['#FF5733', '#33FF57'],
        sizes: ['M', 'L'],
        material: 'Cotton',
        onlinestores: [
            {
                link: 'https://www.tokped.com/updated-product',
                onlineStore: 'tokped',
            },
            {
                link: 'https://www.shopee.com/updated-product',
                onlineStore: 'shopee',
            },
        ],
        status: true,
        createddate: '2024-08-22T02:48:36.551Z',
        ProductImages: [
            {
                productimageid: '29420150-9695-4eab-a034-7fba6ec94619',
                imageid: '19f86092-d84d-438f-9605-e543cc44b43f',
                isdefault: true,
                Image: {
                    imagepath:
                        'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/7dfe36d9-0c44-4a4c-9d73-a172993e76f8.jpg',
                },
            },
        ],
        ProductCategories: [],
    },
]

const Products = () => {
    const handleOnChange = () => {}
    return (
        <div className="relative mx-4 w-full">
            <table className="top-0 z-10 min-w-full bg-white">
                <thead className="top-0 z-10 whitespace-nowrap bg-gray-100">
                    <tr className="top-0 z-10">
                        <th className="top-0 z-10 w-24 p-4 text-left text-xs font-semibold text-gray-800">
                            Product Image
                        </th>
                        <th className="top-0 z-10 p-4 text-left text-xs font-semibold text-gray-800">
                            Product Name
                        </th>
                        <th className="top-0 z-10 p-4 text-left text-xs font-semibold text-gray-800">
                            Price
                        </th>
                        <th className="top-0 z-10 p-4 text-left text-xs font-semibold text-gray-800">
                            Last Edited
                        </th>
                        <th className="top-0 z-10 w-[1%] p-4 text-end text-xs font-semibold text-gray-800">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="max-h-40 overflow-auto whitespace-nowrap">
                    {productItems.map((item, index) => (
                        <tr className="hover:bg-gray-50" key={item.productid}>
                            <td className="table-cell size-24 p-4 text-gray-800">
                                <Link to={`/products/${item.productid}`}>
                                    <img
                                        src={
                                            item.ProductImages.find(
                                                (image) => image.isdefault
                                            ).Image.imagepath
                                        }
                                        className="h-full w-full"
                                    />
                                </Link>
                            </td>
                            <td className="p-4 text-gray-800">
                                <Button
                                    isLink={true}
                                    type={'link'}
                                    urlTarget={`/products/${item.productid}`}
                                    text={item.productname}
                                    className="!justify-start"
                                />
                            </td>
                            <td className="p-4 text-gray-800">{item.price}</td>
                            <td className="p-4 text-gray-800">
                                {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                }).format(new Date(item.createddate))}
                            </td>
                            <td className="w-[1%] p-4">
                                <div className="inline-flex w-full items-center justify-end gap-4">
                                    <Switch isChecked={item.status} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Products
