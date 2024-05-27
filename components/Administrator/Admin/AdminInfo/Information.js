import React, { useEffect, useState } from 'react'
import { state, languages } from './helpers'
import SaveButton from '../../../Utilities/SaveBtn/SaveButton'
import { API, graphqlOperation } from 'aws-amplify'
import { createUser, updateUser} from '../../../../src/graphql/mutations'
import { toast } from 'react-toastify'
import { listUsers } from '../../../../src/graphql/queries'

const Information = ({ id }) => {
  const [infoState, setInfoState] = useState({
    userName: '',
  email: '',
  mobile: '',
  role: '',
  state: '',
  language: '',
  collegeName: '',
  interestedDomain: '',
  linkedin: '',
  viewingAccess: false,
  editAccess: false,
  accessLearnersEdit: false,
  accessLearnersTransactions: false,
  accessToEnroll: false,
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
  editMembership: false,
  editAffiliate: false,
  editMentors: false,
  })

  const handleChangeInfo = (e) => {
    setInfoState({ ...infoState, [e.target.name]: e.target.value })
  }

  const handleChange = (e) => {
    setInfoState({ ...infoState, [e.target.name]: e.target.checked })
  }

  const [firstSave, setFirstSave] = useState(true)
  const [filteredUser, setFilteredUser] = useState([])


  useEffect(() => {
    const getUsersInfo = async () => {
      const result = await API.graphql(graphqlOperation(listUsers))
      const user = result.data.listUsers.items.find((i) => i.id === id)
      setFilteredUser(user)
    }
    getUsersInfo()
  }, [])

  const handleSave = async () => {
    if (infoState && id === undefined) {
      try {
        await API.graphql({
          query: createUser,
          variables: { input: { ...infoState } },
        })
        setFirstSave(false)
        toast.success('Saved Successfully!!')
      } catch (error) {
        toast.error('Save Error!!!')
      }
    } else {
      const { createdAt, updatedAt, ...rest} = infoState

      rest.id = id
      try {
        await API.graphql({
          query: updateUser,
          variables: { input: { ...rest } },
        })
        toast.success('Updated Successfully!!')
      } catch (error) {
        console.log(error);
        toast.error('Save Error!!!')
      }
    }
  }

  console.log(id);

  console.log(filteredUser);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold mb-10">Information</h1>
        <div>
          <button className="p-2 border border-black text-2xl mr-20">
            Deactivate
          </button>
        </div>
      </div>
      <hr />
      <div>
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
                value={infoState.userName}
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
                value={infoState.email}
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
                value={infoState.mobile}
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
                value={infoState.role}
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
              Marketing:
            </label>
            <div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="addPromoCodes"
                  name="canEditPromo"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="addPromoCodes">
                  Can add, edit and delete promo codes.
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="addWalletSetting"
                  name="canEditWallet"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="addWalletSetting">
                  Can add, edit and delete wallet/refer & earn settings.
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="addBlogs"
                  name="canEditBlog"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="addBlogs">
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
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="viewBandwidth"
                  name="viewBandwidthReports"
                  onChange={handleChange}
                  className="mx-4"
                />
                <label htmlFor="viewBandwidth">
                  Can view bandwidth reports.
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="viewUsage"
                  name="viewUsageReports"
                  onChange={handleChange}
                  className="mx-4"
                />
                <label htmlFor="viewUsage">Can view usage reports.</label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="viewLiveTests"
                  name="viewLiveTestsReports"
                  onChange={handleChange}
                  className="mx-4"
                />
                <label htmlFor="viewLiveTests">
                  Can view live tests reports
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="viewLiveClass"
                  name="viewLiveClassReports"
                  onChange={handleChange}
                  className="mx-4"
                />
                <label htmlFor="viewLiveClass">
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
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="viewMentors"
                  name="viewMentors"
                  onChange={handleChange}
                  className="mx-4"
                />
                <label htmlFor="viewMentors">Can view mentors</label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="editMentors"
                  name="editMentors"
                  onChange={handleChange}
                  className="mx-4"
                />
                <label htmlFor="editMentors">Can edit, delete mentors.</label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="viewAffiliate"
                  name="viewAffiliate"
                  onChange={handleChange}
                  className="mx-4"
                />
                <label htmlFor="viewAffiliate">Can view Affiliate</label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="editAffiliate"
                  name="editAffiliate"
                  onChange={handleChange}
                  className="mx-4"
                />
                <label htmlFor="editAffiliate">
                  Can edit, delete Affiliate
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl font-semibold">
              Members and Community:
            </label>
            <div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="editManageMembership"
                  className="mx-4"
                  name="editMembership"
                  onChange={handleChange}
                />
                <label htmlFor="editManageMembership">
                  Can edit and manage membership.
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="" className="text-xl font-semibold">
              Content:
            </label>
            <div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="createServices"
                  name="canUpdateCohorts"
                  onChange={handleChange}
                  className="mx-4"
                />
                <label htmlFor="createServices">
                  Can create, edit and delete Services.
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="manageLiveClass"
                  name="canManageLiveClass"
                  onChange={handleChange}
                  className="mx-4"
                />
                <label htmlFor="manageLiveClass">
                  Can manage live classes.
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="manageAssignments"
                  name="canManageAssignments"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="manageAssignments">
                  Can manage assignments.
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="manageLiveTests"
                  name="canManageLiveTests"
                  onChange={handleChange}
                  className="mx-4"
                />
                <label htmlFor="manageLiveTests">Can manage live tests.</label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="manageQuizReviews"
                  name="canManageQuizReviews"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="manageQuizReviews">
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
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="viewCompleteSales"
                  name="canViewSales"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="viewCompleteSales">
                  Can view complete sales dashboard. Can change status of
                  transactions.
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="viewWithoutSpecificCohortSales"
                  name="canViewWithoutSpecificCohort"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="viewWithoutSpecificCohortSales">
                  Can view specific cohort sales without learner information
                </label>
              </div>
              <div className="items-center mt-4">
                <input
                  type="checkbox"
                  id="viewWithSpecificCohortSales"
                  name="canViewWithSpecificCohort"
                  className="mx-4"
                  onChange={handleChange}
                />
                <label htmlFor="viewWithSpecificCohortSales">
                  Can view specific cohort sales with learner information.
                </label>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <div className="flex flex-col">
              <label htmlFor="state" className="text-xl">
                State
              </label>
              <select
                name="state"
                id="state"
                value={infoState.state}
                onChange={handleChangeInfo}
                className="w-4/5 mt-2 text-xl"
              >
                {state.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="Language" className="text-xl">
                Languages
              </label>
              <select
                name="language"
                id="Language"
                className="w-4/5 mt-2 text-xl"
                value={infoState.language}
                onChange={handleChangeInfo}
              >
                {languages.map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="collegeName" className="text-xl">
                College Name or Company Name
              </label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                className="w-4/5 text-xl mt-2"
                onChange={handleChangeInfo}
              />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="domain" className="text-xl">
                Domain Interested In
              </label>
              <select
                name="interestedDomain"
                id="domain"
                value={infoState.interestedDomain}
                onChange={handleChangeInfo}
                className="w-4/5 text-xl mt-2"
              >
                <option value="workshop">Workshop</option>
                <option value="package">Package</option>
              </select>
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="linkedin" className="text-xl">
                Linkedin id (E.g. https://www.linkedin.com/in/your id )
              </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                onChange={handleChangeInfo}
                className="w-4/5 text-xl mt-2"
              />
            </div>
            <div className="w-4/5 mt-14">
              <SaveButton handleSave={handleSave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Information
