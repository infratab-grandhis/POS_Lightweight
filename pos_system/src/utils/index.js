export const transformProductInfo = (items, isMainProduct = true) => {
    let result = []
    const list = items.map((item, index) => {
        result.push({
            id: item?.id,
            label: item?.label?.toUpperCase(),
            price: item?.price,
            quantity: item?.quantity || 0,
            total: (item?.quantity) ? (item?.quantity * item?.price) : 0,
            isMainIngredient: isMainProduct && index === 0
        });
        if (!!item?.customization && !!item?.customization.length) {
            // Customizations are not main ingredients
            const customizations = transformProductInfo(item?.customization, false);
            result = [...result, ...customizations]
        }
    });
    return result;
}