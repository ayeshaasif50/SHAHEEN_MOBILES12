import API from './api' // uses your axios instance defined in utils/api.js

export async function getProfile() {
  try {
    const res = await API.get('/profile') // adjust endpoint if needed
    return res.data
  } catch (err) {
    return null
  }
}

export async function getReviews() {
  try {
    const res = await API.get('/reviews') // adjust endpoint if needed
    return res.data
  } catch (err) {
    return sampleReviews()
  }
}

function sampleReviews() {
  return [
    {
      id: 1,
      product: "Apple Watch Series 8 GPS 45mm Silver",
      date: "12 Jul 2023",
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      images: ["/images/sample/p1.jpg", "/images/sample/p2.jpg", "/images/sample/p3.jpg"]
    },
    {
      id: 2,
      product: "Apple Watch Series 8 GPS 45mm Silver",
      date: "12 Jul 2023",
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      images: ["/images/sample/p1.jpg", "/images/sample/p2.jpg"]
    }
  ]
}