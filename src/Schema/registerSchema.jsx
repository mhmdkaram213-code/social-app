import * as zod from "zod"

export const registerSchema = zod.object({
    name: zod.string().nonempty('Name is Required').min(3, 'Name min 3 char').max(8, 'Name is max 8 char'),
    email: zod.string().nonempty('Email is Required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email'),
    password: zod.string().nonempty('Password is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Invalid Password'),
    rePassword: zod.string().nonempty('rePassword is Required'),
    gender: zod.string().nonempty('Gender is Required'),
    dateOfBirth: zod.coerce.date('Date is Required').refine((value) => {
        let year = value.getFullYear()
        let yearNow = new Date().getFullYear()
        let userAge = yearNow - year
        return userAge >= 20
    }, 'Age less than 20')
}).refine((data)=> data.password === data.rePassword ,{path:["rePassword"] , message:'Invalid rePassword'})
