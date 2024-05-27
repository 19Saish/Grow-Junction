/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDemoSkillsList = /* GraphQL */ `
  subscription OnCreateDemoSkillsList(
    $filter: ModelSubscriptionDemoSkillsListFilterInput
  ) {
    onCreateDemoSkillsList(filter: $filter) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateDemoSkillsList = /* GraphQL */ `
  subscription OnUpdateDemoSkillsList(
    $filter: ModelSubscriptionDemoSkillsListFilterInput
  ) {
    onUpdateDemoSkillsList(filter: $filter) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteDemoSkillsList = /* GraphQL */ `
  subscription OnDeleteDemoSkillsList(
    $filter: ModelSubscriptionDemoSkillsListFilterInput
  ) {
    onDeleteDemoSkillsList(filter: $filter) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateDomainInterestedList = /* GraphQL */ `
  subscription OnCreateDomainInterestedList(
    $filter: ModelSubscriptionDomainInterestedListFilterInput
  ) {
    onCreateDomainInterestedList(filter: $filter) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateDomainInterestedList = /* GraphQL */ `
  subscription OnUpdateDomainInterestedList(
    $filter: ModelSubscriptionDomainInterestedListFilterInput
  ) {
    onUpdateDomainInterestedList(filter: $filter) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteDomainInterestedList = /* GraphQL */ `
  subscription OnDeleteDomainInterestedList(
    $filter: ModelSubscriptionDomainInterestedListFilterInput
  ) {
    onDeleteDomainInterestedList(filter: $filter) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSuggestedServiceList = /* GraphQL */ `
  subscription OnCreateSuggestedServiceList(
    $filter: ModelSubscriptionSuggestedServiceListFilterInput
  ) {
    onCreateSuggestedServiceList(filter: $filter) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSuggestedServiceList = /* GraphQL */ `
  subscription OnUpdateSuggestedServiceList(
    $filter: ModelSubscriptionSuggestedServiceListFilterInput
  ) {
    onUpdateSuggestedServiceList(filter: $filter) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSuggestedServiceList = /* GraphQL */ `
  subscription OnDeleteSuggestedServiceList(
    $filter: ModelSubscriptionSuggestedServiceListFilterInput
  ) {
    onDeleteSuggestedServiceList(filter: $filter) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateStudentRegister = /* GraphQL */ `
  subscription OnCreateStudentRegister(
    $filter: ModelSubscriptionStudentRegisterFilterInput
  ) {
    onCreateStudentRegister(filter: $filter) {
      about_yourself {
        grow_junction_url
        first_name
        last_name
        short_description
        about_yourself
        __typename
      }
      current_employee
      linkedIn_url
      degree
      experience
      recent_college
      your_role
      username
      password
      social {
        linkedin_url
        facebook_url
        instagram_url
        personal_web_url
        other_url
        __typename
      }
      contact_info {
        email
        mobile
        whatsapp
        __typename
      }
      education {
        degree
        college_university
        course
        graduation_year
        __typename
      }
      professional_info {
        occupation
        organization
        location
        position
        experience {
          years
          months
          __typename
        }
        __typename
      }
      profile_image
      student_profile
      whatsapp_number
      active
      deleted
      interestedSkills
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStudentRegister = /* GraphQL */ `
  subscription OnUpdateStudentRegister(
    $filter: ModelSubscriptionStudentRegisterFilterInput
  ) {
    onUpdateStudentRegister(filter: $filter) {
      about_yourself {
        grow_junction_url
        first_name
        last_name
        short_description
        about_yourself
        __typename
      }
      current_employee
      linkedIn_url
      degree
      experience
      recent_college
      your_role
      username
      password
      social {
        linkedin_url
        facebook_url
        instagram_url
        personal_web_url
        other_url
        __typename
      }
      contact_info {
        email
        mobile
        whatsapp
        __typename
      }
      education {
        degree
        college_university
        course
        graduation_year
        __typename
      }
      professional_info {
        occupation
        organization
        location
        position
        experience {
          years
          months
          __typename
        }
        __typename
      }
      profile_image
      student_profile
      whatsapp_number
      active
      deleted
      interestedSkills
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStudentRegister = /* GraphQL */ `
  subscription OnDeleteStudentRegister(
    $filter: ModelSubscriptionStudentRegisterFilterInput
  ) {
    onDeleteStudentRegister(filter: $filter) {
      about_yourself {
        grow_junction_url
        first_name
        last_name
        short_description
        about_yourself
        __typename
      }
      current_employee
      linkedIn_url
      degree
      experience
      recent_college
      your_role
      username
      password
      social {
        linkedin_url
        facebook_url
        instagram_url
        personal_web_url
        other_url
        __typename
      }
      contact_info {
        email
        mobile
        whatsapp
        __typename
      }
      education {
        degree
        college_university
        course
        graduation_year
        __typename
      }
      professional_info {
        occupation
        organization
        location
        position
        experience {
          years
          months
          __typename
        }
        __typename
      }
      profile_image
      student_profile
      whatsapp_number
      active
      deleted
      interestedSkills
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateOneOnOne = /* GraphQL */ `
  subscription OnCreateOneOnOne($filter: ModelSubscriptionOneOnOneFilterInput) {
    onCreateOneOnOne(filter: $filter) {
      sessionTitle
      username
      listedPrice
      finalPrice
      numberOfSessions
      sessionDuration
      sessionDurationIn
      description
      questions {
        id
        text
        type
        required
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateOneOnOne = /* GraphQL */ `
  subscription OnUpdateOneOnOne($filter: ModelSubscriptionOneOnOneFilterInput) {
    onUpdateOneOnOne(filter: $filter) {
      sessionTitle
      username
      listedPrice
      finalPrice
      numberOfSessions
      sessionDuration
      sessionDurationIn
      description
      questions {
        id
        text
        type
        required
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteOneOnOne = /* GraphQL */ `
  subscription OnDeleteOneOnOne($filter: ModelSubscriptionOneOnOneFilterInput) {
    onDeleteOneOnOne(filter: $filter) {
      sessionTitle
      username
      listedPrice
      finalPrice
      numberOfSessions
      sessionDuration
      sessionDurationIn
      description
      questions {
        id
        text
        type
        required
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTextQuery = /* GraphQL */ `
  subscription OnCreateTextQuery(
    $filter: ModelSubscriptionTextQueryFilterInput
  ) {
    onCreateTextQuery(filter: $filter) {
      title
      username
      description
      responseTime
      responseTimeIn
      listedPrice
      finalPrice
      questions {
        id
        text
        type
        required
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTextQuery = /* GraphQL */ `
  subscription OnUpdateTextQuery(
    $filter: ModelSubscriptionTextQueryFilterInput
  ) {
    onUpdateTextQuery(filter: $filter) {
      title
      username
      description
      responseTime
      responseTimeIn
      listedPrice
      finalPrice
      questions {
        id
        text
        type
        required
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTextQuery = /* GraphQL */ `
  subscription OnDeleteTextQuery(
    $filter: ModelSubscriptionTextQueryFilterInput
  ) {
    onDeleteTextQuery(filter: $filter) {
      title
      username
      description
      responseTime
      responseTimeIn
      listedPrice
      finalPrice
      questions {
        id
        text
        type
        required
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateWorkshop = /* GraphQL */ `
  subscription OnCreateWorkshop($filter: ModelSubscriptionWorkshopFilterInput) {
    onCreateWorkshop(filter: $filter) {
      title
      username
      description
      callDuration
      callDurationIn
      listedPrice
      finalPrice
      workshopDate
      workshopTime
      workshopImage
      hideService
      limitedParticipants
      audienceSize
      questions {
        id
        text
        type
        required
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateWorkshop = /* GraphQL */ `
  subscription OnUpdateWorkshop($filter: ModelSubscriptionWorkshopFilterInput) {
    onUpdateWorkshop(filter: $filter) {
      title
      username
      description
      callDuration
      callDurationIn
      listedPrice
      finalPrice
      workshopDate
      workshopTime
      workshopImage
      hideService
      limitedParticipants
      audienceSize
      questions {
        id
        text
        type
        required
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteWorkshop = /* GraphQL */ `
  subscription OnDeleteWorkshop($filter: ModelSubscriptionWorkshopFilterInput) {
    onDeleteWorkshop(filter: $filter) {
      title
      username
      description
      callDuration
      callDurationIn
      listedPrice
      finalPrice
      workshopDate
      workshopTime
      workshopImage
      hideService
      limitedParticipants
      audienceSize
      questions {
        id
        text
        type
        required
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCourses = /* GraphQL */ `
  subscription OnCreateCourses($filter: ModelSubscriptionCoursesFilterInput) {
    onCreateCourses(filter: $filter) {
      courseTitle
      username
      description
      numberOfSessions
      sessionDuration
      sessionDurationIn
      listedPrice
      finalPrice
      courseDate
      courseTime
      hideService
      limitParticipants
      audienceSize
      courseImage
      sessions {
        id
        text
        sessionDate
        sessionTime
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCourses = /* GraphQL */ `
  subscription OnUpdateCourses($filter: ModelSubscriptionCoursesFilterInput) {
    onUpdateCourses(filter: $filter) {
      courseTitle
      username
      description
      numberOfSessions
      sessionDuration
      sessionDurationIn
      listedPrice
      finalPrice
      courseDate
      courseTime
      hideService
      limitParticipants
      audienceSize
      courseImage
      sessions {
        id
        text
        sessionDate
        sessionTime
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCourses = /* GraphQL */ `
  subscription OnDeleteCourses($filter: ModelSubscriptionCoursesFilterInput) {
    onDeleteCourses(filter: $filter) {
      courseTitle
      username
      description
      numberOfSessions
      sessionDuration
      sessionDurationIn
      listedPrice
      finalPrice
      courseDate
      courseTime
      hideService
      limitParticipants
      audienceSize
      courseImage
      sessions {
        id
        text
        sessionDate
        sessionTime
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePackages = /* GraphQL */ `
  subscription OnCreatePackages($filter: ModelSubscriptionPackagesFilterInput) {
    onCreatePackages(filter: $filter) {
      packageTitle
      username
      description
      listedPrice
      finalPrice
      packageImage
      emailContent
      uploadFile
      hideService
      limitParticipants
      audienceSize
      packageServices {
        id
        text
        title
        duration
        price
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePackages = /* GraphQL */ `
  subscription OnUpdatePackages($filter: ModelSubscriptionPackagesFilterInput) {
    onUpdatePackages(filter: $filter) {
      packageTitle
      username
      description
      listedPrice
      finalPrice
      packageImage
      emailContent
      uploadFile
      hideService
      limitParticipants
      audienceSize
      packageServices {
        id
        text
        title
        duration
        price
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePackages = /* GraphQL */ `
  subscription OnDeletePackages($filter: ModelSubscriptionPackagesFilterInput) {
    onDeletePackages(filter: $filter) {
      packageTitle
      username
      description
      listedPrice
      finalPrice
      packageImage
      emailContent
      uploadFile
      hideService
      limitParticipants
      audienceSize
      packageServices {
        id
        text
        title
        duration
        price
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMentorRegister = /* GraphQL */ `
  subscription OnCreateMentorRegister(
    $filter: ModelSubscriptionMentorRegisterFilterInput
  ) {
    onCreateMentorRegister(filter: $filter) {
      about_yourself {
        grow_junction_url
        first_name
        last_name
        short_description
        about_yourself
        __typename
      }
      username
      password
      social {
        linkedin_url
        facebook_url
        instagram_url
        personal_web_url
        other_url
        __typename
      }
      currency
      time_zone {
        abbrev
        altName
        label
        offset
        value
        __typename
      }
      contact_info {
        email
        mobile
        whatsapp
        __typename
      }
      education {
        degree
        college_university
        course
        graduation_year
        __typename
      }
      professional_info {
        occupation
        organization
        location
        position
        experience {
          years
          months
          __typename
        }
        __typename
      }
      profile_image
      student_profile
      domain_id
      whatsapp_number
      active
      deleted
      url
      bankDetails {
        account_holder
        account_number
        ifsc
        vpa
        accountType
        __typename
      }
      kyc_details {
        account_type
        business_type
        uidai
        pan
        passport_number
        driving_license
        voter_id
        gst
        cin
        __typename
      }
      revenueShare {
        serviceType
        revenueShare
        __typename
      }
      access
      mentor_service_id
      growJunctionSelected
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMentorRegister = /* GraphQL */ `
  subscription OnUpdateMentorRegister(
    $filter: ModelSubscriptionMentorRegisterFilterInput
  ) {
    onUpdateMentorRegister(filter: $filter) {
      about_yourself {
        grow_junction_url
        first_name
        last_name
        short_description
        about_yourself
        __typename
      }
      username
      password
      social {
        linkedin_url
        facebook_url
        instagram_url
        personal_web_url
        other_url
        __typename
      }
      currency
      time_zone {
        abbrev
        altName
        label
        offset
        value
        __typename
      }
      contact_info {
        email
        mobile
        whatsapp
        __typename
      }
      education {
        degree
        college_university
        course
        graduation_year
        __typename
      }
      professional_info {
        occupation
        organization
        location
        position
        experience {
          years
          months
          __typename
        }
        __typename
      }
      profile_image
      student_profile
      domain_id
      whatsapp_number
      active
      deleted
      url
      bankDetails {
        account_holder
        account_number
        ifsc
        vpa
        accountType
        __typename
      }
      kyc_details {
        account_type
        business_type
        uidai
        pan
        passport_number
        driving_license
        voter_id
        gst
        cin
        __typename
      }
      revenueShare {
        serviceType
        revenueShare
        __typename
      }
      access
      mentor_service_id
      growJunctionSelected
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMentorRegister = /* GraphQL */ `
  subscription OnDeleteMentorRegister(
    $filter: ModelSubscriptionMentorRegisterFilterInput
  ) {
    onDeleteMentorRegister(filter: $filter) {
      about_yourself {
        grow_junction_url
        first_name
        last_name
        short_description
        about_yourself
        __typename
      }
      username
      password
      social {
        linkedin_url
        facebook_url
        instagram_url
        personal_web_url
        other_url
        __typename
      }
      currency
      time_zone {
        abbrev
        altName
        label
        offset
        value
        __typename
      }
      contact_info {
        email
        mobile
        whatsapp
        __typename
      }
      education {
        degree
        college_university
        course
        graduation_year
        __typename
      }
      professional_info {
        occupation
        organization
        location
        position
        experience {
          years
          months
          __typename
        }
        __typename
      }
      profile_image
      student_profile
      domain_id
      whatsapp_number
      active
      deleted
      url
      bankDetails {
        account_holder
        account_number
        ifsc
        vpa
        accountType
        __typename
      }
      kyc_details {
        account_type
        business_type
        uidai
        pan
        passport_number
        driving_license
        voter_id
        gst
        cin
        __typename
      }
      revenueShare {
        serviceType
        revenueShare
        __typename
      }
      access
      mentor_service_id
      growJunctionSelected
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSchedule = /* GraphQL */ `
  subscription OnCreateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onCreateSchedule(filter: $filter) {
      availableSameTime
      daySchedules {
        everyday {
          everyday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Sunday {
          Sunday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Monday {
          Monday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Tuesday {
          Tuesday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Wednesday {
          Wednesday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Thursday {
          Thursday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Friday {
          Friday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Saturday {
          Saturday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        __typename
      }
      username
      unavailableDates
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSchedule = /* GraphQL */ `
  subscription OnUpdateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onUpdateSchedule(filter: $filter) {
      availableSameTime
      daySchedules {
        everyday {
          everyday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Sunday {
          Sunday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Monday {
          Monday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Tuesday {
          Tuesday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Wednesday {
          Wednesday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Thursday {
          Thursday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Friday {
          Friday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Saturday {
          Saturday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        __typename
      }
      username
      unavailableDates
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSchedule = /* GraphQL */ `
  subscription OnDeleteSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onDeleteSchedule(filter: $filter) {
      availableSameTime
      daySchedules {
        everyday {
          everyday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Sunday {
          Sunday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Monday {
          Monday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Tuesday {
          Tuesday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Wednesday {
          Wednesday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Thursday {
          Thursday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Friday {
          Friday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        Saturday {
          Saturday
          time {
            startTime
            endTime
            __typename
          }
          __typename
        }
        __typename
      }
      username
      unavailableDates
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUserInfo = /* GraphQL */ `
  subscription OnCreateUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onCreateUserInfo(filter: $filter) {
      kyc_done
      register_type
      username
      email
      name
      profile_image
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserInfo = /* GraphQL */ `
  subscription OnUpdateUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onUpdateUserInfo(filter: $filter) {
      kyc_done
      register_type
      username
      email
      name
      profile_image
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserInfo = /* GraphQL */ `
  subscription OnDeleteUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onDeleteUserInfo(filter: $filter) {
      kyc_done
      register_type
      username
      email
      name
      profile_image
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateConfigurations = /* GraphQL */ `
  subscription OnCreateConfigurations(
    $filter: ModelSubscriptionConfigurationsFilterInput
  ) {
    onCreateConfigurations(filter: $filter) {
      timezone {
        abbrev
        altName
        label
        offset
        value
        __typename
      }
      calender
      username
      personalMeetingLink
      bookingPeriod
      bookingPeriodIn
      noticePeriod
      noticePeriodIn
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateConfigurations = /* GraphQL */ `
  subscription OnUpdateConfigurations(
    $filter: ModelSubscriptionConfigurationsFilterInput
  ) {
    onUpdateConfigurations(filter: $filter) {
      timezone {
        abbrev
        altName
        label
        offset
        value
        __typename
      }
      calender
      username
      personalMeetingLink
      bookingPeriod
      bookingPeriodIn
      noticePeriod
      noticePeriodIn
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteConfigurations = /* GraphQL */ `
  subscription OnDeleteConfigurations(
    $filter: ModelSubscriptionConfigurationsFilterInput
  ) {
    onDeleteConfigurations(filter: $filter) {
      timezone {
        abbrev
        altName
        label
        offset
        value
        __typename
      }
      calender
      username
      personalMeetingLink
      bookingPeriod
      bookingPeriodIn
      noticePeriod
      noticePeriodIn
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePayment = /* GraphQL */ `
  subscription OnCreatePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onCreatePayment(filter: $filter) {
      accountType
      accountHolderName
      username
      ifscCode
      accountNumber
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePayment = /* GraphQL */ `
  subscription OnUpdatePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onUpdatePayment(filter: $filter) {
      accountType
      accountHolderName
      username
      ifscCode
      accountNumber
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePayment = /* GraphQL */ `
  subscription OnDeletePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onDeletePayment(filter: $filter) {
      accountType
      accountHolderName
      username
      ifscCode
      accountNumber
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateStudentBooking = /* GraphQL */ `
  subscription OnCreateStudentBooking(
    $filter: ModelSubscriptionStudentBookingFilterInput
  ) {
    onCreateStudentBooking(filter: $filter) {
      name
      orderId
      transactionId
      channel
      serviceId
      amountMentor
      amountGrow
      emailId
      callAbout
      mobileNumber
      receiveUpdate
      timeZone {
        abbrev
        altName
        label
        offset
        value
        __typename
      }
      bookingDate
      timeSlot
      status
      successText
      failureText
      serviceType
      username
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStudentBooking = /* GraphQL */ `
  subscription OnUpdateStudentBooking(
    $filter: ModelSubscriptionStudentBookingFilterInput
  ) {
    onUpdateStudentBooking(filter: $filter) {
      name
      orderId
      transactionId
      channel
      serviceId
      amountMentor
      amountGrow
      emailId
      callAbout
      mobileNumber
      receiveUpdate
      timeZone {
        abbrev
        altName
        label
        offset
        value
        __typename
      }
      bookingDate
      timeSlot
      status
      successText
      failureText
      serviceType
      username
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStudentBooking = /* GraphQL */ `
  subscription OnDeleteStudentBooking(
    $filter: ModelSubscriptionStudentBookingFilterInput
  ) {
    onDeleteStudentBooking(filter: $filter) {
      name
      orderId
      transactionId
      channel
      serviceId
      amountMentor
      amountGrow
      emailId
      callAbout
      mobileNumber
      receiveUpdate
      timeZone {
        abbrev
        altName
        label
        offset
        value
        __typename
      }
      bookingDate
      timeSlot
      status
      successText
      failureText
      serviceType
      username
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMentorSetting = /* GraphQL */ `
  subscription OnCreateMentorSetting(
    $filter: ModelSubscriptionMentorSettingFilterInput
  ) {
    onCreateMentorSetting(filter: $filter) {
      revenue
      becameMentor
      mentorBtnText
      termsConditions
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMentorSetting = /* GraphQL */ `
  subscription OnUpdateMentorSetting(
    $filter: ModelSubscriptionMentorSettingFilterInput
  ) {
    onUpdateMentorSetting(filter: $filter) {
      revenue
      becameMentor
      mentorBtnText
      termsConditions
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMentorSetting = /* GraphQL */ `
  subscription OnDeleteMentorSetting(
    $filter: ModelSubscriptionMentorSettingFilterInput
  ) {
    onDeleteMentorSetting(filter: $filter) {
      revenue
      becameMentor
      mentorBtnText
      termsConditions
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePaymentSetting = /* GraphQL */ `
  subscription OnCreatePaymentSetting(
    $filter: ModelSubscriptionPaymentSettingFilterInput
  ) {
    onCreatePaymentSetting(filter: $filter) {
      keyId
      keySecret
      webhookSecret
      webhookMode
      GSTInput
      taxDetails
      visibleOnInvoices
      placeOfSupplyCGST
      createInvoices
      invoiceNotes
      prefix
      nextNo
      CheckoutInvoiceNote
      country
      currency
      gateway
      taxType
      defaultTaxRate
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePaymentSetting = /* GraphQL */ `
  subscription OnUpdatePaymentSetting(
    $filter: ModelSubscriptionPaymentSettingFilterInput
  ) {
    onUpdatePaymentSetting(filter: $filter) {
      keyId
      keySecret
      webhookSecret
      webhookMode
      GSTInput
      taxDetails
      visibleOnInvoices
      placeOfSupplyCGST
      createInvoices
      invoiceNotes
      prefix
      nextNo
      CheckoutInvoiceNote
      country
      currency
      gateway
      taxType
      defaultTaxRate
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePaymentSetting = /* GraphQL */ `
  subscription OnDeletePaymentSetting(
    $filter: ModelSubscriptionPaymentSettingFilterInput
  ) {
    onDeletePaymentSetting(filter: $filter) {
      keyId
      keySecret
      webhookSecret
      webhookMode
      GSTInput
      taxDetails
      visibleOnInvoices
      placeOfSupplyCGST
      createInvoices
      invoiceNotes
      prefix
      nextNo
      CheckoutInvoiceNote
      country
      currency
      gateway
      taxType
      defaultTaxRate
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSecuritySetting = /* GraphQL */ `
  subscription OnCreateSecuritySetting(
    $filter: ModelSubscriptionSecuritySettingFilterInput
  ) {
    onCreateSecuritySetting(filter: $filter) {
      deviceLimit
      maxDevices
      twoFactorAuth
      downloadsAllowed
      maxDaysOffline
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSecuritySetting = /* GraphQL */ `
  subscription OnUpdateSecuritySetting(
    $filter: ModelSubscriptionSecuritySettingFilterInput
  ) {
    onUpdateSecuritySetting(filter: $filter) {
      deviceLimit
      maxDevices
      twoFactorAuth
      downloadsAllowed
      maxDaysOffline
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSecuritySetting = /* GraphQL */ `
  subscription OnDeleteSecuritySetting(
    $filter: ModelSubscriptionSecuritySettingFilterInput
  ) {
    onDeleteSecuritySetting(filter: $filter) {
      deviceLimit
      maxDevices
      twoFactorAuth
      downloadsAllowed
      maxDaysOffline
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateEmailSetting = /* GraphQL */ `
  subscription OnCreateEmailSetting(
    $filter: ModelSubscriptionEmailSettingFilterInput
  ) {
    onCreateEmailSetting(filter: $filter) {
      fromName
      replyToEmail
      supportEmail
      contactForm
      welcomeEmail
      invoiceEmail
      manuallyCreated
      websiteSignups
      forgotPassword
      affiliateWelcome
      learnerAffiliateWelcome
      liveClassStart
      cohortWelcome
      contentAvailability
      liveClassReminder
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateEmailSetting = /* GraphQL */ `
  subscription OnUpdateEmailSetting(
    $filter: ModelSubscriptionEmailSettingFilterInput
  ) {
    onUpdateEmailSetting(filter: $filter) {
      fromName
      replyToEmail
      supportEmail
      contactForm
      welcomeEmail
      invoiceEmail
      manuallyCreated
      websiteSignups
      forgotPassword
      affiliateWelcome
      learnerAffiliateWelcome
      liveClassStart
      cohortWelcome
      contentAvailability
      liveClassReminder
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteEmailSetting = /* GraphQL */ `
  subscription OnDeleteEmailSetting(
    $filter: ModelSubscriptionEmailSettingFilterInput
  ) {
    onDeleteEmailSetting(filter: $filter) {
      fromName
      replyToEmail
      supportEmail
      contactForm
      welcomeEmail
      invoiceEmail
      manuallyCreated
      websiteSignups
      forgotPassword
      affiliateWelcome
      learnerAffiliateWelcome
      liveClassStart
      cohortWelcome
      contentAvailability
      liveClassReminder
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMiscellaneousAffiliate = /* GraphQL */ `
  subscription OnCreateMiscellaneousAffiliate(
    $filter: ModelSubscriptionMiscellaneousAffiliateFilterInput
  ) {
    onCreateMiscellaneousAffiliate(filter: $filter) {
      verifyLearner
      affiliateButton
      affiliateLinking
      verifyLearnerMobile
      newRating
      wishlistSupport
      archiveCohorts
      bookmarkCohort
      accessCode
      knowledgeBaseLinks
      subadmins
      passwordPolicy
      redirectUsers
      msgBeforeLogout
      msgCheckout
      toggleMsgAfterlogin
      toggleMsgBeforeLogout
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMiscellaneousAffiliate = /* GraphQL */ `
  subscription OnUpdateMiscellaneousAffiliate(
    $filter: ModelSubscriptionMiscellaneousAffiliateFilterInput
  ) {
    onUpdateMiscellaneousAffiliate(filter: $filter) {
      verifyLearner
      affiliateButton
      affiliateLinking
      verifyLearnerMobile
      newRating
      wishlistSupport
      archiveCohorts
      bookmarkCohort
      accessCode
      knowledgeBaseLinks
      subadmins
      passwordPolicy
      redirectUsers
      msgBeforeLogout
      msgCheckout
      toggleMsgAfterlogin
      toggleMsgBeforeLogout
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMiscellaneousAffiliate = /* GraphQL */ `
  subscription OnDeleteMiscellaneousAffiliate(
    $filter: ModelSubscriptionMiscellaneousAffiliateFilterInput
  ) {
    onDeleteMiscellaneousAffiliate(filter: $filter) {
      verifyLearner
      affiliateButton
      affiliateLinking
      verifyLearnerMobile
      newRating
      wishlistSupport
      archiveCohorts
      bookmarkCohort
      accessCode
      knowledgeBaseLinks
      subadmins
      passwordPolicy
      redirectUsers
      msgBeforeLogout
      msgCheckout
      toggleMsgAfterlogin
      toggleMsgBeforeLogout
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMiscellaneousZoom = /* GraphQL */ `
  subscription OnCreateMiscellaneousZoom(
    $filter: ModelSubscriptionMiscellaneousZoomFilterInput
  ) {
    onCreateMiscellaneousZoom(filter: $filter) {
      alwaysRec
      waitingRoom
      startParticipantsVideo
      muteParticipants
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMiscellaneousZoom = /* GraphQL */ `
  subscription OnUpdateMiscellaneousZoom(
    $filter: ModelSubscriptionMiscellaneousZoomFilterInput
  ) {
    onUpdateMiscellaneousZoom(filter: $filter) {
      alwaysRec
      waitingRoom
      startParticipantsVideo
      muteParticipants
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMiscellaneousZoom = /* GraphQL */ `
  subscription OnDeleteMiscellaneousZoom(
    $filter: ModelSubscriptionMiscellaneousZoomFilterInput
  ) {
    onDeleteMiscellaneousZoom(filter: $filter) {
      alwaysRec
      waitingRoom
      startParticipantsVideo
      muteParticipants
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMiscellaneousSocial = /* GraphQL */ `
  subscription OnCreateMiscellaneousSocial(
    $filter: ModelSubscriptionMiscellaneousSocialFilterInput
  ) {
    onCreateMiscellaneousSocial(filter: $filter) {
      socialLogin
      loginWithFacebook
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMiscellaneousSocial = /* GraphQL */ `
  subscription OnUpdateMiscellaneousSocial(
    $filter: ModelSubscriptionMiscellaneousSocialFilterInput
  ) {
    onUpdateMiscellaneousSocial(filter: $filter) {
      socialLogin
      loginWithFacebook
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMiscellaneousSocial = /* GraphQL */ `
  subscription OnDeleteMiscellaneousSocial(
    $filter: ModelSubscriptionMiscellaneousSocialFilterInput
  ) {
    onDeleteMiscellaneousSocial(filter: $filter) {
      socialLogin
      loginWithFacebook
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateProfileSetting = /* GraphQL */ `
  subscription OnCreateProfileSetting(
    $filter: ModelSubscriptionProfileSettingFilterInput
  ) {
    onCreateProfileSetting(filter: $filter) {
      profileName
      profileEmail
      billingName
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateProfileSetting = /* GraphQL */ `
  subscription OnUpdateProfileSetting(
    $filter: ModelSubscriptionProfileSettingFilterInput
  ) {
    onUpdateProfileSetting(filter: $filter) {
      profileName
      profileEmail
      billingName
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteProfileSetting = /* GraphQL */ `
  subscription OnDeleteProfileSetting(
    $filter: ModelSubscriptionProfileSettingFilterInput
  ) {
    onDeleteProfileSetting(filter: $filter) {
      profileName
      profileEmail
      billingName
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateServiceType = /* GraphQL */ `
  subscription OnCreateServiceType(
    $filter: ModelSubscriptionServiceTypeFilterInput
  ) {
    onCreateServiceType(filter: $filter) {
      oneOnOne
      workshop
      cohorts
      package
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateServiceType = /* GraphQL */ `
  subscription OnUpdateServiceType(
    $filter: ModelSubscriptionServiceTypeFilterInput
  ) {
    onUpdateServiceType(filter: $filter) {
      oneOnOne
      workshop
      cohorts
      package
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteServiceType = /* GraphQL */ `
  subscription OnDeleteServiceType(
    $filter: ModelSubscriptionServiceTypeFilterInput
  ) {
    onDeleteServiceType(filter: $filter) {
      oneOnOne
      workshop
      cohorts
      package
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMentorOrderType = /* GraphQL */ `
  subscription OnCreateMentorOrderType(
    $filter: ModelSubscriptionMentorOrderTypeFilterInput
  ) {
    onCreateMentorOrderType(filter: $filter) {
      recentJoinee
      mostActive
      mostPopular
      highlyRated
      trending
      growJunction
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMentorOrderType = /* GraphQL */ `
  subscription OnUpdateMentorOrderType(
    $filter: ModelSubscriptionMentorOrderTypeFilterInput
  ) {
    onUpdateMentorOrderType(filter: $filter) {
      recentJoinee
      mostActive
      mostPopular
      highlyRated
      trending
      growJunction
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMentorOrderType = /* GraphQL */ `
  subscription OnDeleteMentorOrderType(
    $filter: ModelSubscriptionMentorOrderTypeFilterInput
  ) {
    onDeleteMentorOrderType(filter: $filter) {
      recentJoinee
      mostActive
      mostPopular
      highlyRated
      trending
      growJunction
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTestimonials = /* GraphQL */ `
  subscription OnCreateTestimonials(
    $filter: ModelSubscriptionTestimonialsFilterInput
  ) {
    onCreateTestimonials(filter: $filter) {
      serviceType
      serviceTitle
      mentorName
      studentName
      testimonials
      rating
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTestimonials = /* GraphQL */ `
  subscription OnUpdateTestimonials(
    $filter: ModelSubscriptionTestimonialsFilterInput
  ) {
    onUpdateTestimonials(filter: $filter) {
      serviceType
      serviceTitle
      mentorName
      studentName
      testimonials
      rating
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTestimonials = /* GraphQL */ `
  subscription OnDeleteTestimonials(
    $filter: ModelSubscriptionTestimonialsFilterInput
  ) {
    onDeleteTestimonials(filter: $filter) {
      serviceType
      serviceTitle
      mentorName
      studentName
      testimonials
      rating
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      userName
      email
      mobile
      role
      state
      language
      collegeName
      interestedDomain
      linkedin
      viewingAccess
      editAccess
      accessLearnersEdit
      accessLearnersTransactions
      accessToEnroll
      canChangeUi
      accessToEditLanguages
      canEditPostsPublic
      canEditPostsCohorts
      canEditPostsSpecificCohorts
      accessSMS
      canEditPromo
      canEditWallet
      canEditBlog
      viewBandwidthReports
      viewUsageReports
      viewLiveTestReports
      viewLiveClassReports
      viewMentors
      viewAffiliate
      viewEnquiries
      canUpdateCohorts
      canManageLiveClass
      canManageAssignments
      canManageLiveTests
      canManageQuizReviews
      canViewSales
      canViewWithoutSpecificCohort
      canViewWithSpecificCohort
      sendEmailToUser
      editMembership
      editAffiliate
      editMentors
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      userName
      email
      mobile
      role
      state
      language
      collegeName
      interestedDomain
      linkedin
      viewingAccess
      editAccess
      accessLearnersEdit
      accessLearnersTransactions
      accessToEnroll
      canChangeUi
      accessToEditLanguages
      canEditPostsPublic
      canEditPostsCohorts
      canEditPostsSpecificCohorts
      accessSMS
      canEditPromo
      canEditWallet
      canEditBlog
      viewBandwidthReports
      viewUsageReports
      viewLiveTestReports
      viewLiveClassReports
      viewMentors
      viewAffiliate
      viewEnquiries
      canUpdateCohorts
      canManageLiveClass
      canManageAssignments
      canManageLiveTests
      canManageQuizReviews
      canViewSales
      canViewWithoutSpecificCohort
      canViewWithSpecificCohort
      sendEmailToUser
      editMembership
      editAffiliate
      editMentors
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      userName
      email
      mobile
      role
      state
      language
      collegeName
      interestedDomain
      linkedin
      viewingAccess
      editAccess
      accessLearnersEdit
      accessLearnersTransactions
      accessToEnroll
      canChangeUi
      accessToEditLanguages
      canEditPostsPublic
      canEditPostsCohorts
      canEditPostsSpecificCohorts
      accessSMS
      canEditPromo
      canEditWallet
      canEditBlog
      viewBandwidthReports
      viewUsageReports
      viewLiveTestReports
      viewLiveClassReports
      viewMentors
      viewAffiliate
      viewEnquiries
      canUpdateCohorts
      canManageLiveClass
      canManageAssignments
      canManageLiveTests
      canManageQuizReviews
      canViewSales
      canViewWithoutSpecificCohort
      canViewWithSpecificCohort
      sendEmailToUser
      editMembership
      editAffiliate
      editMentors
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAdminInformation = /* GraphQL */ `
  subscription OnCreateAdminInformation(
    $filter: ModelSubscriptionAdminInformationFilterInput
  ) {
    onCreateAdminInformation(filter: $filter) {
      username
      email
      mobile
      role
      state
      language
      collegeName
      interestedDomain
      linkedin
      viewingAccess
      editAccess
      accessLearnersEdit
      accessLearnersTransactions
      accessToEnroll
      addPromoCodes
      addWalletSetting
      addBlogs
      viewBandwidth
      viewUsage
      viewLiveTests
      viewLiveClass
      viewMentors
      editMentors
      viewAffiliate
      editAffiliate
      editMembership
      canUpdateServices
      canManageLiveClass
      canManageAssignments
      canManageLiveTests
      canManageQuizReviews
      viewCompleteSales
      viewWithoutSpecificCohortSales
      viewWithSpecificCohortSales
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAdminInformation = /* GraphQL */ `
  subscription OnUpdateAdminInformation(
    $filter: ModelSubscriptionAdminInformationFilterInput
  ) {
    onUpdateAdminInformation(filter: $filter) {
      username
      email
      mobile
      role
      state
      language
      collegeName
      interestedDomain
      linkedin
      viewingAccess
      editAccess
      accessLearnersEdit
      accessLearnersTransactions
      accessToEnroll
      addPromoCodes
      addWalletSetting
      addBlogs
      viewBandwidth
      viewUsage
      viewLiveTests
      viewLiveClass
      viewMentors
      editMentors
      viewAffiliate
      editAffiliate
      editMembership
      canUpdateServices
      canManageLiveClass
      canManageAssignments
      canManageLiveTests
      canManageQuizReviews
      viewCompleteSales
      viewWithoutSpecificCohortSales
      viewWithSpecificCohortSales
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAdminInformation = /* GraphQL */ `
  subscription OnDeleteAdminInformation(
    $filter: ModelSubscriptionAdminInformationFilterInput
  ) {
    onDeleteAdminInformation(filter: $filter) {
      username
      email
      mobile
      role
      state
      language
      collegeName
      interestedDomain
      linkedin
      viewingAccess
      editAccess
      accessLearnersEdit
      accessLearnersTransactions
      accessToEnroll
      addPromoCodes
      addWalletSetting
      addBlogs
      viewBandwidth
      viewUsage
      viewLiveTests
      viewLiveClass
      viewMentors
      editMentors
      viewAffiliate
      editAffiliate
      editMembership
      canUpdateServices
      canManageLiveClass
      canManageAssignments
      canManageLiveTests
      canManageQuizReviews
      viewCompleteSales
      viewWithoutSpecificCohortSales
      viewWithSpecificCohortSales
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $username: String
  ) {
    onCreateTodo(filter: $filter, username: $username) {
      id
      name
      description
      createdAt
      updatedAt
      username
      __typename
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $username: String
  ) {
    onUpdateTodo(filter: $filter, username: $username) {
      id
      name
      description
      createdAt
      updatedAt
      username
      __typename
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo(
    $filter: ModelSubscriptionTodoFilterInput
    $username: String
  ) {
    onDeleteTodo(filter: $filter, username: $username) {
      id
      name
      description
      createdAt
      updatedAt
      username
      __typename
    }
  }
`;
