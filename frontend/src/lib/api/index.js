import axios from 'axios'

const BASE_API = 'http://localhost:5000/api'
export const IMAGE_API = 'http://localhost:5000/image'

// SERIVCES //
export async function get_AllServices() {
    const res = await axios.get(`${BASE_API}/services`)
    return res.data
}


export async function get_SingleService(_id) {
    const res = await axios.get(`${BASE_API}/services/${_id}`)
    return res.data
}

export async function get_SingleServiceByCategory(category) {
    const res = await axios.get(`${BASE_API}/services/category/${category}`)
    return res.data
}

export async function post_AddService(token, body) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.post(`${BASE_API}/services/add`, body, config)
    return res.data
}

export async function delete_RemoveService(token, id) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.delete(`${BASE_API}/services/${id}`, config)
    return res.data
}

export async function put_UpdateService(token, id, body) {
    const imgInput = Object.keys(body).some((item) => item === 'img')
    if (!imgInput) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        const res = await axios.put(`${BASE_API}/services/${id}`, body, config)
        return res.data
    } else {
        const formData = new FormData()
        formData.append('image', body.img)
        formData.append('text', body.name)
        const options = {
            method: 'PUT',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const res = await fetch(`${BASE_API}/services/${id}`, options)
            return res
        } catch (error) {
            return null
        }

    }

}



// BOOKINGS //
export async function get_AllBookings(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.get(`${BASE_API}/bookings`, config)
    return res.data
}

export async function get_SingleBooking(token, id) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }

    const res = await axios.get(`${BASE_API}/bookings/${id}`, config)
    return res.data
}

export async function post_AddBooking(body) {
    const res = await axios.post(`${BASE_API}/bookings/add`, body)
    return res.data
}

export async function delete_RemoveBooking(token, id) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.delete(`${BASE_API}/bookings/${id}`, config)
    return res.data
}

export async function put_UpdateBooking(token, id, body) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    const res = await axios.put(`${BASE_API}/bookings/${id}`, body, config)
    return res.data
}

// AVAILABILITY //
export async function get_AllDates() {

    const res = await axios.get(`${BASE_API}/availability`)
    return res.data
}

export async function post_AddDate(token, body) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    console.log(config)
    const res = await axios.post(`${BASE_API}/availability/add`, body, config)
    return res.data
}

export async function delete_RemoveDate(token, data) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data
    }

    const res = await axios.delete(`${BASE_API}/availability/remove`, config)
    return res.data
}


// ADMIN //
export async function post_Login(body) {
    const res = await axios.post(`${BASE_API}/admin/login`, body)
    return res.data
}

export async function put_UpdateProfile(token, body) {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.put(`${BASE_API}/admin/update`, body, config)
        return res.data
    } catch (error) {
        return null
    }

}


// IMAGES //
export function get_Img(img) {
    const url = `http://localhost:5000/image/${img}`
    axios.get(url, {
        responseType: 'blob',
        headers: {
            "Content-Type": "image/jpeg"
        }
    })
        .then((res) => {
            return res.data
        })
}