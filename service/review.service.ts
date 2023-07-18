export const getReviewService = async () => {
    // return await reviewsCollection.find().toArray()
}
export const addReviewService = async (data: any) => {
    const { img, name, review, ratings, email } = data
    const options = { upsert: true };
    const updateDoc = {
        $set: { email, review, ratings, img, name }
    };
    // return await reviewsCollection.updateOne({ email }, updateDoc, options)
}