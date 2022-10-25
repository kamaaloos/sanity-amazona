export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            title: 'User',
            name: 'user',
            type: 'reference',
            to: [{ type: 'user' }],
                options: {
                    disableNew: true,
                },
        },
        {
            name: 'username',
            title: 'username',
            type: 'string',
        },
        {
            name: 'itemsPrice',
            title: 'itemsPrice',
            type: 'number',
        },
        {
            name: 'shippingPrice',
            title: 'shippingPrice',
            type: 'number',
        },
        {
            name: 'taxPrice',
            title: 'taxPrice',
            type: 'number',
        },
        {
            name: 'totalPrice',
            title: 'totalPrice',
            type: 'number',
        },
        {
            name: 'paymentMethod',
            title: 'paymentMethod',
            type: 'string',
        },
        {
            name: 'shippingAddress',
            title: 'shippingAddress',
            type: 'shippingAddress',
        },
        {
            name: 'paymentResult',
            title: 'paymentResult',
            type: 'paymentResult',
        },
        {
            name: 'orderItems',
            title: 'order Items',
            type: 'array',
            of: [
                {
                    title: 'Order Item',
                    type: 'orderItem',
                }
            ],
        },
        {
            title: 'isPaid',
            name: 'isPaid',
            type: 'boolean',
        },
        {
            title: 'Paid Date',
            name: 'paidAt',
            type: 'datetime',
        },
        {
            title: 'isDelivered',
            name: 'isDelivered',
            type: 'boolean',
        },
        {
            title: 'DeliveredAt',
            name: 'deliveredAt',
            type: 'datetime',
        },
        {
            title: 'CreatedAt',
            name: 'createdAt',
            type: 'datetime',
        },
    ],
};