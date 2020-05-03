export const CART = {
	ADD: "ADD_TO_CART",
	REMOVE: "REMOVE_FROM_CART"
};

export const cartActions = {
	add: ({ photoCode, thumbnail, quantity }) => ({
		type: CART.ADD,
		photoCode,
		thumbnail,
		quantity
	}),
	remove: photoCode => ({
		type: CART.REMOVE,
		photoCode
	})
};
