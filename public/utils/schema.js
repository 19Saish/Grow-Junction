import * as Yup from 'yup'

const nameValidation = new RegExp(/^[^\s*]{1,}[a-zA-Z0-9-_/.&\s*@'"]{1,}$/)
const numberValidation = new RegExp(/^[0-9]{10}$/)

export const RegistrationSchema = () =>
  Yup.object({
    first_name: Yup.string()
      .required('Please enter your first name')
      .matches(nameValidation, 'please enter valid first name'),
    last_name: Yup.string()
      .required('Please enter your last name')
      .matches(nameValidation, 'please enter valid last name'),
    email: Yup.string()
      .email('Please enter valid email')
      .required('Please enter your email id'),
    password: Yup.string()
      .required('Please enter your password')
      .min(6, ({ min }) => 'password must be atleast 6 character'),
    confirm_password: Yup.string()
      .required('Please enter your confirm password')
      .min(6, ({ min }) => 'password must be atleast 6 character')
      .when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'Confirm password not match with password',
        ),
      }),
  })
export const learnersSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  // .nullable(),
  email: Yup.string()
    .required('Please enter a valid email')
    .email('Please enter valid email'),
  // .nullable()

  mobile: Yup.string()
    .required('Please enter your mobileNumber ')
    .matches(numberValidation, 'mobile number is not valid'),
})
export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email address')
    .required('Please enter your email id'),
  // .nullable(),
  password: Yup.string()
    .required('Please enter your password')
    // .nullable()
    .min(6, ({ min }) => 'password must be atleast 6 character'),
})
export const OneOnOneBookingContactSchema = Yup.object().shape({
  name: Yup.string().required('Please enter your email id'),
  // .nullable(),
  emailId: Yup.string()
    .required('Please enter a valid email')
    .email('Please enter valid email address'),
  // .nullable()
  whatsappNumber: Yup.string()
    .required('Please enter your whatsapp number')
    .matches(numberValidation, 'Whatsapp number is not valid'),
  mobileNumber: Yup.string()
    .required('Please enter your mobileNumber ')
    .matches(numberValidation, 'mobile number is not valid'),
})
export const studentRegisterSchema = Yup.object().shape({
  about_yourself: Yup.object().shape({
    first_name: Yup.string().required('Please enter your first name'),
    last_name: Yup.string().required('Please enter your last name'),
  }),
  contact_info: Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
  }),
  // .nullable()
  // .min(6, ({ min }) => 'password must be atleast 6 character'),
})
export const mentorRegisterSchema = Yup.object().shape({
  about_yourself: Yup.object().shape({
    first_name: Yup.string().required('Please enter your first name'),
    last_name: Yup.string().required('Please enter your last name'),
  }),
  contact_info: Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
  }),
  revenueShare: Yup.array().of(
    Yup.object().shape({
      serviceType: Yup.string(),
      revenueShare: Yup.number()
        .min(1, 'Must be at least 1')
        .max(100, 'Max value is 100'),
    }),
  ),
  // .nullable()
  // .min(6, ({ min }) => 'password must be atleast 6 character'),
})
export const ProfessionalDetailSchema = () =>
  Yup.object({
    recent_college: Yup.string().required('Please enter your recent college'),
    degree: Yup.string().required('Please choose any degree'),
  })

export const verifyStep4 = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Please enter your mobile number')
    .matches(numberValidation, 'Phone number is not valid'),
})
