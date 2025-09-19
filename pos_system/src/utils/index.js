export const transformProductInfo = (items) => {
    let result = []
    const list = items.map(item => {
        result.push({
            id: item?.id,
            label: item?.label?.toUpperCase(),
            price: item?.price,
            quantity: item?.quantity || 0,
            total: (item?.quantity) ? (item?.quantity * item?.price) : 0,
        });
        if (!!item?.customization && !!item?.customization.length) {
            const list = transformProductInfo(item?.customization);
            result = [...result, ...list]
        }
    });
    return result;
}