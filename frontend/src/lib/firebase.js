import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, ref, deleteObject } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAIAUWB75E0UzkoFQ6dn7Hw6M2hGZXvV_A",
    authDomain: "joelyn-lashes.firebaseapp.com",
    projectId: "joelyn-lashes",
    storageBucket: "joelyn-lashes.appspot.com",
    messagingSenderId: "992413047394",
    appId: "1:992413047394:web:06be736845276d5259cf3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)



export function uploadImage(imageUpload, filename) {
    if (!imageUpload) return
    if (!filename) {
        filename = new Date().toISOString().replace(/:/g, '-') + '_' + imageUpload.name
    }

    const imageRef = ref(storage, `images/${filename}`)
    uploadBytes(imageRef, imageUpload)
        .then(() => {
            alert('Image Uploaded.')
        })
        .catch(() => {
            alert('Error. Image was not Uploaded.')
        })
}

export function replaceImage(oldImage, imageUpload, filename) {
    const oldImageRef = `images/${oldImage}`
    console.log(oldImageRef)
    const desertRef = ref(storage, oldImageRef);

    // Delete Image
    deleteObject(desertRef)
        .then(() => {
            alert('Successfully deleted old image')
            uploadImage(imageUpload, filename)
        })
        .catch(() => {
            alert('Error. Trying to Delete Old Image.')
            uploadImage(imageUpload, filename)
        });


}