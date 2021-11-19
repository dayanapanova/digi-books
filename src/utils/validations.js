import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().min(4).required()
})