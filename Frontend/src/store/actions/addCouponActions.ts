export default class AddCouponActions {
    static viewPhoto(uri) {
        return { type: 'VIEW_PHOTO', payload: { uri } };
    }

    static updateCheckedPhoto(checkedPhoto) {
        return { type: 'UPDATE_CHECKED_PHOTO', payload: { checkedPhoto } };
    }

    static savePhotosGallery(photosGallery) {
        return { type: 'SAVE_PHOTOS_GALLERY', payload: { photosGallery } };
    }
}
