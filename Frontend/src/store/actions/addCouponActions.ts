export default class AddCouponActions {
    static viewPhoto(uri) {
        return { type: 'VIEW_PHOTO', payload: { uri } };
    }

    static updateCheckedPhoto(checkedPhoto) {
        return { type: 'UPDATE_CHECKED_PHOTO', payload: { checkedPhoto } };
    }
}
