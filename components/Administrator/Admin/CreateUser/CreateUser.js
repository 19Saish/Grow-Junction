import React, { useEffect, useState } from 'react'
import Modal from '../../../Utilities/Modal'
import { ToggleSwitch } from 'flowbite-react'
import { API } from 'aws-amplify'
import {createUser} from '../../../../src/graphql/mutations'
import { toast } from 'react-toastify'

const CreateAdmin = ({ showModal, setShowModal }) => {
  const [state, setState] = useState({
    userName: '',
    email: '',
    mobile: '',
    role: '',
    viewingAccess: false,
    editAccess: false,
    accessLearnersEdit: false,
    accessLearnersTransactions: false,
    accessToEnroll: false,
    canChangeUi: false,
    accessToEditLanguages: false,
    canEditPostsPublic: false,
    canEditPostsCohorts: false,
    canEditPostsSpecificCohorts: false,
    accessSMS: false,
    canEditPromo: false,
    canEditWallet: false,
    canEditBlog: false,
    viewBandwidthReports: false,
    viewUsageReports: false,
    viewLiveTestReports: false,
    viewLiveClassReports: false,
    viewMentors: false,
    viewAffiliate: false,
    viewEnquiries: false,
    canUpdateCohorts: false,
    canManageLiveClass: false,
    canManageAssignments: false,
    canManageLiveTests: false,
    canManageQuizReviews: false,
    canViewSales: false,
    canViewWithoutSpecificCohort: false,
    canViewWithSpecificCohort: false,
    sendEmailToUser: false,
  })

  const [sendEmail, setSendEmail] = useState(false)

  useEffect(() => {
    state.sendEmailToUser = sendEmail
  }, [sendEmail])

  const handleChangeInfo = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  const handleSendEmail = () => {
    setSendEmail(!sendEmail)
  }

  const handleSubmit = async () => {
    if(state){
      try {
        await API.graphql({
          query: createUser,
          variables: {input: {...state}}
        })
        toast.success("User Created Successfully!!")
      } catch (error) {
        toast.error("Failed to create user!!!")
      }
    }
  }

  useEffect(() => {
    setShowModal(showModal)
  }, [showModal])

  console.log(state)

  return (
    <div>
      <Modal
        title="Create User"
        containerWidth="4/5"
        firstButtonTitle="Close"
        firstButtonHandler={setShowModal.bind(null, false)}
        secondButtonTitle="Save"
        secondButtonHandler={handleSubmit}
        closeButtonHandler={setShowModal.bind(null, false)}
      >
        <div className="my-10 mx-20 text-xl w-full">
          <div className="w-4/5 overflow-x-hidden">
            <div className="mt-2">
              <label htmlFor="userName" className="text-xl">
                Name
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                className="mt-2 text-xl border border-gray-300 w-full"
                onChange={handleChangeInfo}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="email" className="text-xl mt-4">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 text-xl border border-gray-300 w-full"
                onChange={handleChangeInfo}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="mobile" className="text-xl mt-4">
                Mobile
              </label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                maxLength="10"
                className="mt-2 text-xl border border-gray-300 w-full"
                onChange={handleChangeInfo}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="role" className="text-xl mt-4">
                Role
              </label>
              <select
                className="w-full mt-2"
                name="role"
                value={state.role}
                onChange={handleChangeInfo}
              >
                <option value="" disabled></option>
                <option value="subadmin">Sub Admin</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl mt-4">
              Responsibilities
            </label>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl font-semibold">
              Support:
            </label>
            <div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="viewingAccess"
                  name="viewingAccess"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="viewingAccess">
                  Viewing Access to Learner's Information
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="editAccess"
                  name="editAccess"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="editAccess">
                  Edit Access to Learner's Information, Change Password, Reset
                  Login Devices
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="accessLearnersEdit"
                  name="accessLearnersEdit"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="accessLearnersEdit">
                  Access to Learner's Cohort progress, change expiry date. Edit
                  Access to Learner's info compulsory for this responsibility.
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="accessLearnersTransactions"
                  name="accessLearnersTransactions"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="accessLearnersTransactions">
                  Access to Learner's initiated, success and failed transactions
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="accessToEnroll"
                  name="accessToEnroll"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="accessToEnroll">
                  Access to enroll learners in any cohort.
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl font-semibold">
              Design:
            </label>
            <div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canChangeUi"
                  name="canChangeUi"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canChangeUi">
                  Can change Website and App UI.
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="accessToEditLanguages"
                  name="accessToEditLanguages"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="accessToEditLanguages">
                  Access to edit languages and custom texts. Change Website and
                  App UI compulsory for this responsibility.
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl font-semibold">
              Discussions:
            </label>
            <div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canEditPostsPublic"
                  name="canEditPostsPublic"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canEditPostsPublic">
                  Can add, delete, reply, hide or pin posts in Public Forum.
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="canEditPostsCohorts"
                  name="canEditPostsCohorts"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canEditPostsCohorts">
                  Can add, delete, reply, hide or pin posts in all cohort wise
                  discussions.
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="canEditPostsSpecificCohorts"
                  name="canEditPostsSpecificCohorts"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canEditPostsSpecificCohorts">
                  Can add, edit, delete, reply, hide or pin posts in specific
                  cohorts delete blogs.
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl font-semibold">
              Messenger:
            </label>
            <div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="accessSMS"
                  name="accessSMS"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="accessSMS">
                  Can access SMS and Notifications.
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl font-semibold">
              Marketing:
            </label>
            <div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canEditPromo"
                  name="canEditPromo"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canEditPromo">
                  Can add, edit and delete promo codes.
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canEditWallet"
                  name="canEditWallet"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canEditWallet">
                  Can add, edit and delete wallet/refer & earn settings.
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canEditBlog"
                  name="canEditBlog"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canEditBlog">
                  Can add, edit and delete blogs.
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl font-semibold">
              Reports:
            </label>
            <div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="viewBandwidthReports"
                  name="viewBandwidthReports"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="viewBandwidthReports">
                  Can view bandwidth reports.
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="viewUsageReports"
                  name="viewUsageReports"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="viewUsageReports">
                  Can view usage reports.
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="viewLiveTestReports"
                  name="viewLiveTestReports"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="viewLiveTestReports">
                  Can view live tests reports
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="viewLiveClassReports"
                  name="viewLiveClassReports"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="viewLiveClassReports">
                  Can view live class reports
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl font-semibold">
              User:
            </label>
            <div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="viewMentors"
                  name="viewMentors"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="viewMentors">Can view mentors</label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="viewAffiliate"
                  name="viewAffiliate"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="viewAffiliate">Can view Affiliate</label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="viewEnquiries"
                  name="viewEnquiries"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="viewEnquiries">Can view enquiries.</label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl font-semibold">
              Content:
            </label>
            <div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canUpdateCohorts"
                  name="canUpdateCohorts"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canUpdateCohorts">
                  Can create, edit and delete cohorts.
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canManageLiveClass"
                  name="canManageLiveClass"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canManageLiveClass">
                  Can manage live classes.
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canManageAssignments"
                  name="canManageAssignments"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canManageAssignments">
                  Can manage assignments.
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canManageLiveTests"
                  name="canManageLiveTests"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canManageLiveTests">
                  Can manage live tests.
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canManageQuizReviews"
                  name="canManageQuizReviews"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canManageQuizReviews">
                  Can manage quiz reviews.
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl font-semibold">
              Sales:
            </label>
            <div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canViewSales"
                  name="canViewSales"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canViewSales">
                  Can view complete sales dashboard. Can change status of
                  transactions.
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canViewWithoutSpecificCohort"
                  name="canViewWithoutSpecificCohort"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canViewWithoutSpecificCohort">
                  Can view specific cohort sales without learner information
                </label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="canViewWithSpecificCohort"
                  name="canViewWithSpecificCohort"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="canViewWithSpecificCohort">
                  Can view specific cohort sales with learner information.
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <span className="mr-4">Send Email to User</span>
            <ToggleSwitch
              color="yellow"
              onChange={handleSendEmail}
              checked={sendEmail}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CreateAdmin
