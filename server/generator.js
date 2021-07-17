const moment = require("moment")

const REGIONS = ["Europe", "USA", "Australia", "Brazil", "India"]
const PRODUCT_CATEGORIES = ["Alcohol", "Vegetables", "Meat", "Fish", "Soft drinks", "Tobacco", "Baking", "Cheese", "Snacks"]
const FIRST_NAMES = ["John", "Trisha", "Greg", "Martijn", "Mike", "Magda", "Tim", "Jean", "Pablo", "Daniels", "Jack", "Carla", "Allan", "Saidi", "Martin"]
const LAST_NAMES = ["Smith", "van Dijk", "Muijs", "Del Piero", "Doe", "Cook", "Castex", "Escobar", "Mohaman", "Wu", "Dupuis", "Priete", "Jackson", "Martins"]


function randomInt(minimum, ceiling, step = 1) {
    return ((minimum / step) + Math.floor(Math.random() * (ceiling / step - minimum / step))) * step;
}

function randomFloat(minimum, ceiling, step = 1) {
    return ((minimum / step) + Math.random() * (ceiling / step - minimum / step)) * step;
}

function randomElement(arr) {
    return arr[randomInt(0, arr.length)];
}

function generateProducts() {
    const products = []
    PRODUCT_CATEGORIES.forEach((category, iCat) => {
        let nbProducts = randomInt(5, 10)
        for (let iProd=1; iProd < nbProducts; iProd++) {
            let salePrice = Math.round(100 * randomFloat(0.5, 50)) / 100;
            products.push({
                id: iCat * PRODUCT_CATEGORIES.length + iProd,
                category,
                name: `${category} - ${iProd}`,
                sale_price: salePrice,
                margin: Math.round(100 * randomFloat(0, salePrice / 4)) / 100
            })
        }
    })
    return products
}

function generateCostumers() {
    const customers = []
    for (let id=1; id < 40; id++) {
        customers.push({
            id,
            firstName: randomElement(FIRST_NAMES),
            lastName: randomElement(LAST_NAMES),
        })
    }
    return customers
}

function generateInvoices(products, customers) {
    const invoices = []
    for (let invoiceId = 1; invoiceId < 250; invoiceId++) {
        const lines = []
        const productIds = []
        const nbLines = randomInt(1, 20);
        for (let iProd = 0; iProd < nbLines; iProd++) {
            let product = randomElement(products)
            while (productIds.includes(product.id)) {
                product = randomElement(products)
            }
            productIds.push(product.id)
            const quantity = randomInt(1, 150)
            lines.push({
                product_id: product.id,
                product_name: product.name,
                product_category: product.category,
                unit_price: product.sale_price,
                quantity,
                total_line: quantity * product.sale_price,
                total_margin: quantity * product.margin
            })
        }

        const customer = randomElement(customers)
        invoices.push({
            id: invoiceId,
            customer_id: customer.id,
            customer_name: `${customer.firstName} ${customer.lastName}`,
            date: moment("2020-01-01").add(randomInt(1, 364), "days").format("YYYY-MM-DD"),
            invoice_lines: lines,
            total_invoice: lines.reduce((sum, line) => sum + line.total_line, 0),
            total_margin: lines.reduce((sum, line) => sum + line.total_margin, 0),
            region: randomElement(REGIONS)
        })
    }

    return invoices
}

function calculatePeriodicRevenues(invoices, type) {
    const formatType = {
        month: "YYYY-MM",
        week: "YYYY [W-]ww"
    }[type]
    const revenues = invoices.reduce((periodRevenues, invoice) => {
        const periodValue = moment(invoice.date).format(formatType)
        if (!periodRevenues[periodValue]) {
            periodRevenues[periodValue] = {
                [type]: periodValue,
                start_date: moment(invoice.date).startOf(type).format('YYYY-MM-DD'),
                end_date: moment(invoice.date).endOf(type).format('YYYY-MM-DD'),
                invoices_count: 1,
                total_margin: invoice.total_margin,
                total_revenue: invoice.total_invoice
            }
        } else {
            periodRevenues[periodValue] = {
                ...periodRevenues[periodValue],
                invoices_count: periodRevenues[periodValue].invoices_count + 1,
                total_margin: periodRevenues[periodValue].total_margin + invoice.total_margin,
                total_revenue: periodRevenues[periodValue].total_revenue + invoice.total_invoice
            }
        }
        return periodRevenues
    }, {})
    return Object.values(revenues)
}

function calculateCostumerRevenues(invoices) {
    const data = {}
    invoices.forEach(invoice => {
        if (!data[invoice.customer_name]) {
            data[invoice.customer_name] = {
                customer_id: invoice.customer_id,
                customer_name: invoice.customer_name,
                total_revenue: invoice.total_invoice,
                total_margin: invoice.total_margin,
                invoices_count: 1,
            }
        } else {
            data[invoice.customer_name].total_revenue += invoice.total_invoice
            data[invoice.customer_name].total_margin += invoice.total_margin
            data[invoice.customer_name].invoices_count += 1
        }
    })
    return Object.values(data)
}

function calculateCategoriesRevenues(invoices) {
    const data = {}
    invoices.forEach(invoice => {
        invoice.invoice_lines.forEach(line => {
            if (!data[line.product_category]) {
                data[line.product_category] = {
                    category_name: line.product_category,
                    total_revenue: line.total_line,
                    total_margin: line.total_margin
                }
            } else {
                data[line.product_category].total_revenue += line.total_line
                data[line.product_category].total_margin += line.total_margin
            }
        })
    })
    return Object.values(data)
}

module.exports = () => {
    const products = generateProducts()
    const customers = generateCostumers()
    const invoices = generateInvoices(products, customers)
    const monthRevenues = calculatePeriodicRevenues(invoices, "month")
    const weekRevenues = calculatePeriodicRevenues(invoices, "week")
    const customersRevenues = calculateCostumerRevenues(invoices)
    const categoriesRevenues = calculateCategoriesRevenues(invoices)
    const kpis = [
        { label: "Costumers count", value: customers.length },
        { label: "Invoices count", value: invoices.length },
        { label: "Categories count", value: PRODUCT_CATEGORIES.length },
        { label: "Products count", value: products.length },
        { label: "Total margin", value: monthRevenues.reduce((sum, monthValue) => sum + monthValue.total_margin, 0) },
        { label: "Total revenues", value: monthRevenues.reduce((sum, monthValue) => sum + monthValue.total_revenue, 0) },
    ]
    return {
        products,
        customers,
        invoices,
        kpis,
        "monthly-revenues": monthRevenues,
        "weekly-revenues": weekRevenues,
        "customers-revenues": customersRevenues,
        "categories-revenues": categoriesRevenues
    }
}
