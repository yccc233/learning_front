
const simpleNodes = [
    { key: 'one', color: 'lightblue' },
    { key: 'two', color: 'orange' },
    { key: 'three', color: 'lightgreen' },
    { key: 'four', color: 'pink' }
];

const simpleLinks = [
    {from: "one", to: "three"},
    {from: "one", to: "two"},
    {from: "two", to: "one"},
    {from: "four", to: "one"},
]



const colors = {
    'red': '#be4b15',
    'green': '#52ce60',
    'blue': '#6ea5f8',
    'lightred': '#fd8852',
    'lightblue': '#afd4fe',
    'lightgreen': '#b9e986',
    'pink': '#faadc1',
    'purple': '#d689ff',
    'orange': '#fdb400',
}

const PanelNodes = [
    {
        key: "Products",
        items: [{ name: "ProductID", iskey: true, figure: "Decision", color: colors.red },
            { name: "ProductName", iskey: false, figure: "Hexagon", color: colors.blue },
            { name: "SupplierID", iskey: false, figure: "Decision", color: "purple" },
            { name: "CategoryID", iskey: false, figure: "Decision", color: "purple" }]
    },
    {
        key: "Suppliers",
        items: [{ name: "SupplierID", iskey: true, figure: "Decision", color: colors.red },
            { name: "CompanyName", iskey: false, figure: "Hexagon", color: colors.blue },
            { name: "ContactName", iskey: false, figure: "Hexagon", color: colors.blue },
            { name: "Address", iskey: false, figure: "Hexagon", color: colors.blue }]
    },
    {
        key: "Categories",
        items: [{ name: "CategoryID", iskey: true, figure: "Decision", color: colors.red },
            { name: "CategoryName", iskey: false, figure: "Hexagon", color: colors.blue },
            { name: "Description", iskey: false, figure: "Hexagon", color: colors.blue },
            { name: "Picture", iskey: false, figure: "TriangleUp", color: colors.pink }]
    },
    {
        key: "Order Details",
        items: [{ name: "OrderID", iskey: true, figure: "Decision", color: colors.red },
            { name: "ProductID", iskey: true, figure: "Decision", color: colors.red },
            { name: "UnitPrice", iskey: false, figure: "Circle", color: colors.green },
            { name: "Quantity", iskey: false, figure: "Circle", color: colors.green },
            { name: "Discount", iskey: false, figure: "Circle", color: colors.green }]
    },
];

const PanelLinks = [
    { from: "Products", to: "Suppliers", text: "0..N", toText: "1" },
    { from: "Products", to: "Categories", text: "0..N", toText: "1" },
    { from: "Order Details", to: "Products", text: "0..N", toText: "1" }
];









module.exports = {
    sNodes: simpleNodes,
    sLinks: simpleLinks,
    pNodes: PanelNodes,
    pLinks: PanelLinks
}