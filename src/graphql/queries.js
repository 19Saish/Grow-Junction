/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDemoSkillsList = /* GraphQL */ `
  query GetDemoSkillsList($id: ID!) {
    getDemoSkillsList(id: $id) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDemoSkillsLists = /* GraphQL */ `
  query ListDemoSkillsLists(
    $filter: ModelDemoSkillsListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDemoSkillsLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        value
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDomainInterestedList = /* GraphQL */ `
  query GetDomainInterestedList($id: ID!) {
    getDomainInterestedList(id: $id) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDomainInterestedLists = /* GraphQL */ `
  query ListDomainInterestedLists(
    $filter: ModelDomainInterestedListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDomainInterestedLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        value
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSuggestedServiceList = /* GraphQL */ `
  query GetSuggestedServiceList($id: ID!) {
    getSuggestedServiceList(id: $id) {
      id
      username
      value
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSuggestedServiceLists = /* GraphQL */ `
  query ListSuggestedServiceLists(
    $filter: ModelSuggestedServiceListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSuggestedServiceLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        value
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudentRegister = /* GraphQL */ `
  query GetStudentRegister($id: ID!) {
    getStudentRegister(id: $id) {
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
export const listStudentRegisters = /* GraphQL */ `
  query ListStudentRegisters(
    $filter: ModelStudentRegisterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentRegisters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getOneOnOne = /* GraphQL */ `
  query GetOneOnOne($id: ID!) {
    getOneOnOne(id: $id) {
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
export const listOneOnOnes = /* GraphQL */ `
  query ListOneOnOnes(
    $filter: ModelOneOnOneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOneOnOnes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTextQuery = /* GraphQL */ `
  query GetTextQuery($id: ID!) {
    getTextQuery(id: $id) {
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
export const listTextQueries = /* GraphQL */ `
  query ListTextQueries(
    $filter: ModelTextQueryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTextQueries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getWorkshop = /* GraphQL */ `
  query GetWorkshop($id: ID!) {
    getWorkshop(id: $id) {
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
export const listWorkshops = /* GraphQL */ `
  query ListWorkshops(
    $filter: ModelWorkshopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkshops(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getCourses = /* GraphQL */ `
  query GetCourses($id: ID!) {
    getCourses(id: $id) {
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
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCoursesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPackages = /* GraphQL */ `
  query GetPackages($id: ID!) {
    getPackages(id: $id) {
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
export const listPackages = /* GraphQL */ `
  query ListPackages(
    $filter: ModelPackagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPackages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMentorRegister = /* GraphQL */ `
  query GetMentorRegister($id: ID!) {
    getMentorRegister(id: $id) {
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
export const listMentorRegisters = /* GraphQL */ `
  query ListMentorRegisters(
    $filter: ModelMentorRegisterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMentorRegisters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getSchedule = /* GraphQL */ `
  query GetSchedule($id: ID!) {
    getSchedule(id: $id) {
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
export const listSchedules = /* GraphQL */ `
  query ListSchedules(
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($id: ID!) {
    getUserInfo(id: $id) {
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
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getConfigurations = /* GraphQL */ `
  query GetConfigurations($id: ID!) {
    getConfigurations(id: $id) {
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
export const listConfigurations = /* GraphQL */ `
  query ListConfigurations(
    $filter: ModelConfigurationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConfigurations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPayment = /* GraphQL */ `
  query GetPayment($id: ID!) {
    getPayment(id: $id) {
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
export const listPayments = /* GraphQL */ `
  query ListPayments(
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getStudentBooking = /* GraphQL */ `
  query GetStudentBooking($id: ID!) {
    getStudentBooking(id: $id) {
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
export const listStudentBookings = /* GraphQL */ `
  query ListStudentBookings(
    $filter: ModelStudentBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMentorSetting = /* GraphQL */ `
  query GetMentorSetting($id: ID!) {
    getMentorSetting(id: $id) {
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
export const listMentorSettings = /* GraphQL */ `
  query ListMentorSettings(
    $filter: ModelMentorSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMentorSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        revenue
        becameMentor
        mentorBtnText
        termsConditions
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPaymentSetting = /* GraphQL */ `
  query GetPaymentSetting($id: ID!) {
    getPaymentSetting(id: $id) {
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
export const listPaymentSettings = /* GraphQL */ `
  query ListPaymentSettings(
    $filter: ModelPaymentSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPaymentSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getSecuritySetting = /* GraphQL */ `
  query GetSecuritySetting($id: ID!) {
    getSecuritySetting(id: $id) {
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
export const listSecuritySettings = /* GraphQL */ `
  query ListSecuritySettings(
    $filter: ModelSecuritySettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSecuritySettings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getEmailSetting = /* GraphQL */ `
  query GetEmailSetting($id: ID!) {
    getEmailSetting(id: $id) {
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
export const listEmailSettings = /* GraphQL */ `
  query ListEmailSettings(
    $filter: ModelEmailSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMiscellaneousAffiliate = /* GraphQL */ `
  query GetMiscellaneousAffiliate($id: ID!) {
    getMiscellaneousAffiliate(id: $id) {
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
export const listMiscellaneousAffiliates = /* GraphQL */ `
  query ListMiscellaneousAffiliates(
    $filter: ModelMiscellaneousAffiliateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMiscellaneousAffiliates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMiscellaneousZoom = /* GraphQL */ `
  query GetMiscellaneousZoom($id: ID!) {
    getMiscellaneousZoom(id: $id) {
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
export const listMiscellaneousZooms = /* GraphQL */ `
  query ListMiscellaneousZooms(
    $filter: ModelMiscellaneousZoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMiscellaneousZooms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        alwaysRec
        waitingRoom
        startParticipantsVideo
        muteParticipants
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMiscellaneousSocial = /* GraphQL */ `
  query GetMiscellaneousSocial($id: ID!) {
    getMiscellaneousSocial(id: $id) {
      socialLogin
      loginWithFacebook
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMiscellaneousSocials = /* GraphQL */ `
  query ListMiscellaneousSocials(
    $filter: ModelMiscellaneousSocialFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMiscellaneousSocials(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        socialLogin
        loginWithFacebook
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProfileSetting = /* GraphQL */ `
  query GetProfileSetting($id: ID!) {
    getProfileSetting(id: $id) {
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
export const listProfileSettings = /* GraphQL */ `
  query ListProfileSettings(
    $filter: ModelProfileSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        profileName
        profileEmail
        billingName
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getServiceType = /* GraphQL */ `
  query GetServiceType($id: ID!) {
    getServiceType(id: $id) {
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
export const listServiceTypes = /* GraphQL */ `
  query ListServiceTypes(
    $filter: ModelServiceTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServiceTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        oneOnOne
        workshop
        cohorts
        package
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMentorOrderType = /* GraphQL */ `
  query GetMentorOrderType($id: ID!) {
    getMentorOrderType(id: $id) {
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
export const listMentorOrderTypes = /* GraphQL */ `
  query ListMentorOrderTypes(
    $filter: ModelMentorOrderTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMentorOrderTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTestimonials = /* GraphQL */ `
  query GetTestimonials($id: ID!) {
    getTestimonials(id: $id) {
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
export const listTestimonials = /* GraphQL */ `
  query ListTestimonials(
    $filter: ModelTestimonialsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestimonials(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getAdminInformation = /* GraphQL */ `
  query GetAdminInformation($id: ID!) {
    getAdminInformation(id: $id) {
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
export const listAdminInformations = /* GraphQL */ `
  query ListAdminInformations(
    $filter: ModelAdminInformationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdminInformations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
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
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        username
        __typename
      }
      nextToken
      __typename
    }
  }
`;
