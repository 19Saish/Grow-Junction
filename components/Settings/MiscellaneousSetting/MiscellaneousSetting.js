import React, { useState } from 'react'
import ToggleButton from '../../Utilities/ToggleBtn/ToggleButton'
import SaveButton from '../../Utilities/SaveBtn/SaveButton'
import classes from './MiscellaneousSetting.module.css'
import { toast } from 'react-toastify'
import { API } from 'aws-amplify'
import {
  createMiscellaneousAffiliate,
  createMiscellaneousSocial,
  createMiscellaneousZoom,
  updateMiscellaneousAffiliate,
  updateMiscellaneousSocial,
  updateMiscellaneousZoom,
} from '../../../src/graphql/mutations'

const MiscellaneousSetting = () => {
  const [affiliateState, setAffiliateState] = useState({
    verifyLearner: '',
    affiliateButton: '',
    affiliateLinking: '',
    verifyLearnerMobile: '',
    newRating: '',
    wishlistSupport: '',
    archiveCohorts: '',
    bookmarkCohort: '',
    accessCode: '',
    knowledgeBaseLinks: '',
    subadmins: '',
    passwordPolicy: '',
    redirectUsers: '',
    msgBeforeLogout: '',
    msgCheckout: '',
    toggleMsgAfterlogin: false,
    toggleMsgBeforeLogout: false,
  })
  const [zoomState, setZoomState] = useState({
    alwaysRec: '',
    waitingRoom: '',
    startParticipantsVideo: '',
    muteParticipants: '',
  })
  const [socialState, setSocialState] = useState({
    socialLogin: '',
    loginWithFacebook: '',
  })

  const [firstAffiliateSave, setFirstAffiliateSave] = useState(true)
  const [firstZoomSave, setFirstZoomSave] = useState(true)
  const [firstSocialSave, setFirstSocialSave] = useState(true)
  const [affiliateUserId, setAffiliateUserId] = useState('')
  const [zoomUserId, setZoomUserId] = useState('')
  const [socialUserId, setSocialUserId] = useState('')

  const handleAffiliateToggle = (e) => {
    setAffiliateState({ ...affiliateState, [e.target.name]: e.target.checked })
  }

  const handleAffiliateChange = (e) => {
    setAffiliateState({ ...affiliateState, [e.target.name]: e.target.value })
  }

  const affiliateHandler = async () => {
    if (affiliateState && firstAffiliateSave) {
      try {
        const result = await API.graphql({
          query: createMiscellaneousAffiliate,
          variables: { input: { ...affiliateState } },
        })
        setAffiliateUserId(result?.data?.createMiscellaneousAffiliate?.id)
        setFirstAffiliateSave(false)
        toast.success('Saved Successfully!!')
      } catch (error) {
        toast.error('Save Error')
        console.log(error)
      }
    } else {
      const { createdAt, updatedAt, ...rest } = { ...affiliateState }
      rest.id = affiliateUserId
      try {
        await API.graphql({
          query: updateMiscellaneousAffiliate,
          variables: { input: { ...rest } },
        })
      } catch (error) {}
    }
  }

  const handleZoomChange = (e) => {
    setZoomState({ ...zoomState, [e.target.name]: e.target.value })
  }

  const zoomHandler = async () => {
    if (zoomState && firstZoomSave) {
      try {
        const result = await API.graphql({
          query: createMiscellaneousZoom,
          variables: { input: { ...zoomState } },
        })
        setZoomUserId(result?.data?.createMiscellaneousZoom?.id)
        setFirstZoomSave(false)
        toast.success('Saved Successfully!!')
      } catch (error) {
        toast.error('Save Error!!!')
        console.log(error)
      }
    } else {
      const { createdAt, updatedAt, ...rest } = { ...zoomState }
      rest.id = zoomUserId
      try {
        await API.graphql({
          query: updateMiscellaneousZoom,
          variables: { input: { ...rest } },
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSocialChange = (e) => {
    setSocialState({ ...socialState, [e.target.name]: e.target.value })
  }

  const socialHandler = async () => {
    if (socialState && firstSocialSave) {
      try {
        const result = await API.graphql({
          query: createMiscellaneousSocial,
          variables: { input: { ...socialState } },
        })
        setSocialUserId(result?.data?.createMiscellaneousSocial?.id)
        setFirstSocialSave(false)
        toast.success('Saved Successfully!!')
      } catch (error) {
        toast.error('Save Error!!!')
        console.log(error)
      }
    }else{
      const { createdAt, updatedAt, ...rest } = { ...socialState }
      rest.id = socialUserId
      try {
        await API.graphql({
          query: updateMiscellaneousSocial,
          variables:{input: {...rest}}
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  const resetHandler = () => {}

  return (
    <div className="h-screen">
      <h1 className="text-4xl font-semibold mb-10">Settings</h1>
      <hr />
      <div className="grid sm:grid-cols-3 grid-cols-2 w-full">
        <div className="sm:m-10">
          <p className="text-xl font-semibold">Affiliate Settings</p>
        </div>
        <div className=" mt-10 col-span-2">
          <label htmlFor="verify" className="text-lg">
            Verify Learner Email
          </label>
          <div className="mt-2 mb-4 flex items-center">
            <input
              type="radio"
              name="verifyLearner"
              id="No"
              value="No"
              onChange={handleAffiliateChange}
              checked={affiliateState.verifyLearner === 'No'}
            />
            <label htmlFor="No" className="text-lg ml-2 mr-20">
              No
            </label>
            <input
              type="radio"
              name="verifyLearner"
              id="optional"
              value="optional"
              onChange={handleAffiliateChange}
              checked={affiliateState.verifyLearner === 'optional'}
            />
            <label htmlFor="optional" className="text-lg ml-2 mr-20">
              Optional
            </label>
            <input
              type="radio"
              name="verifyLearner"
              id="compulsory"
              value="compulsory"
              onChange={handleAffiliateChange}
              checked={affiliateState.verifyLearner === 'compulsory'}
            />
            <label htmlFor="compulsory" className="text-lg ml-2 mr-20">
              Compulsory (unverified learner can't access content)
            </label>
          </div>
          <label htmlFor="affiliateBtn" className="text-lg">
            Allow Learners to become Affiliate Button Text
          </label>
          <input
            type="text"
            id="affiliateBtn"
            name="affiliateButton"
            value={affiliateState.affiliateButton}
            onChange={handleAffiliateChange}
            className="w-4/5 text-lg border border-gray-300 mb-4"
          />
          <div>
            <label className="text-lg">Affiliate Linking</label>
            <div className="flex items-center mt-2 mb-4">
              <input
                type="radio"
                name="affiliateLinking"
                id="Noofdays"
                value="NoOfDays"
                onChange={handleAffiliateChange}
                checked={affiliateState.affiliateLinking === 'NoOfDays'}
              />
              <label htmlFor="Noofdays" className="text-lg ml-2 mr-20">
                Number of Days(Cookie Based)
              </label>
              <input
                type="radio"
                name="affiliateLinking"
                id="lifelong"
                value="lifelong"
                onChange={handleAffiliateChange}
                checked={affiliateState.affiliateLinking === 'lifelong'}
              />
              <label htmlFor="lifelong" className="text-lg ml-2 mr-20">
                Lifelong
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Verify Learner Mobile To enable, please integrate sms provider in
              Integration
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="verifyLearnerMobile"
                id="integno"
                value="integrationNo"
                checked={affiliateState.verifyLearnerMobile === 'integrationNo'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="integno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="verifyLearnerMobile"
                id="integyes"
                value="integrationYes"
                checked={
                  affiliateState.verifyLearnerMobile === 'integrationYes'
                }
                onChange={handleAffiliateChange}
              />
              <label htmlFor="integyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              New Rating/Review Email
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="newRating"
                id="emailno"
                value="ratingNo"
                checked={affiliateState.newRating === 'ratingNo'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="emailno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="newRating"
                id="emailyes"
                value="ratingYes"
                checked={affiliateState.newRating === 'ratingYes'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="emailyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Wishlist Support
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="wishlistSupport"
                id="wishno"
                value="wishlistNo"
                checked={affiliateState.wishlistSupport === 'wishlistNo'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="wishno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="wishlistSupport"
                id="wishyes"
                value="wishlistYes"
                checked={affiliateState.wishlistSupport === 'wishlistYes'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="wishyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Archive Cohorts
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="archiveCohorts"
                id="archiveno"
                value="archiveNo"
                checked={affiliateState.archiveCohorts === 'archiveNo'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="archiveno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="archiveCohorts"
                id="archiveyes"
                value="archiveYes"
                checked={affiliateState.archiveCohorts === 'archiveYes'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="archiveyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Allow Bookmark Cohort Items
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="bookmarkCohort"
                id="bookno"
                value="bookmarkNo"
                checked={affiliateState.bookmarkCohort === 'bookmarkNo'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="bookno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="bookmarkCohort"
                id="bookyes"
                value="bookmarkYes"
                checked={affiliateState.bookmarkCohort === 'bookmarkYes'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="bookyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Access Code
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="accessCode"
                id="accessno"
                value="accessNo"
                checked={affiliateState.accessCode === 'accessNo'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="accessno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="accessCode"
                id="accessyes"
                value="accessYes"
                checked={affiliateState.accessCode === 'accessYes'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="accessyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Show Knowledge Base links
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="knowledgeBaseLinks"
                id="baseno"
                value="knowledgeNo"
                checked={affiliateState.knowledgeBaseLinks === 'knowledgeNo'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="baseno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="knowledgeBaseLinks"
                id="baseyes"
                value="knowledgeYes"
                checked={affiliateState.knowledgeBaseLinks === 'knowledgeYes'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="baseyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Show Help Center to subadmins/instructors
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="subadmins"
                id="helpno"
                value="subadminNo"
                checked={affiliateState.subadmins === 'subadminNo'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="helpno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="subadmins"
                id="helpyes"
                value="subadminYes"
                checked={affiliateState.subadmins === 'subadminYes'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="helpyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Make password policy mandatory
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="passwordPolicy"
                id="passno"
                value="passNo"
                checked={affiliateState.passwordPolicy === 'passNo'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="passno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="passwordPolicy"
                id="passyes"
                value="passYes"
                checked={affiliateState.passwordPolicy === 'passYes'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="passyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Redirect users (not logged in) on checkout/free purchase
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="redirectUsers"
                id="login"
                value="login"
                checked={affiliateState.redirectUsers === 'login'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="login" className="text-lg ml-2 mr-20">
                LogIn
              </label>
              <input
                type="radio"
                name="redirectUsers"
                id="signup"
                value="signup"
                checked={affiliateState.redirectUsers === 'signup'}
                onChange={handleAffiliateChange}
              />
              <label htmlFor="signup" className="text-lg ml-2 mr-20">
                SignUp
              </label>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex">
              <ToggleButton
                special={'toggleMsgAfterlogin'}
                changeHandler={handleAffiliateToggle}
                value={affiliateState.toggleMsgAfterlogin}
              />
              <label htmlFor="showMsg" className="text-lg mb-2 ml-6">
                Show Message after Login
              </label>
            </div>
            <p className="text-base">
              This message is displayed to learner in the form of Pop-up after
              they login on the website.
            </p>
          </div>
          <div className="mt-8">
            <div className="flex">
              <ToggleButton
                special={'toggleMsgBeforeLogout'}
                changeHandler={handleAffiliateToggle}
                value={affiliateState.toggleMsgBeforeLogout}
              />
              <label htmlFor="MsgBeforebtn" className="text-lg mb-2 ml-6">
                Message Before Logout
              </label>
            </div>
            <p className="text-base">
              This message is displayed to learners before they logout from the
              website.
            </p>
          </div>
          <div className="mt-4">
            <label htmlFor="msgBefore" className="text-lg">
              Message Before Logout
            </label>
            <textarea
              name="msgBeforeLogout"
              id="msgBefore"
              cols="50"
              rows="30"
              value={affiliateState.msgBeforeLogout}
              className="w-4/5 border border-gray-300"
              onChange={handleAffiliateChange}
            ></textarea>
          </div>
          <div className="mt-4">
            <label htmlFor="msgcheckout" className="text-lg">
              Message on Checkout Page
            </label>
            <input
              type="text"
              name="msgCheckout"
              className="text-lg border border-gray-300 w-4/5"
              id="msgcheckout"
              value={affiliateState.msgCheckout}
              onChange={handleAffiliateChange}
            />
          </div>
          <div className="w-4/5 pr-4 mt-10">
            <SaveButton handleSave={affiliateHandler} />
          </div>
        </div>
        <div className="sm:m-10 sm:mt-20">
          <p className="text-xl font-semibold">Inbuilt Zoom</p>
        </div>
        <div className="mt-14 w-full col-span-2">
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Always Record Live Class
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="alwaysRec"
                id="recno"
                value="recNo"
                checked={zoomState.alwaysRec === 'recNo'}
                onChange={handleZoomChange}
              />
              <label htmlFor="recno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="alwaysRec"
                id="recyes"
                value="recYes"
                checked={zoomState.alwaysRec === 'recYes'}
                onChange={handleZoomChange}
              />
              <label htmlFor="recyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Waiting Room
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="waitingRoom"
                id="waitno"
                value="waitNo"
                checked={zoomState.waitingRoom === 'waitNo'}
                onChange={handleZoomChange}
              />
              <label htmlFor="waitno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="waitingRoom"
                id="waityes"
                value="waitYes"
                checked={zoomState.waitingRoom === 'waitYes'}
                onChange={handleZoomChange}
              />
              <label htmlFor="waityes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Start Participants Video upon entry
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="startParticipantsVideo"
                id="startno"
                value="startNo"
                checked={zoomState.startParticipantsVideo === 'startNo'}
                onChange={handleZoomChange}
              />
              <label htmlFor="startno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="startParticipantsVideo"
                id="startyes"
                value="startYes"
                checked={zoomState.startParticipantsVideo === 'startYes'}
                onChange={handleZoomChange}
              />
              <label htmlFor="startyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Mute Participants upon entry
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="muteParticipants"
                id="muteno"
                value="muteNo"
                checked={zoomState.muteParticipants === 'muteNo'}
                onChange={handleZoomChange}
              />
              <label htmlFor="muteno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="muteParticipants"
                id="muteyes"
                value="muteYes"
                checked={zoomState.muteParticipants === 'muteYes'}
                onChange={handleZoomChange}
              />
              <label htmlFor="muteyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="flex items-start">
            <SaveButton handleSave={zoomHandler} />
          </div>
        </div>
        <div className="sm:m-10 sm:mt-20">
          <p className="text-xl font-semibold">Social Login</p>
        </div>
        <div className="mt-14 col-span-2">
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Social Login
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="socialLogin"
                id="socialno"
                value="socialNo"
                checked={socialState.socialLogin === 'socialNo'}
                onChange={handleSocialChange}
              />
              <label htmlFor="socialno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="socialLogin"
                id="socialyes"
                value="socialYes"
                checked={socialState.socialLogin === 'socialYes'}
                onChange={handleSocialChange}
              />
              <label htmlFor="socialyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="integration" className="text-lg">
              Allow Login with Facebook
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="loginWithFacebook"
                id="facebookno"
                value="facebookNo"
                checked={socialState.loginWithFacebook === 'facebookNo'}
                onChange={handleSocialChange}
              />
              <label htmlFor="facebookno" className="text-lg ml-2 mr-20">
                No
              </label>
              <input
                type="radio"
                name="loginWithFacebook"
                id="facebookyes"
                value="facebookYes"
                checked={socialState.loginWithFacebook === 'facebookYes'}
                onChange={handleSocialChange}
              />
              <label htmlFor="facebookyes" className="text-lg ml-2 mr-20">
                Yes
              </label>
            </div>
          </div>
          <div className="flex items-start">
            <SaveButton handleSave={socialHandler} />
          </div>
        </div>
        <div className="sm:m-10 sm:mt-20">
          <p className="text-xl font-semibold">Reset Login Devices</p>
        </div>
        <div className="mt-20 col-span-2">
          <button className={`${classes['resetBtn']} text-lg`}>
            Reset Login Devices
          </button>
          <div className="flex items-start">
            <SaveButton handleSave={resetHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiscellaneousSetting
