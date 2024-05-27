import React, { useEffect, useState } from 'react'
import classes from './ProfileSetting.module.css'
import SaveButton from '../../Utilities/SaveBtn/SaveButton'
import { toast } from 'react-toastify'
import { setS3FileUrl } from '../../../utilities/others'
import { v4 as uuid } from 'uuid'
import { API } from 'aws-amplify'
import { createProfileSetting } from '../../../src/graphql/mutations'

const ProfileSetting = () => {
  const initialState = {
    profileName: '',
    profileEmail: '',
    billingName: '',
  }

  const [imgFile, setImgFile] = useState(null)
  const [imgFileName, setImgFileName] = useState('');
  const [state, setState] = useState(initialState)
  const [isSent, setIsSent] = useState(false)

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    setImgFile(e.target.files[0])
  }

  const handleSave = async () => {
    if (imgFile) {
      const name = imgFile.name.substr(0, imgFile.name.lastIndexOf('.'))
      const ext = imgFile.name.substr(imgFile.name.lastIndexOf('.') + 1)
      const filename = `${name}_${uuid()}.${ext}`
      setImgFileName(filename)
      try {
        const imgResult = await setS3FileUrl(filename, imgFile)
        toast.success('Image Uploaded Successfully!!')
      } catch (error) {
        toast.error('Upload Failure!!!')
        console.log(error)
      }
    }
    if (state && !isSent) {
      try {
        await API.graphql({
          query: createProfileSetting,
          variables: { input: { ...state } },
        })
        toast.success('Saved Successfully!!')
        setIsSent(true)
      } catch (error) {
        toast.error('Save Error')
        console.log(error)
      }
    }
  }


  return (
    <div className="overflow-auto">
      <div className="w-5/6 flex justify-between items-center">
        <h1 className="mb-8 font-semibold text-3xl md:mt-10">My Profile</h1>
        <button
          className={`${classes['btn']} font-bold px-6 py-3 text-2xl h-1/2 `}
        >
          Logout
        </button>
      </div>
      <div className="md:grid md:grid-cols-3">
        <div className="md:m-10 mt-10 text-xl font-semibold">
          Profile Picture
        </div>
        <div className="mt-10 col-span-2 flex justify-center">
          <div
            className={`${classes['img-profile']} bg-gray-300 rounded-full relative`}
          >
            {
              imgFile ?
              <img
              src={URL.createObjectURL(imgFile)}
              alt=""
              className={`${classes['img-profile']} rounded-full`}
              /> : null
            }
            <label htmlFor="camera">
              <input
                type="file"
                id="camera"
                className="w-0 h-0 opacity-0"
                onChange={handleImage}
              />
              <img
                src="/assets/icon/camera1.svg"
                alt="camera"
                className={`${classes['camera']}`}
              />
            </label>
          </div>
        </div>
        <div className="md:m-10 md:mt-20 mt-10 text-xl font-semibold">
          Update Profile Details
        </div>
        <div className="mt-16 col-span-2">
          <label htmlFor="Pname" className="text-lg">
            Name*
          </label>
          <div>
            <input
              type="text"
              name="profileName"
              value={state.profileName}
              className="text-lg md:w-4/5 w-full border border-gray-300"
              onChange={handleChange}
            />
          </div>
          <label htmlFor="Pname" className="text-lg mt-6">
            Email
          </label>
          <div>
            <input
              type="email"
              name="profileEmail"
              value={state.profileEmail}
              onChange={handleChange}
              className="text-lg md:w-4/5 w-full border border-gray-300"
            />
          </div>
          <div className="w-4/5 mt-10">
            <SaveButton handleSave={handleSave} />
          </div>
        </div>
        <div className="md:m-10 md:mt-20 text-xl font-semibold">
          Billing Details
        </div>
        <div className="mt-16 col-span-2">
          <label htmlFor="Pname" className="text-lg mt-6">
            Billing Name*
          </label>
          <div>
            <input
              type="text"
              name="billingName"
              value={state.billingName}
              onChange={handleChange}
              className="text-lg md:w-4/5 w-full border border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetting
